
"use client";

import * as React from 'react';
import { ClientOnly } from './client-only';

export function Copyright() {
    return (
        <p className="text-sm text-muted-foreground text-center">
            <ClientOnly>
                © {new Date().getFullYear()} MarHire.com. All rights reserved. MarHire is a registered brand under MarHire LLC.
            </ClientOnly>
        </p>
    );
}
