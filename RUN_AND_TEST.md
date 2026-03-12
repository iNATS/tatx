# 🚀 How to Run and Test Tatx Platform

## Quick Start (3 Steps)

### Step 1: Install Dependencies
```bash
cd /home/workspace/projects/ia6g/tatx
pnpm install
```

### Step 2: Start Infrastructure
```bash
# Start PostgreSQL, Redis, RabbitMQ
docker compose -f docker-compose.dev.yml up -d

# Wait for services
sleep 10
```

### Step 3: Setup Database & Start Everything
```bash
# Generate Prisma Client, run migrations, seed database
pnpm db:generate && pnpm db:migrate && pnpm db:seed

# Start all services and apps
pnpm dev:all
```

---

## 📱 Access Points

Once running, access the platform at:

### Frontend Applications
| App | URL | Description |
|-----|-----|-------------|
| **Customer App** | http://localhost:3100 | Main customer web app |
| **Driver App** | http://localhost:3101 | Driver dashboard |
| **Merchant App** | http://localhost:3102 | Restaurant management |
| **Admin Dashboard** | http://localhost:3103 | Platform administration |

### Backend Services
| Service | Port | Swagger Docs |
|---------|------|--------------|
| Auth Service | 3001 | http://localhost:3001/docs |
| User Service | 3002 | http://localhost:3002/docs |
| Driver Service | 3003 | http://localhost:3003/docs |
| **Ride Service** | 3004 | http://localhost:3004/docs |
| **Food Service** | 3005 | http://localhost:3005/docs |
| Order Service | 3006 | http://localhost:3006/docs |
| **Payment Service** | 3007 | http://localhost:3007/docs |
| Notification Service | 3008 | http://localhost:3008/docs |
| Location Service | 3009 | http://localhost:3009/docs |
| Admin Service | 3010 | http://localhost:3010/docs |

### Database Tools
| Tool | URL | Credentials |
|------|-----|-------------|
| pgAdmin | http://localhost:5050 | admin@tatx.local / admin123 |
| Prisma Studio | `pnpm db:studio` | - |
| RabbitMQ Management | http://localhost:15672 | tatx / tatx123 |

---

## 🔑 Test Credentials

After running `pnpm db:seed`, use these accounts:

```
Admin:     admin@tatx.sa     / password123
Support:   support@tatx.sa   / password123
Driver:    driver@tatx.sa    / password123
Merchant:  merchant@tatx.sa  / password123
Customer:  customer@tatx.sa  / password123
```

⚠️ **Change these passwords in production!**

---

## 🧪 Testing Guide

### Option 1: Automated Script

```bash
# Make executable
chmod +x TESTING_GUIDE.sh

# Complete setup and run
./TESTING_GUIDE.sh all

# Or step by step
./TESTING_GUIDE.sh setup    # Install dependencies + setup DB
./TESTING_GUIDE.sh dev      # Start services + apps
./TESTING_GUIDE.sh test     # Run tests
```

### Option 2: Manual Testing

Follow the **[MANUAL_TESTING_CHECKLIST.md](MANUAL_TESTING_CHECKLIST.md)** for comprehensive testing.

### Quick Test Flow

1. **Test Authentication**
   ```bash
   # Login via Swagger
   Open: http://localhost:3001/docs
   POST /api/auth/login
   Email: admin@tatx.sa
   Password: password123
   ```

2. **Test Ride Booking**
   ```bash
   # Via Customer App
   Open: http://localhost:3100/ride
   Enter pickup: "King Fahd Road, Riyadh"
   Enter dropoff: "Riyadh Airport"
   Select vehicle: Comfort
   Click: Book Ride
   ```

3. **Test Food Ordering**
   ```bash
   # Via Customer App
   Open: http://localhost:3100/food
   Select restaurant: Al-Baik
   Add items to cart
   Go to cart: /food/cart
   Click: Place Order
   ```

