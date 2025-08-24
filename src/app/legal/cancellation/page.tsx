
import * as React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Cancellation Policy | MarHire',
  description: 'Read our cancellation policy for car rentals, private drivers, boats, and activities booked through MarHire in Morocco.',
};

export default function CancellationPage() {
  return (
    <div>
      <h1>Cancellation Policy</h1>
      <p>Last updated: June 1, 2024</p>

      <h2>1. General Policy</h2>
      <p>MarHire aims to provide a flexible and fair cancellation policy. The specific cancellation terms for each booking are determined by the partner providing the service and are clearly displayed on the listing page before you book.</p>

      <h2>2. Free Cancellation</h2>
      <p>Many listings on our platform are marked with a "Free Cancellation" badge. For these listings, you can cancel your booking free of charge up to a certain time before the scheduled start time (e.g., 24 or 48 hours). Please check the specific listing's details for the exact cancellation window.</p>
      
      <h2>3. How to Cancel</h2>
      <p>To cancel a booking, please contact our support team via WhatsApp or email with your booking reference number. Our team will process your cancellation and confirm it with you. If a refund is due, it will be processed to your original payment method within 5-10 business days.</p>
      
      <h2>4. Non-Refundable Bookings</h2>
      <p>Some bookings, especially those with special offers or during high-demand periods, may be non-refundable. This will be clearly stated on the listing page at the time of booking. If you do not show up for your booking without prior cancellation, no refund will be issued.</p>
    </div>
  );
}
