# 🚀 Deploy Tatx to VPS using Dokploy

## Prerequisites

- VPS with Docker installed
- Dokploy installed and configured
- Domain name (optional but recommended)
- SSL certificate (Dokploy handles this automatically)

---

## 📋 Step-by-Step Deployment Guide

### Step 1: Prepare Your VPS

#### 1.1 Install Docker (if not installed)
```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install Docker
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh

# Add user to docker group
sudo usermod -aG docker $USER
newgrp docker

# Verify installation
docker --version
docker compose version
```

#### 1.2 Install Dokploy
```bash
# Install Dokploy (follow official instructions)
# https://dokploy.com/docs/installation

# Or use the one-liner:
curl -sSL https://dokploy.com/install.sh | bash
```

#### 1.3 Access Dokploy Dashboard
```
http://YOUR_VPS_IP:3000
```

---

### Step 2: Prepare Database Services

#### 2.1 Create PostgreSQL Service in Dokploy

1. Go to **Services** → **Create Service**
2. Choose **PostgreSQL**
3. Configuration:
   ```
   Name: tatx-postgres
   Database: tatx_db
   User: tatx_user
   Password: [Generate secure password]
   Port: 5432
   ```
4. Click **Create**

#### 2.2 Create Redis Service in Dokploy

1. Go to **Services** → **Create Service**
2. Choose **Redis**
3. Configuration:
   ```
   Name: tatx-redis
   Password: [Generate secure password]
   Port: 6379
   ```
4. Click **Create**

#### 2.3 (Optional) Create RabbitMQ Service

1. Go to **Services** → **Create Service**
2. Choose **RabbitMQ**
3. Configuration:
   ```
   Name: tatx-rabbitmq
   User: tatx
   Password: [Generate secure password]
   Port: 5672
   Management Port: 15672
   ```
4. Click **Create**

---

### Step 3: Create Tatx Application

#### 3.1 Create New Application

1. Go to **Applications** → **Create Application**
2. Choose **Git Repository**
3. Configuration:
   ```
   Name: tatx-platform
   Repository: https://github.com/iNATS/tatx.git
   Branch: main
   Build Path: /
   ```

#### 3.2 Configure Build Settings

1. **Build Type**: Docker Compose
2. **Docker Compose File**: Use the provided `docker-compose.prod.yml` (see below)
3. **Build Context**: `/`

---

### Step 4: Create Production Docker Compose File

Create `docker-compose.prod.yml` in your repository:

