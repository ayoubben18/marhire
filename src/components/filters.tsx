

"use client";

import * as React from 'react';
import { Plus, Minus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Separator } from './ui/separator';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import type { SearchCategory } from '@/lib/types';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from './ui/collapsible';
import { ChevronDown } from 'lucide-react';

const carTypes = ["SUV", "Hatchback", "MPV", "Sedan", "Cheap", "Luxury"];
const carBrands = ["Dacia", "Audi", "Volkswagen", "Porsche"];
const transmissionTypes = ["Manual", "Automatic"];
const fuelTypes = ["Petrol", "Diesel", "Electric", "Hybrid"];
const mileagePolicies = ["100 km/day", "150 km/day", "200 km/day", "250 km/day", "Unlimited Km"];

const driverCarTypes = ["SUV", "Sedan", "Van", "Fourgon (Large Van)", "Bus (Coach)"];

const activityTypes = ["Quad", "Desert", "Camel Ride", "Surf", "JetSky", "Horse Ride"];
const difficultyLevels = ["Easy", "Medium", "Hard"];

const boatTypes = ["Yacht", "Speedboat", "Luxury Yacht", "Sailboat"];


type FilterSectionProps = {
    title: string;
    children: React.ReactNode;
}

const FilterSection = ({ title, children }: FilterSectionProps) => (
    <Collapsible defaultOpen={true} className="py-4">
        <CollapsibleTrigger className="w-full flex items-center justify-between group px-4">
            <h3 className="font-headline font-semibold text-base text-foreground">{title}</h3>
            <ChevronDown className="h-5 w-5 text-muted-foreground transition-transform duration-200 group-data-[state=open]:rotate-180" />
        </CollapsibleTrigger>
        <CollapsibleContent>
            <div className="space-y-4 pt-4 px-4">
                {children}
            </div>
        </CollapsibleContent>
    </Collapsible>
);

const CheckboxFilter = ({ items, label, onUpdate, selectedItems }: { items: string[], label: string, onUpdate: (key: string, value: string) => void, selectedItems: string[] }) => (
    <div className="space-y-3">
        {items.map(item => (
            <div key={item} className="flex items-center space-x-2">
                <Checkbox 
                    id={`${label}-${item}`} 
                    onCheckedChange={() => onUpdate(label, item)} 
                    checked={selectedItems.includes(item)}
                />
                <Label htmlFor={`${label}-${item}`} className="font-normal cursor-pointer">{item}</Label>
            </div>
        ))}
    </div>
);

const RadioFilter = ({ items, label, onUpdate, selectedItem }: { items: string[], label: string, onUpdate: (key: string, value: string) => void, selectedItem: string | null }) => (
    <RadioGroup onValueChange={(value) => onUpdate(label, value)} value={selectedItem || ''}>
        <div className="space-y-3">
            {items.map(item => (
                <div key={item} className="flex items-center space-x-2">
                    <RadioGroupItem value={item} id={`${label}-${item}`} />
                    <Label htmlFor={`${label}-${item}`} className="font-normal cursor-pointer">{item}</Label>
                </div>
            ))}
        </div>
    </RadioGroup>
);

const NumberStepper = ({ label, onUpdate, value, unit }: { label: string, onUpdate: (key: string, value: number) => void, value: number, unit?: string }) => {
    const handleChange = (amount: number) => {
        const newCount = Math.max(0, value + amount);
        onUpdate(label, newCount);
    };

    return (
        <div>
            <div className="flex items-center justify-between rounded-lg border p-2">
                <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => handleChange(-1)} disabled={value <= 0}><Minus className="h-4 w-4" /></Button>
                <span className="font-medium text-sm tabular-nums">{value} {unit}</span>
                <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => handleChange(1)}><Plus className="h-4 w-4" /></Button>
            </div>
        </div>
    );
};

