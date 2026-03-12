# 🧪 Tatx Platform - Manual Testing Checklist

## Prerequisites

Before testing, ensure you have:
- [ ] Node.js 20+ installed
- [ ] pnpm 9+ installed
- [ ] Docker & Docker Compose (optional, for database)
- [ ] PostgreSQL database running
- [ ] Redis running

## Quick Start

```bash
# Make script executable
chmod +x TESTING_GUIDE.sh

# Complete setup and run
./TESTING_GUIDE.sh all

# Or step by step:
./TESTING_GUIDE.sh setup   # Install and setup
./TESTING_GUIDE.sh dev     # Start services
./TESTING_GUIDE.sh test    # Run tests
```

---

## 1. 🔐 Authentication Service Testing

### Base URL: `http://localhost:3001`
### Swagger: `http://localhost:3001/docs`

### Test Cases:

#### 1.1 User Registration
- [ ] Register new customer account
  - Endpoint: `POST /api/auth/register`
  - Email: `test.customer@tatx.sa`
  - Password: `Test123!@#`
  - Expected: 201 Created, returns user + tokens

- [ ] Register new driver account
  - Email: `test.driver@tatx.sa`
  - Role: DRIVER
  - Expected: 201 Created, creates driver profile

- [ ] Register with existing email
  - Expected: 409 Conflict

- [ ] Register with weak password
  - Password: `123`
  - Expected: 400 Bad Request

#### 1.2 Login
- [ ] Login with valid credentials
  - Endpoint: `POST /api/auth/login`
  - Email: `admin@tatx.sa`
  - Password: `password123`
  - Expected: 200 OK, returns tokens

- [ ] Login with invalid credentials
  - Expected: 401 Unauthorized

- [ ] Login with unverified email
  - Expected: Success (verification not required for login)

#### 1.3 OAuth Login
- [ ] Google OAuth (if configured)
  - Endpoint: `POST /api/auth/google`
  - Expected: Creates/logs in user

- [ ] Apple OAuth (if configured)
  - Endpoint: `POST /api/auth/apple`
  - Expected: Creates/logs in user

#### 1.4 OTP Authentication
- [ ] Send OTP to phone
  - Endpoint: `POST /api/auth/otp/send`
  - Phone: `+966500000000`
  - Expected: 200 OK, OTP sent

- [ ] Verify OTP
  - Endpoint: `POST /api/auth/otp/verify`
  - Expected: 200 OK, returns tokens

#### 1.5 Password Management
- [ ] Forgot password
  - Endpoint: `POST /api/auth/forgot-password`
  - Expected: 200 OK

- [ ] Reset password with token
  - Endpoint: `POST /api/auth/reset-password`
  - Expected: 200 OK

- [ ] Change password (authenticated)
  - Endpoint: `POST /api/auth/change-password`
  - Expected: 200 OK

#### 1.6 Two-Factor Authentication
- [ ] Setup 2FA
  - Endpoint: `GET /api/auth/2fa/setup`
  - Expected: Returns QR code URL

- [ ] Enable 2FA
  - Endpoint: `POST /api/auth/2fa/enable`
  - Expected: Returns backup codes

- [ ] Disable 2FA
  - Endpoint: `POST /api/auth/2fa/disable`
  - Expected: 200 OK

#### 1.7 Token Management
- [ ] Refresh access token
  - Endpoint: `POST /api/auth/refresh`
  - Expected: New access token

- [ ] Logout
  - Endpoint: `POST /api/auth/logout`
  - Expected: 200 OK

---

## 2. 🚗 Ride Service Testing

### Base URL: `http://localhost:3004`
### Swagger: `http://localhost:3004/docs`

### Test Cases:

#### 2.1 Fare Estimation
- [ ] Get fare estimate
  - Endpoint: `POST /api/rides/estimate`
  - Pickup: Riyadh center
  - Dropoff: King Khalid Airport
  - Vehicle: ECONOMY
  - Expected: Fare breakdown

- [ ] Get estimates for all vehicles
  - Endpoint: `POST /api/pricing/estimate/vehicles`
  - Expected: Array of vehicle options with prices

