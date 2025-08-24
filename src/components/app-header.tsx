
"use client"

import * as React from 'react'
import Link from 'next/link'
import { Menu, Car, Ship, Mountain, Globe, LifeBuoy, Building, ChevronDown, User, MessageSquare } from 'lucide-react'
import { MarHireLogo } from '@/components/mar-hire-logo'
import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator } from '@/components/ui/dropdown-menu'
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import type { SearchCategory } from '@/lib/types'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './ui/tooltip'
import { ClientOnly } from './client-only'

interface AppHeaderProps {
  category?: SearchCategory;
}

const navLinks = [
    { href: '/cars', label: 'Car Rental', icon: Car },
    { href: '/private-drivers', label: 'Private Driver', icon: User },
    { href: '/boats', label: 'Boat Rental', icon: Ship },
    { href: '/activities', label: 'Things to do', icon: Mountain },
];

const languages = [
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'fr', name: 'Français', flag: '🇫🇷' },
  { code: 'es', name: 'Español', flag: '🇪🇸' },
];

export function AppHeader({ category }: AppHeaderProps) {
  const [selectedLanguage, setSelectedLanguage] = React.useState(languages[0]);

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        
        {/* Desktop Header */}
        <div className="hidden w-full md:flex justify-between items-center">
          <Link href="/" className="flex items-center space-x-2">
            <MarHireLogo />
          </Link>
          <div className="flex items-center space-x-1">
            <DropdownMenu>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="group flex items-center gap-2 text-foreground">
                        <Globe className="h-5 w-5" />
                        <ClientOnly>
                            <span className="text-base text-foreground">{selectedLanguage.flag}</span>
                        </ClientOnly>
                        <ChevronDown className="h-4 w-4 text-muted-foreground transition-transform duration-200 group-data-[state=open]:rotate-180" />
                        <span className="sr-only">Language Selector</span>
                      </Button>
                    </DropdownMenuTrigger>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Select language</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              <DropdownMenuContent align="end">
                {languages.map(lang => (
                  <DropdownMenuItem key={lang.code} onClick={() => setSelectedLanguage(lang)}>
                    <span className="mr-2 text-lg">{lang.flag}</span> {lang.name}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            <nav className="flex items-center space-x-2 text-sm font-medium">
                <DropdownMenu>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="group">
                              Travel Shop
                              <ChevronDown className="relative top-[1px] ml-1 h-4 w-4 transition duration-200 group-data-[state=open]:rotate-180" />
                          </Button>
                        </DropdownMenuTrigger>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Explore our services</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                  <DropdownMenuContent align="start">
                    {navLinks.map(link => (
                          <DropdownMenuItem key={link.href} asChild>
                            <Link href={link.href}>
                                <link.icon className="mr-2 h-4 w-4" />
                                {link.label}
                            </Link>
                        </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="ghost" asChild>
                          <Link href="/support">
                            <MessageSquare className="mr-2 h-4 w-4" />
                            Support / Help Center
                          </Link>
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Get help and support</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                <Button asChild>
                  <Link href="/join-us">List Your Property</Link>
                </Button>
            </nav>
          </div>
        </div>

        {/* Mobile Header */}
        <div className="flex w-full items-center justify-between md:hidden">
          <Link href="/" className="flex items-center space-x-2">
            <MarHireLogo />
          </Link>

          <Sheet>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <SheetTrigger asChild>
                    <Button variant="ghost" size="icon" >
                        <Menu className="h-6 w-6" />
                        <span className="sr-only">Toggle Menu</span>
                    </Button>
                  </SheetTrigger>
                </TooltipTrigger>
                <TooltipContent side="bottom">
                  <p>Open menu</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <SheetContent side="left" className="w-[300px] sm:w-[400px]">
              <SheetHeader>
                 <SheetTitle className="sr-only">Mobile Menu</SheetTitle>
              </SheetHeader>
              <nav className="flex flex-col gap-4 pt-6">
                <Link href="/" className="mb-4">
                  <MarHireLogo />
                </Link>
                <p className="text-sm font-semibold text-muted-foreground px-4">Travel Shop</p>
                {navLinks.map(link => (
                      <Link key={link.href} href={link.href} className="flex items-center gap-3 rounded-lg px-4 py-2 text-base font-medium text-foreground transition-colors hover:bg-accent hover:text-accent-foreground">
                        <link.icon className="h-5 w-5" />
                        {link.label}
                    </Link>
                ))}
                <DropdownMenuSeparator />
                  <Link href="/support" className="flex items-center gap-3 rounded-lg px-4 py-2 text-base font-medium text-foreground transition-colors hover:bg-accent hover:text-accent-foreground">
                    <LifeBuoy className="h-5 w-5" />
                    Support / Help Center
                </Link>
                  <Link href="/join-us" className="flex items-center gap-3 rounded-lg px-4 py-2 text-base font-medium text-foreground transition-colors hover:bg-accent hover:text-accent-foreground">
                    <Building className="h-5 w-5" />
                    List Your Property
                </Link>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
