-- PULSO-H Database Schema
-- MySQL schema for production deployment on Hostinger

CREATE DATABASE IF NOT EXISTS pulso_h CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE pulso_h;

-- Evaluations table (organizational assessments)
CREATE TABLE IF NOT EXISTS evaluations (
    id INT AUTO_INCREMENT PRIMARY KEY,
    hash VARCHAR(8) NOT NULL UNIQUE,
    organization_name VARCHAR(255) NOT NULL,
    sector VARCHAR(100),
    expected_participants INT DEFAULT 10,
    demographic_fields JSON,
    custom_message TEXT,
    deadline DATE,
    status ENUM('active', 'closed', 'pending') DEFAULT 'active',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_hash (hash),
    INDEX idx_status (status),
    INDEX idx_created (created_at)
) ENGINE=InnoDB;

-- Responses table (aggregated data only - NO individual responses)
CREATE TABLE IF NOT EXISTS responses (
    id INT AUTO_INCREMENT PRIMARY KEY,
    evaluation_id INT NOT NULL,
    irp DECIMAL(5,2) NOT NULL,
    profile VARCHAR(50),
    irp_zone ENUM('verde', 'amarilla', 'naranja', 'roja'),
    ae_score DECIMAL(5,2),
    dp_score DECIMAL(5,2),
    rp_score DECIMAL(5,2),
    for_score DECIMAL(5,2),
    cvt_score DECIMAL(5,2),
    rri_score DECIMAL(5,2),
    -- Demographic data (optional, anonymous)
    demographic_area VARCHAR(100),
    demographic_role VARCHAR(100),
    demographic_seniority VARCHAR(50),
    demographic_gender VARCHAR(50),
    demographic_age_range VARCHAR(20),
    -- Privacy
    ip_hash VARCHAR(64), -- SHA-256 hashed IP for duplicate detection
    is_duplicate BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (evaluation_id) REFERENCES evaluations(id) ON DELETE CASCADE,
    INDEX idx_evaluation (evaluation_id),
    INDEX idx_irp (irp),
    INDEX idx_profile (profile),
    INDEX idx_area (demographic_area),
    INDEX idx_created (created_at)
) ENGINE=InnoDB;

-- Leads table (email captures)
CREATE TABLE IF NOT EXISTS leads (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,
    name VARCHAR(255),
    organization VARCHAR(255),
    profile VARCHAR(50),
    score INT DEFAULT 0,
    gdpr_consent BOOLEAN DEFAULT FALSE,
    marketing_consent BOOLEAN DEFAULT FALSE,
    source VARCHAR(50) DEFAULT 'PULSO-H',
    status ENUM('new', 'contacted', 'qualified', 'converted', 'lost') DEFAULT 'new',
    hubspot_id VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_email (email),
    INDEX idx_score (score),
    INDEX idx_status (status),
    INDEX idx_created (created_at)
) ENGINE=InnoDB;

-- Lead events table (engagement tracking)
CREATE TABLE IF NOT EXISTS lead_events (
    id INT AUTO_INCREMENT PRIMARY KEY,
    lead_id INT NOT NULL,
    event_type ENUM('assessment_complete', 'pdf_download', 'email_open', 'cta_click', 'call_scheduled') NOT NULL,
    event_data JSON,
    score_value INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (lead_id) REFERENCES leads(id) ON DELETE CASCADE,
    INDEX idx_lead (lead_id),
    INDEX idx_type (event_type),
    INDEX idx_created (created_at)
) ENGINE=InnoDB;

-- Organizations table (client companies)
CREATE TABLE IF NOT EXISTS organizations (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    sector VARCHAR(100),
    size VARCHAR(50), -- '1-10', '11-50', '51-200', '201-500', '500+'
    plan ENUM('free', 'growth', 'pro', 'enterprise') DEFAULT 'free',
    contact_email VARCHAR(255),
    contact_phone VARCHAR(50),
    logo_url VARCHAR(500),
    settings JSON,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_plan (plan),
    INDEX idx_sector (sector)
) ENGINE=InnoDB;

