#!/bin/bash

# Tatx Platform - Complete Testing Guide
# This script helps you set up and test the entire Tatx platform

set -e

echo "🚀 Tatx Platform - Setup & Testing Guide"
echo "=========================================="
echo ""

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
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

# Check prerequisites
check_prerequisites() {
    print_step "Checking prerequisites..."
    
    # Check Node.js
    if ! command -v node &> /dev/null; then
        print_error "Node.js is not installed. Please install Node.js 20+"
        echo "   Download from: https://nodejs.org/"
        exit 1
    fi
    print_success "Node.js installed: $(node --version)"
    
    # Check pnpm
    if ! command -v pnpm &> /dev/null; then
        print_warning "pnpm is not installed. Installing..."
        npm install -g pnpm
    fi
    print_success "pnpm installed: $(pnpm --version)"
    
    # Check Docker (optional)
    if command -v docker &> /dev/null; then
        print_success "Docker installed: $(docker --version)"
    else
        print_warning "Docker not installed. Some features won't work."
    fi
    
    echo ""
}

# Install dependencies
install_dependencies() {
    print_step "Installing dependencies..."
    pnpm install
    print_success "Dependencies installed"
    echo ""
}

# Start infrastructure (Docker)
start_infrastructure() {
    print_step "Starting infrastructure (PostgreSQL, Redis, RabbitMQ)..."
    
    if command -v docker &> /dev/null; then
        docker compose -f docker-compose.dev.yml up -d
        print_success "Infrastructure started"
        echo "   - PostgreSQL: localhost:5432"
        echo "   - Redis: localhost:6379"
        echo "   - RabbitMQ: localhost:5672 (Management: http://localhost:15672)"
        echo "   - pgAdmin: http://localhost:5050 (admin@tatx.local / admin123)"
        
        # Wait for services to be ready
        echo ""
        print_step "Waiting for services to be ready..."
        sleep 10
    else
        print_warning "Docker not available. Please start PostgreSQL and Redis manually."
        echo "   PostgreSQL: localhost:5432 (database: tatx_dev, user: postgres, password: postgres)"
        echo "   Redis: localhost:6379"
    fi
    
    echo ""
}

# Setup database
setup_database() {
    print_step "Setting up database..."
    
    # Generate Prisma Client
    cd packages/database
    pnpm db:generate
    print_success "Prisma Client generated"
    
    # Run migrations
    pnpm db:migrate
    print_success "Database migrations applied"
    
    # Seed database
    pnpm db:seed
    print_success "Database seeded with sample data"
    
    cd ../..
    echo ""
}

# Start backend services
start_services() {
    print_step "Starting backend services..."
    echo "   This will start 10 microservices:"
    echo "   - Auth Service (3001)"
    echo "   - User Service (3002)"
    echo "   - Driver Service (3003)"
    echo "   - Ride Service (3004)"
    echo "   - Food Service (3005)"
    echo "   - Order Service (3006)"
    echo "   - Payment Service (3007)"
    echo "   - Notification Service (3008)"
    echo "   - Location Service (3009)"
    echo "   - Admin Service (3010)"
    echo ""
    
    # Start services in background
    pnpm dev:services &
    SERVICES_PID=$!
    
    # Wait for services to start
    print_step "Waiting for services to initialize..."
    sleep 15
    
    print_success "Backend services started (PID: $SERVICES_PID)"
    echo ""
}

# Start frontend apps
start_apps() {
    print_step "Starting frontend applications..."
    echo "   This will start:"
    echo "   - Customer App (3100)"
    echo "   - Driver App (3101)"
    echo "   - Merchant App (3102)"
    echo "   - Admin Dashboard (3103)"
    echo ""
    
    # Start apps in background
    pnpm dev:apps &
    APPS_PID=$!
    
    # Wait for apps to start
    print_step "Waiting for apps to initialize..."
    sleep 10
    
    print_success "Frontend apps started (PID: $APPS_PID)"
    echo ""
}

# Run tests
run_tests() {
    print_step "Running tests..."
    
    # Unit tests
    pnpm test:unit
    
    # E2E tests (optional)
    # pnpm test:e2e
    
    print_success "Tests completed"
    echo ""
}

