# Product Requirements Document: MarHire Email Notification & PDF System

## 1. Executive Summary

### Product Overview
The MarHire Email Notification & PDF System is a comprehensive communication and documentation solution that automates booking-related communications and invoice generation across all service categories (Car Rental, Private Driver, Boat Rental, and Things to Do).

### Business Objectives
- **Improve Customer Communication**: Provide timely, accurate, and professional communication throughout the booking lifecycle
- **Reduce Manual Workload**: Automate 100% of booking notifications and invoice generation
- **Enhance Brand Consistency**: Ensure all customer touchpoints reflect professional, consistent branding
- **Enable Business Flexibility**: Allow administrators to configure email settings and content without developer intervention
- **Ensure Compliance**: Maintain proper documentation and audit trails for all bookings

### Success Metrics
- 100% email delivery rate for critical booking communications
- <2 minute processing time from booking action to email sent
- 95%+ customer satisfaction with communication clarity
- 80% reduction in manual invoice generation time
- Zero critical email failures per month

## 2. User Stories & Requirements

### 2.1 Customer Stories

**As a customer booking a service:**
- I want to receive immediate confirmation that my booking request was received
- I want to know when my booking is confirmed by the business
- I want to be notified if my booking is canceled with clear reasons
- I want a reminder before my booking date so I can prepare
- I want professional PDF invoices for my records and expense reporting

**Acceptance Criteria:**
- Emails arrive within 5 minutes of action
- PDFs are attached and properly formatted
- All booking details are accurate and complete
- Emails are mobile-responsive

### 2.2 Administrator Stories

**As an administrator:**
- I want to receive copies of all booking communications for oversight
- I want to customize email content without technical knowledge
- I want to control which emails are sent for different scenarios
- I want to adjust reminder timing based on business needs
- I want to test email templates before they go live

**Acceptance Criteria:**
- WYSIWYG editor for email content
- Preview and test functionality
- Granular control over email triggers
- Real-time configuration changes

### 2.3 System Requirements

**Email Infrastructure:**
- Sender email: noreply@marhire.com (configurable)
- Admin email: admin@marhire.com (configurable)
- Support for SMTP configuration
- Email queuing for reliability
- Retry mechanism for failed sends

**PDF Generation:**
- Dynamic content based on service category
- Consistent branding and layout
- Secure storage in /storage/invoices/
- Unique naming convention: BOOKING-{ID}-{TYPE}-{TIMESTAMP}.pdf
- Downloadable from admin dashboard

## 3. Detailed Feature Specifications (As Implemented)

### 3.1 Email Types & Triggers

| Event Type | Recipients | PDF Attached | Trigger Condition | Timing | Status |
|------------|------------|--------------|-------------------|---------|---------|
| booking_received | Client + Admin | Yes (if confirmed) | Booking creation | Immediate | ✅ Implemented |
| booking_confirmed | Client + Admin | Yes | Admin approval | Immediate | ✅ Implemented |
| booking_cancelled | Client + Admin | No | Manual cancellation | Immediate | ✅ Implemented |
| booking_reminder | Client | No | Scheduled | 48h before (configurable) | ✅ Implemented |

### 3.2 Actual PDF Content (Universal Format)

