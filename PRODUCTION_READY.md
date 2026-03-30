# Tatx SA Production Readiness

## Connected To Supabase

- Expo app content now loads from `app_content_sections`.
- Onboarding slides, notification copy, and support quick-topics are database-driven.
- Orders are written to `customer_orders`.
- Vendor join requests are written to `vendor_applications`.
- Vendor approvals create records in `vendor_profiles`.
- Vendor services are managed in `vendor_services`.
- Superadmin content editing works directly against Supabase.
- Superadmin dashboard, users, orders, and vendor approvals read live Supabase data where tables exist.
- Vendor portal reads approved profile, services, and matching orders from Supabase.

## Before Go-Live

1. Run [`supabase/tatx_schema.sql`](/Users/aref/Desktop/tatx/tatx-app/supabase/tatx_schema.sql) on the production database.
2. Set production env vars for:
   - `EXPO_PUBLIC_SUPABASE_URL`
   - `EXPO_PUBLIC_SUPABASE_ANON_KEY`
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
3. Build and deploy:
   - Expo web app
   - superadmin portal
   - vendor portal
4. Replace permissive anon-write RLS with authenticated portal access before public launch.
5. Add monitoring, backups, rate limiting, and storage governance on the VPS/Supabase side.

## Current Security Note

The current schema is operational for testing and controlled deployment, but it is not fully hardened for public production because some tables still allow broad anon access to support the existing portal workflow.