4. **Test Admin Dashboard**
   ```bash
   Open: http://localhost:3103
   Login: admin@tatx.sa / password123
   View: Dashboard analytics
   Navigate: Users, Rides, Orders
   ```

---

## 📝 Common Commands

```bash
# Development
pnpm dev              # Start all (services + apps)
pnpm dev:services     # Start only backend services
pnpm dev:apps         # Start only frontend apps

# Database
pnpm db:generate      # Generate Prisma Client
pnpm db:migrate       # Run migrations
pnpm db:push          # Push schema (dev only)
pnpm db:seed          # Seed sample data
pnpm db:studio        # Open Prisma Studio GUI

# Testing
pnpm test             # Run all tests
pnpm test:unit        # Run unit tests
pnpm test:e2e         # Run e2e tests

# Docker
pnpm docker:up        # Start production containers
pnpm docker:down      # Stop all containers
pnpm docker:dev       # Start development containers

# Code Quality
pnpm lint             # Check code
pnpm lint:fix         # Fix issues
pnpm format           # Format code
pnpm typecheck        # Type check
```

---

## 🐛 Troubleshooting

### Port Already in Use
```bash
# Find process using port
lsof -i :3001

# Kill process
kill -9 <PID>
```

### Database Connection Error
```bash
# Check if PostgreSQL is running
docker ps | grep postgres

# Restart database
docker compose -f docker-compose.dev.yml restart postgres

# Check connection
pnpm db:studio
```

### Prisma Client Out of Sync
```bash
# Regenerate
pnpm db:generate
```

### Services Not Starting
```bash
# Check logs
docker compose -f docker-compose.dev.yml logs

# Restart services
pnpm dev:services
```

### App Build Errors
```bash
# Clear cache
rm -rf node_modules/.cache
rm -rf apps/*/node_modules
rm -rf services/*/node_modules

# Reinstall
pnpm install
```

---

## 📊 System Requirements

### Minimum Requirements
- **RAM**: 8GB (16GB recommended)
- **CPU**: 4 cores (8 cores recommended)
- **Disk**: 10GB free space
- **Node.js**: 20.0.0 or higher
- **pnpm**: 9.0.0 or higher
- **Docker**: 20.10 or higher (optional)

### Recommended Setup
- **OS**: Linux/macOS (Windows with WSL2)
- **RAM**: 16GB
- **CPU**: 8 cores
- **SSD**: For faster builds

---

## 🎯 Testing Checklist

### Quick Smoke Test (5 minutes)

- [ ] Infrastructure running (Docker containers up)
- [ ] Database seeded (no errors)
- [ ] Auth service responding (check Swagger)
- [ ] Customer app loads (http://localhost:3100)
- [ ] Can login with test credentials
- [ ] Admin dashboard shows data

### Full Feature Test (30 minutes)

- [ ] Register new user
- [ ] Login with OAuth (Google/Apple)
- [ ] Create ride request
- [ ] Browse restaurants
- [ ] Create food order
- [ ] View order history
- [ ] Check wallet balance
- [ ] Top-up wallet
- [ ] View admin dashboard
- [ ] Check analytics

### Integration Test (1 hour)

Follow the complete flows in [MANUAL_TESTING_CHECKLIST.md](MANUAL_TESTING_CHECKLIST.md)

---

## 📚 Additional Resources

- **[FINAL_SUMMARY.md](FINAL_SUMMARY.md)** - Complete implementation overview
- **[TESTING_GUIDE.sh](TESTING_GUIDE.sh)** - Automated setup script
- **[MANUAL_TESTING_CHECKLIST.md](MANUAL_TESTING_CHECKLIST.md)** - Detailed test cases
- **Service README files** - API documentation
- **Swagger UI** - Interactive API testing

---

## 🆘 Need Help?

1. Check the error message
2. Review service logs
3. Check Swagger documentation
4. Consult MANUAL_TESTING_CHECKLIST.md
5. Contact development team

---

**Happy Testing! 🎉**

For questions or issues, refer to the documentation or contact the development team.
