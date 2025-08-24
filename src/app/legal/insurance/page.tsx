
import * as React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Insurance Conditions | MarHire',
  description: 'Understand the insurance conditions for car rentals and other services booked through MarHire in Morocco.',
};

export default function InsurancePage() {
  return (
    <div>
      <h1>Insurance Conditions</h1>
      <p>Last updated: June 1, 2024</p>

      <h2>1. Car Rental Insurance</h2>
      <p>All car rentals booked through MarHire include basic insurance as required by Moroccan law. This typically includes Third-Party Liability (TPL) coverage.</p>
      <p>The details of the insurance coverage, including the excess (deductible) amount in case of damage or theft, are specified by the rental agency and available on the listing page. We strongly recommend reading these details carefully.</p>

      <h2>2. Additional Coverage (CDW/SCDW)</h2>
      <p>Many partners offer additional insurance options such as Collision Damage Waiver (CDW) or Super Collision Damage Waiver (SCDW) at an extra cost. These options can reduce or eliminate the excess you would be liable for in the event of an accident.</p>

      <h2>3. Security Deposit</h2>
      <p>A security deposit is often required by the rental agency to cover any potential excess, fines, or fuel charges. The amount is blocked on your credit card and released after the vehicle is returned in good condition. Some of our partners offer no-deposit options, which will be clearly marked.</p>

      <h2>4. Insurance for Other Services</h2>
      <p>For private drivers, boats, and activities, the insurance coverage is provided by the partner operator. MarHire verifies that all partners have the necessary liability insurance for their operations. Please refer to the specific terms provided by the partner for details on their coverage.</p>
    </div>
  );
}
