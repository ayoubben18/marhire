"use client";

import * as React from 'react';
import { ArrowUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './ui/tooltip';

export function BackToTopButton() {
  const [isVisible, setIsVisible] = React.useState(false);

  const toggleVisibility = () => {
    if (window.scrollY > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  React.useEffect(() => {
    window.addEventListener('scroll', toggleVisibility);
    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, []);

  return (
    <div className={cn(
        'fixed bottom-8 right-8 z-50 transition-opacity duration-300',
        isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'
      )}>
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger asChild>
                    <Button
                    variant="secondary"
                    size="icon"
                    onClick={scrollToTop}
                    className='h-12 w-12 rounded-full shadow-lg'
                    aria-label="Scroll to top"
                    >
                        <ArrowUp className="h-6 w-6" />
                    </Button>
                </TooltipTrigger>
                <TooltipContent>
                    <p>Scroll to top</p>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    </div>
  );
}