# Print access information
print_access_info() {
    echo ""
    echo "=========================================="
    echo "🎉 Tatx Platform is now running!"
    echo "=========================================="
    echo ""
    echo "📱 Frontend Applications:"
    echo "   Customer App:     http://localhost:3100"
    echo "   Driver App:       http://localhost:3101"
    echo "   Merchant App:     http://localhost:3102"
    echo "   Admin Dashboard:  http://localhost:3103"
    echo ""
    echo "🔧 Backend Services:"
    echo "   Auth Service:     http://localhost:3001"
    echo "   Ride Service:     http://localhost:3004"
    echo "   Food Service:     http://localhost:3005"
    echo "   Payment Service:  http://localhost:3007"
    echo ""
    echo "📚 API Documentation:"
    echo "   Auth Swagger:     http://localhost:3001/docs"
    echo "   Ride Swagger:     http://localhost:3004/docs"
    echo "   Food Swagger:     http://localhost:3005/docs"
    echo "   Payment Swagger:  http://localhost:3007/docs"
    echo ""
    echo "🗄️  Database Tools:"
    echo "   pgAdmin:          http://localhost:5050"
    echo "   Prisma Studio:    pnpm db:studio"
    echo ""
    echo "🔑 Test Credentials:"
    echo "   Admin:     admin@tatx.sa     / password123"
    echo "   Customer:  customer@tatx.sa  / password123"
    echo "   Driver:    driver@tatx.sa    / password123"
    echo "   Merchant:  merchant@tatx.sa  / password123"
    echo ""
    echo "=========================================="
    echo ""
}

# Test API endpoints
test_api() {
    print_step "Testing API endpoints..."
    
    # Test Auth Service
    echo "Testing Auth Service..."
    curl -X POST http://localhost:3001/api/auth/login \
      -H "Content-Type: application/json" \
      -d '{"email":"admin@tatx.sa","password":"password123"}' \
      | jq '.'
    
    echo ""
    print_success "API test completed"
    echo ""
}

# Open browser
open_browser() {
    print_step "Opening applications in browser..."
    
    # Open customer app
    if command -v open &> /dev/null; then
        open http://localhost:3100
        sleep 2
        open http://localhost:3103
    else
        echo "   Please open in your browser:"
        echo "   - Customer App: http://localhost:3100"
        echo "   - Admin Dashboard: http://localhost:3103"
    fi
    
    echo ""
}

# Cleanup function
cleanup() {
    print_warning "Stopping all services..."
    
    # Kill background processes
    if [ ! -z "$SERVICES_PID" ]; then
        kill $SERVICES_PID 2>/dev/null || true
    fi
    
    if [ ! -z "$APPS_PID" ]; then
        kill $APPS_PID 2>/dev/null || true
    fi
    
    # Stop Docker containers
    if command -v docker &> /dev/null; then
        docker compose -f docker-compose.dev.yml down
    fi
    
    print_success "All services stopped"
}

# Main execution
main() {
    echo ""
    echo "Welcome to Tatx Platform Testing!"
    echo ""
    
    # Parse command line arguments
    case "${1:-all}" in
        setup)
            check_prerequisites
            install_dependencies
            start_infrastructure
            setup_database
            ;;
        dev)
            start_services
            start_apps
            print_access_info
            ;;
        test)
            run_tests
            test_api
            ;;
        all)
            check_prerequisites
            install_dependencies
            start_infrastructure
            setup_database
            start_services
            start_apps
            print_access_info
            open_browser
            ;;
        stop)
            cleanup
            ;;
        *)
            echo "Usage: $0 {setup|dev|test|all|stop}"
            echo ""
            echo "Commands:"
            echo "  setup  - Install dependencies and setup database"
            echo "  dev    - Start all services and applications"
            echo "  test   - Run tests"
            echo "  all    - Complete setup and start everything (recommended)"
            echo "  stop   - Stop all services"
            echo ""
            exit 1
            ;;
    esac
}

# Trap Ctrl+C and call cleanup
trap cleanup EXIT

# Run main function
main "$@"
