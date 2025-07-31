# Technical Debt and Known Issues

### Critical Technical Debt

1. **Booking System**: 
   - `submitBooking` method missing in BookingController
   - BookingFrm.jsx has no API integration (just UI)
   - No client authentication for bookings
   - Category-specific booking forms not connected to backend

2. **Internationalization**:
   - No i18n system implemented
   - Only English language files exist
   - No URL localization
   - No frontend i18n library (react-i18next missing)
   - No SEO meta tags for different languages

3. **Frontend Architecture**:
   - Mixed TypeScript and JavaScript files
   - No consistent state management (no Redux/Context)
   - Hardcoded text in components
   - No error handling in API calls

### Workarounds and Gotchas

- **Booking Categories**: Category IDs are hardcoded (2=Car, 3=Driver, 4=Boat, 5=Activity)
- **Admin Only**: All booking management is admin-only through dashboard
- **No Client Auth**: No user registration/login for clients
- **Search Forms**: Each category has its own form component but they don't submit to backend