-- Email sequences table (nurturing campaigns)
CREATE TABLE IF NOT EXISTS email_sequences (
    id INT AUTO_INCREMENT PRIMARY KEY,
    lead_id INT NOT NULL,
    sequence_type ENUM('welcome', 'nurturing', 'retention') DEFAULT 'nurturing',
    email_1_sent BOOLEAN DEFAULT FALSE,
    email_1_sent_at TIMESTAMP NULL,
    email_2_sent BOOLEAN DEFAULT FALSE,
    email_2_sent_at TIMESTAMP NULL,
    email_3_sent BOOLEAN DEFAULT FALSE,
    email_3_sent_at TIMESTAMP NULL,
    email_4_sent BOOLEAN DEFAULT FALSE,
    email_4_sent_at TIMESTAMP NULL,
    email_5_sent BOOLEAN DEFAULT FALSE,
    email_5_sent_at TIMESTAMP NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (lead_id) REFERENCES leads(id) ON DELETE CASCADE,
    INDEX idx_lead (lead_id),
    INDEX idx_type (sequence_type)
) ENGINE=InnoDB;

-- Audit log table (for compliance)
CREATE TABLE IF NOT EXISTS audit_log (
    id INT AUTO_INCREMENT PRIMARY KEY,
    table_name VARCHAR(50) NOT NULL,
    record_id INT NOT NULL,
    action ENUM('create', 'update', 'delete') NOT NULL,
    old_values JSON,
    new_values JSON,
    performed_by VARCHAR(255),
    ip_address VARCHAR(45),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_table (table_name),
    INDEX idx_record (record_id),
    INDEX idx_created (created_at)
) ENGINE=InnoDB;

-- Views for dashboard queries
CREATE OR REPLACE VIEW v_evaluation_stats AS
SELECT 
    e.id,
    e.hash,
    e.organization_name,
    e.sector,
    e.status,
    COUNT(r.id) as total_responses,
    AVG(r.irp) as average_irp,
    MIN(r.irp) as min_irp,
    MAX(r.irp) as max_irp,
    CASE WHEN COUNT(r.id) >= 5 THEN TRUE ELSE FALSE END as is_active
FROM evaluations e
LEFT JOIN responses r ON e.id = r.evaluation_id
GROUP BY e.id, e.hash, e.organization_name, e.sector, e.status;

CREATE OR REPLACE VIEW v_lead_scores AS
SELECT 
    l.id,
    l.email,
    l.name,
    l.organization,
    l.profile,
    l.score,
    l.status,
    COUNT(e.id) as event_count,
    MAX(e.created_at) as last_activity
FROM leads l
LEFT JOIN lead_events e ON l.id = e.lead_id
GROUP BY l.id, l.email, l.name, l.organization, l.profile, l.score, l.status;