#### 2.2 Create Ride
- [ ] Create ride request
  - Endpoint: `POST /api/rides`
  - Expected: Ride created, searching for driver

- [ ] Create scheduled ride
  - Set scheduledAt to future time
  - Expected: Ride scheduled

#### 2.3 Ride Management
- [ ] Get ride details
  - Endpoint: `GET /api/rides/:id`
  - Expected: Ride information

- [ ] Get ride by number
  - Endpoint: `GET /api/rides/number/:rideNumber`
  - Expected: Ride information

- [ ] Get user ride history
  - Endpoint: `GET /api/rides/user/:userId/history`
  - Expected: Array of rides

- [ ] Get active rides
  - Endpoint: `GET /api/rides/user/:userId/active`
  - Expected: Current active rides

#### 2.4 Driver Actions
- [ ] Driver accepts ride
  - Endpoint: `POST /api/rides/:id/accept`
  - Expected: Ride status → DRIVER_ASSIGNED

- [ ] Driver arrives
  - Endpoint: `POST /api/rides/:id/arrive`
  - Expected: Ride status → DRIVER_ARRIVED

- [ ] Driver starts ride
  - Endpoint: `POST /api/rides/:id/start`
  - Expected: Ride status → IN_PROGRESS

- [ ] Driver completes ride
  - Endpoint: `POST /api/rides/:id/complete`
  - Expected: Ride status → COMPLETED

#### 2.5 Ride Cancellation
- [ ] Cancel ride (free cancellation)
  - Endpoint: `POST /api/rides/:id/cancel`
  - Within 2 minutes of booking
  - Expected: No fee

- [ ] Cancel ride (with fee)
  - After driver assigned
  - Expected: Cancellation fee applied

#### 2.6 Ratings
- [ ] Rate driver
  - Endpoint: `POST /api/rides/:id/rate`
  - Rating: 5
  - Expected: Rating saved

#### 2.7 Pricing
- [ ] Get surge pricing
  - Endpoint: `GET /api/pricing/surge`
  - Expected: Current surge multipliers

- [ ] Validate promo code
  - Endpoint: `POST /api/pricing/promo/validate`
  - Code: WELCOME50
  - Expected: Discount details

---

## 3. 🍔 Food Service Testing

### Base URL: `http://localhost:3005`
### Swagger: `http://localhost:3005/docs`

### Test Cases:

#### 3.1 Restaurant Search
- [ ] List all restaurants
  - Endpoint: `GET /api/restaurants`
  - Expected: Paginated list

- [ ] Search restaurants
  - Endpoint: `GET /api/restaurants/search`
  - Query: "chicken"
  - Expected: Filtered results

- [ ] Get restaurant details
  - Endpoint: `GET /api/restaurants/:id`
  - Expected: Full restaurant info

- [ ] Get restaurant menu
  - Endpoint: `GET /api/restaurants/:id/menu`
  - Expected: Menu with categories and items

#### 3.2 Menu Management
- [ ] Get menu categories
  - Endpoint: `GET /api/menu/restaurant/:id/categories`
  - Expected: Categories list

- [ ] Get menu items
  - Endpoint: `GET /api/menu/restaurant/:id/items`
  - Expected: Items list

- [ ] Create menu item (merchant)
  - Endpoint: `POST /api/menu/restaurant/:id/items`
  - Expected: Item created

#### 3.3 Order Management
- [ ] Create order
  - Endpoint: `POST /api/orders`
  - Expected: Order created

- [ ] Get order details
  - Endpoint: `GET /api/orders/:id`
  - Expected: Order information

- [ ] Get user orders
  - Endpoint: `GET /api/orders/user/:userId`
  - Expected: User's order history

- [ ] Update order status
  - Endpoint: `PUT /api/orders/:id/status`
  - Status: CONFIRMED
  - Expected: Status updated

#### 3.4 Order Workflow
- [ ] Confirm order
  - Endpoint: `POST /api/orders/:id/confirm`
  - Expected: Status → CONFIRMED

- [ ] Start preparing
  - Endpoint: `POST /api/orders/:id/prepare`
  - Expected: Status → PREPARING

- [ ] Mark ready for pickup
  - Endpoint: `POST /api/orders/:id/ready`
  - Expected: Status → READY_FOR_PICKUP

