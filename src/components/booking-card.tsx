

"use client";

import * as React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Calendar as CalendarIcon, Users, Minus, Plus, ArrowLeft, Clock, Hourglass, Sailboat, Utensils, Waves, Sun, CheckCircle, Shield, Camera, Car, Shuffle, Route, Briefcase, MessageSquare } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import type { Listing, SearchParams } from '@/lib/types';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Checkbox } from './ui/checkbox';
import { Progress } from './ui/progress';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useToast } from '@/hooks/use-toast';
import Link from 'next/link';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";


const FormSchema = z.object({
    fullname: z.string().min(2, { message: "Name must be at least 2 characters." }),
    email: z.string().email({ message: "Please enter a valid email." }),
    whatsapp: z.string().min(10, { message: "Please enter a valid phone number." }),
    country: z.string().min(2, { message: "Please select your country." }),
    dob: z.date({ required_error: "Date of birth is required." }),
    flightNumber: z.string().optional(),
    notes: z.string().optional(),
    terms: z.boolean().refine(val => val === true, { message: "You must accept the terms and conditions." }),
});

type FormValues = z.infer<typeof FormSchema>;

const cities = ["Agadir", "Casablanca", "Marrakech", "Fez", "Tangier"];
const timeSlots = Array.from({ length: 24 }, (_, i) => `${String(i).padStart(2, '0')}:00`);

const carAddOns = [
    { id: 'booster', label: 'Booster Seat', price: 15 },
    { id: 'child_seat', label: 'Child Seat', price: 20 },
    { id: 'extra_driver', label: 'Extra Driver', price: 10 },
];
const boatAddOns = [
    { id: 'sunset', label: 'Sunset Cruise Upgrade', price: 50 },
    { id: 'chef', label: 'Private Chef', price: 150 },
    { id: 'sports', label: 'Water Sports Equipment', price: 75 },
];
const activityAddOns = [
    { id: 'tea', label: 'Offer Moroccan tea', price: 24 },
    { id: 'safety', label: 'Insurance or Safety', price: 24 },
    { id: 'souvenir', label: 'Photo & Video Souvenir Package', price: 23 },
];
const driverAddOns = [
    { id: 'child_seat_driver', label: 'Child Seat', price: 12 },
    { id: 'guide', label: 'Multilingual Tour Guide', price: 23 },
    { id: 'wifi', label: 'Wi-Fi Onboard', price: 33 },
];

const allAddOns = [...carAddOns, ...boatAddOns, ...activityAddOns, ...driverAddOns];

const getInitialDate = (dateParam?: string) => {
    if (!dateParam) return undefined;
    const date = new Date(dateParam);
    return isNaN(date.getTime()) ? undefined : date;
};

