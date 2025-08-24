
import * as React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy | MarHire',
  description: 'Learn how MarHire collects, uses, and protects your personal data when you use our services in Morocco.',
};

export default function PrivacyPage() {
  return (
    <div>
      <h1>Privacy Policy</h1>
      <p>Last updated: June 1, 2024</p>

      <h2>1. Information We Collect</h2>
      <p>We may collect personal information that you provide to us, such as your name, email address, phone number, and payment information when you make a booking. We also collect information automatically when you use our site, such as your IP address and browsing behavior.</p>

      <h2>2. How We Use Your Information</h2>
      <p>We use the information we collect to provide and improve our services, process your bookings, communicate with you, and for security purposes. We will not share your personal information with third parties except as necessary to provide our services or as required by law.</p>

      <h2>3. Data Security</h2>
      <p>We implement a variety of security measures to maintain the safety of your personal information. Your personal information is contained behind secured networks and is only accessible by a limited number of persons who have special access rights to such systems, and are required to keep the information confidential.</p>

      <h2>4. Your Rights</h2>
      <p>You have the right to access, correct, or delete your personal information. You can also object to or restrict the processing of your data. To exercise these rights, please contact us at info@marhire.com.</p>
    </div>
  );
}
