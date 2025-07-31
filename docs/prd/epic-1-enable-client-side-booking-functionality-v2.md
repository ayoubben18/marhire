# Epic 1: Enable Client-Side Booking Functionality (Updated)

**Epic Goal**: Implement comprehensive two-step booking functionality that allows clients to book services directly through the website without authentication, supporting category-specific requirements, advanced pricing calculations, and automated booking lifecycle management.

**Integration Requirements**: All new code must integrate seamlessly with existing Laravel patterns, maintain compatibility with admin dashboard booking management, and support the new two-step booking flow across all four service categories.

## Story 1.1: Implement Enhanced Booking Submission API Endpoint

As a guest user,
I want to submit booking requests through a two-step public API,
so that I can book services with all required information.

**Acceptance Criteria:**
1. POST endpoint `/api/bookings/submit` accepts two-step booking data
2. Validates all universal fields: fullName, email, whatsAppNumber, countryOfResidence, dateOfBirth, termsAccepted
3. Validates category-specific fields based on category_id (2=Car, 3=Driver, 4=Boat, 5=Activity)
4. Enforces minimum advance booking requirements:
   - Cars: 1 day advance
   - Boats: 2 days advance
   - Activities: 2 days advance
   - Drivers: 2 days advance
5. Returns confirmation message: "Thank you! Your booking has been successfully submitted..."

**Integration Verification:**
- IV1: Booking appears in admin dashboard with "Pending" status
- IV2: All date fields use dateOfBirth instead of age
- IV3: WhatsApp numbers stored with country code

## Story 1.2: Implement Category-Specific Validation Service

As a system,
I want to validate bookings according to category-specific business rules,
so that only valid bookings meeting all requirements are accepted.

**Acceptance Criteria:**
1. **Car Rental Validation**:
   - Minimum 3 days booking duration
   - Validate pickup/dropoff locations from allowed cities
   - Check SUV/MPV for surf rack eligibility
   - Duration calculation: every 24h = 1 day (even 1 minute over adds a day)

2. **Private Driver Validation**:
   - Validate service type array from checkboxes (can include both Airport Transfer AND Intercity)
   - Validate road type array from checkboxes (can include both One Way AND Road Trip)
   - Ensure pricing exists for selected route combination
   - Validate passenger count (required)
   - Validate luggage count (required)

3. **Boat Rental Validation**:
   - Time slots between 8am-8pm only
   - Duration from 30min to 8h in 30-minute increments
   - Validate number of people against boat capacity
   - Check captain requirement

4. **Things to Do Validation**:
   - Time preference: Morning/Afternoon/Evening/Night
   - For private: unlimited people
   - For group: validate against group size limit
   - Validate selected duration option exists

**Integration Verification:**
- IV1: All validation errors return field-specific messages
- IV2: Advance booking rules enforced at submission time
- IV3: Category-specific fields only validated when applicable

## Story 1.3: Enhance Booking Confirmation Communications

As a client and service provider,
I want to receive detailed confirmations with all booking information,
so that I have complete records of reservations.

**Acceptance Criteria:**
1. Client email includes:
   - All booking details from both steps
   - Category-specific information
   - Terms & conditions acceptance confirmation
   - Provider contact information
2. Provider notification includes:
   - Client's WhatsApp number with country code
   - Flight number (if provided)
   - Special requests/notes
   - Direct link to admin booking management
3. Send confirmation message to client's WhatsApp (if integration available)

**Integration Verification:**
- IV1: Emails use existing queue system
- IV2: Failed communications logged but don't block booking
- IV3: Templates support all category-specific fields

## Story 1.4: Implement Two-Step Booking Frontend Flow

As a user,
I want a clear two-step booking process,
so that I can provide information in a logical sequence.

**Acceptance Criteria:**
1. Step 1: Category-specific booking details
2. Step 2: Universal client information form
3. Progress indicator shows current step
4. Back button allows editing previous step
5. Form data persists when navigating between steps
6. Success modal displays confirmation message after submission

