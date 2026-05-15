#!/bin/bash

# PULSO-H Deployment Script
# Deploys to Hostinger shared hosting via rsync
# Following the same pattern as DIGITAL-H

set -e

# Configuration (from acrux.life deploy pattern)
HOST="acrux"
REMOTE_PATH="domains/acrux.life/public_html/pulso-h"
BETA_PATH="domains/acrux.life/public_html/pulso-h-beta"
LOCAL_BUILD="./dist"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${YELLOW}=== PULSO-H Deployment ===${NC}"
echo ""

# Check if target is specified
TARGET=${1:-beta}

if [ "$TARGET" = "beta" ]; then
  DEPLOY_PATH="$BETA_PATH"
  echo -e "${YELLOW}Deploying to BETA environment...${NC}"
elif [ "$TARGET" = "production" ]; then
  DEPLOY_PATH="$REMOTE_PATH"
  echo -e "${GREEN}Deploying to PRODUCTION environment...${NC}"
else
  echo -e "${RED}Unknown target: $TARGET${NC}"
  echo "Usage: ./deploy.sh [beta|production]"
  exit 1
fi

echo ""

# Step 1: Run tests
echo -e "${YELLOW}Step 1: Running tests...${NC}"
npm run test:run
if [ $? -ne 0 ]; then
  echo -e "${RED}Tests failed! Aborting deployment.${NC}"
  exit 1
fi
echo -e "${GREEN}✓ Tests passed${NC}"
echo ""

# Step 2: Build
echo -e "${YELLOW}Step 2: Building project...${NC}"
npm run build
if [ $? -ne 0 ]; then
  echo -e "${RED}Build failed! Aborting deployment.${NC}"
  exit 1
fi
echo -e "${GREEN}✓ Build successful${NC}"
echo ""

# Step 3: Copy .htaccess to dist
echo -e "${YELLOW}Step 3: Copying .htaccess...${NC}"
cp public/.htaccess dist/
echo -e "${GREEN}✓ .htaccess copied${NC}"
echo ""

# Step 4: Deploy via rsync
echo -e "${YELLOW}Step 4: Deploying to server...${NC}"
echo "Host: $HOST"
echo "Target: $DEPLOY_PATH"
echo ""

rsync -avz --delete \
  --exclude='*.map' \
  --exclude='.DS_Store' \
  "$LOCAL_BUILD/" \
  "$HOST:$DEPLOY_PATH/"

if [ $? -ne 0 ]; then
  echo -e "${RED}Deployment failed!${NC}"
  exit 1
fi

echo -e "${GREEN}✓ Deployment successful${NC}"
echo ""

# Step 5: Verify deployment
echo -e "${YELLOW}Step 5: Verifying deployment...${NC}"
if [ "$TARGET" = "beta" ]; then
  echo -e "${GREEN}Beta URL: https://acrux.life/pulso-h-beta/${NC}"
else
  echo -e "${GREEN}Production URL: https://acrux.life/pulso-h/${NC}"
fi
echo ""

echo -e "${GREEN}=== Deployment Complete ===${NC}"
echo ""
echo "Remember to:"
echo "  1. Test the deployed application"
echo "  2. Check browser console for errors"
echo "  3. Verify all routes work correctly"
echo "  4. Test on mobile devices"
echo ""

if [ "$TARGET" = "production" ]; then
  echo -e "${YELLOW}⚠️  Production deployment complete!${NC}"
  echo -e "${YELLOW}   Monitor analytics and error tracking.${NC}"
fi
