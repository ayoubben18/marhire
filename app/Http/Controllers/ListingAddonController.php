<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\ListingAddon;
use App\Models\Category;
use App\Services\TranslationService;
use App\Services\GeminiTranslationService;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Auth;

class ListingAddonController extends Controller
{
    public function list(Request $request){
        $layout = 'layouts.dashboard_admin';
        $listingAddons = ListingAddon::latest()->get();

        return view('listing_addons.list')->with([
                                          'layout' => $layout, 
                                          'listingAddons' => $listingAddons
                                        ]);
    }

    public function new(Request $request){
        $layout = 'layouts.dashboard_admin';
        $categories = Category::orderBy('category')->get();

        return view('listing_addons.add')->with([
                                        'layout' => $layout,
                                        'categories' => $categories
                                    ]);
    }

    public function insert(Request $request){
        $validated = $request->validate([
            'addon' => 'required',
            'category_id' => 'required',
            'price' => 'required'
        ]);

        $addon = ListingAddon::create([
            'addon' => $request->addon,
            'category_id' => $request->category_id,
            'price' => $request->price
        ]);

        // Handle pending translations from modal
        if ($request->has('pending_translations') && $request->pending_translations) {
            try {
                $pendingTranslations = json_decode($request->pending_translations, true);
                if ($pendingTranslations && is_array($pendingTranslations)) {
                    $translationService = new TranslationService();
                    $formattedTranslations = [];
                    
                    foreach ($pendingTranslations as $locale => $text) {
                        $formattedTranslations[$locale] = ['addon' => $text];
                    }
                    
                    $translationService->updateTranslations($addon, $formattedTranslations);
                }
            } catch (\Exception $e) {
                Log::warning('Failed to save pending translations for new addon', [
                    'addon_id' => $addon->id,
                    'error' => $e->getMessage()
                ]);
            }
        }

        return back()->with('inserted', true);
    }

    public function edit(Request $request, $id){
        $layout = 'layouts.dashboard_admin';
        $listingAddon = ListingAddon::where('id', $id)->first();
        $categories = Category::orderBy('category')->get();

        if($listingAddon)
        {
            return view('listing_addons.update')->with([
                                                'layout' => $layout,
                                                'categories' => $categories,
                                                'listingAddon' => $listingAddon
                                            ]);
        }

        abort(404);
    }

    public function update(Request $request){
        $validated = $request->validate([
            'addon' => 'required',
            'category_id' => 'required',
            'price' => 'required'
        ]);

        $listingAddon = ListingAddon::findOrFail($request->id);

        $listingAddon->update([
            'addon' => $request->addon,
            'category_id' => $request->category_id,
            'price' => $request->price
        ]);

        return back()->with('updated', true);
    }

    public function delete(Request $request){
        $listingAddon = ListingAddon::findOrFail($request->id);

        $listingAddon->delete();
        return 'success';
    }

    public function getAddons(Request $request)
    {
        $locale = $request->input('locale', app()->getLocale());
        
        $addons = ListingAddon::with(['translations' => function($query) use ($locale) {
                                    $query->where('locale', $locale);
                                }])
                                ->where('category_id', $request->category_id)
                                ->orderBy('addon')
                                ->get();

        // Apply translations
        $addons->each(function($addon) use ($locale) {
            $addon->addon = $addon->getTranslation('addon', $locale);
        });

        return response()->json($addons);
    }

