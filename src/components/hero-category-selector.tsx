
"use client";

import * as React from 'react';
import { Car, Ship, Mountain, User } from 'lucide-react';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';

type HeroCategorySelectorProps = {
    onSelectCategory: (category: string) => void;
};

export function HeroCategorySelector({ onSelectCategory }: HeroCategorySelectorProps) {
    return (
        <Tabs defaultValue="cars" className="w-full" onValueChange={onSelectCategory}>
            <div className="flex justify-center">
                <TabsList className="grid w-full grid-cols-2 sm:grid-cols-4 md:w-auto md:inline-flex bg-background/50 backdrop-blur-sm shadow-md border">
                    <TabsTrigger value="cars"><Car className="mr-2 h-4 w-4" />Car Rental</TabsTrigger>
                    <TabsTrigger value="private-drivers"><User className="mr-2 h-4 w-4" />Private Driver</TabsTrigger>
                    <TabsTrigger value="boats"><Ship className="mr-2 h-4 w-4" />Boats</TabsTrigger>
                    <TabsTrigger value="activities"><Mountain className="mr-2 h-4 w-4" />Activities</TabsTrigger>
                </TabsList>
            </div>
        </Tabs>
    );
}
