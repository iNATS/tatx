# Tatx Super-App Platform

A comprehensive monorepo-based super-app platform combining ride-hailing (Uber-like), food delivery (HungerStation-like), grocery delivery, and courier services. **Optimized for the Saudi Arabian market** with full Arabic support.

## 🎯 Key Features

- 🚗 **Ride Hailing** - Economy, Comfort, Premium, Luxury, Van, Motorcycle
- 🍔 **Food Delivery** - Restaurants, menus, modifiers, real-time tracking
- 🛒 **Grocery Delivery** - Dark stores, warehouses, inventory management
- 📦 **Courier Service** - Package delivery with size/weight tracking
- 💳 **Digital Wallet** - Multi-currency, auto top-up, installment plans
- 💎 **Subscription** - Tatx Pro membership with tiered benefits
- 🔔 **Real-time** - WebSocket updates, live driver tracking
- 🇸🇦 **Localization** - Full Arabic support, Saudi payment methods (MADA, STC Pay, Tabby, Tamara)

## 📦 Project Structure

```
tatx/
├── apps/
│   ├── customer-app/          # Next.js 15 customer web application
│   ├── driver-app/            # Next.js 15 driver web application
│   ├── merchant-app/          # Next.js 15 merchant web application
│   ├── admin-dashboard/       # Next.js 15 admin dashboard
│   └── mobile/                # React Native (Expo) mobile application
├── services/
│   ├── auth-service/          # Authentication & Authorization (NestJS)
│   ├── user-service/          # User management (NestJS)
│   ├── driver-service/        # Driver management (NestJS)
│   ├── ride-service/          # Ride management (NestJS)
│   ├── food-service/          # Restaurant & food management (NestJS)
│   ├── order-service/         # Order management (NestJS)
│   ├── payment-service/       # Payment processing (NestJS)
│   ├── notification-service/  # Notifications (NestJS)
│   ├── location-service/      # Location & geocoding (NestJS)
│   └── admin-service/         # Admin dashboard API (NestJS)
├── packages/
│   ├── database/              # Prisma schema & database client
│   ├── types/                 # Shared TypeScript types
│   ├── ui/                    # Shared UI components (Shadcn UI)
│   ├── config/                # Shared ESLint, TypeScript, Tailwind configs
│   └── utils/                 # Shared utility functions
├── docker-compose.yml         # Production Docker configuration
├── docker-compose.dev.yml     # Development Docker configuration
└── turbo.json                 # Turborepo configuration
```

## 🚀 Quick Start

### Prerequisites

- Node.js >= 20.0.0
- pnpm >= 9.0.0
- Docker & Docker Compose
- PostgreSQL 16+
- Redis 7+

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd tatx

# Install dependencies
pnpm install

# Copy environment variables
cp .env.example .env

# Start development infrastructure
pnpm docker:dev

# Generate Prisma client
pnpm db:generate

# Run database migrations
pnpm db:migrate

# Seed the database
pnpm db:seed

# Start all services and apps
pnpm dev:all
```

### Development URLs

| Service/App | Port | URL |
|------------|------|-----|
| Customer App | 3100 | http://localhost:3100 |
| Driver App | 3101 | http://localhost:3101 |
| Merchant App | 3102 | http://localhost:3102 |
| Admin Dashboard | 3103 | http://localhost:3103 |
| Auth Service | 3001 | http://localhost:3001 |
| User Service | 3002 | http://localhost:3002 |
| Driver Service | 3003 | http://localhost:3003 |
| Ride Service | 3004 | http://localhost:3004 |
| Food Service | 3005 | http://localhost:3005 |
| Order Service | 3006 | http://localhost:3006 |
| Payment Service | 3007 | http://localhost:3007 |
| Notification Service | 3008 | http://localhost:3008 |
| Location Service | 3009 | http://localhost:3009 |
| Admin Service | 3010 | http://localhost:3010 |

## 🛠 Available Commands

```bash
# Development
pnpm dev              # Start all apps and services
pnpm dev:all          # Start everything in parallel
pnpm dev:services     # Start only backend services
pnpm dev:apps         # Start only frontend apps

# Building
pnpm build            # Build all apps and services

# Testing
pnpm test             # Run all tests
pnpm test:unit        # Run unit tests
pnpm test:e2e         # Run e2e tests

