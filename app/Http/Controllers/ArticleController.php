<?php

namespace App\Http\Controllers;

use App\Models\Article;
use App\Models\Category;
use App\Models\TermsAndConditions;
use App\Services\GeminiTranslationService;
use App\Services\TranslationService;
use Auth;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Str;

class ArticleController extends Controller
{
    public function list(Request $request)
    {
        $layout = Auth::user()->isAdmin() ? 'layouts.dashboard_admin' : 'layouts.dashboard';
        $articles = Article::with(['category', 'translations'])->latest()->get();

        return view('articles.list')->with([
            'layout' => $layout,
            'articles' => $articles
        ]);
    }

    public function new(Request $request)
    {
        $layout = Auth::user()->isAdmin() ? 'layouts.dashboard_admin' : 'layouts.dashboard';
        $categories = Category::all();

        return view('articles.add')->with([
            'layout' => $layout,
            'categories' => $categories
        ]);
    }

    public function insert(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required'
        ]);
        $slug = $this->generateUniqueSlug($request->title);

        $logo = '';

        if ($request->hasFile('featured_img')) {
            $logoFileName = 'article_' . uniqid() . '.' . $request->featured_img->extension();
            $destination = $this->getImagesDestination();

            $request->featured_img->move($destination, $logoFileName);

            // Convert to web-accessible path for storage
            $fullPath = $destination . '/' . $logoFileName;
            $logo = $this->convertToWebPath($fullPath);
        }

        $article = Article::create([
            'title' => $request->title,
            'short_description' => $request->short_description,
            'content' => $request->content,
            'slug' => $slug,
            'featured_img' => $logo,
            'meta_title' => $request->meta_title,
            'meta_description' => $request->meta_description,
            'schema' => $request->schema,
            'category_id' => $request->category_id,
            'user_id' => Auth::id()
        ]);

        // Create English translation from main article data
        $translationService = new TranslationService();
        $englishTranslation = [
            'en' => [
                'title' => $request->title,
                'short_description' => $request->short_description,
                'content' => $request->content,
                'meta_title' => $request->meta_title,
                'meta_description' => $request->meta_description,
            ]
        ];

        try {
            $translationService->updateTranslations($article, $englishTranslation);
        } catch (\Exception $e) {
            Log::warning('Failed to save English translation for new article', [
                'article_id' => $article->id,
                'error' => $e->getMessage()
            ]);
        }

        // Save pending translations if they exist
        if ($request->has('pending_translations')) {
            try {
                $pendingTranslations = json_decode($request->input('pending_translations'), true);
                if ($pendingTranslations && is_array($pendingTranslations)) {
                    $translationService->updateTranslations($article, $pendingTranslations);
                }
            } catch (\Exception $e) {
                Log::warning('Failed to save pending translations for new article', [
                    'article_id' => $article->id,
                    'error' => $e->getMessage()
                ]);
            }
        }

        return back()->with('inserted', true);
    }

    public static function generateUniqueSlug($title)
    {
        $slug = Str::slug($title);
        $originalSlug = $slug;
        $i = 1;

        while (
            Article::where('slug', $slug)
                ->exists()
        ) {
            $slug = $originalSlug . '-' . $i;
            $i++;
        }
        return $slug;
    }

    public function edit(Request $request, $id)
    {
        $layout = Auth::user()->isAdmin() ? 'layouts.dashboard_admin' : 'layouts.dashboard';
        $article = Article::with('translations')->findOrFail($id);
        $categories = Category::all();

        return view('articles.update')->with([
            'layout' => $layout,
            'article' => $article,
            'categories' => $categories
        ]);
    }

    public function update(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required'
        ]);

        $article = Article::findOrFail($request->id);

        $logo = $article->featured_img;

        // Handle image deletion
        if ($request->has('delete_image') && $request->delete_image == '1') {
            if ($article->featured_img) {
                // Delete old image file - check both possible paths
                $publicPath = public_path($article->featured_img);
                $cPanelPath = str_replace('/public/', '/public_html/', $publicPath);

                if (file_exists($publicPath)) {
                    unlink($publicPath);
                } elseif (file_exists($cPanelPath)) {
                    unlink($cPanelPath);
                }
            }
            $logo = '';
        }

        if ($request->hasFile('featured_img')) {
            // Delete old image if exists - check both possible paths
            if ($article->featured_img) {
                $publicPath = public_path($article->featured_img);
                $cPanelPath = str_replace('/public/', '/public_html/', $publicPath);

                if (file_exists($publicPath)) {
                    unlink($publicPath);
                } elseif (file_exists($cPanelPath)) {
                    unlink($cPanelPath);
                }
            }

            $logoFileName = 'article_' . uniqid() . '.' . $request->featured_img->extension();
            $destination = $this->getImagesDestination();

            $request->featured_img->move($destination, $logoFileName);

            // Convert to web-accessible path for storage
            $fullPath = $destination . '/' . $logoFileName;
            $logo = $this->convertToWebPath($fullPath);
        }

        $article->update([
            'title' => $request->title,
            'short_description' => $request->short_description,
            'content' => $request->content,
            'featured_img' => $logo,
            'meta_title' => $request->meta_title,
            'meta_description' => $request->meta_description,
            'schema' => $request->schema,
            'category_id' => $request->category_id,
        ]);

        // Update English translation from main article data
        $translationService = new TranslationService();
        $englishTranslation = [
            'en' => [
                'title' => $request->title,
                'short_description' => $request->short_description,
                'content' => $request->content,
                'meta_title' => $request->meta_title,
                'meta_description' => $request->meta_description,
            ]
        ];

        try {
            $translationService->updateTranslations($article, $englishTranslation);
        } catch (\Exception $e) {
            Log::warning('Failed to update English translation for article', [
                'article_id' => $article->id,
                'error' => $e->getMessage()
            ]);
        }

        // Save pending translations if they exist
        if ($request->has('pending_translations')) {
            try {
                $pendingTranslations = json_decode($request->input('pending_translations'), true);
                if ($pendingTranslations && is_array($pendingTranslations)) {
                    $translationService->updateTranslations($article, $pendingTranslations);
                }
            } catch (\Exception $e) {
                Log::warning('Failed to save pending translations for article', [
                    'article_id' => $article->id,
                    'error' => $e->getMessage()
                ]);
            }
        }

        return back()->with('updated', true);
    }

    public function delete(Request $request)
    {
        $article = Article::findOrFail($request->id);

        $article->delete();
        return 'success';
    }

    /**
     * Translate an article to multiple locales
     */
    public function translate(Request $request, $id)
    {
        // Validate admin permissions
        if (!auth()->check() || !auth()->user()->isAdmin()) {
            return response()->json(['error' => 'Unauthorized'], 403);
        }

        $article = Article::findOrFail($id);

        $request->validate([
            'locales' => 'sometimes|array',
            'locales.*' => 'string|in:fr,es,ar,de,it,pt,ru,zh,ja',
            'fields' => 'sometimes|array',
            'fields.*' => 'string',
            'force' => 'sometimes|boolean'
        ]);

        $targetLocales = $request->input('locales', ['fr', 'es']);
        $selectedFields = $request->input('fields', null);
        $forceRetranslate = $request->input('force', false);

        try {
            DB::beginTransaction();

            // Check if translations exist and if we should skip
            if (!$forceRetranslate) {
                $existingTranslations = $article->translations()
                    ->whereIn('locale', $targetLocales)
                    ->pluck('locale')
                    ->toArray();

                if (count($existingTranslations) === count($targetLocales)) {
                    return response()->json([
                        'status' => 'info',
                        'message' => 'Translations already exist. Use force=true to regenerate.',
                        'existing' => $existingTranslations
                    ]);
                }

                // Filter out existing locales if not forcing
                $targetLocales = array_diff($targetLocales, $existingTranslations);
            }

            if (empty($targetLocales)) {
                return response()->json([
                    'status' => 'info',
                    'message' => 'All requested translations already exist.'
                ]);
            }

            // Use Gemini Translation Service
            $geminiService = new GeminiTranslationService();
            $translations = $geminiService->translateArticle($article, $targetLocales);

            // Store translations using TranslationService
            $translationService = new TranslationService();
            $success = $translationService->updateTranslations($article, $translations);

            if (!$success) {
                throw new \Exception('Failed to save translations to database');
            }

            DB::commit();

            // Get all translations for response
            $allTranslations = $article->translations()
                ->whereIn('locale', array_keys($translations))
                ->get()
                ->keyBy('locale');

            return response()->json([
                'status' => 'success',
                'message' => 'Translations generated successfully',
                'translations' => $allTranslations,
                'locales' => array_keys($translations)
            ]);

        } catch (\Exception $e) {
            DB::rollBack();

            Log::error('Article translation failed', [
                'article_id' => $id,
                'error' => $e->getMessage(),
                'user_id' => auth()->id()
            ]);

            return response()->json([
                'status' => 'error',
                'message' => 'Translation failed: ' . $e->getMessage()
            ], 500);
        }
    }

    /**
     * Preview translations before saving (for admin UI)
     */
    public function translatePreview(Request $request)
    {
        // Validate admin permissions
        if (!auth()->check() || !auth()->user()->isAdmin()) {
            Log::error('Translation preview: Unauthorized access', [
                'is_authenticated' => auth()->check(),
                'user_id' => auth()->id(),
                'is_admin' => auth()->check() ? auth()->user()->isAdmin() : false
            ]);
            return response()->json(['error' => 'Unauthorized'], 403);
        }

        $request->validate([
            'content' => 'required|array',
            'locales' => 'array',
            'fields' => 'array'
        ]);

        $content = $request->input('content');
        $targetLocales = $request->input('locales', ['fr', 'es']);
        $selectedFields = $request->input('fields', null);

        Log::info('Article translation preview request', [
            'user_id' => auth()->id(),
            'locales' => $targetLocales,
            'fields_count' => count($content),
            'selected_fields' => $selectedFields
        ]);

        try {
            // Create a temporary article object with the content
            $tempArticle = new Article();
            foreach ($content as $field => $value) {
                if (in_array($field, $tempArticle->getFillable())) {
                    $tempArticle->$field = $value;
                }
            }

            // Use Gemini Translation Service
            $geminiService = new GeminiTranslationService();
            $translations = $geminiService->translateArticle($tempArticle, $targetLocales);

            return response()->json([
                'status' => 'success',
                'message' => 'Translations generated successfully',
                'translations' => $translations,
                'locales' => $targetLocales
            ]);

        } catch (\Exception $e) {
            Log::error('Article translation preview failed', [
                'error' => $e->getMessage(),
                'user_id' => auth()->id(),
                'content_fields' => array_keys($content)
            ]);

            return response()->json([
                'status' => 'error',
                'message' => 'Translation failed: ' . $e->getMessage()
            ], 500);
        }
    }

    /**
     * Get the correct destination path for image uploads
     * Handles both local development and cPanel deployment
     *
     * @return string
     */
    private function getImagesDestination(): string
    {
        // Use environment variable to determine if we're on cPanel
        if (env('CPANEL_ENV', false) === true || env('CPANEL_ENV', false) === 'true') {
            // cPanel: Use public_html/images/articles for web-accessible storage
            $basePath = base_path();
            $publicHtmlPath = dirname($basePath) . '/public_html/images/articles';

            // Create directory if it doesn't exist
            if (!file_exists($publicHtmlPath)) {
                mkdir($publicHtmlPath, 0755, true);
            }

            return $publicHtmlPath;
        }

        // Local development or standard deployment: use Laravel's public path
        $publicPath = public_path('images/articles');

        // Create directory if it doesn't exist
        if (!file_exists($publicPath)) {
            mkdir($publicPath, 0755, true);
        }

        return $publicPath;
    }

    /**
     * Convert absolute file path to web-accessible relative path
     * Handles both standard Laravel public and cPanel public_html paths
     *
     * @param string $absolutePath
     * @return string
     */
    private function convertToWebPath(string $absolutePath): string
    {
        // Remove various possible base paths to get the web-accessible path
        $webPath = $absolutePath;

        // Try removing public_html path (cPanel)
        if (str_contains($webPath, '/public_html/')) {
            $parts = explode('/public_html/', $webPath);
            $webPath = end($parts);
        }
        // Try removing standard Laravel public path
        elseif (str_contains($webPath, '/public/')) {
            $parts = explode('/public/', $webPath);
            $webPath = end($parts);
        }
        // If neither worked, try to extract just the /images/articles/ part
        elseif (str_contains($webPath, '/images/articles/')) {
            $parts = explode('/images/articles/', $webPath);
            $webPath = 'images/articles/' . end($parts);
        }

        // Remove leading slash if present (we want relative path for storage)
        $webPath = ltrim($webPath, '/');

        return $webPath;
    }
}