```yaml
version: '3.8'

services:
  # ===========================================
  # Auth Service
  # ===========================================
  auth-service:
    build:
      context: .
      dockerfile: services/auth-service/Dockerfile
    environment:
      - NODE_ENV=production
      - PORT=3001
      - DATABASE_URL=postgresql://tatx_user:${DB_PASSWORD}@tatx-postgres:5432/tatx_db
      - REDIS_URL=redis://:${REDIS_PASSWORD}@tatx-redis:6379
      - JWT_SECRET=${JWT_SECRET}
      - JWT_EXPIRES_IN=7d
      - GOOGLE_CLIENT_ID=${GOOGLE_CLIENT_ID}
      - APPLE_CLIENT_ID=${APPLE_CLIENT_ID}
    depends_on:
      - tatx-postgres
      - tatx-redis
    networks:
      - tatx-network
    restart: always

  # ===========================================
  # Ride Service
  # ===========================================
  ride-service:
    build:
      context: .
      dockerfile: services/ride-service/Dockerfile
    environment:
      - NODE_ENV=production
      - PORT=3004
      - DATABASE_URL=postgresql://tatx_user:${DB_PASSWORD}@tatx-postgres:5432/tatx_db
      - REDIS_URL=redis://:${REDIS_PASSWORD}@tatx-redis:6379
    depends_on:
      - tatx-postgres
      - tatx-redis
    networks:
      - tatx-network
    restart: always

  # ===========================================
  # Food Service
  # ===========================================
  food-service:
    build:
      context: .
      dockerfile: services/food-service/Dockerfile
    environment:
      - NODE_ENV=production
      - PORT=3005
      - DATABASE_URL=postgresql://tatx_user:${DB_PASSWORD}@tatx-postgres:5432/tatx_db
      - REDIS_URL=redis://:${REDIS_PASSWORD}@tatx-redis:6379
    depends_on:
      - tatx-postgres
      - tatx-redis
    networks:
      - tatx-network
    restart: always

  # ===========================================
  # Payment Service
  # ===========================================
  payment-service:
    build:
      context: .
      dockerfile: services/payment-service/Dockerfile
    environment:
      - NODE_ENV=production
      - PORT=3007
      - DATABASE_URL=postgresql://tatx_user:${DB_PASSWORD}@tatx-postgres:5432/tatx_db
      - REDIS_URL=redis://:${REDIS_PASSWORD}@tatx-redis:6379
      - STRIPE_SECRET_KEY=${STRIPE_SECRET_KEY}
      - HYPERPAY_API_KEY=${HYPERPAY_API_KEY}
      - TABBY_API_KEY=${TABBY_API_KEY}
      - TAMARA_API_KEY=${TAMARA_API_KEY}
    depends_on:
      - tatx-postgres
      - tatx-redis
    networks:
      - tatx-network
    restart: always

  # ===========================================
  # Customer App (Next.js)
  # ===========================================
  customer-app:
    build:
      context: .
      dockerfile: apps/customer-app/Dockerfile
      args:
        - NEXT_PUBLIC_API_URL=https://api.${DOMAIN}
    environment:
      - NODE_ENV=production
      - PORT=3100
      - NEXT_PUBLIC_API_URL=https://api.${DOMAIN}
    depends_on:
      - auth-service
      - ride-service
      - food-service
    networks:
      - tatx-network
    restart: always

  # ===========================================
  # Admin Dashboard (Next.js)
  # ===========================================
  admin-dashboard:
    build:
      context: .
      dockerfile: apps/admin-dashboard/Dockerfile
    environment:
      - NODE_ENV=production
      - PORT=3103
      - NEXT_PUBLIC_API_URL=https://api.${DOMAIN}
    depends_on:
      - auth-service
      - admin-service
    networks:
      - tatx-network
    restart: always

  # ===========================================
  # Nginx Reverse Proxy
  # ===========================================
  nginx:
    image: nginx:alpine
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ./nginx/nginx.prod.conf:/etc/nginx/nginx.conf:ro
      - ./nginx/ssl:/etc/nginx/ssl:ro
    depends_on:
      - customer-app
      - admin-dashboard
      - auth-service
      - ride-service
      - food-service
      - payment-service
    networks:
      - tatx-network
    restart: always

networks:
  tatx-network:
    driver: bridge
```

---

### Step 5: Create Nginx Configuration

Create `nginx/nginx.prod.conf`:

