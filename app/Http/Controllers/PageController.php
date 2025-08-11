<?php

namespace App\Http\Controllers;

use App\Models\Page;
use App\Services\SEOService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;

class PageController extends Controller
{
    public function list(Request $request)
    {
        $layout = Auth::user()->isAdmin() ? 'layouts.dashboard_admin' : 'layouts.dashboard';
        $pages = Page::orderByDesc('id')->get();
        return view('pages.list', compact('pages', 'layout'));
    }

    public function new(Request $request)
    {
        $layout = Auth::user()->isAdmin() ? 'layouts.dashboard_admin' : 'layouts.dashboard';
        return view('pages.add', compact('layout'));
    }

    public function insert(Request $request)
    {
        $validated = $request->validate([
            'slug' => 'required|string|unique:pages,slug',
            'meta_title' => 'nullable|string',
            'meta_description' => 'nullable|string',
            'schema_markup' => 'nullable|string',
            'content_sections' => 'nullable|array',
            'content_sections.*.title' => 'required_with:content_sections|string',
            'content_sections.*.text' => 'required_with:content_sections|string',
        ]);

        Page::create($validated);

        return back()->with('inserted', true);
    }

    public function edit(Request $request, $id)
    {
        $layout = Auth::user()->isAdmin() ? 'layouts.dashboard_admin' : 'layouts.dashboard';
        $page = Page::findOrFail($id);
        return view('pages.update', compact('page', 'layout'));
    }

    public function update(Request $request)
    {
        $page = Page::findOrFail($request->id);

        $validated = $request->validate([
            'slug' => 'required|string|unique:pages,slug,' . $page->id,
            'meta_title' => 'nullable|string',
            'meta_description' => 'nullable|string',
            'schema_markup' => 'nullable|string',
            'content_sections' => 'nullable|array',
            'content_sections.*.title' => 'required_with:content_sections|string',
            'content_sections.*.text' => 'required_with:content_sections|string',
        ]);

        $page->update($validated);

        return back()->with('updated', 'success');
    }

    public function delete(Request $request)
    {
        $page = Page::findOrFail($request->id);
        $page->delete();

        return 'success';
    }

    public function get_free_texts(Request $request, SEOService $SEOService)
    {
        $page = $SEOService->getPage($request->slug);
        return response()->json($page);
    }

    public function update_sitemap(Request $request)
    {
        // Authentication check - only admins can generate sitemaps
        if (!Auth::check() || !Auth::user()->isAdmin()) {
            abort(403, 'Unauthorized access');
        }
        
        // Check if we should queue the job or run synchronously
        $queue = $request->get('queue', true);
        $notifyEmail = $request->get('notify_email', Auth::user()->email);
        
        try {
            if ($queue) {
                // Dispatch to queue for background processing
                \App\Jobs\GenerateSitemapsJob::dispatch($notifyEmail);
                
                return response()->json([
                    'status' => 'queued',
                    'message' => 'Sitemap generation has been queued. You will receive an email notification when complete.'
                ]);
            } else {
                // Run synchronously (for small sites or immediate generation)
                $service = new \App\Services\SitemapGeneratorService();
                $results = $service->generateAllSitemaps();
                
                return response()->json([
                    'status' => 'completed',
                    'message' => 'Sitemaps generated successfully',
                    'results' => $results
                ]);
            }
        } catch (\Exception $e) {
            Log::error('Sitemap generation request failed', [
                'error' => $e->getMessage(),
                'user' => Auth::user()->id
            ]);
            
            return response()->json([
                'status' => 'error',
                'message' => 'Failed to generate sitemaps: ' . $e->getMessage()
            ], 500);
        }
    }
}
