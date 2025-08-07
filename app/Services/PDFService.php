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
     * @param int|null $categoryId
     * @return string PDF path
     */
    public function generateInvoice(array $invoiceData, ?int $categoryId = null): string
    {
        // Determine which template to use based on category
        $template = $this->getTemplateForCategory($categoryId);
        
        // Generate PDF from view
        $pdf = PDF::loadView($template, compact('invoiceData'));
        
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
     * Get the appropriate template based on category
     *
     * @param int|null $categoryId
     * @return string
     */
    private function getTemplateForCategory(?int $categoryId): string
    {
        switch ($categoryId) {
            case 2: // Car Rental
                return 'pdf.invoice-car-rental';
            case 3: // Private Car with Driver
                return 'pdf.invoice-private-driver';
            case 4: // Boat Rentals
                return 'pdf.invoice-boat-rental';
            case 5: // Things to do
                return 'pdf.invoice-things-to-do';
            default:
                // Use default/generic template for unknown categories
                return 'pdf.invoice';
        }
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