-- Create benchmark_data table
CREATE TABLE IF NOT EXISTS benchmark_data (
    id INT AUTO_INCREMENT PRIMARY KEY,
    sector VARCHAR(100) NOT NULL UNIQUE,
    average_irp DECIMAL(5,2) NOT NULL,
    percentile_25 DECIMAL(5,2) NOT NULL,
    percentile_50 DECIMAL(5,2) NOT NULL,
    percentile_75 DECIMAL(5,2) NOT NULL,
    sample_size INT NOT NULL,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB;

-- Insert sample benchmark data
INSERT INTO benchmark_data (sector, average_irp, percentile_25, percentile_50, percentile_75, sample_size) VALUES
('Tecnologia', 52.3, 35.0, 52.3, 68.5, 1247),
('Salud', 61.2, 45.0, 61.2, 75.8, 2156),
('Finanzas', 58.7, 42.0, 58.7, 73.2, 982),
('Educacion', 55.4, 38.0, 55.4, 70.1, 1567),
('Manufactura', 48.9, 32.0, 48.9, 63.5, 1876),
('Retail', 53.1, 36.0, 53.1, 69.2, 1432),
('Consultoria', 59.8, 44.0, 59.8, 74.1, 756),
('General', 54.2, 37.0, 54.2, 70.5, 10016)
ON DUPLICATE KEY UPDATE 
    average_irp = VALUES(average_irp),
    sample_size = VALUES(sample_size);

-- Appointments table (scheduling system)
CREATE TABLE IF NOT EXISTS appointments (
    id INT AUTO_INCREMENT PRIMARY KEY,
    lead_id INT NOT NULL,
    appointment_date DATE NOT NULL,
    appointment_time TIME NOT NULL,
    duration_minutes INT DEFAULT 30,
    status ENUM('pending', 'confirmed', 'completed', 'cancelled', 'no_show') DEFAULT 'pending',
    psychologist_id INT DEFAULT 1,
    meeting_link VARCHAR(500),
    notes TEXT,
    reminder_sent BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (lead_id) REFERENCES leads(id) ON DELETE CASCADE,
    INDEX idx_lead (lead_id),
    INDEX idx_date (appointment_date),
    INDEX idx_status (status),
    UNIQUE KEY unique_appointment (appointment_date, appointment_time)
) ENGINE=InnoDB;

-- Availability slots table
CREATE TABLE IF NOT EXISTS availability_slots (
    id INT AUTO_INCREMENT PRIMARY KEY,
    slot_date DATE NOT NULL,
    slot_time TIME NOT NULL,
    is_available BOOLEAN DEFAULT TRUE,
    psychologist_id INT DEFAULT 1,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE KEY unique_slot (slot_date, slot_time, psychologist_id),
    INDEX idx_date (slot_date),
    INDEX idx_available (is_available)
) ENGINE=InnoDB;

-- Insert sample availability data (Mon-Fri 9:00-17:00, 30min slots)
-- Generate for next 30 days
DELIMITER //
CREATE PROCEDURE IF NOT EXISTS generate_availability_slots()
BEGIN
    DECLARE start_date DATE;
    DECLARE end_date DATE;
    DECLARE current_date DATE;
    DECLARE current_time TIME;
    
    SET start_date = CURDATE();
    SET end_date = DATE_ADD(CURDATE(), INTERVAL 30 DAY);
    SET current_date = start_date;
    
    WHILE current_date <= end_date DO
        -- Only Monday to Friday (1=Monday, 5=Friday)
        IF DAYOFWEEK(current_date) BETWEEN 2 AND 6 THEN
            SET current_time = '09:00:00';
            
            WHILE current_time < '17:00:00' DO
                INSERT IGNORE INTO availability_slots (slot_date, slot_time, is_available, psychologist_id)
                VALUES (current_date, current_time, TRUE, 1);
                
                SET current_time = DATE_ADD(current_time, INTERVAL 30 MINUTE);
            END WHILE;
        END IF;
        
        SET current_date = DATE_ADD(current_date, INTERVAL 1 DAY);
    END WHILE;
END //
DELIMITER ;

-- Generate slots if table is empty
INSERT IGNORE INTO availability_slots (slot_date, slot_time, is_available, psychologist_id)
SELECT 
    DATE_ADD(CURDATE(), INTERVAL n DAY) as slot_date,
    ADDTIME('09:00:00', SEC_TO_TIME(t * 1800)) as slot_time,
    TRUE as is_available,
    1 as psychologist_id
FROM (
    SELECT a.N + b.N * 10 + c.N * 100 as n
    FROM 
        (SELECT 0 as N UNION SELECT 1 UNION SELECT 2 UNION SELECT 3 UNION SELECT 4 UNION SELECT 5 UNION SELECT 6 UNION SELECT 7 UNION SELECT 8 UNION SELECT 9) a,
        (SELECT 0 as N UNION SELECT 1 UNION SELECT 2 UNION SELECT 3) b,
        (SELECT 0 as N) c
    ORDER BY n
) numbers
CROSS JOIN (
    SELECT 0 as t UNION SELECT 1 UNION SELECT 2 UNION SELECT 3 UNION SELECT 4 
    UNION SELECT 5 UNION SELECT 6 UNION SELECT 7 UNION SELECT 8 UNION SELECT 9 
    UNION SELECT 10 UNION SELECT 11 UNION SELECT 12 UNION SELECT 13 UNION SELECT 14 
    UNION SELECT 15
) times
WHERE n <= 30
    AND DAYOFWEEK(DATE_ADD(CURDATE(), INTERVAL n DAY)) BETWEEN 2 AND 6
    AND ADDTIME('09:00:00', SEC_TO_TIME(t * 1800)) < '17:00:00';
