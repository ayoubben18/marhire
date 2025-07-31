# CLAUDE.md - AI Assistant Instructions

## Important Database Guidelines

### NEVER Write Tests That Modify the Database
- Do NOT create PHPUnit tests that use RefreshDatabase trait
- Do NOT write tests that insert, update, or delete database records
- Do NOT use database factories in tests
- The production database contains important data that must not be modified by tests

### Alternative Testing Approaches
- Write unit tests that mock database interactions
- Use in-memory testing if absolutely necessary
- Focus on testing business logic without database operations
- For integration testing, use read-only queries or mock data

## Project-Specific Instructions

### MarHire Project
- This is a Laravel + React booking platform
- The database contains production data for listings, bookings, agencies, etc.
- Always preserve existing data integrity
- When implementing features, test manually or with non-destructive methods

## Commands to Run After Code Changes

### Linting and Type Checking
```bash
npm run production  # Build React components
npm run dev  # Compile new changes instead of npm run production
```

## Database Information
- Database name: marhire
- Important tables: listings, bookings, agencies, cities, categories
- The cities table uses `city_name` column, not `name`