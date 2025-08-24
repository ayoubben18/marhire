
import * as React from 'react';
import { Check, FileText } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import type { Partner, Category } from '@/lib/partners';
import { Section } from './Section';

type PolicyItemProps = {
  title: string;
  children: React.ReactNode;
};

const PolicyItem = ({ title, children }: PolicyItemProps) => (
    <li className="flex items-start gap-4">
        <Check className="h-5 w-5 flex-shrink-0 text-primary mt-1" />
        <div>
            <h4 className="font-semibold text-foreground">{title}</h4>
            <p className="text-sm text-muted-foreground">{children}</p>
        </div>
    </li>
);

const carPolicies = [
    { 
        title: "Deposit & Payment", 
        text: "No-deposit is available on many economy cars. A standard refundable security deposit on a credit card may be required for premium vehicles, as stated on the listing." 
    },
    { 
        title: "Fuel Policy", 
        text: "The standard policy is 'Same-to-Same.' You receive the car with a certain level of fuel and are expected to return it with the same amount to avoid refueling charges."
    },
    { 
        title: "Kilometer Policy", 
        text: "Unlimited kilometers are typically included for rentals of 3 days or more. Shorter rentals may have a daily limit (e.g., 250km/day), which will be specified on the listing." 
    },
    { 
        title: "Required Documents", 
        text: "A valid driver's license (held for at least one year), your passport/ID, and the MarHire booking voucher. An International Driving Permit (IDP) is highly recommended." 
    },
];

const driverPolicies = [
    {
        title: "Pricing Model",
        text: "The price is per vehicle for the agreed-upon service (e.g., airport transfer, day trip), not per person. It includes the driver, vehicle, and fuel costs."
    },
    {
        title: "Airport Transfers",
        text: "Includes flight monitoring by the driver. They will wait for you in the arrivals hall with a sign bearing your name, even if your flight is delayed."
    },
    {
        title: "Luggage Capacity",
        text: "Each vehicle has a specified luggage capacity. Please inform MarHire support at the time of booking if you have excess or oversized luggage to ensure a suitable vehicle is provided."
    },
     {
        title: "Multi-day & Intercity Tours",
        text: "For multi-day tours, the quoted price typically includes the driver's accommodation and meals. All details will be confirmed before booking."
    },
];

const boatPolicies = [
    {
        title: "Captain & Crew",
        text: "Most of our boat and yacht rentals include the services of a professional, licensed skipper and crew for your safety and convenience. This will be clearly stated on the listing."
    },
    {
        title: "Bad Weather Policy",
        text: "Safety is our absolute priority. If the captain determines that sea conditions are unsafe, you will be offered the choice to reschedule for another day at no cost or receive a full refund."
    },
    {
        title: "Fuel Inclusion",
        text: "For standard half-day or full-day tours, a basic fuel allowance is included. For private, customized charters, fuel may be charged based on consumption at the end of the trip."
    },
    {
        title: "Food & Beverages",
        text: "You are typically welcome to bring your own snacks and drinks. Some luxury charters offer catering packages as an optional add-on. Please check the listing for details."
    },
];

const activityPolicies = [
    {
        title: "Guides & Instructors",
        text: "All activities are led by official, licensed local guides or certified instructors who are experts in their field and prioritize your safety and enjoyment."
    },
    {
        title: "Hotel Pickup & Drop-off",
        text: "Many tours include complimentary pickup from centrally located hotels. Please verify on the listing page if this service is available for your accommodation and provide details during checkout."
    },
    {
        title: "Safety & Equipment",
        text: "All necessary safety equipment (e.g., helmets, life jackets) is provided and meets local standards. Any age or physical restrictions will be clearly noted on the listing."
    },
    {
        title: "What to Wear",
        text: "We recommend comfortable clothing suitable for the activity. For desert tours, closed-toe shoes are required. Specific recommendations will be provided on your booking voucher."
    },
];

const commonPolicies = [
     { 
        title: "Booking Changes & Cancellations", 
        text: "All changes and cancellations must be handled through MarHire's central support team. Please contact them via WhatsApp or email with your booking reference number. Cancellation policies are displayed on the listing page." 
    },
];

const getPoliciesForCategory = (category: Category) => {
    switch(category) {
        case 'Cars': return carPolicies;
        case 'Private Drivers': return driverPolicies;
        case 'Boats': return boatPolicies;
        case 'Activities': return activityPolicies;
        default: return [];
    }
}

export function Policies({ partner }: { partner: Partner }) {
    const categoryPolicies = getPoliciesForCategory(partner.category);
    const allPolicies = [...categoryPolicies, ...commonPolicies];

    return (
        <Section
            icon={FileText}
            title="Agency Policies"
        >
            <div className="container max-w-4xl p-0">
                <Card className="rounded-2xl bg-card">
                    <CardContent className="p-6">
                        <ul className="space-y-4">
                            {allPolicies.map(policy => (
                                <PolicyItem key={policy.title} title={policy.title}>
                                    {policy.text}
                                </PolicyItem>
                            ))}
                        </ul>
                    </CardContent>
                </Card>
            </div>
        </Section>
    );
}
