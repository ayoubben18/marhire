<?php

namespace App\Http\Controllers;

use App\Models\Page;
use App\Services\SEOService;
use App\Services\TranslationService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
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
            'translations' => 'nullable|string',
        ]);

        // Ensure content_sections is properly handled
        if (isset($validated['content_sections'])) {
            // Use array_values to reindex the array and remove any gaps
            $validated['content_sections'] = array_values($validated['content_sections']);
        } else {
            // If no sections provided, explicitly set to empty array
            $validated['content_sections'] = [];
        }

        $page = Page::create($validated);

        // Handle translations if provided
        if ($request->has('translations') && !empty($request->input('translations'))) {
            try {
                $translations = json_decode($request->input('translations'), true);
                if ($translations && is_array($translations)) {
                    $translationService = new TranslationService();
                    $translationService->updateTranslations($page, $translations);
                }
            } catch (\Exception $e) {
                Log::warning('Failed to save translations for new page', [
                    'page_id' => $page->id,
                    'error' => $e->getMessage()
                ]);
            }
        }

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
            'translations' => 'nullable|string',
        ]);

        // Ensure content_sections is properly handled
        if (isset($validated['content_sections'])) {
            // Use array_values to reindex the array and remove any gaps
            $validated['content_sections'] = array_values($validated['content_sections']);
        } else {
            // If no sections provided, explicitly set to empty array
            $validated['content_sections'] = [];
        }

        $page->update($validated);

        // Handle translations if provided
        if ($request->has('translations') && !empty($request->input('translations'))) {
            try {
                $translations = json_decode($request->input('translations'), true);
                if ($translations && is_array($translations)) {
                    $translationService = new TranslationService();
                    $translationService->updateTranslations($page, $translations);
                }
            } catch (\Exception $e) {
                Log::warning('Failed to save translations for page', [
                    'page_id' => $page->id,
                    'error' => $e->getMessage()
                ]);
            }
        }

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

    /**
     * Get translations for a page
     *
     * @param Request $request
     * @param int $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function getTranslations(Request $request, $id)
    {
        $page = Page::findOrFail($id);
        
        $translations = $page->translations()
            ->get()
            ->keyBy('locale');

        $supportedLocales = config('app.supported_locales', ['en', 'fr', 'es']);
        $translationStatus = [];

        foreach ($supportedLocales as $locale) {
            $translationStatus[$locale] = [
                'exists' => isset($translations[$locale]),
                'updated_at' => isset($translations[$locale]) ? $translations[$locale]->updated_at : null,
            ];
        }

        return response()->json([
            'translations' => $translations,
            'status' => $translationStatus,
            'supported_locales' => $supportedLocales
        ]);
    }

    /**
     * Update manual translations for a page
     *
     * @param Request $request
     * @param int $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function updateTranslations(Request $request, $id)
    {
        // Validate admin permissions
        if (!auth()->check() || !auth()->user()->isAdmin()) {
            return response()->json(['error' => 'Unauthorized'], 403);
        }

        $page = Page::findOrFail($id);
        
        $request->validate([
            'translations' => 'required|array',
            'translations.*.locale' => 'required|string|in:' . implode(',', config('app.supported_locales', ['en', 'fr', 'es'])),
            'translations.*.meta_title' => 'nullable|string|max:255',
            'translations.*.meta_description' => 'nullable|string',
            'translations.*.content_sections' => 'nullable|array',
        ]);

        try {
            DB::beginTransaction();

            $translationService = new TranslationService();
            $translationData = [];

            foreach ($request->input('translations') as $translation) {
                $locale = $translation['locale'];
                unset($translation['locale']);
                $translationData[$locale] = $translation;
            }

            $success = $translationService->updateTranslations($page, $translationData);

            if (!$success) {
                throw new \Exception('Failed to update translations');
            }

            DB::commit();

            return response()->json([
                'status' => 'success',
                'message' => 'Page translations updated successfully',
                'translations' => $page->translations()->get()->keyBy('locale')
            ]);
        } catch (\Exception $e) {
            DB::rollBack();
            Log::error('Translation update failed for page ' . $id, [
                'error' => $e->getMessage()
            ]);

            return response()->json([
                'status' => 'error',
                'message' => 'Failed to update translations: ' . $e->getMessage()
            ], 500);
        }
    }

    /**
     * Delete translations for a page
     *
     * @param Request $request
     * @param int $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function deleteTranslations(Request $request, $id)
    {
        // Validate admin permissions
        if (!auth()->check() || !auth()->user()->isAdmin()) {
            return response()->json(['error' => 'Unauthorized'], 403);
        }

        $page = Page::findOrFail($id);

        try {
            $translationService = new TranslationService();
            $locale = $request->input('locale', null);
            
            $success = $translationService->deleteTranslations($page, $locale);

            if (!$success) {
                throw new \Exception('Failed to delete translations');
            }

            return response()->json([
                'status' => 'success',
                'message' => $locale ? 
                    "Translations for locale '$locale' deleted successfully" : 
                    'All translations deleted successfully'
            ]);
        } catch (\Exception $e) {
            Log::error('Translation deletion failed for page ' . $id, [
                'error' => $e->getMessage()
            ]);

            return response()->json([
                'status' => 'error',
                'message' => 'Failed to delete translations: ' . $e->getMessage()
            ], 500);
        }
    }

    /**
     * Generate preview translations for new pages (before saving)
     *
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function translatePreview(Request $request)
    {
        // Validate admin permissions
        if (!auth()->check() || !auth()->user()->isAdmin()) {
            return response()->json(['error' => 'Unauthorized'], 403);
        }

        $request->validate([
            'content' => 'required|array',
            'locales' => 'required|array',
            'locales.*' => 'string|in:fr,es',
        ]);

        try {
            $content = $request->input('content');
            $targetLocales = $request->input('locales');

            // Create a temporary page object for translation
            $tempPage = new Page();
            $tempPage->meta_title = $content['meta_title'] ?? '';
            $tempPage->meta_description = $content['meta_description'] ?? '';
            $tempPage->content_sections = $content['content_sections'] ?? [];

            // Use Gemini Translation Service if available, otherwise return mock translations
            if (class_exists('\App\Services\GeminiTranslationService')) {
                $geminiService = new \App\Services\GeminiTranslationService();
                $translations = $geminiService->translatePage($tempPage, $targetLocales);
            } else {
                // Simple mock translations for testing
                $translations = [];
                foreach ($targetLocales as $locale) {
                    $translations[$locale] = [
                        'meta_title' => ($content['meta_title'] ?? '') . ' (' . strtoupper($locale) . ')',
                        'meta_description' => ($content['meta_description'] ?? '') . ' (' . strtoupper($locale) . ')',
                        'content_sections' => array_map(function($section) use ($locale) {
                            return [
                                'title' => ($section['title'] ?? '') . ' (' . strtoupper($locale) . ')',
                                'text' => ($section['text'] ?? '') . ' (' . strtoupper($locale) . ')'
                            ];
                        }, $content['content_sections'] ?? [])
                    ];
                }
            }

            return response()->json([
                'status' => 'success',
                'message' => 'Translations generated successfully',
                'translations' => $translations
            ]);

        } catch (\Exception $e) {
            Log::error('Preview translation failed for page', [
                'error' => $e->getMessage()
            ]);

            return response()->json([
                'status' => 'error',
                'message' => 'Translation failed: ' . $e->getMessage()
            ], 500);
        }
    }
}
