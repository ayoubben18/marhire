<?php

namespace App\Services;

use Barryvdh\DomPDF\Facade\Pdf;
use Illuminate\Support\Facades\Storage;

class PDFService
{
    /**
     * Generate invoice PDF for a booking
     *
     * @param array $invoiceData
     * @return string PDF path
     */
    public function generateInvoice(array $invoiceData): string
    {
        // Generate PDF from view
        $pdf = PDF::loadView('pdf.invoice', compact('invoiceData'));
        
        // Create filename
        $filename = 'invoice-' . $invoiceData['booking_id'] . '.pdf';
        $path = 'invoices/' . $filename;
        
        // Ensure directory exists
        if (!Storage::exists('invoices')) {
            Storage::makeDirectory('invoices');
        }
        
        // Save PDF to storage
        Storage::put($path, $pdf->output());
        
        return $path;
    }
    
    /**
     * Get full path to PDF file
     *
     * @param string $path
     * @return string
     */
    public function getFullPath(string $path): string
    {
        return storage_path('app/' . $path);
    }
}