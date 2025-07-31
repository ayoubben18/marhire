# Requirements

### Functional Requirements

**FR1:** The system shall implement a public `/api/bookings/submit` endpoint that accepts booking requests without authentication

**FR2:** The booking API shall accept category-specific fields based on category_id (2=Car, 3=Driver, 4=Boat, 5=Activity)

**FR3:** The booking form components (BookingFrm, CarRentalForm, PrivateDriverForm, BoatForm, ThingsToDoForm) shall submit data to the booking API

**FR4:** The system shall validate all required fields and return HTTP 422 with field-specific errors for invalid data

**FR5:** The system shall calculate total price including base price and selected add-ons before submission

**FR6:** Upon successful booking, the system shall send confirmation emails to both the client and the service provider

**FR7:** The booking shall be saved with 'Pending' status and generate a unique confirmation number

**FR8:** The system shall prevent double-booking by checking availability before confirmation

**FR9:** The booking forms shall show loading states during submission and success/error messages after

**FR10:** The existing admin booking management interface shall display all client-submitted bookings

### Non-Functional Requirements

**NFR1:** The booking API shall respond within 500ms under normal load conditions

**NFR2:** Email sending shall be queued to prevent blocking the booking submission

**NFR3:** The system shall handle concurrent booking requests without creating race conditions

**NFR4:** All booking data shall be validated on both frontend and backend

**NFR5:** Error messages shall be user-friendly and actionable

**NFR6:** The booking form shall remain functional if JavaScript fails to load (progressive enhancement)

### Compatibility Requirements

**CR1: Existing Admin API Compatibility**: All existing admin booking endpoints at /bookings/* must continue functioning

**CR2: Database Schema Compatibility**: Use existing bookings table schema without modifications

**CR3: UI/UX Consistency**: Booking forms must maintain existing Material UI component styling

**CR4: Integration Compatibility**: Use existing Laravel Mail configuration and queue system
