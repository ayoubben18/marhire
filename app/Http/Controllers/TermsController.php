<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\TermsAndConditions;
use App\Services\GeminiTranslationService;
use Illuminate\Support\Facades\Log;
use Auth;

class TermsController extends Controller
{
    public function list(Request $request){
        $layout = Auth::user()->isAdmin() ? 'layouts.dashboard_admin' : 'layouts.dashboard';
        $terms = TermsAndConditions::latest()->get();

        return view('terms.list')->with([
                                          'layout' => $layout, 
                                          'terms' => $terms
                                        ]);
    }

    public function new(Request $request){
        $layout = Auth::user()->isAdmin() ? 'layouts.dashboard_admin' : 'layouts.dashboard';

        return view('terms.add')->with([
                                        'layout' => $layout
                                    ]);
    }

    public function insert(Request $request){
        $validated = $request->validate([
            'title' => 'required'
        ]);

        $term = TermsAndConditions::create([
            'title' => $request->title,
            'content' => $request->content
        ]);
        
        // Handle translations if they were provided
        if ($request->has('pending_translations') && !empty($request->pending_translations)) {
            $translations = json_decode($request->pending_translations, true);
            
            if ($translations && is_array($translations)) {
                foreach ($translations as $locale => $translatedData) {
                    if (in_array($locale, ['fr', 'es']) && is_array($translatedData)) {
                        $term->translations()->updateOrCreate(
                            ['locale' => $locale],
                            [
                                'title' => $translatedData['title'] ?? '',
                                'content' => $translatedData['content'] ?? ''
                            ]
                        );
                    }
                }
            }
        }

        return back()->with('inserted', true);
    }

    public function edit(Request $request, $id){
        $layout = Auth::user()->isAdmin()?'layouts.dashboard_admin':'layouts.dashboard';
        $term = TermsAndConditions::where('id', $id)->first();

        if($term)
        {
            return view('terms.update')->with([
                                                'layout' => $layout,
                                                'term' => $term
                                            ]);
        }

        abort(404);
    }

    public function update(Request $request){
        $validated = $request->validate([
            'title' => 'required'
        ]);

        $term = TermsAndConditions::findOrFail($request->id);

        $term->update([
            'title' => $request->title,
            'content' => $request->content
        ]);
        
        // Handle translations if they were provided
        if ($request->has('pending_translations') && !empty($request->pending_translations)) {
            $translations = json_decode($request->pending_translations, true);
            
            if ($translations && is_array($translations)) {
                foreach ($translations as $locale => $translatedData) {
                    if (in_array($locale, ['fr', 'es']) && is_array($translatedData)) {
                        $term->translations()->updateOrCreate(
                            ['locale' => $locale],
                            [
                                'title' => $translatedData['title'] ?? '',
                                'content' => $translatedData['content'] ?? ''
                            ]
                        );
                    }
                }
            }
        }

        return back()->with('updated', true);
    }

    public function delete(Request $request){
        $term = TermsAndConditions::findOrFail($request->id);

        $term->delete();
        return 'success';
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

        Log::info('Term translation preview request', [
            'user_id' => auth()->id(),
            'locales' => $targetLocales,
            'fields_count' => count($content),
            'selected_fields' => $selectedFields
        ]);

        try {
            // Create a temporary term object with the content
            $tempTerm = new TermsAndConditions();
            foreach ($content as $field => $value) {
                if (in_array($field, $tempTerm->getFillable())) {
                    $tempTerm->$field = $value;
                }
            }

            // Use Gemini Translation Service
            $geminiService = new GeminiTranslationService();
            $translations = $geminiService->translateTerm($tempTerm, $targetLocales);

            return response()->json([
                'status' => 'success',
                'message' => 'Translations generated successfully',
                'translations' => $translations,
                'locales' => $targetLocales
            ]);

        } catch (\Exception $e) {
            Log::error('Term translation preview failed', [
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
}
