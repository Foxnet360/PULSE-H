#!/bin/bash
# PULSO-H Backend API Test Suite
# Run all endpoint tests with curl
# Usage: ./api/test-api.sh [base_url]

BASE_URL="${1:-http://localhost:8080/api}"
ECHO=""

# Colors for output
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

PASS=0
FAIL=0

test_endpoint() {
    local method=$1
    local endpoint=$2
    local data=$3
    local expected_status=$4
    local description=$5
    
    echo -e "${YELLOW}Testing:${NC} $description"
    echo "  $method $endpoint"
    
    if [ -n "$data" ]; then
        response=$(curl -s -w "\n%{http_code}" -X "$method" \
            -H "Content-Type: application/json" \
            -d "$data" \
            "$BASE_URL/$endpoint")
    else
        response=$(curl -s -w "\n%{http_code}" -X "$method" \
            "$BASE_URL/$endpoint")
    fi
    
    status_code=$(echo "$response" | tail -n1)
    body=$(echo "$response" | sed '$d')
    
    if [ "$status_code" == "$expected_status" ]; then
        echo -e "  ${GREEN}✓ PASS${NC} (HTTP $status_code)"
        PASS=$((PASS + 1))
    else
        echo -e "  ${RED}✗ FAIL${NC} (Expected HTTP $expected_status, got $status_code)"
        echo "  Response: $body"
        FAIL=$((FAIL + 1))
    fi
    echo ""
}

echo "=========================================="
echo "PULSO-H API Test Suite"
echo "Base URL: $BASE_URL"
echo "=========================================="
echo ""

# Test 1: Lead Capture (POST /lead.php)
test_endpoint "POST" "lead.php" \
    '{"email":"test@example.com","name":"Test User","profile":"sobrecargadx","score":65,"gdpr_consent":true,"marketing_consent":true,"events":[{"type":"assessment_complete","data":{"irp":65}}]}' \
    "200" \
    "1. Lead Capture - Create new lead"

# Test 2: Get All Leads (GET /lead.php)
test_endpoint "GET" "lead.php" "" \
    "200" \
    "2. Lead Management - List all leads"

# Test 3: Get Hot Leads (GET /lead.php?hot=true)
test_endpoint "GET" "lead.php?hot=true" "" \
    "200" \
    "3. Lead Management - Get hot leads (top 20%)"

# Test 4: Get Lead Events (GET /lead.php?events=1)
test_endpoint "GET" "lead.php?events=1" "" \
    "200" \
    "4. Lead Management - Get lead events"

# Test 5: Get Email Sequences (GET /lead.php?sequences=true)
test_endpoint "GET" "lead.php?sequences=true" "" \
    "200" \
    "5. Lead Management - Get email sequences"

# Test 6: Availability - Get slots (GET /availability.php)
test_endpoint "GET" "availability.php" "" \
    "200" \
    "6. Availability - Get available slots"

# Test 7: Availability - Get slots by date (GET /availability.php?date=YYYY-MM-DD)
TODAY=$(date +%Y-%m-%d)
test_endpoint "GET" "availability.php?date=$TODAY" "" \
    "200" \
    "7. Availability - Get slots by specific date"

# Test 8: Stats - Get funnel analytics (GET /stats.php)
test_endpoint "GET" "stats.php" "" \
    "200" \
    "8. Analytics - Get funnel statistics"

# Test 9: Booking - Get appointments (GET /booking.php)
test_endpoint "GET" "booking.php" "" \
    "200" \
    "9. Booking - List appointments"

# Test 10: Booking - Create appointment (POST /booking.php)
test_endpoint "POST" "booking.php" \
    '{"lead_id":1,"appointment_date":"'$(date -d '+1 day' +%Y-%m-%d)'","appointment_time":"10:00:00","notes":"Test appointment"}' \
    "200" \
    "10. Booking - Create new appointment"

# Test 11: Send Email (POST /send-email.php)
test_endpoint "POST" "send-email.php" \
    '{"to":"test@example.com","subject":"Test Email","html":"<h1>Test</h1>","text":"Test email","lead_id":1}' \
    "200" \
    "11. Email - Send test email (requires Resend API key)"

# Test 12: Dashboard (GET /dashboard.php)
test_endpoint "GET" "dashboard.php" "" \
    "200" \
    "12. Dashboard - Get dashboard data"

echo "=========================================="
echo "Test Results:"
echo -e "  ${GREEN}Passed: $PASS${NC}"
echo -e "  ${RED}Failed: $FAIL${NC}"
echo "=========================================="

if [ $FAIL -eq 0 ]; then
    echo -e "${GREEN}All tests passed! ✓${NC}"
    exit 0
else
    echo -e "${RED}Some tests failed. Check output above.${NC}"
    exit 1
fi
