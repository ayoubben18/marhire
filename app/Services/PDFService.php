<?php

namespace App\Services;

use Barryvdh\DomPDF\Facade\Pdf;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Log;

class PDFService
{
    /**
     * Supported locales for invoice generation
     */
    private const SUPPORTED_LOCALES = ['en', 'fr', 'es'];
    
    /**
     * Default locale for fallback
     */
    private const DEFAULT_LOCALE = 'en';
    
    /**
     * Category to template mapping
     */
    private const CATEGORY_TEMPLATES = [
        2 => 'invoice-car-rental',
        3 => 'invoice-private-driver',
        4 => 'invoice-boat-rental',
        5 => 'invoice-activities'
    ];

    /**
     * Generate invoice PDF for a booking
     *
     * @param array $invoiceData
     * @param int|null $categoryId
     * @param string $locale
     * @return string PDF path
     * @throws \Exception
     */
    public function generateInvoice(array $invoiceData, ?int $categoryId = null, string $locale = 'en'): string
    {
        // Validate invoice data
        if (empty($invoiceData['booking_id'])) {
            throw new \InvalidArgumentException('Booking ID is required for invoice generation');
        }
        
        // Normalize and validate locale
        $locale = $this->normalizeLocale($locale);
        
        // Determine which template to use based on category and locale
        $template = $this->getTemplateForCategory($categoryId, $locale);
        
        // Log template selection for debugging
        Log::info('Generating PDF invoice', [
            'booking_id' => $invoiceData['booking_id'],
            'category_id' => $categoryId,
            'locale' => $locale,
            'template' => $template
        ]);
        
        try {
            // Generate PDF from view
            $pdf = PDF::loadView($template, compact('invoiceData'));
            
            // Set PDF options for better UTF-8 support
            $pdf->setPaper('a4', 'portrait');
            $pdf->setOption('isHtml5ParserEnabled', true);
            $pdf->setOption('isPhpEnabled', true);
            $pdf->setOption('defaultFont', 'sans-serif');
            
            // Create filename with locale identifier for better tracking
            $filename = sprintf('invoice-%s-%s.pdf', 
                $invoiceData['booking_id'], 
                $locale !== self::DEFAULT_LOCALE ? $locale : 'en'
            );
            $path = 'invoices/' . $filename;
            
            // Ensure directory exists
            if (!Storage::exists('invoices')) {
                Storage::makeDirectory('invoices', 0755, true);
            }
            
            // Save PDF to storage
            Storage::put($path, $pdf->output());
            
            return $path;
            
        } catch (\Exception $e) {
            Log::error('Failed to generate PDF invoice', [
                'booking_id' => $invoiceData['booking_id'],
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString()
            ]);
            throw $e;
        }
    }
    
    /**
     * Normalize locale to ensure consistency
     *
     * @param string $locale
     * @return string
     */
    private function normalizeLocale(string $locale): string
    {
        // Convert to lowercase and extract language code if full locale provided
        $locale = strtolower(trim($locale));
        
        // Handle full locale codes (e.g., 'en_US' -> 'en')
        if (strpos($locale, '_') !== false) {
            $locale = substr($locale, 0, 2);
        }
        
        // Validate and fallback to default if not supported
        if (!in_array($locale, self::SUPPORTED_LOCALES)) {
            Log::warning('Unsupported locale requested, falling back to default', [
                'requested' => $locale,
                'default' => self::DEFAULT_LOCALE
            ]);
            return self::DEFAULT_LOCALE;
        }
        
        return $locale;
    }
    
    /**
     * Get the appropriate template based on category and locale
     *
     * @param int|null $categoryId
     * @param string $locale
     * @return string
     */
    private function getTemplateForCategory(?int $categoryId, string $locale = 'en'): string
    {
        // Use default template for unknown categories
        if (!isset(self::CATEGORY_TEMPLATES[$categoryId])) {
            Log::info('Using default invoice template for unknown category', [
                'category_id' => $categoryId
            ]);
            return 'pdf.invoice';
        }
        
        $baseTemplate = self::CATEGORY_TEMPLATES[$categoryId];
        
        // Build template path based on locale
        if ($locale === self::DEFAULT_LOCALE) {
            // Special case for activities in English (legacy naming)
            if ($categoryId === 5) {
                return 'pdf.invoice-things-to-do';
            }
            return 'pdf.' . $baseTemplate;
        }
        
        // For non-English locales, append the locale suffix
        $localizedTemplate = 'pdf.' . $baseTemplate . '-' . $locale;
        
        // Check if the localized template exists
        if (view()->exists($localizedTemplate)) {
            return $localizedTemplate;
        }
        
        // Log missing template and fallback to English
        Log::warning('Localized template not found, falling back to English', [
            'requested_template' => $localizedTemplate,
            'category_id' => $categoryId,
            'locale' => $locale
        ]);
        
        // Fallback to English version
        if ($categoryId === 5) {
            return 'pdf.invoice-things-to-do';
        }
        return 'pdf.' . $baseTemplate;
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
    
    /**
     * Check if a PDF invoice exists
     *
     * @param string $path
     * @return bool
     */
    public function invoiceExists(string $path): bool
    {
        return Storage::exists($path);
    }
    
    /**
     * Delete a PDF invoice
     *
     * @param string $path
     * @return bool
     */
    public function deleteInvoice(string $path): bool
    {
        if ($this->invoiceExists($path)) {
            return Storage::delete($path);
        }
        return false;
    }
    
    /**
     * Get supported locales for invoice generation
     *
     * @return array
     */
    public static function getSupportedLocales(): array
    {
        return self::SUPPORTED_LOCALES;
    }
}