#!/bin/bash

# Tatx Platform - Quick Deploy Script for VPS
# This script helps you deploy Tatx to your VPS

set -e

echo "🚀 Tatx Platform - VPS Deployment"
echo "=================================="
echo ""

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

print_step() {
    echo -e "${BLUE}▶ $1${NC}"
}

print_success() {
    echo -e "${GREEN}✓ $1${NC}"
}

print_warning() {
    echo -e "${YELLOW}⚠ $1${NC}"
}

print_error() {
    echo -e "${RED}✗ $1${NC}"
}

# Check if running as root
if [ "$EUID" -ne 0 ]; then 
    print_error "Please run as root or use sudo"
    exit 1
fi

# Check if Docker is installed
if ! command -v docker &> /dev/null; then
    print_warning "Docker is not installed. Installing..."
    curl -fsSL https://get.docker.com -o get-docker.sh
    sh get-docker.sh
    print_success "Docker installed"
else
    print_success "Docker is installed: $(docker --version)"
fi

# Check if Docker Compose is installed
if ! command -v docker compose &> /dev/null; then
    print_warning "Docker Compose is not installed. Installing..."
    apt-get update
    apt-get install -y docker-compose-plugin
    print_success "Docker Compose installed"
else
    print_success "Docker Compose is installed: $(docker compose version)"
fi

# Create .env.production file
print_step "Creating environment file..."
if [ ! -f .env.production ]; then
    cp .env.production.example .env.production
    print_warning "Please edit .env.production with your configuration"
    print_warning "At minimum, set: DB_PASSWORD, REDIS_PASSWORD, JWT_SECRET"
else
    print_success "Environment file exists"
fi

# Fix Prisma schema (if needed)
print_step "Checking Prisma schema..."
if [ -f packages/database/prisma/schema.prisma ]; then
    cd packages/database
    if ! npx prisma format > /dev/null 2>&1; then
        print_error "Prisma schema has errors. Please fix them before deploying."
        print_warning "See FIXES.md for details"
        cd ../..
        exit 1
    fi
    npx prisma generate
    cd ../..
    print_success "Prisma schema is valid"
fi

# Choose deployment method
echo ""
echo "Choose deployment method:"
echo "1) Simple Docker Compose (Quick testing)"
echo "2) Production Docker Compose (Full platform)"
echo "3) Dokploy (Recommended for production)"
read -p "Enter choice [1-3]: " deploy_choice

case $deploy_choice in
    1)
        print_step "Starting simple deployment..."
        docker compose -f docker-compose.simple.yml up -d
        
        print_success "Deployment complete!"
        echo ""
        echo "Access your application:"
        echo "  Customer App: http://localhost:3100"
        echo "  Admin Dashboard: http://localhost:3103"
        echo ""
        print_warning "Note: This is for testing only. Use option 2 or 3 for production."
        ;;
        
    2)
        print_step "Starting production deployment..."
        
        # Copy nginx config
        if [ ! -f nginx/nginx.prod.conf ]; then
            print_error "nginx/nginx.prod.conf not found"
            exit 1
        fi
        
        # Create SSL directory
        mkdir -p nginx/ssl
        
        # Start services
        docker compose -f docker-compose.prod.yml up -d
        
        print_success "Deployment complete!"
        echo ""
        echo "Services started:"
        docker compose -f docker-compose.prod.yml ps
        echo ""
        print_warning "Don't forget to:"
        echo "  1. Set up SSL certificates in nginx/ssl/"
        echo "  2. Update domain names in nginx config"
        echo "  3. Run database migrations"
        echo ""
        ;;
        
    3)
        print_step "Dokploy deployment..."
        echo ""
        echo "To deploy with Dokploy:"
        echo "1. Install Dokploy on your VPS:"
        echo "   curl -sSL https://dokploy.com/install.sh | bash"
        echo ""
        echo "2. Access Dokploy dashboard:"
        echo "   http://YOUR_VPS_IP:3000"
        echo ""
        echo "3. Create services in this order:"
        echo "   - PostgreSQL (tatx-postgres)"
        echo "   - Redis (tatx-redis)"
        echo ""
        echo "4. Create application from Git repository:"
        echo "   - Repository: https://github.com/iNATS/tatx.git"
        echo "   - Branch: main"
        echo "   - Build Path: /"
        echo ""
        echo "5. Add environment variables (see .env.production.example)"
        echo ""
        echo "6. Deploy!"
        echo ""
        print_warning "For detailed Dokploy instructions, see DEPLOYMENT_DOKPLOY.md"
        ;;
        
    *)
        print_error "Invalid choice"
        exit 1
        ;;
esac

# Show logs command
echo ""
echo "To view logs:"
echo "  docker compose logs -f"
echo ""
echo "To stop services:"
echo "  docker compose down"
echo ""
echo "To restart services:"
echo "  docker compose restart"
echo ""

print_success "Deployment script completed!"