export function BookingCard({ listing, searchParams }: { listing: Listing, searchParams?: SearchParams }) {
    const { toast } = useToast();
    const [step, setStep] = React.useState(1);
    const [whatsAppHref, setWhatsAppHref] = React.useState('');
    
    // Common State
    const [dateRange, setDateRange] = React.useState<{ from?: Date; to?: Date }>({
        from: getInitialDate(searchParams?.pickupDate),
        to: getInitialDate(searchParams?.dropoffDate),
    });
    const [guests, setGuests] = React.useState(searchParams?.people ? parseInt(searchParams.people, 10) : 1);
    const [selectedAddOns, setSelectedAddOns] = React.useState<string[]>([]);
    const [pickupTime, setPickupTime] = React.useState<string | undefined>(searchParams?.pickupTime);

    // Car Rental State
    const [dropoffTime, setDropoffTime] = React.useState<string | undefined>(searchParams?.dropoffTime);
    const [dropoffCity, setDropoffCity] = React.useState<string>(searchParams?.dropoffLocation || listing.location.city);
    
    // Boat Rental State
    const [duration, setDuration] = React.useState(1);

    // Private Driver State
    const [serviceType, setServiceType] = React.useState('transfer');
    const [roadType, setRoadType] = React.useState('one-way');
    const [luggage, setLuggage] = React.useState(0);
    
    const form = useForm<FormValues>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            fullname: "",
            email: "",
            whatsapp: "",
            country: "",
            flightNumber: "",
            notes: "",
            terms: false,
        },
    });


    React.useEffect(() => {
        const getWhatsAppMessage = () => {
          const listingUrl = window.location.href;
          const message = `Hi MarHire team,\nI’m interested in the following listing:\nListing Title: ${listing.name}\nListing Link: ${listingUrl}\nCould you please confirm availability, price, and provide any additional details?`;
          return encodeURIComponent(message);
        }
        setWhatsAppHref(`https://wa.me/212660745055?text=${getWhatsAppMessage()}`);
      }, [listing.id, listing.name]);

    const handleAddOnToggle = (addOnId: string) => {
        setSelectedAddOns(prev => 
            prev.includes(addOnId) 
                ? prev.filter(id => id !== addOnId)
                : [...prev, addOnId]
        );
    };

    const getAddOnsForCategory = () => {
        switch (listing.type) {
            case 'Car Rental': return carAddOns;
            case 'Boat': return boatAddOns;
            case 'Activity': return activityAddOns;
            case 'Private Driver': return driverAddOns;
            default: return [];
        }
    }

    const getPriceLabel = () => {
        const PriceDisplay = ({ value, unit }: { value: number, unit: string }) => (
            <div>
                <p className="text-sm text-muted-foreground">Start from</p>
                <p className="text-3xl font-bold text-foreground">
                    €{value}
                    <span className="text-base font-normal text-muted-foreground">{unit}</span>
                </p>
            </div>
        );

        switch (listing.type) {
            case 'Car Rental':
                return <PriceDisplay value={listing.price.perDay} unit="/day" />;
            case 'Boat':
                if (listing.price.perHour) {
                    return <PriceDisplay value={listing.price.perHour} unit="/hour" />;
                }
                return <PriceDisplay value={listing.price.perDay} unit="/day" />;
            case 'Activity':
                return <PriceDisplay value={listing.price.perDay} unit="/person" />;
            case 'Private Driver':
                if (listing.price.perTrip) {
                    return <PriceDisplay value={listing.price.perTrip} unit="/trip" />;
                }
                return <PriceDisplay value={listing.price.perDay} unit="/day" />;
            default:
                return <PriceDisplay value={listing.price.perDay} unit="/day" />;
        }
    };
    
    const numberOfDays = dateRange.from && dateRange.to ? (dateRange.to.getTime() - dateRange.from.getTime()) / (1000 * 3600 * 24) + 1 : 1;
    const pricePerDayOrTrip = listing.price.perDay || listing.price.perTrip || 0;
    const pricePerHour = listing.price.perHour || 0;

    const addOnsTotal = selectedAddOns.reduce((total, addOnId) => {
        const addOn = allAddOns.find(a => a.id === addOnId);
        return total + (addOn ? addOn.price : 0);
    }, 0);

    const calculateTotal = () => {
        let basePrice = 0;
        switch(listing.type) {
            case 'Activity':
                basePrice = pricePerDayOrTrip * guests;
                break;
            case 'Car Rental':
                basePrice = pricePerDayOrTrip * Math.max(1, numberOfDays);
                break;
            case 'Boat':
                basePrice = pricePerHour * duration;
                break;
            case 'Private Driver':
                basePrice = pricePerDayOrTrip; // Assuming perDay is used for trips, or perTrip if available
                break;
            default:
                 basePrice = pricePerDayOrTrip * Math.max(1, numberOfDays);
                 break;
        }
        return basePrice + addOnsTotal;
    }

    const totalPrice = calculateTotal();

    const handleNext = () => setStep(2);
    const handleBack = () => setStep(1);

    const renderCarRentalStep1 = () => (
        <>
            <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                    <Label>Pickup Date*</Label>
                    <Popover>
                        <PopoverTrigger asChild>
                            <Button variant="outline" className={cn("w-full justify-start text-left font-normal", !dateRange.from && "text-muted-foreground")}>
                                <CalendarIcon className="mr-2 h-4 w-4" />
                                {dateRange.from ? format(dateRange.from, "PPP") : <span>Select date</span>}
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0"><Calendar mode="single" selected={dateRange.from} onSelect={(day) => setDateRange(prev => ({...prev, from: day}))} initialFocus /></PopoverContent>
                    </Popover>
                </div>
                 <div className="space-y-2">
                    <Label>Dropoff Date*</Label>
                    <Popover>
                        <PopoverTrigger asChild>
                             <Button variant="outline" className={cn("w-full justify-start text-left font-normal", !dateRange.to && "text-muted-foreground")}>
                                <CalendarIcon className="mr-2 h-4 w-4" />
                                {dateRange.to ? format(dateRange.to, "PPP") : <span>Select date</span>}
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0"><Calendar mode="single" selected={dateRange.to} onSelect={(day) => setDateRange(prev => ({...prev, to: day}))} initialFocus /></PopoverContent>
                    </Popover>
                </div>
                <div className="space-y-2">
                    <Label>Pickup City*</Label>
                    <Select defaultValue={listing.location.city} disabled>
                        <SelectTrigger><SelectValue /></SelectTrigger>
                    </Select>
                    <p className="text-xs text-muted-foreground">Pickup must be in {listing.location.city}</p>
                </div>
                <div className="space-y-2">
                    <Label>Dropoff City*</Label>
                    <Select value={dropoffCity} onValueChange={setDropoffCity}>
                        <SelectTrigger><SelectValue placeholder="Select dropoff city" /></SelectTrigger>
                        <SelectContent>
                            {cities.map(city => <SelectItem key={city} value={city}>{city}</SelectItem>)}
                        </SelectContent>
                    </Select>
                </div>
                 <div className="space-y-2">
                    <Label>Pickup Time*</Label>
                    <Select value={pickupTime} onValueChange={setPickupTime}>
                        <SelectTrigger>
                             <Clock className="mr-2 h-4 w-4 text-muted-foreground" />
                             <SelectValue placeholder="Select Time" />
                        </SelectTrigger>
                        <SelectContent>
                            {timeSlots.map(time => <SelectItem key={time} value={time}>{time}</SelectItem>)}
                        </SelectContent>
                    </Select>
                </div>
                <div className="space-y-2">
                    <Label>Dropoff Time*</Label>
                     <Select value={dropoffTime} onValueChange={setDropoffTime}>
                        <SelectTrigger>
                             <Clock className="mr-2 h-4 w-4 text-muted-foreground" />
                             <SelectValue placeholder="Select Time" />
                        </SelectTrigger>
                        <SelectContent>
                            {timeSlots.map(time => <SelectItem key={time} value={time}>{time}</SelectItem>)}
                        </SelectContent>
                    </Select>
                </div>
            </div>
        </>
    );

    const renderBoatRentalStep1 = () => (
        <div className="space-y-4">
             <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2 col-span-2">
                    <Label>Rental Date*</Label>
                    <Popover>
                        <PopoverTrigger asChild>
                            <Button variant="outline" className={cn("w-full justify-start text-left font-normal", !dateRange.from && "text-muted-foreground")}>
                                <CalendarIcon className="mr-2 h-4 w-4" />
                                {dateRange.from ? format(dateRange.from, "PPP") : <span>Select date</span>}
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0"><Calendar mode="single" selected={dateRange.from} onSelect={(day) => setDateRange({ from: day, to: day })} initialFocus /></PopoverContent>
                    </Popover>
                </div>
                <div className="space-y-2">
                    <Label>Pickup Time*</Label>
                    <Select value={pickupTime} onValueChange={setPickupTime}>
                        <SelectTrigger><Clock className="mr-2 h-4 w-4 text-muted-foreground" /><SelectValue placeholder="Select Time" /></SelectTrigger>
                        <SelectContent>
                             {Array.from({ length: 13 }, (_, i) => `${String(i + 8).padStart(2, '0')}:00`).map(time => <SelectItem key={time} value={time}>{time}</SelectItem>)}
                        </SelectContent>
                    </Select>
                </div>
                <div className="space-y-2">
                    <Label>Duration*</Label>
                    <div className="flex items-center justify-between rounded-lg border p-2 h-10 w-full">
                        <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => setDuration(d => Math.max(1, d - 1))}><Minus className="h-4 w-4" /></Button>
                        <div className="flex items-center gap-2"><Hourglass className="h-4 w-4 text-muted-foreground" /><span className="font-medium text-sm">{duration} {duration > 1 ? 'hours' : 'hour'}</span></div>
                        <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => setDuration(d => d + 1)}><Plus className="h-4 w-4" /></Button>
                    </div>
                </div>
            </div>
            <div className="space-y-2">
                <Label>Number of People*</Label>
                <div className="flex items-center justify-between rounded-lg border p-2 h-10 w-full">
                    <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => setGuests(p => Math.max(1, p - 1))} disabled={guests <= 1}><Minus className="h-4 w-4" /></Button>
                    <div className="flex items-center gap-2"><Users className="h-4 w-4 text-muted-foreground" /><span className="font-medium text-sm">{guests} {guests > 1 ? 'people' : 'person'}</span></div>
                    <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => setGuests(p => p + 1)} disabled={guests >= (listing.specs.seats || 100)}><Plus className="h-4 w-4" /></Button>
                </div>
                <p className="text-xs text-muted-foreground text-center">Max capacity: {listing.specs.seats}</p>
            </div>
        </div>
    );

    const renderActivityStep1 = () => (
         <div className="space-y-4">
             <div className="grid grid-cols-1 gap-4">
                <div className="space-y-2">
                    <Label>Activity Date*</Label>
                    <Popover>
                        <PopoverTrigger asChild>
                            <Button variant="outline" className={cn("w-full justify-start text-left font-normal", !dateRange.from && "text-muted-foreground")}>
                                <CalendarIcon className="mr-2 h-4 w-4" />
                                {dateRange.from ? format(dateRange.from, "PPP") : <span>Select date</span>}
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0"><Calendar mode="single" selected={dateRange.from} onSelect={(day) => setDateRange({ from: day, to: day })} initialFocus /></PopoverContent>
                    </Popover>
                </div>
                 <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label>Time Preference*</Label>
                        <Select>
                            <SelectTrigger><Sun className="mr-2 h-4 w-4 text-muted-foreground" /><SelectValue placeholder="Select Time" /></SelectTrigger>
                            <SelectContent>
                                <SelectItem value="morning">Morning</SelectItem>
                                <SelectItem value="afternoon">Afternoon</SelectItem>
                                <SelectItem value="evening">Evening</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="space-y-2">
                        <Label>Activity Options*</Label>
                        <Select defaultValue={listing.specs.activityType}>
                            <SelectTrigger><CheckCircle className="mr-2 h-4 w-4 text-muted-foreground" /><SelectValue /></SelectTrigger>
                            <SelectContent>
                                <SelectItem value="Group">Group</SelectItem>
                                <SelectItem value="Private">Private</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                 </div>
            </div>
            <div className="space-y-2">
                <Label>Number of People*</Label>
                <div className="flex items-center justify-between rounded-lg border p-2 h-10 w-full">
                    <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => setGuests(p => Math.max(1, p - 1))} disabled={guests <= 1}><Minus className="h-4 w-4" /></Button>
                    <div className="flex items-center gap-2"><Users className="h-4 w-4 text-muted-foreground" /><span className="font-medium text-sm">{guests} {guests > 1 ? 'people' : 'person'}</span></div>
                    <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => setGuests(p => p + 1)}><Plus className="h-4 w-4" /></Button>
                </div>
                 <p className="text-xs text-muted-foreground text-center">Price is per person</p>
            </div>
        </div>
    );
    
    const renderDriverStep1 = () => (
         <div className="space-y-4">
             <div className="grid grid-cols-1 gap-4">
                <div className="space-y-2">
                    <Label>Service Date*</Label>
                     <Popover>
                        <PopoverTrigger asChild>
                            <Button variant="outline" className={cn("w-full justify-start text-left font-normal", !dateRange.from && "text-muted-foreground")}>
                                <CalendarIcon className="mr-2 h-4 w-4" />
                                {dateRange.from ? format(dateRange.from, "PPP") : <span>Select date</span>}
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0"><Calendar mode="single" selected={dateRange.from} onSelect={(day) => setDateRange({ from: day, to: day })} initialFocus /></PopoverContent>
                    </Popover>
                </div>
                 <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label>Service Type</Label>
                        <Select value={serviceType} onValueChange={setServiceType}>
                            <SelectTrigger><Shuffle className="mr-2 h-4 w-4 text-muted-foreground" /><SelectValue /></SelectTrigger>
                            <SelectContent>
                                <SelectItem value="transfer">Airport Transfer</SelectItem>
                                <SelectItem value="intercity">Intercity</SelectItem>
                            </SelectContent>
                        </Select>
                        {serviceType === 'intercity' && <p className='text-xs text-destructive'>This driver does not support intercity services</p>}
                    </div>
                     <div className="space-y-2">
                        <Label>Road Type</Label>
                        <RadioGroup defaultValue="one-way" className="flex items-center pt-2 gap-4" value={roadType} onValueChange={setRoadType}>
                            <div className="flex items-center space-x-2"><RadioGroupItem value="one-way" id="one-way" /><Label htmlFor="one-way" className='font-normal'>One Way</Label></div>
                            <div className="flex items-center space-x-2"><RadioGroupItem value="round-trip" id="round-trip" /><Label htmlFor="round-trip" className='font-normal'>Round Trip</Label></div>
                        </RadioGroup>
                    </div>
                 </div>
                 <div className="space-y-2">
                    <Label>Pickup Time*</Label>
                    <Select value={pickupTime} onValueChange={setPickupTime}>
                        <SelectTrigger><Clock className="mr-2 h-4 w-4 text-muted-foreground" /><SelectValue placeholder="Select Time" /></SelectTrigger>
                        <SelectContent>{timeSlots.map(time => <SelectItem key={time} value={time}>{time}</SelectItem>)}</SelectContent>
                    </Select>
                </div>
                 <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label>Number of Passengers</Label>
                        <div className="flex items-center justify-between rounded-lg border p-2 h-10 w-full">
                            <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => setGuests(p => Math.max(1, p - 1))} disabled={guests <= 1}><Minus className="h-4 w-4" /></Button>
                            <div className="flex items-center gap-2"><Users className="h-4 w-4 text-muted-foreground" /><span className="font-medium text-sm">{guests}</span></div>
                            <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => setGuests(p => p + 1)} disabled={guests >= (listing.specs.seats || 100)}><Plus className="h-4 w-4" /></Button>
                        </div>
                        <p className="text-xs text-muted-foreground text-center">Max allowed: {listing.specs.seats}</p>
                    </div>
                    <div className="space-y-2">
                        <Label>Number of Luggage</Label>
                        <div className="flex items-center justify-between rounded-lg border p-2 h-10 w-full">
                            <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => setLuggage(l => Math.max(0, l - 1))} disabled={luggage <= 0}><Minus className="h-4 w-4" /></Button>
                            <div className="flex items-center gap-2"><Briefcase className="h-4 w-4 text-muted-foreground" /><span className="font-medium text-sm">{luggage}</span></div>
                            <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => setLuggage(l => l + 1)} disabled={luggage >= (listing.specs.luggage || 100)}><Plus className="h-4 w-4" /></Button>
                        </div>
                        <p className="text-xs text-muted-foreground text-center">Max allowed: {listing.specs.luggage}</p>
                    </div>
                 </div>
            </div>
        </div>
    );

    const renderDefaultStep1 = () => {
        // Fallback for any new/unhandled category
        return <p>Booking options for this category are not yet available.</p>
    };

    const renderCategorySpecificStep1 = () => {
        switch (listing.type) {
            case 'Car Rental': return renderCarRentalStep1();
            case 'Boat': return renderBoatRentalStep1();
            case 'Activity': return renderActivityStep1();
            case 'Private Driver': return renderDriverStep1();
            default: return renderDefaultStep1();
        }
    }
    
    const renderSummaryLine = () => {
        switch(listing.type) {
            case 'Car Rental':
                return <span>€{pricePerDayOrTrip} x {Math.max(1, numberOfDays)} day(s)</span>;
            case 'Boat':
                return <span>€{pricePerHour} x {duration} hour(s)</span>;
            case 'Activity':
                return <span>€{pricePerDayOrTrip} x {guests} person(s)</span>;
            case 'Private Driver':
                 return <span>Base trip price</span>;
            default:
                return <span>€{pricePerDayOrTrip} x {Math.max(1, numberOfDays)} day(s)</span>;
        }
    }

     const renderSummaryValue = () => {
        let basePrice = 0;
        switch(listing.type) {
             case 'Car Rental':
                basePrice = pricePerDayOrTrip * Math.max(1, numberOfDays);
                break;
            case 'Boat':
                basePrice = pricePerHour * duration;
                break;
            case 'Activity':
                basePrice = pricePerDayOrTrip * guests;
                break;
            case 'Private Driver':
                basePrice = pricePerDayOrTrip;
                break;
            default:
                basePrice = pricePerDayOrTrip * Math.max(1, numberOfDays);
                break;
        }
        return <span>€{basePrice.toFixed(2)}</span>
    }
    
    const PriceSummary = () => (
        <div className="space-y-2 pt-4">
            <Separator />
            <div className="space-y-2 pt-2">
                <div className="flex justify-between">
                    {renderSummaryLine()}
                    {renderSummaryValue()}
                </div>
                
                {selectedAddOns.length > 0 && (
                    <div className="space-y-1 pt-1">
                        <p className="text-sm font-medium">Add-ons</p>
                        {selectedAddOns.map(addOnId => {
                            const addOn = allAddOns.find(a => a.id === addOnId);
                            if (!addOn) return null;
                            return (
                                <div key={addOn.id} className="flex justify-between text-muted-foreground text-sm">
                                    <span>{addOn.label}</span>
                                    <span>€{addOn.price.toFixed(2)}</span>
                                </div>
                            );
                        })}
                    </div>
                )}
                
                <div className="flex justify-between text-muted-foreground text-sm">
                    <span>TAX</span>
                    <span>Included</span>
                </div>
                {listing.type === 'Car Rental' && (
                    <div className="flex justify-between text-muted-foreground text-sm">
                        <span>Full Insurance (With Excess)</span>
                        <span>Included</span>
                    </div>
                )}

            </div>
            <Separator />
            <div className="flex justify-between font-bold pt-2">
                <span>Total</span>
                <span>€{totalPrice.toFixed(2)}</span>
            </div>
        </div>
    );

    const Step1 = (
        <>
            <CardHeader>
                {getPriceLabel()}
            </CardHeader>
            <CardContent className="space-y-4">
                {renderCategorySpecificStep1()}
                
                <div className="space-y-2 pt-4">
                    <Label>Add-ons</Label>
                    <div className='space-y-2'>
                        {getAddOnsForCategory().map(addon => (
                            <div key={addon.id} className="flex items-center justify-between rounded-lg border p-3">
                                <Label htmlFor={addon.id} className="font-normal flex items-center gap-2">
                                    <Checkbox id={addon.id} onCheckedChange={() => handleAddOnToggle(addon.id)} checked={selectedAddOns.includes(addon.id)} />
                                    {addon.label}
                                </Label>
                                <span className='text-sm font-medium'>€{addon.price}</span>
                            </div>
                        ))}
                    </div>
                </div>
                
                <div className="space-y-2">
                    <Button size="lg" className="w-full h-12 text-base" onClick={handleNext}>Continue</Button>
                    <Button asChild size="lg" variant="outline" className="w-full h-12 text-base border-green-600/50 text-green-700 hover:bg-green-500/10 hover:text-green-700">
                        <Link href={whatsAppHref} target="_blank">
                            <MessageSquare className="mr-2 h-5 w-5" />
                            Contact on WhatsApp
                        </Link>
                    </Button>
                </div>

                <p className="text-center text-sm text-muted-foreground">You won't be charged yet</p>
                <PriceSummary />
            </CardContent>
        </>
    );

    const onFormSubmit = (data: FormValues) => {
        console.log(data);
        toast({
            title: "Reservation Confirmed!",
            description: "Thank you for booking with MarHire. We've sent a confirmation to your email.",
        });
        setStep(1); 
        form.reset();
    };

    const Step2 = (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onFormSubmit)}>
                <CardHeader>
                    <div className="flex items-center gap-3">
                        <Button variant="ghost" size="icon" className="h-8 w-8" type="button" onClick={handleBack}>
                            <ArrowLeft className="h-5 w-5" />
                        </Button>
                        <CardTitle className="text-2xl">Your Information</CardTitle>
                    </div>
                </CardHeader>
                <CardContent className="space-y-4">
                    <FormField control={form.control} name="fullname" render={({ field }) => (
                        <FormItem><FormLabel>Full Name*</FormLabel><FormControl><Input placeholder="John Doe" {...field} /></FormControl><FormMessage /></FormItem>
                    )} />
                    <FormField control={form.control} name="email" render={({ field }) => (
                        <FormItem><FormLabel>Email*</FormLabel><FormControl><Input type="email" placeholder="john@example.com" {...field} /></FormControl><FormMessage /></FormItem>
                    )} />
                    <FormField control={form.control} name="whatsapp" render={({ field }) => (
                        <FormItem><FormLabel>WhatsApp Number*</FormLabel><FormControl><Input placeholder="+1 234 567 8900" {...field} /></FormControl><FormMessage /></FormItem>
                    )} />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormField control={form.control} name="country" render={({ field }) => (
                            <FormItem><FormLabel>Country of Residence*</FormLabel><FormControl><Input placeholder="Select your country" {...field} /></FormControl><FormMessage /></FormItem>
                        )} />
                        <FormField control={form.control} name="dob" render={({ field }) => (
                             <FormItem><FormLabel>Date of Birth*</FormLabel><Popover><PopoverTrigger asChild><FormControl>
                                <Button variant="outline" className={cn("w-full justify-start text-left font-normal", !field.value && "text-muted-foreground")}>
                                    <CalendarIcon className="mr-2 h-4 w-4" />{field.value ? format(field.value, "PPP") : <span>Select date</span>}
                                </Button></FormControl></PopoverTrigger><PopoverContent className="w-auto p-0"><Calendar mode="single" selected={field.value} onSelect={field.onChange} disabled={(date) => date > new Date() || date < new Date("1900-01-01")} initialFocus /></PopoverContent></Popover><FormMessage /></FormItem>
                        )} />
                    </div>
                    <FormField control={form.control} name="flightNumber" render={({ field }) => (
                        <FormItem><FormLabel>Flight Number (Optional)</FormLabel><FormControl><Input placeholder="AA1234" {...field} /></FormControl><FormMessage /></FormItem>
                    )} />
                    <FormField control={form.control} name="notes" render={({ field }) => (
                        <FormItem><FormLabel>Additional Notes (Optional)</FormLabel><FormControl><Textarea placeholder="Any special requests or information..." {...field} /></FormControl><FormMessage /></FormItem>
                    )} />
                    
                    <PriceSummary />

                    <div className="space-y-4 pt-4">
                        <FormField control={form.control} name="terms" render={({ field }) => (
                            <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4"><FormControl><Checkbox checked={field.value} onCheckedChange={field.onChange} /></FormControl>
                                <div className="space-y-1 leading-none">
                                    <FormLabel>I agree to the Terms &amp; Conditions, Privacy Policy, and Cancellation Policy*</FormLabel>
                                </div>
                            </FormItem>
                        )} />

                        <Button size="lg" className="w-full h-12 text-base" type="submit">Confirm Reservation</Button>
                    </div>
                </CardContent>
            </form>
        </Form>
    );

    return (
        <Card className="rounded-2xl shadow-lg">
            <div className="p-6">
                <Progress value={step === 1 ? 50 : 100} className="h-2" />
                <div className="flex justify-between mt-2 text-sm font-medium text-muted-foreground">
                    <span className={cn(step >= 1 && "text-primary")}>Booking details</span>
                    <span className={cn(step >= 2 && "text-primary")}>Client Information</span>
                </div>
            </div>
            <Separator />
            {step === 1 ? Step1 : Step2}
        </Card>
    );
}

