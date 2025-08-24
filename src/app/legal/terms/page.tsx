
import * as React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms & Conditions | MarHire',
  description: 'Read the terms and conditions for using the MarHire marketplace for car rentals, private drivers, boats, and activities in Morocco.',
};

export default function TermsPage() {
  return (
    <div>
      <h1>Terms & Conditions</h1>
      <p>Last updated: June 1, 2024</p>
      
      <h2>1. Introduction</h2>
      <p>Welcome to MarHire. These are our terms and conditions for use of the services, which you may access in several ways, including but not limited to the World Wide Web via marhire.com, and mobile phones. In these terms and conditions, when we say "MarHire Site" we mean the digital information network operated by or on behalf of MarHire LLC, regardless of how you access the network.</p>

      <h2>2. Use of the Service</h2>
      <p>By using the MarHire Site, you agree to be bound by these terms. If you do not agree to be bound by all of the following terms please do not access, use and/or contribute to the MarHire Site.</p>
      
      <h2>3. Changes to these Terms</h2>
      <p>MarHire may change these terms from time to time and so you should check these terms regularly. Your continued use of the MarHire Site will be deemed acceptance of the updated or amended terms.</p>

      <h2>4. Intellectual Property</h2>
      <p>All copyright, trade marks, design rights, patents and other intellectual property rights (registered and unregistered) in and on the MarHire Site and all content located on the site shall remain vested in MarHire or its licensors.</p>

      <h2>5. Disclaimers and Limitation of Liability</h2>
      <p>The MarHire Site content, including the information, names, images, pictures, logos and icons regarding or relating to MarHire, its products and services, is provided "AS IS" and on an "AS AVAILABLE" basis. To the extent permitted by law, MarHire excludes all representations and warranties (whether express or implied by law), including the implied warranties of satisfactory quality, fitness for a particular purpose, non-infringement, compatibility, security and accuracy.</p>
    </div>
  );
}
