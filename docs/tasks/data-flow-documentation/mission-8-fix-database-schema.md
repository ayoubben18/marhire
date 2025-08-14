# Mission 8: Fix Database Schema Inconsistencies

## Status
Current: Completed

## Objective
Fix critical database schema inconsistencies identified in the analysis phase, ensuring all fixes are production-safe and can be deployed via Laravel migrations.

## Dependencies
- Previous missions: Analysis complete (Missions 5-7)
- Deployment: Must work with production deployment script
- CRITICAL: All changes must be reversible via migrations

## Production Constraints
- Deployment via `php artisan migrate --force`
- No direct database manipulation
- Must preserve existing data
- Migrations must be idempotent and safe

## Critical Issues to Fix

### Priority 1: Database Column Typos (CANNOT FIX - BREAKING CHANGE)
**Decision: DO NOT FIX THESE**
- `droppoff_location` (should be dropoff_location)
- `prefered_date` (should be preferred_date)  
- `propose` (should be purpose)

Reason: These would break existing code that references these columns. Instead, we'll add comments to document the typos and ensure all code uses the existing names.

### Priority 2: Add Missing Validation Constraints
**CAN FIX SAFELY**
- Add max_luggage validation in BookingValidationService
- Add proper constraints for numeric fields
- Add indexes for performance

### Priority 3: Data Integrity Fixes
**CAN FIX WITH CAREFUL MIGRATION**
- Ensure all listings have pricing records
- Add default values where appropriate
- Clean up orphaned records

## Implementation Plan

### Step 1: Document Typos (No Migration Needed)
Add comments to models and controllers documenting the typos

### Step 2: Create Safe Migrations
- Migration for adding indexes
- Migration for adding default values
- Migration for data cleanup

### Step 3: Fix Validation (Code Only)
- Update BookingValidationService
- No database changes needed

## Files to Create/Modify
1. New migration files in `database/migrations/`
2. Update models with comments
3. Update BookingValidationService.php

## Testing Strategy
1. Run migrations locally first
2. Test rollback locally
3. Verify no data loss
4. Deploy to production

## Rollback Plan
All migrations will include down() methods for safe rollback