- [ ] Mark picked up
  - Endpoint: `POST /api/orders/:id/deliver`
  - Expected: Status → IN_TRANSIT

- [ ] Mark delivered
  - Expected: Status → DELIVERED

#### 3.5 Order Cancellation
- [ ] Cancel order
  - Endpoint: `POST /api/orders/:id/cancel`
  - Expected: Order cancelled, refund initiated

#### 3.6 Ratings
- [ ] Rate order/restaurant
  - Endpoint: `POST /api/orders/:id/rate`
  - Expected: Rating saved

---

## 4. 💳 Payment Service Testing

### Base URL: `http://localhost:3007`
### Swagger: `http://localhost:3007/docs`

### Test Cases:

#### 4.1 Payment Processing
- [ ] Process payment
  - Endpoint: `POST /api/payments/process`
  - Method: CREDIT_CARD
  - Expected: Payment completed

- [ ] Process wallet payment
  - Expected: Balance deducted

- [ ] Process split payment
  - Part wallet, part card
  - Expected: Both charged

#### 4.2 Payment Methods
- [ ] Get available methods
  - Endpoint: `GET /api/payments/methods`
  - Expected: List of methods

- [ ] Save card
  - Endpoint: `POST /api/payments/saved-cards`
  - Expected: Card tokenized

- [ ] Get saved cards
  - Endpoint: `GET /api/payments/saved-cards`
  - Expected: User's cards

- [ ] Delete saved card
  - Endpoint: `DELETE /api/payments/saved-cards/:id`
  - Expected: Card removed

#### 4.3 Wallet
- [ ] Get wallet balance
  - Endpoint: `GET /api/wallet/balance`
  - Expected: Balance object

- [ ] Top-up wallet
  - Endpoint: `POST /api/wallet/topup`
  - Amount: 100 SAR
  - Expected: Balance increased

- [ ] Configure auto top-up
  - Endpoint: `POST /api/wallet/auto-topup`
  - Expected: Auto top-up configured

- [ ] Get transaction history
  - Endpoint: `GET /api/wallet/transactions`
  - Expected: Transaction list

#### 4.4 Refunds
- [ ] Process refund
  - Endpoint: `POST /api/payments/refund`
  - Expected: Refund initiated

---

## 5. 📱 Customer App Testing

### URL: `http://localhost:3100`

### Test Cases:

#### 5.1 Ride Booking Flow
- [ ] Open ride booking page
  - URL: `/ride`
  - Expected: Map and vehicle selector visible

- [ ] Enter pickup location
  - Expected: Autocomplete suggestions

- [ ] Enter dropoff location
  - Expected: Route displayed, fare estimated

- [ ] Select vehicle type
  - Expected: Fare updates

- [ ] Apply promo code
  - Code: WELCOME50
  - Expected: Discount applied

- [ ] Book ride
  - Expected: Ride created, searching for driver

#### 5.2 Food Ordering Flow
- [ ] Browse restaurants
  - URL: `/food`
  - Expected: Restaurant list

- [ ] Filter restaurants
  - Filter by cuisine, rating
  - Expected: Filtered results

- [ ] View restaurant menu
  - Click on restaurant
  - Expected: Menu with categories

- [ ] Add items to cart
  - Select modifiers
  - Expected: Items in cart

- [ ] Checkout
  - URL: `/food/cart`
  - Expected: Order summary

- [ ] Place order
  - Expected: Order created

#### 5.3 User Profile
- [ ] View profile
  - Expected: User info displayed

- [ ] View ride history
  - Expected: Past rides list

- [ ] View order history
  - Expected: Past orders list

- [ ] Update profile
  - Expected: Changes saved

---

## 6. 📊 Admin Dashboard Testing

### URL: `http://localhost:3103`

### Test Cases:

#### 6.1 Dashboard Overview
- [ ] View analytics
  - Expected: Stats cards, charts

- [ ] View live rides
  - Expected: Real-time updates

- [ ] View recent orders
  - Expected: Latest orders

#### 6.2 User Management
- [ ] View users
  - URL: `/dashboard/users`
  - Expected: User table