**Integration Verification:**
- IV1: Search parameters auto-populate when coming from homepage
- IV2: Direct access starts with empty forms
- IV3: All Material UI components follow existing patterns

## Story 1.4.5: Implement Addon Data Integration for Booking Forms

As a user booking a car rental,
I want the booking form to display available add-ons with their prices from the database,
so that I can select add-ons and see accurate pricing that will be submitted with my booking.

**Acceptance Criteria:**
1. **Addon Data Loading**:
   - Listing API endpoint includes addon data via the `addons` relationship
   - Each addon includes: id, name (addon), price, and category_id
   - Addons are properly loaded when the listing is fetched
   - ListingAddonAffected bridge table correctly links listings to their available addons

2. **Component Data Flow**:
   - BookingFrm component receives the full listing object with addons
   - BookingDetailsStep component properly receives addon data as props
   - Selected addons are tracked in component state
   - Addon selections persist through the two-step booking flow

3. **Price Calculation**:
   - Total price updates dynamically when addons are selected/deselected
   - Addon prices are correctly added to the base rental price
   - Price calculation helper functions use actual addon prices from database
   - Total addon cost is calculated and displayed separately

4. **Form Submission**:
   - Selected addon IDs are included in the booking submission
   - Addon prices are sent with the booking data
   - Backend receives and processes addon selections correctly
   - Booking confirmation includes selected addons

**Integration Verification:**
- IV1: Addon data structure matches existing API patterns
- IV2: Price calculations align with backend validation
- IV3: Form submission includes all required addon fields

## Story 1.5: Implement Category-Specific Form Components

As a user,
I want each service type to collect its specific information,
so that I provide all necessary booking details.

**Acceptance Criteria:**
1. **CarRentalForm**:
   - Date/time pickers for pickup and dropoff
   - City dropdowns for locations
   - Add-ons display (implemented in Story 1.4.5)
   - Show drop-off fee message when locations differ

2. **PrivateDriverForm**:
   - Service type selection using CHECKBOXES (Airport Transfer, Intercity)
   - Road type selection using CHECKBOXES (One Way, Road Trip)
   - Dynamic fields based on service type
   - Passenger number input
   - Luggage count input

3. **BoatForm**:
   - Time picker restricted to 8am-8pm
   - Duration selection using CHECKBOXES (30min-8h, 30min increments)
   - People counter with capacity validation
   - Captain info display

4. **ThingsToDoForm**:
   - Time preference dropdown
   - Duration options with prices from backend
   - Private/Group display
   - Meeting point display

**Integration Verification:**
- IV1: All forms calculate and display total price
- IV2: Field names match API expectations
- IV3: Validation errors display inline

## Story 1.6: Implement Advanced Price Calculation Engine

As a user,
I want accurate pricing based on my selections,
so that I know the total cost before booking.

**Acceptance Criteria:**
1. **Car Rental Pricing**:
   - Day rate for < 7 days (price_day * days)
   - Week rate for 7-29 days (price_week/7 * days)
   - Month rate for 30+ days (price_month/30 * days)
   - Duration: Every 24h = 1 day (even 1 minute over adds a day)
   - Add-ons pricing from database (implemented in Story 1.4.5)
   - Add drop-off fee notification

2. **Boat Rental Pricing**:
   - 0.5h to 1h: use hourly rate
   - 2h to 4h: use half-day rate × (chosen hours / 4)
   - 4.5h to 8h: use full-day rate × (chosen hours / 8)
   - Include all selected add-ons

3. **Things to Do Pricing**:
   - Private: price × number of people
   - Group: fixed group price
   - Use selected duration option price

4. **Private Driver Pricing**:
   - Lookup price from backend table
   - Based on: service type + road type + route

**Integration Verification:**
- IV1: Prices match admin calculations exactly
- IV2: API endpoint supports all pricing scenarios
- IV3: Currency formatting consistent

## Story 1.7: Implement Booking Search Bar Integration

As a user starting from the homepage,
I want my search parameters to transfer to the booking form,
so that I don't have to re-enter information.

