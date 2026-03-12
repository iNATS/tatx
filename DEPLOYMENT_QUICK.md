# 🚀 Deploy Tatx to VPS using Dokploy - Quick Guide

## ⚡ Quick Start (5 Minutes)

### 1. Prepare Your VPS

```bash
# SSH to your VPS
ssh root@YOUR_VPS_IP

# Update system
apt update && apt upgrade -y

# Install Docker
curl -fsSL https://get.docker.com -o get-docker.sh
sh get-docker.sh

# Install Dokploy
curl -sSL https://dokploy.com/install.sh | bash
```

### 2. Access Dokploy

Open in browser: `http://YOUR_VPS_IP:3000`

### 3. Create Database Services

In Dokploy dashboard:

1. **Create PostgreSQL**:
   - Name: `tatx-postgres`
   - Database: `tatx_db`
   - User: `tatx`
   - Password: `[Generate secure password]`

2. **Create Redis**:
   - Name: `tatx-redis`
   - Password: `[Generate secure password]`

### 4. Deploy Tatx Application

1. Click **Applications** → **Create Application**
2. Choose **Git Repository**
3. Configuration:
   ```
   Name: tatx-platform
   Repository: https://github.com/iNATS/tatx.git
   Branch: main
   ```

### 5. Add Environment Variables

In Dokploy, add these variables:

```bash
# Database
DB_PASSWORD=your_db_password
REDIS_PASSWORD=your_redis_password

# JWT
JWT_SECRET=your_32_char_secret_key

# Domain (optional)
DOMAIN=yourdomain.com
NEXT_PUBLIC_API_URL=https://api.yourdomain.com
```

### 6. Deploy!

Click **Deploy** and wait 5-10 minutes.

---

## 📋 Detailed Deployment Steps

### Pre-Deployment Checklist

- [ ] VPS with minimum 8GB RAM (16GB recommended)
- [ ] Docker installed
- [ ] Dokploy installed
- [ ] Domain name pointing to VPS (optional)
- [ ] Fixed Prisma schema (see FIXES.md)

### Step-by-Step with Screenshots

#### 1. Install Dokploy

```bash
# On your VPS
curl -sSL https://dokploy.com/install.sh | bash
```

Wait for installation to complete. You'll see:
```
✅ Dokploy installed successfully!
Dashboard: http://YOUR_IP:3000
```

#### 2. Create PostgreSQL Service

1. Go to **Services** → **Create Service**
2. Select **PostgreSQL**
3. Fill in:
   ```
   Name: tatx-postgres
   Database: tatx_db
   User: tatx
   Password: [Click "Generate" for secure password]
   Port: 5432
   ```
4. Click **Create Service**
5. **Save the password** - you'll need it later

#### 3. Create Redis Service

1. Go to **Services** → **Create Service**
2. Select **Redis**
3. Fill in:
   ```
   Name: tatx-redis
   Password: [Click "Generate"]
   Port: 6379
   ```
4. Click **Create Service**
5. **Save the password**

#### 4. Create Tatx Application

1. Go to **Applications** → **Create Application**
2. Choose **Git Repository**
3. Fill in:
   ```
   Application Name: tatx-platform
   Repository URL: https://github.com/iNATS/tatx.git
   Branch: main
   Build Path: /
   ```
4. Click **Next**

#### 5. Configure Build

1. **Build Type**: Choose **Docker Compose**
2. **Docker Compose File**: `docker-compose.prod.yml`
3. Click **Next**

#### 6. Add Environment Variables

Click **Add Environment Variable** and add:

```
DB_PASSWORD= [from PostgreSQL service]
REDIS_PASSWORD= [from Redis service]
JWT_SECRET= [generate 32+ character random string]
NODE_ENV=production
```

Optional (for production):
```
DOMAIN=yourdomain.com
NEXT_PUBLIC_API_URL=https://api.yourdomain.com
GOOGLE_CLIENT_ID=your_google_id
STRIPE_SECRET_KEY=sk_live_xxx
```

#### 7. Configure Domains (Optional)

1. Go to **Domains** tab
2. Add domain:
   ```
   Domain: yourdomain.com
   Path: /
   Application: customer-app
   ```
3. Add another for admin:
   ```
   Domain: admin.yourdomain.com
   Path: /
   Application: admin-dashboard
   ```
4. Enable **SSL** - Dokploy will auto-provision Let's Encrypt certificate

#### 8. Deploy

1. Go to **Deployments** tab
2. Click **Deploy Now**
3. Wait for build (5-10 minutes)
4. Watch logs in real-time

---

## 🔧 Post-Deployment Steps

### 1. Run Database Migrations

Access the container:
```bash
# In Dokploy dashboard: Applications → tatx-platform → Console
# Or via SSH:
docker exec -it tatx-platform-auth-service-1 sh
```

Run migrations:
```bash
cd packages/database
npx prisma migrate deploy
npx prisma db seed
exit
```

### 2. Verify Deployment