```nginx
events {
    worker_connections 1024;
}

http {
    include /etc/nginx/mime.types;
    default_type application/octet-stream;

    # Gzip compression
    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_types text/plain text/css text/xml text/javascript application/javascript application/xml+rss application/json;

    # Rate limiting
    limit_req_zone $binary_remote_addr zone=api_limit:10m rate=10r/s;
    limit_req_zone $binary_remote_addr zone=static_limit:10m rate=50r/s;

    # Upstreams
    upstream customer_app {
        server customer-app:3100;
    }

    upstream admin_dashboard {
        server admin-dashboard:3103;
    }

    upstream auth_service {
        server auth-service:3001;
    }

    upstream ride_service {
        server ride-service:3004;
    }

    upstream food_service {
        server food-service:3005;
    }

    upstream payment_service {
        server payment-service:3007;
    }

    # HTTP to HTTPS redirect
    server {
        listen 80;
        server_name ${DOMAIN} www.${DOMAIN};
        return 301 https://$server_name$request_uri;
    }

    # Customer App
    server {
        listen 443 ssl http2;
        server_name ${DOMAIN} www.${DOMAIN};

        ssl_certificate /etc/nginx/ssl/fullchain.pem;
        ssl_certificate_key /etc/nginx/ssl/privkey.pem;
        ssl_protocols TLSv1.2 TLSv1.3;
        ssl_ciphers HIGH:!aNULL:!MD5;

        location / {
            proxy_pass http://customer_app;
            proxy_http_version 1.1;
            proxy_set_header Upgrade $http_upgrade;
            proxy_set_header Connection 'upgrade';
            proxy_set_header Host $host;
            proxy_cache_bypass $http_upgrade;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header X-Forwarded-Proto $scheme;
        }

        location /_next/static {
            proxy_pass http://customer_app;
            proxy_cache_bypass $http_upgrade;
            limit_req zone=static_limit burst=20 nodelay;
        }
    }

    # Admin Dashboard
    server {
        listen 443 ssl http2;
        server_name admin.${DOMAIN};

        ssl_certificate /etc/nginx/ssl/fullchain.pem;
        ssl_certificate_key /etc/nginx/ssl/privkey.pem;
        ssl_protocols TLSv1.2 TLSv1.3;
        ssl_ciphers HIGH:!aNULL:!MD5;

        location / {
            proxy_pass http://admin_dashboard;
            proxy_http_version 1.1;
            proxy_set_header Upgrade $http_upgrade;
            proxy_set_header Connection 'upgrade';
            proxy_set_header Host $host;
            proxy_cache_bypass $http_upgrade;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header X-Forwarded-Proto $scheme;
        }
    }

    # API Gateway
    server {
        listen 443 ssl http2;
        server_name api.${DOMAIN};

        ssl_certificate /etc/nginx/ssl/fullchain.pem;
        ssl_certificate_key /etc/nginx/ssl/privkey.pem;
        ssl_protocols TLSv1.2 TLSv1.3;
        ssl_ciphers HIGH:!aNULL:!MD5;

        # Auth Service
        location /api/auth {
            limit_req zone=api_limit burst=5 nodelay;
            proxy_pass http://auth_service;
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header X-Forwarded-Proto $scheme;
        }

        # Ride Service
        location /api/rides {
            limit_req zone=api_limit burst=10 nodelay;
            proxy_pass http://ride_service;
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header X-Forwarded-Proto $scheme;
        }

        # Food Service
        location /api/restaurants {
            limit_req zone=api_limit burst=10 nodelay;
            proxy_pass http://food_service;
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header X-Forwarded-Proto $scheme;
        }

        location /api/orders {
            limit_req zone=api_limit burst=10 nodelay;
            proxy_pass http://food_service;
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header X-Forwarded-Proto $scheme;
        }

        # Payment Service
        location /api/payments {
            limit_req zone=api_limit burst=5 nodelay;
            proxy_pass http://payment_service;
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header X-Forwarded-Proto $scheme;
        }

        # Swagger docs
        location ~ ^/api/(auth|rides|food|payment)/docs {
            proxy_pass http://$1_service;
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
        }
    }
}
```

---

### Step 6: Configure Environment Variables

In Dokploy, add these environment variables:

```bash
# Database
DB_PASSWORD=your_secure_db_password
REDIS_PASSWORD=your_secure_redis_password

# JWT
JWT_SECRET=your_super_secret_jwt_key_min_32_chars

# Domain
DOMAIN=yourdomain.com

# OAuth (Optional)
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
APPLE_CLIENT_ID=your_apple_client_id

# Payment Gateways (Optional)
STRIPE_SECRET_KEY=sk_live_xxx
HYPERPAY_API_KEY=your_hyperpay_key
TABBY_API_KEY=your_tabby_key
TAMARA_API_KEY=your_tamara_key

# App URLs
NEXT_PUBLIC_API_URL=https://api.yourdomain.com
```

---

### Step 7: Fix Prisma Schema (Required)

Before deploying, you MUST fix the Prisma schema:

1. Open `packages/database/prisma/schema.prisma`
2. Fix the 16 relation errors (see FIXES.md)
3. Run locally to test:
   ```bash
   npx prisma format
   npx prisma generate
   ```
4. Commit and push changes

---

### Step 8: Deploy

1. **Push code to GitHub**
   ```bash
   git add .
   git commit -m "feat: Add production deployment configuration"
   git push origin main
   ```

2. **In Dokploy**:
   - Go to your application
   - Click **Deploy**
   - Wait for build to complete (5-10 minutes)

3. **Run Database Migrations**:
   ```bash
   # Access the container
   dokploy exec tatx-platform-auth-service-1 sh
   
   # Run migrations
   cd packages/database
   npx prisma migrate deploy
   npx prisma db seed
   ```

---

### Step 9: SSL Certificate