**Acceptance Criteria:**
1. Homepage search parameters stored in session/URL params
2. Booking forms auto-populate matching fields
3. Support for all category-specific search options
4. Boat search includes: type, city, date/time, people count
5. Clear indication when fields are pre-filled

**Integration Verification:**
- IV1: Parameters persist across page navigation
- IV2: Invalid parameters gracefully ignored
- IV3: Direct listing access shows empty forms

## Story 1.8: Implement Terms & Conditions Acceptance

As a business,
I want users to accept terms before booking,
so that legal requirements are met.

**Acceptance Criteria:**
1. Required checkbox in Step 2
2. Links open in new window/tab
3. Three separate links:
   - Terms & Conditions
   - Privacy Policy  
   - Cancellation Policy
4. Cannot submit without acceptance
5. Acceptance timestamp stored with booking

**Integration Verification:**
- IV1: Links point to correct legal pages
- IV2: Acceptance tracked in database
- IV3: Admin can view acceptance status

## Story 1.9: Implement Automated Booking Status Management

As a system administrator,
I want bookings to automatically update status,
so that the system reflects current state without manual intervention.

**Acceptance Criteria:**
1. New bookings created with "Pending" status
2. Scheduled job checks bookings every hour
3. Auto-transition to "Completed" when scheduled time passes
4. Status changes logged for audit trail
5. Admin retains ability to manually update status

**Integration Verification:**
- IV1: Uses Laravel's task scheduler
- IV2: Status changes trigger appropriate notifications
- IV3: Manual overrides take precedence

## Story 1.10: Backend Listing Management Improvements

As an administrator,
I want functional Modify and Delete buttons for listings,
so that I can efficiently manage listings without database access.

**Acceptance Criteria:**
1. **Modify Button Functionality**:
   - Add functional "Modify" button to each listing in admin panel
   - Opens edit form with all current listing data pre-populated
   - Allows editing all listing fields including category-specific data
   - Saves changes and displays success message
2. **Delete Button Fix**:
   - Fix non-functional "Delete" button on listings
   - Shows confirmation dialog before deletion
   - Soft deletes listing (sets deleted_at timestamp)
   - Maintains referential integrity with bookings
3. **Backend Field Updates**:
   - Remove "duration" field from Things to Do listings
   - Add support for custom booking options (name + price) for activities
   - Add custom duration options for boat rentals (30min-8h)
   - Create driver pricing table for 4 pricing types
4. **Data Migration Requirements**:
   - Convert existing age data to approximate birth dates
   - Populate default duration options for boats
   - Create pricing matrix for driver routes

**Integration Verification:**
- IV1: Modify button updates listing successfully
- IV2: Delete maintains referential integrity
- IV3: Custom options appear in booking forms
- IV4: Pricing calculations use new structure

## Technical Debt & Backend Requirements

### Backend Changes Needed:
1. Replace "age" field with "dateOfBirth" across all categories
2. Add custom duration options for boat rentals (30min-8h)
3. Remove "duration" field from Things to Do
4. Add custom booking options (name + price) for activities
5. Implement pricing table for private drivers
6. Add "Modify" button functionality for listings
7. Fix non-functional "Delete" button for listings

### Data Migration:
1. Convert existing age data to approximate birth dates
2. Populate default duration options for boats
3. Create pricing matrix for driver routes

### API Endpoints Summary:
- POST `/api/bookings/submit` - Two-step booking submission
- GET `/api/bookings/calculate-price` - Real-time pricing
- GET `/api/bookings/validate-step1` - Validate booking details
- GET `/api/locations/cities` - Available city list
- GET `/api/drivers/routes` - Available driver routes
- GET `/api/boats/durations` - Available boat durations
- GET `/api/activities/options` - Activity booking options

**Success Metrics:**
- 90% of bookings complete without validation errors
- Average booking completion time under 3 minutes
- Zero booking data loss during submission
- 100% email delivery rate (excluding invalid addresses)
- Booking conversion rate improvement of 25%+