- [ ] Filter users
  - By role, status
  - Expected: Filtered results

- [ ] Block/Unblock user
  - Expected: Status updated

#### 6.3 Ride Management
- [ ] View all rides
  - URL: `/dashboard/rides`
  - Expected: Rides table

- [ ] View ride details
  - Expected: Full ride information

- [ ] Monitor live drivers
  - Expected: Map with driver locations

#### 6.4 Restaurant Management
- [ ] View restaurants
  - URL: `/dashboard/restaurants`
  - Expected: Restaurant list

- [ ] Approve restaurant
  - Expected: Status → Active

- [ ] Reject restaurant
  - Expected: Status → Rejected

#### 6.5 Payment Monitoring
- [ ] View transactions
  - URL: `/dashboard/payments`
  - Expected: Transaction list

- [ ] Process refund
  - Expected: Refund initiated

#### 6.6 Settings
- [ ] Update pricing
  - Expected: Configuration saved

- [ ] Toggle feature flags
  - Expected: Feature enabled/disabled

---

## 7. 📱 Mobile App Testing

### Manual Testing on Device/Simulator

#### 7.1 Setup
- [ ] Install Expo Go
- [ ] Run: `cd apps/mobile && pnpm dev`
- [ ] Scan QR code

#### 7.2 Home Tab
- [ ] View welcome message
- [ ] Select service (Ride/Food/Grocery/Courier)
- [ ] View promotions
- [ ] View recent activity

#### 7.3 Ride Tab
- [ ] Enter pickup/dropoff
- [ ] Select vehicle type
- [ ] View fare estimate
- [ ] Book ride

#### 7.4 Food Tab
- [ ] Search restaurants
- [ ] Browse cuisines
- [ ] View restaurant
- [ ] Add to cart

#### 7.5 Profile Tab
- [ ] View profile info
- [ ] Check wallet balance
- [ ] View history
- [ ] Switch language (AR/EN)
- [ ] Logout

---

## 8. 🔧 Integration Testing

### End-to-End Flows

#### 8.1 Complete Ride Flow
1. [ ] Customer creates ride request
2. [ ] Driver receives notification
3. [ ] Driver accepts ride
4. [ ] Driver arrives at pickup
5. [ ] Ride starts
6. [ ] Ride completes
7. [ ] Payment processed
8. [ ] Customer rates driver
9. [ ] Driver receives earnings

#### 8.2 Complete Food Order Flow
1. [ ] Customer browses restaurants
2. [ ] Customer adds items to cart
3. [ ] Customer places order
4. [ ] Restaurant receives order
5. [ ] Restaurant confirms
6. [ ] Restaurant prepares
7. [ ] Driver picks up
8. [ ] Driver delivers
9. [ ] Payment processed
10. [ ] Customer rates

#### 8.3 Wallet Flow
1. [ ] User tops up wallet
2. [ ] User pays with wallet
3. [ ] Balance deducted
4. [ ] Transaction recorded

---

## 9. ⚠️ Edge Cases & Error Handling

### Test Error Scenarios

- [ ] Network failure during payment
- [ ] Invalid location coordinates
- [ ] Database connection loss
- [ ] Invalid promo code
- [ ] Insufficient wallet balance
- [ ] Driver cancels after acceptance
- [ ] Restaurant rejects order
- [ ] Duplicate ride request
- [ ] Concurrent bookings

---

## 10. 📊 Performance Testing

### Load Testing

- [ ] 100 concurrent users browsing
- [ ] 50 concurrent ride requests
- [ ] 100 concurrent order placements
- [ ] 1000 location updates/second
- [ ] Database query performance
- [ ] API response times (< 200ms)

---

## Test Results Template

```markdown
## Test Execution Summary

**Date**: YYYY-MM-DD
**Tester**: [Name]
**Environment**: Development/Staging/Production

### Results:
- Total Tests: XXX
- Passed: XXX
- Failed: XXX
- Blocked: XXX

### Critical Issues:
1. [Issue description]
2. [Issue description]

### Notes:
[Any additional observations]
```

---

## Contact & Support

For issues or questions:
- Check API Swagger documentation
- Review service logs
- Contact development team

**Happy Testing! 🎉**