Check services are running:
```bash
docker ps
```

Check logs:
```bash
docker logs tatx-platform-customer-app-1
docker logs tatx-platform-auth-service-1
```

### 3. Test Application

- **Customer App**: `http://YOUR_VPS_IP:3100` or `https://yourdomain.com`
- **Admin Dashboard**: `http://YOUR_VPS_IP:3103` or `https://admin.yourdomain.com`
- **API**: `http://YOUR_VPS_IP:3001` or `https://api.yourdomain.com`

---

## 📊 VPS Requirements

### Minimum (Testing/Development)
- **CPU**: 4 cores
- **RAM**: 8GB
- **Storage**: 40GB SSD
- **OS**: Ubuntu 22.04 LTS

### Recommended (Production)
- **CPU**: 8 cores
- **RAM**: 16GB
- **Storage**: 80GB SSD
- **OS**: Ubuntu 22.04 LTS
- **Bandwidth**: 4TB+

### Example VPS Providers

| Provider | Plan | Price/Month |
|----------|------|-------------|
| DigitalOcean | Premium 8GB | $48 |
| Hetzner | CPX31 | ~€17 |
| Linode | 8GB | $40 |
| Vultr | 8GB | $40 |
| AWS | t3.medium | ~$30 |

---

## 🔒 Security Hardening

### 1. Configure Firewall

```bash
# Install UFW
apt install ufw -y

# Allow SSH
ufw allow 22/tcp

# Allow HTTP/HTTPS
ufw allow 80/tcp
ufw allow 443/tcp

# Allow Dokploy
ufw allow 3000/tcp

# Enable firewall
ufw enable
```

### 2. Enable Automatic Security Updates

```bash
apt install unattended-upgrades -y
dpkg-reconfigure -plow unattended-upgrades
```

### 3. Set Up Fail2Ban

```bash
apt install fail2ban -y
systemctl enable fail2ban
systemctl start fail2ban
```

### 4. Secure Docker

Create `/etc/docker/daemon.json`:
```json
{
  "userns-remap": "default",
  "live-restore": true
}
```

Restart Docker:
```bash
systemctl restart docker
```

---

## 📈 Monitoring

### 1. Install Netdata (System Monitoring)

```bash
bash <(curl -Ss https://my-netdata.io/kickstart.sh)
```

Access at: `http://YOUR_VPS_IP:19999`

### 2. View Application Logs

```bash
# All logs
docker compose logs -f

# Specific service
docker logs -f tatx-platform-auth-service-1
```

### 3. Resource Usage

```bash
# Docker stats
docker stats

# System resources
htop
```

---

## 🆘 Troubleshooting

### App Won't Start

```bash
# Check logs
docker logs tatx-platform-customer-app-1

# Restart service
docker restart tatx-platform-customer-app-1

# Check if port is in use
netstat -tulpn | grep 3100
```

### Database Connection Error

```bash
# Check PostgreSQL is running
docker ps | grep postgres

# Test connection
docker exec -it tatx-postgres psql -U tatx -d tatx_db

# Check logs
docker logs tatx-postgres
```

### Out of Memory

```bash
# Check memory usage
free -h
docker stats

# Restart services
docker compose restart

# Add swap space
fallocate -l 4G /swapfile
chmod 600 /swapfile
mkswap /swapfile
swapon /swapfile
```

### High CPU Usage

```bash
# Check processes
top

# Restart heavy services
docker restart tatx-platform-ride-service-1
```

---

## 💰 Cost Estimate

### Monthly Costs (Example)

| Item | Cost |
|------|------|
| VPS (8GB RAM) | $40 |
| Domain | $1 |
| SSL Certificate | $0 (Let's Encrypt) |
| **Total** | **~$41/month** |

### For 10,000 Users/Month

- **VPS**: 16GB RAM (~$80/month)
- **Database**: Managed PostgreSQL (~$15/month)
- **Storage**: S3/Cloudflare R2 (~$5/month)
- **Total**: ~$100/month

---

## 📞 Support & Resources

- **Dokploy Documentation**: https://dokploy.com/docs
- **Docker Documentation**: https://docs.docker.com
- **Next.js Deployment**: https://nextjs.org/docs/deployment
- **Tatx Documentation**: See `/docs` folder in repository

---

## ✅ Deployment Checklist

- [ ] VPS provisioned
- [ ] Docker installed
- [ ] Dokploy installed
- [ ] PostgreSQL service created
- [ ] Redis service created
- [ ] Application created from Git
- [ ] Environment variables added
- [ ] Domain configured (optional)
- [ ] SSL enabled (optional)
- [ ] Deployed successfully
- [ ] Database migrations run
- [ ] Database seeded
- [ ] Application accessible
- [ ] Firewall configured
- [ ] Monitoring set up
- [ ] Backups configured

---

**Deployment Date**: 2026-03-12  
**Platform Version**: 1.0.0-beta  
**Status**: Ready for Production 🚀