export function Filters({ category }: { category?: SearchCategory }) {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const updateUrlParams = React.useCallback((key: string, value: string | null) => {
        const current = new URLSearchParams(Array.from(searchParams.entries()));
        if (value === null || (Array.isArray(value) && value.length === 0) || value === '') {
            current.delete(key);
        } else {
            current.set(key, value);
        }
        const search = current.toString();
        const query = search ? `?${search}` : "";
        router.push(`${pathname}${query}`, { scroll: false });
    }, [searchParams, pathname, router]);

    const handleCheckboxChange = (category: string, value: string) => {
        const currentValues = searchParams.get(category)?.split(',') || [];
        const newValues = currentValues.includes(value)
            ? currentValues.filter((item: string) => item !== value)
            : [...currentValues, value];
        updateUrlParams(category, newValues.join(','));
    };

    const handleRadioChange = (key: string, value: string) => {
        updateUrlParams(key, value);
    };

    const handleSliderChange = (value: number[]) => {
        updateUrlParams('priceRange', value.join(','));
    };

    const handleNumberChange = (key: string, value: number) => {
        updateUrlParams(key, value.toString());
    };

    const renderCarRentalFilters = () => (
        <>
            <FilterSection title="Car Type">
                <CheckboxFilter items={carTypes} label="carType" onUpdate={handleCheckboxChange} selectedItems={searchParams.get('carType')?.split(',') || []} />
            </FilterSection>
            <Separator />
            <FilterSection title="Car Brand">
                <CheckboxFilter items={carBrands} label="carBrand" onUpdate={handleCheckboxChange} selectedItems={searchParams.get('carBrand')?.split(',') || []} />
            </FilterSection>
            <Separator />
            <FilterSection title="Transmission">
                <CheckboxFilter items={transmissionTypes} label="transmission" onUpdate={handleCheckboxChange} selectedItems={searchParams.get('transmission')?.split(',') || []} />
            </FilterSection>
            <Separator />
            <FilterSection title="Fuel Type">
                <CheckboxFilter items={fuelTypes} label="fuelType" onUpdate={handleCheckboxChange} selectedItems={searchParams.get('fuelType')?.split(',') || []} />
            </FilterSection>
            <Separator />
            <FilterSection title="Deposit Required">
                <RadioFilter items={["Yes", "No"]} label="depositRequired" onUpdate={handleRadioChange} selectedItem={searchParams.get('depositRequired')} />
            </FilterSection>
            <Separator />
            <FilterSection title="Mileage Policy">
                <RadioFilter items={mileagePolicies} label="mileagePolicy" onUpdate={handleRadioChange} selectedItem={searchParams.get('mileagePolicy')} />
            </FilterSection>
        </>
    );

    const renderPrivateDriverFilters = () => (
        <>
            <FilterSection title="Service Type">
                <CheckboxFilter items={["Airport Transfer", "Intercity"]} label="serviceType" onUpdate={handleCheckboxChange} selectedItems={searchParams.get('serviceType')?.split(',') || []} />
            </FilterSection>
            <Separator />
            <FilterSection title="Car Type">
                <CheckboxFilter items={driverCarTypes} label="carType" onUpdate={handleCheckboxChange} selectedItems={searchParams.get('carType')?.split(',') || []} />
            </FilterSection>
            <Separator />
            <FilterSection title="Multilingual Driver">
                 <RadioFilter items={["Yes", "No"]} label="multilingual" onUpdate={handleRadioChange} selectedItem={searchParams.get('multilingual')} />
            </FilterSection>
            <Separator />
            <FilterSection title="Max Passengers">
                <NumberStepper label="maxPassengers" onUpdate={handleNumberChange} value={Number(searchParams.get('maxPassengers') || 0)} unit="people" />
            </FilterSection>
            <Separator />
            <FilterSection title="Max Luggage Capacity">
                <NumberStepper label="maxLuggage" onUpdate={handleNumberChange} value={Number(searchParams.get('maxLuggage') || 0)} unit="bags" />
            </FilterSection>
        </>
    );

    const renderThingsToDoFilters = () => (
        <>
            <FilterSection title="Activity Type">
                <CheckboxFilter items={activityTypes} label="activityType" onUpdate={handleCheckboxChange} selectedItems={searchParams.get('activityType')?.split(',') || []} />
            </FilterSection>
            <Separator />
            <FilterSection title="Private / Group">
                <RadioFilter items={["Private", "Group"]} label="groupType" onUpdate={handleRadioChange} selectedItem={searchParams.get('groupType')} />
            </FilterSection>
            <Separator />
             <FilterSection title="Pickup Included">
                <RadioFilter items={["Yes", "No"]} label="pickupIncluded" onUpdate={handleRadioChange} selectedItem={searchParams.get('pickupIncluded')} />
            </FilterSection>
            <Separator />
            <FilterSection title="Difficulty Level">
                 <RadioFilter items={difficultyLevels} label="difficulty" onUpdate={handleRadioChange} selectedItem={searchParams.get('difficulty')} />
            </FilterSection>
        </>
    );

    const renderBoatRentalFilters = () => (
        <>
            <FilterSection title="Boat Type">
                 <CheckboxFilter items={boatTypes} label="boatType" onUpdate={handleCheckboxChange} selectedItems={searchParams.get('boatType')?.split(',') || []} />
            </FilterSection>
            <Separator />
             <FilterSection title="With Captain">
                <RadioFilter items={["Yes", "No"]} label="withCaptain" onUpdate={handleRadioChange} selectedItem={searchParams.get('withCaptain')} />
            </FilterSection>
            <Separator />
             <FilterSection title="Capacity">
                <NumberStepper label="capacity" onUpdate={handleNumberChange} value={Number(searchParams.get('capacity') || 0)} unit="guests" />
            </FilterSection>
        </>
    );

    const renderFiltersForCategory = () => {
        switch (category) {
            case 'car-rental': return renderCarRentalFilters();
            case 'private-driver': return renderPrivateDriverFilters();
            case 'activities': return renderThingsToDoFilters();
            case 'boats': return renderBoatRentalFilters();
            default: return renderCarRentalFilters(); // Default to car filters
        }
    };
    
    const priceRange = searchParams.get('priceRange')?.split(',').map(Number) || [0, 1000];

    return (
        <div className="divide-y">
            <div className="p-4">
                <FilterSection title="Price Range">
                    <div className="pt-2">
                        <Slider
                            id="price-range"
                            min={0}
                            max={1000}
                            step={10}
                            value={priceRange}
                            onValueChange={handleSliderChange}
                            className="w-full"
                        />
                        <div className="flex items-center justify-between mt-3 text-sm text-muted-foreground">
                            <span>€{priceRange[0]}</span>
                            <span>€{priceRange[1] === 1000 ? '1000+' : priceRange[1]}</span>
                        </div>
                    </div>
                </FilterSection>
            </div>
            <div className="pt-0">
                {renderFiltersForCategory()}
            </div>
        </div>
    );
}
