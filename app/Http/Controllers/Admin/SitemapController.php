<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Services\SitemapGeneratorService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class SitemapController extends Controller
{
    private SitemapGeneratorService $sitemapService;
    
    public function __construct(SitemapGeneratorService $sitemapService)
    {
        $this->middleware('auth');
        $this->middleware(function ($request, $next) {
            if (!Auth::user()->isAdmin()) {
                abort(403, 'Unauthorized');
            }
            return $next($request);
        });
        
        $this->sitemapService = $sitemapService;
    }
    
    /**
     * Show sitemap generation dashboard
     */
    public function index()
    {
        $status = $this->sitemapService->getStatus();
        
        // Get sitemap file sizes
        $sitemaps = [];
        foreach (config('app.supported_locales', ['en', 'fr', 'es']) as $locale) {
            $path = public_path("sitemap-{$locale}.xml");
            if (file_exists($path)) {
                $sitemaps[$locale] = [
                    'exists' => true,
                    'size' => filesize($path),
                    'size_formatted' => $this->formatBytes(filesize($path)),
                    'modified' => filemtime($path),
                    'modified_formatted' => date('Y-m-d H:i:s', filemtime($path))
                ];
            } else {
                $sitemaps[$locale] = [
                    'exists' => false
                ];
            }
        }
        
        return view('admin.sitemap.index', compact('status', 'sitemaps'));
    }
    
    /**
     * Preview a specific sitemap
     */
    public function preview(Request $request, string $locale = null)
    {
        if ($locale && !in_array($locale, config('app.supported_locales', ['en', 'fr', 'es']))) {
            abort(404, 'Invalid locale');
        }
        
        $filename = $locale ? "sitemap-{$locale}.xml" : "sitemap.xml";
        $path = public_path($filename);
        
        if (!file_exists($path)) {
            abort(404, 'Sitemap not found');
        }
        
        $content = file_get_contents($path);
        
        // Parse XML for preview
        $xml = simplexml_load_string($content);
        
        return view('admin.sitemap.preview', [
            'filename' => $filename,
            'locale' => $locale,
            'xml' => $xml,
            'raw' => $request->get('raw', false) ? $content : null
        ]);
    }
    
    /**
     * Generate sitemaps via AJAX
     */
    public function generate(Request $request)
    {
        $validated = $request->validate([
            'queue' => 'boolean',
            'notify_email' => 'nullable|email'
        ]);
        
        try {
            if ($validated['queue'] ?? true) {
                \App\Jobs\GenerateSitemapsJob::dispatch(
                    $validated['notify_email'] ?? Auth::user()->email
                );
                
                return response()->json([
                    'success' => true,
                    'message' => 'Sitemap generation queued successfully'
                ]);
            } else {
                $results = $this->sitemapService->generateAllSitemaps();
                
                return response()->json([
                    'success' => true,
                    'message' => 'Sitemaps generated successfully',
                    'results' => $results
                ]);
            }
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => $e->getMessage()
            ], 500);
        }
    }
    
    /**
     * Get generation status via AJAX
     */
    public function status()
    {
        return response()->json($this->sitemapService->getStatus());
    }
    
    /**
     * Format bytes to human readable
     */
    private function formatBytes($bytes, $precision = 2)
    {
        $units = ['B', 'KB', 'MB', 'GB'];
        
        for ($i = 0; $bytes > 1024 && $i < count($units) - 1; $i++) {
            $bytes /= 1024;
        }
        
        return round($bytes, $precision) . ' ' . $units[$i];
    }
}