Dokploy can automatically provision SSL certificates using Let's Encrypt:

1. Go to **Settings** → **SSL**
2. Enable **Auto SSL**
3. Add your domain: `yourdomain.com`
4. Wait for certificate provisioning (5-10 minutes)

---

### Step 10: Access Your Application

After deployment:

- **Customer App**: https://yourdomain.com
- **Admin Dashboard**: https://admin.yourdomain.com
- **API**: https://api.yourdomain.com
- **Swagger Docs**: https://api.yourdomain.com/docs

---

## 🔧 Alternative: Simple Docker Compose Deployment

If you prefer a simpler setup without Dokploy:

### Create `docker-compose.simple.yml`:

```yaml
version: '3.8'

services:
  postgres:
    image: postgres:16-alpine
    environment:
      POSTGRES_USER: tatx
      POSTGRES_PASSWORD: tatx_password_123
      POSTGRES_DB: tatx_db
    volumes:
      - postgres_data:/var/lib/postgresql/data
    ports:
      - "5432:5432"
    networks:
      - tatx-net

  redis:
    image: redis:7-alpine
    command: redis-server --requirepass tatx_redis_password
    volumes:
      - redis_data:/data
    ports:
      - "6379:6379"
    networks:
      - tatx-net

  customer-app:
    build:
      context: .
      dockerfile: apps/customer-app/Dockerfile
    environment:
      - DATABASE_URL=postgresql://tatx:tatx_password_123@postgres:5432/tatx_db
      - REDIS_URL=redis://:tatx_redis_password@redis:6379
    ports:
      - "3100:3100"
    depends_on:
      - postgres
      - redis
    networks:
      - tatx-net

volumes:
  postgres_data:
  redis_data:

networks:
  tatx-net:
    driver: bridge
```

### Deploy:

```bash
docker compose -f docker-compose.simple.yml up -d
```

---

## 📊 VPS Requirements

### Minimum Requirements:
- **CPU**: 4 cores
- **RAM**: 8GB
- **Storage**: 40GB SSD
- **OS**: Ubuntu 22.04 LTS or Debian 11+

### Recommended:
- **CPU**: 8 cores
- **RAM**: 16GB
- **Storage**: 80GB SSD
- **OS**: Ubuntu 22.04 LTS

---

## 🔒 Security Checklist

- [ ] Change all default passwords
- [ ] Enable firewall (UFW)
- [ ] Configure fail2ban
- [ ] Enable automatic security updates
- [ ] Use strong JWT secret
- [ ] Enable HTTPS/SSL
- [ ] Configure rate limiting
- [ ] Set up database backups
- [ ] Monitor logs

---

## 📈 Monitoring & Maintenance

### Set up monitoring:

```bash
# Install Docker monitoring
docker run -d \
  --name=netdata \
  --cap-add SYS_PTRACE \
  --security-opt apparmor=unconfined \
  -v netdataconfig:/etc/netdata \
  -v netdatalib:/var/lib/netdata \
  -v netdatacache:/var/cache/netdata \
  -v /etc/passwd:/host/etc/passwd:ro \
  -v /etc/group:/host/etc/group:ro \
  -v /proc:/host/proc:ro \
  -v /sys:/host/sys:ro \
  -v /etc/os-release:/host/etc/os-release:ro \
  --restart unless-stopped \
  -p 19999:19999 \
  netdata/netdata
```

Access at: `http://YOUR_VPS_IP:19999`

---

## 🆘 Troubleshooting

### App won't start:
```bash
# Check logs
dokploy logs tatx-platform-customer-app-1

# Restart service
dokploy restart tatx-platform-customer-app-1
```

### Database connection errors:
```bash
# Check database is running
docker ps | grep postgres

# Test connection
docker exec -it tatx-postgres psql -U tatx_user -d tatx_db
```

### High memory usage:
```bash
# Check memory
docker stats

# Restart services
dokploy restart tatx-platform
```

---

## 📞 Support

- **Dokploy Docs**: https://dokploy.com/docs
- **Next.js Deployment**: https://nextjs.org/docs/deployment
- **Docker Compose**: https://docs.docker.com/compose/

---

**Deployment Date**: 2026-03-12  
**Platform Version**: 1.0.0-beta  
**Status**: Ready for Production Deployment 🚀
