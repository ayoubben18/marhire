# Epic 1: Enable Client-Side Booking Functionality

**Epic Goal**: Implement end-to-end booking functionality that allows clients to book services directly through the website without authentication, maintaining full compatibility with the existing admin system while reducing operational overhead.

**Integration Requirements**: All new code must integrate seamlessly with existing Laravel patterns, use current database schema without modifications, and maintain compatibility with admin dashboard booking management.

### Story 1.1: Implement Booking Submission API Endpoint

As a guest user,
I want to submit booking requests through a public API,
so that I can book services without creating an account.

**Acceptance Criteria:**
1. POST endpoint `/api/bookings/submit` is accessible without authentication
2. Endpoint accepts all booking fields defined in Booking model fillable array
3. Returns 201 Created with booking ID and confirmation number on success
4. Returns 422 Unprocessable Entity with field-specific validation errors
5. Handles all four category types with their specific validation rules

**Integration Verification:**
- IV1: Existing admin booking endpoints continue working unchanged
- IV2: New bookings appear in admin dashboard without modification
- IV3: Database transaction handling prevents partial bookings

### Story 1.2: Add Booking Validation Service Layer

As a system,
I want to validate booking data according to business rules,
so that only valid bookings are accepted.

**Acceptance Criteria:**
1. Validate required fields based on category_id (2=Car, 3=Driver, 4=Boat, 5=Activity)
2. Check listing exists and is active before accepting booking
3. Validate dates are in the future and logical (pickup before dropoff)
4. Ensure selected add-ons belong to the chosen listing
5. Calculate and validate total price matches sum of base price and add-ons

**Integration Verification:**
- IV1: Validation rules match those used in admin panel
- IV2: Existing BookingRequest validation class is extended, not replaced
- IV3: All error messages follow Laravel's validation message format

### Story 1.3: Implement Booking Confirmation Emails

As a client and service provider,
I want to receive email confirmations when bookings are made,
so that I have a record of the reservation.

**Acceptance Criteria:**
1. Create two Mailable classes: BookingClientConfirmation and BookingProviderNotification
2. Client email includes: confirmation number, booking details, provider contact
3. Provider email includes: client details, booking specifics, admin link
4. Emails are queued using existing Laravel queue configuration
5. Failed email attempts are logged but don't block booking creation

**Integration Verification:**
- IV1: Uses existing mail configuration from .env
- IV2: Follows same email template structure as ContactMail
- IV3: Queue jobs visible in existing queue monitoring

### Story 1.4: Connect Frontend Booking Forms to API

As a user,
I want the booking forms to submit my information,
so that I can complete my reservation.

**Acceptance Criteria:**
1. BookingFrm component submits to `/api/bookings/submit` on form submission
2. Show loading spinner (existing style) during API call
3. Display success message with confirmation number in modal
4. Show field-specific validation errors below each input
5. Clear form data after successful submission

**Integration Verification:**
- IV1: Uses existing axios instance configuration
- IV2: Error handling follows patterns from other API calls
- IV3: Loading states use existing Material UI components

### Story 1.5: Implement Category-Specific Form Handlers

As a user,
I want each service type form to handle its specific requirements,
so that I provide all necessary information.

**Acceptance Criteria:**
1. CarRentalForm sends category_id=2 with pickup/dropoff locations and times
2. PrivateDriverForm sends category_id=3 with route and passenger details
3. BoatForm sends category_id=4 with duration and purpose
4. ThingsToDoForm sends category_id=5 with activity type and participant count
5. Each form calculates total price before submission

**Integration Verification:**
- IV1: Field names match database column names exactly
- IV2: Date/time formats compatible with backend expectations
- IV3: Price calculation logic matches admin panel

### Story 1.6: Add Booking Price Calculation Endpoint

As a user,
I want to see accurate pricing before submitting,
so that I know the total cost upfront.

**Acceptance Criteria:**
1. GET endpoint `/api/bookings/calculate-price` accepts listing and options
2. Returns itemized breakdown: base price, each add-on price, total
3. Handles different pricing models (per day, per person, flat rate)
4. No authentication required for price checks
5. Response format matches existing pricing display components

**Integration Verification:**
- IV1: Calculation logic identical to admin panel
- IV2: Uses existing listing pricing relationships
- IV3: Currency formatting matches existing display format
