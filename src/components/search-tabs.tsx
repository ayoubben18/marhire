
"use client"

import * as React from 'react';
import { Car, Search, MapPin, Calendar as CalendarIcon, Ship, Mountain, Users, Plus, Minus, User, X, Clock, Sun } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { format, addDays } from 'date-fns';
import { cn } from '@/lib/utils';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Label } from './ui/label';
import { handleSearch } from '../app/actions';
import { Input } from './ui/input';

const cities = ["Agadir", "Casablanca", "Marrakech", "Fez", "Tangier", "Rabat", "Essaouira"];
const timeSlots = Array.from({ length: 12 }, (_, i) => `${String(i + 8).padStart(2, '0')}:00`);

const CarRentalFields = ({ fixedLocation }: { fixedLocation?: string }) => {
  const [dateRange, setDateRange] = React.useState<{ from?: Date; to?: Date }>({
    from: new Date(),
    to: addDays(new Date(), 3)
  });
  const [pickupLocation, setPickupLocation] = React.useState<string>(fixedLocation || "all");
  const [dropoffLocation, setDropoffLocation] = React.useState<string>(fixedLocation || "same");

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 items-end gap-3 w-full">
        <div className="grid gap-1.5 lg:col-span-3">
            <Label className="text-sm font-medium">Pick-up Location</Label>
            <Select name="location" value={pickupLocation} onValueChange={setPickupLocation} disabled={!!fixedLocation}>
                <SelectTrigger className="h-12 text-base w-full text-foreground">
                    <MapPin className="mr-2 h-4 w-4 text-muted-foreground" />
                    <SelectValue placeholder="Pickup City" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="all">All Cities</SelectItem>
                    {cities.map(city => <SelectItem key={city} value={city.toLowerCase()}>{city}</SelectItem>)}
                </SelectContent>
            </Select>
        </div>

        <div className="grid gap-1.5 lg:col-span-3">
            <Label className="text-sm font-medium">Dropoff Location</Label>
            <Select name="dropoffLocation" value={dropoffLocation} onValueChange={setDropoffLocation} disabled={!!fixedLocation}>
                <SelectTrigger className="h-12 text-base w-full text-foreground">
                    <MapPin className="mr-2 h-4 w-4 text-muted-foreground" />
                    <SelectValue placeholder="Same as pickup" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="same">Same as pickup</SelectItem>
                    {cities.filter(c => c.toLowerCase() !== pickupLocation).map(city => <SelectItem key={city} value={city.toLowerCase()}>{city}</SelectItem>)}
                </SelectContent>
            </Select>
        </div>

        <div className="grid gap-1.5 lg:col-span-3">
            <Label className="text-sm font-medium">Pickup Date</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className={cn("h-12 w-full justify-start text-left font-normal text-foreground", !dateRange.from && "text-muted-foreground")}>
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {dateRange.from ? format(dateRange.from, "PPP") : <span>Select date</span>}
                  <input type="hidden" name="pickupDate" value={dateRange.from?.toISOString()} />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0"><Calendar mode="single" selected={dateRange.from} onSelect={(day) => setDateRange(prev => ({...prev, from: day}))} initialFocus /></PopoverContent>
            </Popover>
        </div>

        <div className="grid gap-1.5 lg:col-span-3">
            <Label className="text-sm font-medium">Dropoff Date</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className={cn("h-12 w-full justify-start text-left font-normal text-foreground", !dateRange.to && "text-muted-foreground")}>
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {dateRange.to ? format(dateRange.to, "PPP") : <span>Select date</span>}
                   <input type="hidden" name="dropoffDate" value={dateRange.to?.toISOString()} />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0"><Calendar mode="single" selected={dateRange.to} onSelect={(day) => setDateRange(prev => ({...prev, to: day}))} initialFocus /></PopoverContent>
            </Popover>
        </div>
    </div>
  );
}

