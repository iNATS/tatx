# Tatx Mobile App

A comprehensive React Native mobile application built with Expo for the Tatx super app platform. This app provides ride booking, food delivery, grocery shopping, and courier services.

## Features

### Core Services
- **Ride Booking**: Book rides with multiple vehicle types (Economy, Comfort, Premium, XL)
- **Food Delivery**: Browse restaurants, search by cuisine, and order food
- **Grocery**: Order groceries from local stores
- **Courier**: Send packages with delivery tracking

### Screens

#### Home Screen (`/(tabs)/index.tsx`)
- Welcome message with user name
- Quick action buttons for all services
- Promotional banners with carousel
- Recent activity history
- Location selector with saved addresses

#### Ride Screen (`/(tabs)/rides.tsx`)
- Interactive map placeholder
- Pickup and dropoff location inputs
- Saved places (Home, Work)
- Vehicle type selection with fare estimates
- Payment method selection
- Real-time booking status

#### Food Screen (`/(tabs)/food.tsx`)
- Restaurant search functionality
- Cuisine category filters
- Featured restaurants with ratings
- Recent orders with reorder option
- Shopping cart indicator
- Promotional offers

#### Profile Screen (`/(tabs)/profile.tsx`)
- User profile with avatar
- Account statistics (rides, orders, wallet)
- Menu items: Wallet, Ride History, Order History, Settings, Support
- Language switcher (Arabic/English)
- Notification preferences
- Logout functionality

#### Authentication
- **Login Screen** (`/login.tsx`): Email/password and social login options
- **Register Screen** (`/register.tsx`): Full registration with validation

## Technology Stack

- **Framework**: React Native with Expo SDK 52
- **Navigation**: Expo Router 4 (File-based routing)
- **State Management**: Zustand
- **HTTP Client**: Axios
- **Location**: expo-location
- **Notifications**: expo-notifications
- **Maps**: react-native-maps

## Project Structure

```
apps/mobile/
├── app/                      # Expo Router pages
│   ├── (tabs)/              # Tab navigation screens
│   │   ├── _layout.tsx      # Tab bar layout
│   │   ├── index.tsx        # Home screen
│   │   ├── rides.tsx        # Ride booking screen
│   │   ├── food.tsx         # Food ordering screen
│   │   └── profile.tsx      # Profile screen
│   ├── _layout.tsx          # Root layout
│   ├── login.tsx            # Login screen
│   └── register.tsx         # Registration screen
├── components/              # Reusable UI components
│   ├── ServiceCard.tsx      # Service type card
│   ├── ServiceBanner.tsx    # Promotional banner
│   ├── RecentActivityCard.tsx # Activity history card
│   ├── TabBar.tsx           # Custom tab bar
│   ├── LocationSelector.tsx # Location picker
│   ├── VehicleTypeCard.tsx  # Vehicle selection card
│   ├── RestaurantCard.tsx   # Restaurant card
│   ├── CuisineCategory.tsx  # Cuisine filter chip
│   └── ProfileMenuItem.tsx  # Profile menu item
├── constants/               # App constants
│   ├── Colors.ts            # Color palette
│   ├── Icons.ts             # Icon configurations
│   ├── Data.ts              # Mock data
│   └── index.ts             # Exports
├── hooks/                   # Custom React hooks
│   ├── useAuth.ts           # Authentication hook
│   ├── useLocation.ts       # Location hook
│   └── index.ts             # Exports
├── services/                # API and services
│   ├── api.ts               # API client & services
│   └── store.ts             # Zustand store
├── utils/                   # Utility functions
│   ├── helpers.ts           # Helper functions
│   └── index.ts             # Exports
├── assets/                  # Images, fonts, etc.
├── package.json
├── tsconfig.json
├── babel.config.js
└── app.json
```

## Branding

### Colors
- **Primary**: `#0F172A` (Slate 900)
- **Accent**: `#22C55E` (Green 500)
- **Service Colors**:
  - Ride: `#3B82F6` (Blue)
  - Food: `#F97316` (Orange)
  - Grocery: `#22C55E` (Green)
  - Courier: `#8B5CF6` (Purple)

## Getting Started

### Prerequisites
- Node.js >= 20.0.0
- pnpm >= 9.0.0
- Expo CLI
- iOS Simulator (for Mac) or Android Emulator

### Installation

1. Install dependencies:
```bash
cd /home/workspace/projects/ia6g/tatx/apps/mobile
pnpm install
```

2. Copy environment variables:
```bash
cp .env.example .env
```

3. Update `.env` with your API keys:
```
EXPO_PUBLIC_API_URL=http://localhost:3000/api
EXPO_PUBLIC_GOOGLE_MAPS_API_KEY=your_key_here
```

### Development

Start the development server:
```bash
pnpm start
```

Then run on your desired platform:
- Press `i` for iOS simulator
- Press `a` for Android emulator
- Scan QR code with Expo Go app

### Building

Build for production:
```bash
# iOS
pnpm build:ios

# Android
pnpm build:android

# Web
pnpm build:web
```

## API Integration

The app includes pre-configured API services in `/services/api.ts`:

- **authService**: Login, register, logout, refresh token
- **rideService**: Vehicle types, fare estimation, booking, history
- **foodService**: Restaurants, menus, orders
- **userService**: Profile, wallet, addresses

## State Management

Uses Zustand for global state management:
- User authentication state
- Current location
- Language preference
- App settings

## Custom Hooks

- **useAuth**: Authentication logic (login, register, logout)
- **useLocation**: Location permissions and tracking

## Utilities

Helper functions in `/utils/helpers.ts`:
- `formatCurrency()`: Format monetary values
- `formatDate()`, `formatTime()`, `formatRelativeTime()`: Date formatting
- `calculateDistance()`: Haversine formula for distance
- `calculateFare()`: Fare calculation
- `calculateETA()`: Estimated time of arrival
- `isValidEmail()`, `isValidSaudiPhone()`, `isStrongPassword()`: Validation
- `getInitials()`: Generate initials from name
- `debounce()`: Debounce function
- `truncateText()`: Truncate long text

## Navigation

File-based routing with Expo Router:
- Tab navigation for main screens
- Stack navigation for auth flows
- Deep linking support

## Internationalization

Ready for i18n with:
- Language switcher (EN/AR)
- RTL support utilities
- Separate translation files (to be added)

## Testing

```bash
# Run tests
pnpm test

# Type check
pnpm typecheck

# Lint
pnpm lint
```

## Scripts

- `pnpm start` - Start development server
- `pnpm android` - Run on Android
- `pnpm ios` - Run on iOS
- `pnpm web` - Run on web
- `pnpm lint` - Run ESLint
- `pnpm typecheck` - Run TypeScript check

## License

Copyright © 2024 Tatx. All rights reserved.