    /**
     * Get translations for an addon
     *
     * @param Request $request
     * @param int $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function getTranslations(Request $request, $id)
    {
        $addon = ListingAddon::findOrFail($id);
        
        $translations = $addon->translations()
            ->get()
            ->keyBy('locale');

        $supportedLocales = config('app.supported_locales', ['en', 'fr', 'es']);
        $translationStatus = [];

        foreach ($supportedLocales as $locale) {
            $translationStatus[$locale] = [
                'exists' => isset($translations[$locale]),
                'updated_at' => isset($translations[$locale]) ? $translations[$locale]->updated_at : null,
                'addon' => isset($translations[$locale]) ? $translations[$locale]->addon : null
            ];
        }

        return response()->json([
            'translations' => $translations,
            'status' => $translationStatus,
            'supported_locales' => $supportedLocales
        ]);
    }

    /**
     * Update translations for an addon
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

        $addon = ListingAddon::findOrFail($id);
        
        $request->validate([
            'translations' => 'required|array',
            'translations.*.locale' => 'required|string|in:' . implode(',', config('app.supported_locales', ['en', 'fr', 'es'])),
            'translations.*.addon' => 'required|string|max:255'
        ]);

        try {
            DB::beginTransaction();
            
            $translationService = new TranslationService();
            $translationData = [];

            foreach ($request->input('translations') as $translation) {
                $locale = $translation['locale'];
                unset($translation['locale']);
                $translation['source'] = 'manual'; // Mark as manually edited
                $translationData[$locale] = $translation;
            }

            $success = $translationService->updateTranslations($addon, $translationData);

            if (!$success) {
                throw new \Exception('Failed to update translations');
            }

            DB::commit();

            return response()->json([
                'status' => 'success',
                'message' => 'Translations updated successfully',
                'translations' => $addon->translations()->get()->keyBy('locale')
            ]);

        } catch (\Exception $e) {
            DB::rollBack();
            Log::error('Translation update failed for addon ' . $id, [
                'error' => $e->getMessage()
            ]);

            return response()->json([
                'status' => 'error',
                'message' => 'Failed to update translations: ' . $e->getMessage()
            ], 500);
        }
    }

    /**
     * Delete translations for an addon
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

        $addon = ListingAddon::findOrFail($id);
        
        $request->validate([
            'locale' => 'sometimes|string|in:' . implode(',', config('app.supported_locales', ['en', 'fr', 'es']))
        ]);

        try {
            $translationService = new TranslationService();
            $locale = $request->input('locale', null);
            
            $success = $translationService->deleteTranslations($addon, $locale);

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
            Log::error('Translation deletion failed for addon ' . $id, [
                'error' => $e->getMessage()
            ]);

            return response()->json([
                'status' => 'error',
                'message' => 'Failed to delete translations: ' . $e->getMessage()
            ], 500);
        }
    }

    /**
     * Translate text without an existing addon (for new addons)
     *
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function translateText(Request $request)
    {
        // Validate admin permissions
        if (!auth()->check() || !auth()->user()->isAdmin()) {
            return response()->json(['error' => 'Unauthorized'], 403);
        }

        $request->validate([
            'text' => 'required|string|max:500',
            'target_locales' => 'required|array',
            'target_locales.*' => 'string|in:' . implode(',', config('app.supported_locales', ['en', 'fr', 'es']))
        ]);

        try {
            $text = $request->input('text');
            $targetLocales = $request->input('target_locales');
            $translations = [];

            $geminiService = new GeminiTranslationService();

            foreach ($targetLocales as $locale) {
                try {
                    $translations[$locale] = $geminiService->translateText($text, $locale);
                } catch (\Exception $e) {
                    Log::warning('Failed to translate text to ' . $locale, [
                        'error' => $e->getMessage()
                    ]);
                    // Continue with other translations even if one fails
                    $translations[$locale] = '';
                }
            }

            return response()->json([
                'status' => 'success',
                'translations' => $translations
            ]);

        } catch (\Exception $e) {
            Log::error('Text translation failed', [
                'error' => $e->getMessage()
            ]);

            return response()->json([
                'status' => 'error',
                'message' => 'Failed to generate translations: ' . $e->getMessage()
            ], 500);
        }
    }

    /**
     * Generate AI translations for an addon
     *
     * @param Request $request
     * @param int $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function generateTranslations(Request $request, $id)
    {
        // Validate admin permissions
        if (!auth()->check() || !auth()->user()->isAdmin()) {
            return response()->json(['error' => 'Unauthorized'], 403);
        }

        $addon = ListingAddon::findOrFail($id);
        
        $request->validate([
            'target_locales' => 'sometimes|array',
            'target_locales.*' => 'string|in:' . implode(',', config('app.supported_locales', ['en', 'fr', 'es'])),
            'service' => 'sometimes|string|in:gemini,openai'
        ]);

        try {
            DB::beginTransaction();

            $targetLocales = $request->input('target_locales', ['fr', 'es']);
            $service = $request->input('service', 'gemini');
            
            // Generate translations using Gemini
            $translations = [];
            $geminiService = new GeminiTranslationService();
            
            foreach ($targetLocales as $locale) {
                $translations[$locale] = [
                    'addon' => $geminiService->translateText($addon->addon, $locale)
                ];
            }

            // Store translations using TranslationService
            $translationService = new TranslationService();
            $success = $translationService->updateTranslations($addon, $translations);

            if (!$success) {
                throw new \Exception('Failed to save translations to database');
            }

            DB::commit();

            // Get all translations for response
            $allTranslations = $addon->translations()
                ->whereIn('locale', array_keys($translations))
                ->get()
                ->keyBy('locale');

            return response()->json([
                'status' => 'success',
                'message' => 'Translations generated successfully',
                'translations' => $allTranslations,
                'generated_locales' => array_keys($translations)
            ]);

        } catch (\Exception $e) {
            DB::rollBack();
            Log::error('Translation generation failed for addon ' . $id, [
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString()
            ]);

            return response()->json([
                'status' => 'error',
                'message' => 'Failed to generate translations: ' . $e->getMessage()
            ], 500);
        }
    }
}