const PrivateDriverFields = ({ fixedLocation }: { fixedLocation?: string }) => {
    const [people, setPeople] = React.useState(1);
    const [singleDate, setSingleDate] = React.useState<Date | undefined>(new Date());
    const handlePeopleChange = (amount: number) => {
        setPeople(prev => Math.max(1, prev + amount));
    };

    return (
         <div className="grid grid-cols-1 lg:grid-cols-12 items-end gap-3 w-full">
            <div className="grid gap-1.5 lg:col-span-3">
                 <Label className="text-sm font-medium">Pick-up Location</Label>
                 <Select name="location" defaultValue={fixedLocation || 'all'} disabled={!!fixedLocation}>
                    <SelectTrigger className="h-12 text-base w-full text-foreground">
                        <MapPin className="mr-2 h-4 w-4 text-muted-foreground" />
                        <SelectValue placeholder="Pickup City" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">All Cities</SelectItem>
                        {cities.map(city => <SelectItem key={city} value={city.toLowerCase()}>{city}</SelectItem>)}
                    </SelectContent>
                </Select>
            </div>
            <div className="grid gap-1.5 lg:col-span-3">
                 <Label className="text-sm font-medium">Dropoff Location</Label>
                 <Input name="dropoffLocation" className="h-12 text-base" placeholder="Airport, hotel, address..." />
            </div>
            <div className="grid gap-1.5 lg:col-span-3">
                 <Label className="text-sm font-medium">Date</Label>
                 <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className={cn("h-12 w-full justify-start text-left font-normal text-foreground", !singleDate && "text-muted-foreground")}>
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {singleDate ? format(singleDate, "PPP") : <span>Select date</span>}
                      <input type="hidden" name="pickupDate" value={singleDate?.toISOString()} />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0"><Calendar mode="single" selected={singleDate} onSelect={setSingleDate} initialFocus /></PopoverContent>
                </Popover>
            </div>
            <div className="grid gap-1.5 lg:col-span-3">
                <Label className="text-sm font-medium">Number of People</Label>
                <Popover>
                    <PopoverTrigger asChild>
                        <Button variant="outline" className="h-12 w-full justify-start text-left font-normal text-foreground">
                             <Users className="mr-2 h-4 w-4" />
                             {people} person
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-56">
                        <div className="flex items-center justify-between">
                            <Label>People</Label>
                            <div className="flex items-center justify-between rounded-lg border p-1 h-10">
                                <Button variant="ghost" size="icon" className="h-7 w-7" type="button" onClick={() => handlePeopleChange(-1)} disabled={people <= 1}><Minus className="h-4 w-4" /></Button>
                                <span className="font-medium text-sm text-foreground">{people}</span>
                                <Button variant="ghost" size="icon" className="h-7 w-7" type="button" onClick={() => handlePeopleChange(1)}><Plus className="h-4 w-4" /></Button>
                            </div>
                        </div>
                    </PopoverContent>
                </Popover>
                <input type="hidden" name="people" value={people} />
            </div>
        </div>
    )
}

