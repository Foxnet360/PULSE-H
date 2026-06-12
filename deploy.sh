#!/bin/bash
# PULSO-H Deployment Script
# Usage: ./deploy.sh [environment]
# Environments: beta, production

set -e

ENV=${1:-beta}
TIMESTAMP=$(date +%Y%m%d_%H%M%S)

echo "=========================================="
echo "PULSO-H Deployment"
echo "Environment: $ENV"
echo "Timestamp: $TIMESTAMP"
echo "=========================================="

# Configuration - ACRUX Ecosystem
REMOTE_HOST="acrux"
REMOTE_DIR="domains/acrux.life/public_html/pulso-h"
DB_NAME="u554044004_pulso_h"

echo "Remote: $REMOTE_HOST:$REMOTE_DIR"
echo "Database: $DB_NAME"

# Pre-deployment checks
echo ""
echo "Step 1: Pre-deployment checks"
echo "------------------------------"

# Check if build succeeds
echo "Building frontend..."
npm run build

# Check for console errors in build
echo "Checking build output..."
if [ ! -d "dist" ]; then
    echo "Error: dist directory not found. Build failed?"
    exit 1
fi

# Backup current deployment
echo ""
echo "Step 2: Backup current deployment"
echo "----------------------------------"
ssh $REMOTE_HOST "cd $REMOTE_DIR && tar -czf backup_${TIMESTAMP}.tar.gz ."
echo "Backup created: backup_${TIMESTAMP}.tar.gz"

# Deploy frontend
echo ""
echo "Step 3: Deploy frontend"
echo "------------------------"
rsync -avz --delete dist/ $REMOTE_HOST:$REMOTE_DIR/
echo "Frontend deployed successfully"

# Deploy backend
echo ""
echo "Step 4: Deploy backend"
echo "----------------------"
rsync -avz api/ $REMOTE_HOST:$REMOTE_DIR/api/
echo "Backend deployed successfully"

# Database migrations (if needed)
echo ""
echo "Step 5: Database checks"
echo "-----------------------"
echo "Make sure to run schema.sql if this is the first deployment:"
echo "  mysql -u pulso_user -p $DB_NAME < api/schema.sql"

# Post-deployment verification
echo ""
echo "Step 6: Post-deployment verification"
echo "-------------------------------------"
echo "Checking endpoints..."

BASE_URL="https://acrux.life/pulso-h"

curl -s -o /dev/null -w "%{http_code}" $BASE_URL/api/lead.php
echo " - Lead API"

curl -s -o /dev/null -w "%{http_code}" $BASE_URL/api/availability.php
echo " - Availability API"

curl -s -o /dev/null -w "%{http_code}" $BASE_URL/api/booking.php
echo " - Booking API"

curl -s -o /dev/null -w "%{http_code}" $BASE_URL/api/stats.php
echo " - Stats API"

echo ""
echo "=========================================="
echo "Deployment to $ENV complete!"
echo "=========================================="
echo ""
echo "Next steps:"
echo "1. Verify frontend loads correctly: $BASE_URL/"
echo "2. Test complete user flow"
echo "3. Check GA4 real-time dashboard"
echo "4. Monitor Sentry for errors"
echo ""