**All PDFs Include (from invoice.blade.php):**
- MarHire branded header (#225f54 color scheme)
- Invoice Number: INV-{booking_id} format
- Invoice Date and Status badge (color-coded)
- **Customer Information Section:**
  - Name, Email, Phone
- **Booking Details Section:**
  - Service name (listing title)
  - Check-in Date (universal field)
  - Check-out Date (universal field)
  - Status with color badge
- **Total Amount Section:**
  - Formatted price in EUR
- **Footer:**
  - Company contact information
  - Thank you message

**Note:** The system uses generic "Check-in" and "Check-out" dates for all categories rather than category-specific fields. This simplifies template management and provides consistency across all booking types.

### 3.3 Admin Configuration Panel (As Implemented)

**Actual Admin Pages:**

1. **Email Templates** (/admin/email-templates)
   - List of 4 email templates (booking_received, booking_confirmed, booking_cancelled, booking_reminder)
   - Edit functionality with HTML editor
   - Preview functionality showing rendered template
   - Reset to default option
   - Available variables helper panel
   - Subject line customization

2. **Email Settings** (/admin/email-settings)
   - Sender email configuration
   - Sender name configuration  
   - Admin email for notifications
   - Reminder timing (24h, 48h, 72h options)
   - Enable/disable matrix for each category and event type
   - Test email sending functionality

3. **Email History** (/admin/email-history)
   - List of all sent emails with pagination (20 per page)
   - Shows: Date, Recipient, Type, Status (sent/failed), Booking reference
   - Filter by status (sent/failed/all)
   - Error messages for failed emails
   - Simple table view without complex analytics

## 4. Technical Architecture (As Built)

### 4.1 Technology Stack
- **Email Service**: Laravel Mail with EmailService interface
- **PDF Generation**: barryvdh/laravel-dompdf package
- **Queue System**: Not implemented (synchronous sending)
- **Scheduler**: Laravel Task Scheduling for reminders (every 5 minutes)
- **Storage**: Local filesystem at storage/app/invoices/
- **Template Engine**: Database-stored HTML templates with variable replacement

### 4.2 Database Schema (As Implemented)

**email_settings table:**
- id
- key (unique) 
- value (json)
- group (nullable)
- created_at
- updated_at

**email_templates table:**
- id
- category (nullable)
- event_type (booking_received, booking_confirmed, etc.)
- subject
- body_html
- default_body_html (for reset functionality)
- default_subject
- available_variables (json)
- is_active (boolean)
- created_at
- updated_at

**email_logs table:**
- id
- booking_id (nullable after migration)
- recipient_email
- recipient_type (customer/admin)
- email_type
- status (enum: sending/sent/failed/skipped)
- error_message
- pdf_path
- email_data (json)
- retry_count
- sent_at
- created_at
- updated_at

**scheduled_reminders table:**
- id
- booking_id (foreign key)
- send_at (timestamp)
- status (enum: pending/sent/cancelled)
- created_at
- updated_at

### 4.3 Security Considerations
- Email addresses validated before sending
- PDF access restricted to authorized users
- Rate limiting on email sends
- SPF/DKIM configuration for deliverability
- Sanitization of user inputs in templates

## 5. User Interface Design

### 5.1 Admin Dashboard Views

**Email Settings Main Page:**
- Quick stats (emails sent today, failures, queue size)
- Navigation tabs for each configuration section
- Save button with confirmation
- Reset to defaults option

**Template Editor:**
- Split view: editor and preview
- Variable palette with descriptions
- Formatting toolbar
- Mobile/desktop preview toggle
- Send test email form

**Email History:**
- Filterable list (date, status, type, recipient)
- View email content
- Download attached PDF
- Resend failed emails
- Export to CSV

### 5.2 Customer Email Templates

**Design Principles:**
- Mobile-first responsive design
- Clear hierarchy with booking details prominent
- Consistent header/footer branding
- Accessible color contrast
- Plain text fallback

**Template Sections:**
- Header with logo
- Greeting with customer name
- Main message
- Booking details table
- Action buttons (view booking, contact support)
- Footer with contact info and unsubscribe

## 6. Testing Strategy

### 6.1 Unit Tests
- Email sending logic
- PDF generation for each category
- Template variable replacement
- Queue job processing
- Configuration validation

### 6.2 Integration Tests
- End-to-end booking to email flow
- PDF attachment and storage
- Reminder scheduling
- Admin panel functionality
- Email delivery to test accounts

### 6.3 User Acceptance Testing
- Admin can configure all settings
- Customers receive all email types
- PDFs contain correct information
- Reminders sent at correct time
- Mobile email rendering

## 7. Implementation Summary (Completed Stories)

### Story 2.1: Core Email Infrastructure ✅
- Created EmailService with interface pattern
- Implemented email_logs table for tracking
- Basic email sending for booking events
- PDF path support in email logs

### Story 2.2: Editable Email Templates ✅  
- Database-stored templates with variable replacement
- Admin panel for editing templates
- Reset to default functionality
- Preview capability
- Templates imported from docs/emailing-stuff

### Story 2.3: PDF Invoice Generation ✅
- DomPDF integration
- Automatic PDF generation for confirmed bookings
- Professional invoice template matching docs design
- Storage in /storage/app/invoices/

### Story 2.4: Email Triggers & Reminders ✅
- Automatic emails on booking status changes
- Scheduled reminders 48h before service
- SendScheduledReminders command running every 5 minutes
- Reminder cancellation on booking cancellation

### Story 2.5: Email Settings & Test Page ✅
- Admin configuration for sender details
- Enable/disable emails per category/type
- Configurable reminder timing
- Test email functionality

### Story 2.6: Email History Page ✅
- Simple paginated list of sent emails
- Status filtering (sent/failed)
- Error message display
- Integration with admin dashboard

### Story 2.7: Category-Specific Fields ❌ Not Needed
- Templates use universal Check-in/Check-out fields
- Works consistently across all categories
- Simpler maintenance and better user understanding

## 8. Success Criteria

**Launch Readiness:**
- All email types sending successfully
- PDFs generating correctly for all categories
- Admin panel fully functional
- <1% email failure rate in testing
- Page load <2s for admin panel

**Post-Launch Success:**
- 99.5% email delivery rate
- <5% customer support tickets about emails
- 90% admin satisfaction with configuration tools
- No critical bugs in first 30 days
- Positive impact on booking completion rates

## 9. Future Enhancements

**Version 2.0 Considerations:**
- SMS notifications option
- WhatsApp integration
- Customer notification preferences
- A/B testing for email templates
- Advanced analytics dashboard
- Multi-language support
- Calendar integration (.ics files)
- Digital signature for PDFs
- Customer portal for viewing all documents

## 10. Dependencies & Risks

**Dependencies:**
- SMTP service availability
- PDF generation library compatibility
- Queue worker reliability
- Storage capacity for PDFs

**Risks & Mitigations:**
- **Risk**: Email deliverability issues
  - **Mitigation**: Implement SPF/DKIM, monitor sender reputation
- **Risk**: PDF generation performance
  - **Mitigation**: Queue processing, caching, CDN for attachments
- **Risk**: Configuration complexity
  - **Mitigation**: Sensible defaults, configuration templates
- **Risk**: Storage growth
  - **Mitigation**: Automated cleanup policy, cloud storage integration

## Appendices

### A. Email Variable Reference (As Implemented)

**Currently Available Variables (from EmailService):**
- {{client_name}} - Customer full name (from booking->name)
- {{client_email}} - Customer email
- {{booking_reference}} - Booking reference or ID (used as Invoice No)
- {{booking_id}} - Booking ID
- {{listing_title}} - Service/Product name
- {{total_amount}} - Total price (formatted with 2 decimals)
- {{currency}} - Currency symbol (default: €)
- {{admin_email}} - Admin email address
- {{check_in_date}} - Check-in/Start date (formatted as 'M d, Y')
- {{check_out_date}} - Check-out/End date (formatted as 'M d, Y')

**Note:** The system uses a simple str_replace method for variable substitution, keeping templates easy to edit and maintain.

### B. PDF Template Structure
1. Header: Logo, invoice number, date
2. Customer Information: Name, email, phone
3. Booking Summary: Service, dates, status
4. Detailed Information: Category-specific details
5. Pricing Breakdown: Subtotal, taxes, total
6. Payment Information: Method, status
7. Terms & Conditions: Key policies
8. Footer: Contact info, website

### C. Email Sending Best Practices
- Use queues for all emails
- Implement exponential backoff for retries
- Monitor bounce rates
- Maintain list hygiene
- Use authentication (SPF/DKIM/DMARC)
- Include unsubscribe links
- Test across email clients
- Monitor spam scores