const BoatRentalFields = ({ fixedLocation }: { fixedLocation?: string }) => {
    const [singleDate, setSingleDate] = React.useState<Date | undefined>(new Date());
    const [people, setPeople] = React.useState(1);
    const handlePeopleChange = (amount: number) => {
        setPeople(prev => Math.max(1, prev + amount));
    };

    return (
        <div className="grid grid-cols-1 lg:grid-cols-12 items-end gap-3 w-full">
            <div className="grid gap-1.5 lg:col-span-2">
                <Label className="text-sm font-medium">Boat Type</Label>
                 <Select name="boatType" defaultValue="any">
                    <SelectTrigger className="h-12 text-base w-full text-foreground">
                        <SelectValue placeholder="Any type" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="any">Any type</SelectItem>
                        <SelectItem value="yacht">Yacht</SelectItem>
                        <SelectItem value="speedboat">Speedboat</SelectItem>
                        <SelectItem value="luxury-yacht">Luxury Yacht</SelectItem>
                        <SelectItem value="sailboat">Sailboat</SelectItem>
                    </SelectContent>
                </Select>
            </div>
             <div className="grid gap-1.5 lg:col-span-3">
                <Label className="text-sm font-medium">Destination</Label>
                 <Select name="location" defaultValue={fixedLocation || 'all'} disabled={!!fixedLocation}>
                    <SelectTrigger className="h-12 text-base w-full text-foreground">
                        <MapPin className="mr-2 h-4 w-4 text-muted-foreground" />
                        <SelectValue placeholder="Select City" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">All Cities</SelectItem>
                        {cities.map(city => <SelectItem key={city} value={city.toLowerCase()}>{city}</SelectItem>)}
                    </SelectContent>
                </Select>
            </div>
            <div className="grid gap-1.5 lg:col-span-2">
                <Label className="text-sm font-medium">Select rental date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className={cn("h-12 w-full justify-start text-left font-normal text-foreground", !singleDate && "text-muted-foreground")}>
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {singleDate ? format(singleDate, "PPP") : <span>Select date</span>}
                      <input type="hidden" name="pickupDate" value={singleDate?.toISOString()} />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0"><Calendar mode="single" selected={singleDate} onSelect={setSingleDate} initialFocus /></PopoverContent>
                </Popover>
            </div>
            <div className="grid gap-1.5 lg:col-span-2">
                <Label className="text-sm font-medium">Time</Label>
                 <Select name="pickupTime" defaultValue="10:00">
                    <SelectTrigger className="h-12 text-base w-full text-foreground">
                        <Clock className="mr-2 h-4 w-4 text-muted-foreground" />
                        <SelectValue placeholder="Select time" />
                    </SelectTrigger>
                    <SelectContent>
                        {timeSlots.map(time => <SelectItem key={time} value={time}>{time}</SelectItem>)}
                    </SelectContent>
                </Select>
            </div>
            <div className="grid gap-1.5 lg:col-span-3">
                <Label className="text-sm font-medium">Number of People</Label>
                 <Popover>
                    <PopoverTrigger asChild>
                        <Button variant="outline" className="h-12 w-full justify-start text-left font-normal text-foreground">
                             <Users className="mr-2 h-4 w-4" />
                             {people} person
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-56">
                        <div className="flex items-center justify-between">
                            <Label>People</Label>
                            <div className="flex items-center justify-between rounded-lg border p-1 h-10">
                                <Button variant="ghost" size="icon" className="h-7 w-7" type="button" onClick={() => handlePeopleChange(-1)} disabled={people <= 1}><Minus className="h-4 w-4" /></Button>
                                <span className="font-medium text-sm text-foreground">{people}</span>
                                <Button variant="ghost" size="icon" className="h-7 w-7" type="button" onClick={() => handlePeopleChange(1)}><Plus className="h-4 w-4" /></Button>
                            </div>
                        </div>
                    </PopoverContent>
                </Popover>
                <input type="hidden" name="people" value={people} />
            </div>
        </div>
    )
}