# Database
pnpm db:generate      # Generate Prisma client
pnpm db:migrate       # Run database migrations
pnpm db:push          # Push schema to database
pnpm db:seed          # Seed database
pnpm db:studio        # Open Prisma Studio

# Docker
pnpm docker:up        # Start production containers
pnpm docker:down      # Stop production containers
pnpm docker:dev       # Start development containers

# Code Quality
pnpm lint             # Lint all code
pnpm lint:fix         # Fix linting issues
pnpm format           # Format code with Prettier
pnpm typecheck        # Type check all code
```

## 📱 Features

### Customer Features
- 🚗 Ride booking with real-time tracking
- 🍔 Food ordering from local restaurants
- 📦 Package delivery
- 💳 Multiple payment methods
- 🔔 Push notifications
- ⭐ Rating and reviews

### Driver Features
- 📍 Real-time location tracking
- 💰 Earnings dashboard
- 📋 Ride/request management
- 📄 Document upload and verification
- ⚡ Online/Offline status

### Merchant Features
- 🏪 Restaurant management
- 📝 Menu management
- 📊 Order dashboard
- 📈 Analytics and reports

### Admin Features
- 👥 User management
- 🚗 Driver verification
- 🏪 Merchant management
- 📊 Analytics dashboard
- 📝 Reports generation

## 🔧 Technology Stack

### Frontend
- **Web Apps**: Next.js 15 (App Router)
- **Mobile**: React Native with Expo
- **UI Components**: Shadcn UI + Radix UI
- **Styling**: TailwindCSS
- **State Management**: Zustand
- **Data Fetching**: React Query

### Backend
- **Framework**: NestJS
- **Database**: PostgreSQL with Prisma ORM
- **Cache**: Redis
- **Message Queue**: RabbitMQ
- **API Documentation**: Swagger/OpenAPI

### DevOps
- **Monorepo**: Turborepo
- **Package Manager**: pnpm
- **Containerization**: Docker
- **CI/CD**: GitHub Actions (configurable)

## 📄 Environment Variables

See `.env.example` for all required environment variables. Key variables include:

- `DATABASE_URL` - PostgreSQL connection string
- `REDIS_URL` - Redis connection string

## 🗄️ Database

The database schema is comprehensively documented in the [`packages/database`](packages/database) directory:

- **[Schema Documentation](packages/database/SCHEMA_DOCS.md)** - Complete model reference
- **[Migration Guide](packages/database/MIGRATION_GUIDE.md)** - Database migration procedures
- **[Customization Summary](packages/database/CUSTOMIZATION_SUMMARY.md)** - What's new in our schema
- **[Quick Reference](packages/database/QUICK_REFERENCE.md)** - Developer cheat sheet

### Database Quick Start

```bash
# Generate Prisma Client
pnpm db:generate

# Run migrations
pnpm db:migrate

# Seed database with sample data
pnpm db:seed

# Open Prisma Studio (GUI)
pnpm db:studio
```

### Test Credentials

After seeding, use these credentials for testing:

| Role | Email | Password |
|------|-------|----------|
| Admin | admin@tatx.sa | password123 |
| Support | support@tatx.sa | password123 |
| Driver | driver@tatx.sa | password123 |
| Merchant | merchant@tatx.sa | password123 |
| Customer | customer@tatx.sa | password123 |

⚠️ **Change these passwords in production!**
- `JWT_SECRET` - JWT signing secret
- `STRIPE_SECRET_KEY` - Stripe payment key
- `GOOGLE_MAPS_API_KEY` - Google Maps API key

## 🏗 Architecture

The platform follows a microservices architecture with:

1. **API Gateway** (optional, via Nginx)
2. **Service Mesh** - Independent NestJS services
3. **Shared Database** - PostgreSQL with schema separation
4. **Event Bus** - RabbitMQ for async communication
5. **Cache Layer** - Redis for sessions and caching

## 📝 API Documentation

Each service exposes Swagger documentation at `/docs` endpoint:

- Auth Service: http://localhost:3001/docs
- User Service: http://localhost:3002/docs
- Ride Service: http://localhost:3004/docs
- Food Service: http://localhost:3005/docs
- etc.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📋 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 📞 Support

For support, email support@tatx.com or join our Slack channel.

---

Built with ❤️ using Turborepo, Next.js, NestJS, and React Native
