# Tatx Platform - Database Migration Guide

## Quick Start

```bash
# Install dependencies
pnpm install

# Start database (Docker)
pnpm docker:dev

# Generate Prisma Client
pnpm db:generate

# Run migrations
pnpm db:migrate

# Seed database
pnpm db:seed
```

---

## Development Workflow

### 1. Make Schema Changes

Edit `packages/database/prisma/schema.prisma`

### 2. Create Migration

```bash
cd packages/database
pnpm db:migrate
```

You'll be prompted to name your migration:
```
✔ Enter a name for the new migration: · add_driver_service_areas
```

### 3. Review Migration

Check the generated SQL in:
```
packages/database/prisma/migrations/[timestamp]_migration_name/migration.sql
```

### 4. Test Locally

```bash
pnpm db:seed
pnpm dev:services
```

### 5. Commit Migration Files

```bash
git add packages/database/prisma/migrations/
git commit -m "feat: add driver service areas"
```

---

## Production Deployment

### Prerequisites

- Database backup completed
- Maintenance window scheduled (if needed)
- Rollback plan prepared

### Steps

```bash
# 1. Pull latest code
git pull origin main

# 2. Install dependencies
pnpm install

# 3. Generate Prisma Client
pnpm db:generate

# 4. Run production migrations
pnpm db:migrate:prod

# 5. Seed if needed (optional)
pnpm db:seed
```

### Using Docker

```bash
docker-compose -f docker-compose.yml exec api pnpm db:migrate:prod
```

---

## Common Commands

| Command | Description | Environment |
|---------|-------------|-------------|
| `pnpm db:generate` | Generate Prisma Client | All |
| `pnpm db:migrate` | Create & apply migration | Development |
| `pnpm db:migrate:prod` | Apply existing migrations | Production |
| `pnpm db:push` | Push schema without migration | Prototyping |
| `pnpm db:seed` | Seed database | All |
| `pnpm db:studio` | Open Prisma Studio GUI | Development |
| `pnpm db:reset` | Reset & reseed database | Development |
| `pnpm db:clean` | Reset database (no seed) | Development |

---

## Migration Best Practices

### ✅ DO

1. **Test migrations locally first**
   ```bash
   pnpm db:migrate
   pnpm db:seed
   pnpm test
   ```

2. **Use descriptive names**
   ```bash
   # Good
   add_driver_service_areas
   
   # Bad
   update_schema
   ```

3. **Review generated SQL**
   - Check for performance impact
   - Verify data transformations
   - Ensure no data loss

4. **Backup before production**
   ```bash
   pg_dump -h localhost -U tatx tatx_db > backup_$(date +%Y%m%d).sql
   ```

5. **Use transactions**
   Prisma migrations are automatically wrapped in transactions.

6. **Test rollback**
   ```bash
   pnpm prisma migrate resolve --rolled-back [migration_name]
   ```

### ❌ DON'T

1. **Don't edit existing migrations**
   - Create new migrations for changes
   - Exception: Development before committing

2. **Don't use `db:push` in production**
   - Only for prototyping
   - Doesn't create migration files

3. **Don't skip testing**
   - Always test on staging first
   - Verify with real data volume

4. **Don't run migrations during peak hours**
   - Schedule maintenance windows
   - Notify stakeholders

---

## Rollback Strategies

### Rollback Last Migration

```bash
pnpm prisma migrate resolve --rolled-back [migration_name]
```

### Reset to Specific Migration

```bash
pnpm prisma migrate reset --force
```

### Manual Rollback

1. Create reverse migration
2. Apply with `pnpm db:migrate`
3. Test thoroughly

---

## Troubleshooting

### Migration Fails

**Error: Database is not empty**
```bash
# For development only
pnpm db:reset
```

**Error: Migration already exists**
```bash
# Check migration status
pnpm prisma migrate status

# Fix migration history
pnpm prisma migrate resolve --applied [migration_name]
```

**Error: Schema drift detected**
```bash
# Reset migration history (careful!)
pnpm prisma migrate resolve --applied [migration_name]
```

### Prisma Client Out of Sync

```bash
pnpm db:generate
```

### Seed Script Fails

```bash
# Check database connection
pnpm prisma studio

# Run seed manually
cd packages/database
tsx prisma/seed.ts
```

---

## Monitoring

### Check Migration Status

```bash
pnpm prisma migrate status
```

### View Migration History

```sql
SELECT * FROM _prisma_migrations ORDER BY finished_at DESC;
```

### Verify Schema

```bash
pnpm prisma db pull
pnpm prisma db push --force-reset
```

---

## Performance Tips

### Large Tables

For tables with millions of rows:

1. **Use concurrent index creation**
   ```sql
   CREATE INDEX CONCURRENTLY ...
   ```

2. **Batch data migrations**
   ```typescript
   const BATCH_SIZE = 1000;
   for (let i = 0; i < total; i += BATCH_SIZE) {
     // Process batch
   }
   ```

3. **Schedule during low traffic**
   - Off-peak hours
   - Weekend maintenance windows

### Long-Running Migrations

Set timeout in `docker-compose.yml`:
```yaml
services:
  api:
    environment:
      DATABASE_TIMEOUT: 300000 # 5 minutes
```

---

## Security

### Database Credentials

Never commit `.env` files with credentials.

Use environment variables:
```bash
DATABASE_URL="postgresql://user:password@host:5432/dbname"
```

### Production Access

Restrict database user permissions:
```sql
-- Read-only for app
GRANT SELECT ON ALL TABLES IN SCHEMA public TO app_user;

-- Read-write for migrations
GRANT ALL ON ALL TABLES IN SCHEMA public TO migration_user;
```

---

## Support

For migration issues:

1. Check logs: `docker-compose logs api`
2. Review migration files
3. Test on local database
4. Contact database team

---

## Additional Resources

- [Prisma Migration Docs](https://www.prisma.io/docs/concepts/components/prisma-migrate)
- [Prisma Schema Reference](https://www.prisma.io/docs/reference/api-reference/prisma-schema-reference)
- [PostgreSQL Documentation](https://www.postgresql.org/docs/)