const ThingsToDoFields = ({ fixedLocation }: { fixedLocation?: string }) => {
    const [singleDate, setSingleDate] = React.useState<Date | undefined>(new Date());
    const [people, setPeople] = React.useState(1);
    const handlePeopleChange = (amount: number) => {
        setPeople(prev => Math.max(1, prev + amount));
    };

     return (
        <div className="grid grid-cols-1 lg:grid-cols-12 items-end gap-3 w-full">
            <div className="grid gap-1.5 lg:col-span-4">
                <Label className="text-sm font-medium">Destination</Label>
                <Select name="location" defaultValue={fixedLocation || 'all'} disabled={!!fixedLocation}>
                    <SelectTrigger className="h-12 text-base w-full text-foreground">
                        <MapPin className="mr-2 h-4 w-4 text-muted-foreground" />
                        <SelectValue placeholder="Select City" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">All Cities</SelectItem>
                        {cities.map(city => <SelectItem key={city} value={city.toLowerCase()}>{city}</SelectItem>)}
                    </SelectContent>
                </Select>
            </div>
            <div className="grid gap-1.5 lg:col-span-3">
                <Label className="text-sm font-medium">Select activity date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className={cn("h-12 w-full justify-start text-left font-normal text-foreground", !singleDate && "text-muted-foreground")}>
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {singleDate ? format(singleDate, "PPP") : <span>Select date</span>}
                      <input type="hidden" name="pickupDate" value={singleDate?.toISOString()} />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0"><Calendar mode="single" selected={singleDate} onSelect={setSingleDate} initialFocus /></PopoverContent>
                </Popover>
            </div>
            <div className="grid gap-1.5 lg:col-span-2">
                <Label className="text-sm font-medium">Preferred Time</Label>
                 <Select name="timePreference" defaultValue="morning">
                    <SelectTrigger className="h-12 text-base w-full text-foreground">
                        <Sun className="mr-2 h-4 w-4 text-muted-foreground" />
                        <SelectValue placeholder="Morning" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="morning">Morning</SelectItem>
                        <SelectItem value="afternoon">Afternoon</SelectItem>
                        <SelectItem value="evening">Evening</SelectItem>
                    </SelectContent>
                </Select>
            </div>
            <div className="grid gap-1.5 lg:col-span-3">
                <Label className="text-sm font-medium">Number of People</Label>
                <Popover>
                    <PopoverTrigger asChild>
                        <Button variant="outline" className="h-12 w-full justify-start text-left font-normal text-foreground">
                             <Users className="mr-2 h-4 w-4" />
                             {people} person
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-56">
                        <div className="flex items-center justify-between">
                            <Label>People</Label>
                            <div className="flex items-center justify-between rounded-lg border p-1 h-10">
                                <Button variant="ghost" size="icon" className="h-7 w-7" type="button" onClick={() => handlePeopleChange(-1)} disabled={people <= 1}><Minus className="h-4 w-4" /></Button>
                                <span className="font-medium text-sm text-foreground">{people}</span>
                                <Button variant="ghost" size="icon" className="h-7 w-7" type="button" onClick={() => handlePeopleChange(1)}><Plus className="h-4 w-4" /></Button>
                            </div>
                        </div>
                    </PopoverContent>
                </Popover>
                <input type="hidden" name="people" value={people} />
            </div>
        </div>
    )
}


const FormContent = ({ tab, fixedLocation }: { tab: string; fixedLocation?: string }) => {
    switch (tab) {
        case 'cars': return <CarRentalFields fixedLocation={fixedLocation} />;
        case 'private-drivers': return <PrivateDriverFields fixedLocation={fixedLocation} />;
        case 'boats': return <BoatRentalFields fixedLocation={fixedLocation} />;
        case 'activities': return <ThingsToDoFields fixedLocation={fixedLocation} />;
        default: return <CarRentalFields fixedLocation={fixedLocation} />;
    }
}

interface SearchTabsProps {
    fixedCategory?: string;
    fixedLocation?: string;
}

export function SearchTabs({ fixedCategory, fixedLocation }: SearchTabsProps) {
  const [activeTab, setActiveTab] = React.useState(fixedCategory || 'cars');

  const localHandleSearch = (formData: FormData) => {
    handleSearch(formData);
  }

  const FormFields = () => (
    <>
      <input type="hidden" name="category" value={activeTab} />
      <div className="lg:col-span-10">
        <FormContent tab={activeTab} fixedLocation={fixedLocation} />
      </div>
      <Button type="submit" size="lg" className="h-12 w-full text-base lg:col-span-2">
        <Search className="mr-2 h-5 w-5" />Search
      </Button>
    </>
  );

  return (
    <div className="w-full">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
             {!fixedCategory && (
                <div className="flex justify-center">
                    <TabsList className="grid w-full grid-cols-2 sm:grid-cols-4 md:w-auto md:inline-flex bg-background/50 backdrop-blur-sm shadow-md border">
                        <TabsTrigger value="cars"><Car className="mr-2 h-4 w-4" />Car Rental</TabsTrigger>
                        <TabsTrigger value="private-drivers"><User className="mr-2 h-4 w-4" />Private Driver</TabsTrigger>
                        <TabsTrigger value="boats"><Ship className="mr-2 h-4 w-4" />Boats</TabsTrigger>
                        <TabsTrigger value="activities"><Mountain className="mr-2 h-4 w-4" />Activities</TabsTrigger>
                    </TabsList>
                </div>
             )}
            <form action={localHandleSearch} className={cn("grid grid-cols-1 lg:grid-cols-12 items-end gap-3 mt-4 bg-background p-4 rounded-2xl shadow-lg border", fixedCategory && "mt-0")}>
                <FormFields />
            </form>
        </Tabs>
      </div>
  );
}
