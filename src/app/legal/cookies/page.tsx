
import * as React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Cookie Policy | MarHire',
  description: 'Understand how MarHire uses cookies to enhance your browsing experience on our marketplace.',
};

export default function CookiePage() {
  return (
    <div>
      <h1>Cookie Policy</h1>
      <p>Last updated: June 1, 2024</p>

      <h2>1. What Are Cookies?</h2>
      <p>Cookies are small text files that are placed on your computer or mobile device when you visit a website. They are widely used to make websites work, or work more efficiently, as well as to provide information to the owners of the site.</p>

      <h2>2. How We Use Cookies</h2>
      <p>We use cookies to enhance your browsing experience by:</p>
      <ul>
        <li>Remembering your settings, so you don’t have to re-enter them on every visit.</li>
        <li>Understanding how you use our site, which helps us to improve it.</li>
        <li>Providing you with relevant advertising.</li>
      </ul>

      <h2>3. Types of Cookies We Use</h2>
      <p>We use both session cookies (which expire once you close your web browser) and persistent cookies (which stay on your device for a set period or until you delete them). We use the following types of cookies:</p>
      <ul>
        <li><strong>Strictly Necessary Cookies:</strong> These are essential for you to browse the website and use its features, such as accessing secure areas of the site.</li>
        <li><strong>Performance Cookies:</strong> These collect information about how you use our website, like which pages you visited and which links you clicked on.</li>
        <li><strong>Functionality Cookies:</strong> These are used to recognize you when you return to our website.</li>
        <li><strong>Targeting Cookies:</strong> These cookies record your visit to our website, the pages you have visited and the links you have followed.</li>
      </ul>

      <h2>4. Managing Cookies</h2>
      <p>You can control and/or delete cookies as you wish – for details, see aboutcookies.org. You can delete all cookies that are already on your computer and you can set most browsers to prevent them from being placed.</p>
    </div>
  );
}
