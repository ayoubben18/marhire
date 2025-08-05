<?php

namespace Tests\Unit\Services;

use App\Services\PDFService;
use Illuminate\Support\Facades\Storage;
use Tests\TestCase;

class PDFServiceTest extends TestCase
{
    protected $pdfService;

    protected function setUp(): void
    {
        parent::setUp();
        $this->pdfService = new PDFService();
        
        // Use fake storage for testing
        Storage::fake('local');
    }

    public function testGenerateInvoiceCreatesFile()
    {
        $invoiceData = [
            'booking_id' => 999,
            'invoice_number' => 'INV-999',
            'invoice_date' => 'January 1, 2025',
            'status' => 'Confirmed',
            'client_name' => 'Test Customer',
            'client_email' => 'test@example.com',
            'client_phone' => '123-456-7890',
            'service_name' => 'Test Boat Rental',
            'check_in' => 'January 5, 2025',
            'check_out' => 'January 10, 2025',
            'total_amount' => 1500.00,
            'company_email' => 'info@marhire.com',
            'company_phone' => '+212 660 745 055',
        ];

        $path = $this->pdfService->generateInvoice($invoiceData);

        // Assert path is correct
        $this->assertEquals('invoices/invoice-999.pdf', $path);
        
        // Assert file was created in storage
        Storage::assertExists($path);
    }

    public function testGetFullPathReturnsCorrectPath()
    {
        $path = 'invoices/invoice-123.pdf';
        $fullPath = $this->pdfService->getFullPath($path);
        
        $expectedPath = storage_path('app/' . $path);
        $this->assertEquals($expectedPath, $fullPath);
    }

    public function testGenerateInvoiceCreatesDirectoryIfNotExists()
    {
        Storage::assertMissing('invoices');
        
        $invoiceData = [
            'booking_id' => 888,
            'invoice_number' => 'INV-888',
            'invoice_date' => 'January 1, 2025',
            'status' => 'Confirmed',
            'client_name' => 'Test Customer',
            'client_email' => 'test@example.com',
            'client_phone' => '123-456-7890',
            'service_name' => 'Test Service',
            'check_in' => 'January 5, 2025',
            'check_out' => 'January 10, 2025',
            'total_amount' => 1000.00,
            'company_email' => 'info@marhire.com',
            'company_phone' => '+212 660 745 055',
        ];

        $this->pdfService->generateInvoice($invoiceData);
        
        // Directory should be created
        Storage::assertExists('invoices');
    }
}