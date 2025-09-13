<?php

namespace App\Services;

use Gemini\Data\GenerationConfig;
use Gemini\Data\Schema;
use Gemini\Enums\DataType;
use Gemini\Enums\ResponseMimeType;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Cache;
use App\Models\Listing;
use App\Models\Article;
use App\Models\TermsAndConditions;
use Exception;

class GeminiTranslationService
{
    protected $client;
    protected $model;

    public function __construct()
    {
        $apiKey = config('services.gemini.api_key');
        if (!$apiKey) {
            throw new Exception('Gemini API key not configured');
        }

        $this->client = \Gemini::client($apiKey);
        $this->model = config('services.gemini.model', 'gemini-2.5-flash-lite');
    }

    /**
     * Translate a listing to target locales using text-by-text translation
     *
     * @param Listing $listing
     * @param array $targetLocales
     * @return array
     * @throws Exception
     */
    public function translateListing(Listing $listing, array $targetLocales = ['fr', 'es'])
    {
        $translations = [];
        $translatableFields = [
            'title', 'description', 'short_description', 'special_notes',
            'cancellation_policy', 'rental_terms', 'pickup_info',
            'meta_title', 'meta_description'
        ];

        foreach ($targetLocales as $locale) {
            $translations[$locale] = [];

            foreach ($translatableFields as $field) {
                if (!empty($listing->$field)) {
                    try {
                        $translations[$locale][$field] = $this->translateText(
                            $listing->$field,
                            $locale
                        );
                    } catch (Exception $e) {
                        Log::warning("Failed to translate field {$field} for listing {$listing->id}", [
                            'field' => $field,
                            'listing_id' => $listing->id,
                            'locale' => $locale,
                            'error' => $e->getMessage()
                        ]);
                        // Keep original text as fallback
                        $translations[$locale][$field] = $listing->$field;
                    }
                } else {
                    $translations[$locale][$field] = '';
                }
            }
        }

        Log::info('Listing translation completed with text-by-text approach', [
            'listing_id' => $listing->id,
            'locales' => $targetLocales,
            'fields_translated' => count($translatableFields)
        ]);

        return $translations;
    }

    /**
     * Create translation schema for structured output
     *
     * @param array $targetLocales
     * @param array $fields
     * @return Schema
     */
    protected function createTranslationSchema(array $targetLocales, array $fields)
    {
        $localeProperties = [];

        foreach ($targetLocales as $locale) {
            $fieldProperties = [];
            foreach ($fields as $field) {
                $fieldProperties[$field] = new Schema(type: DataType::STRING);
            }

            $localeProperties[$locale] = new Schema(
                type: DataType::OBJECT,
                properties: $fieldProperties
            );
        }

        return new Schema(
            type: DataType::OBJECT,
            properties: $localeProperties,
            required: $targetLocales
        );
    }

    /**
     * Translate an article to target locales using text-by-text translation
     *
     * @param Article $article
     * @param array $targetLocales
     * @return array
     * @throws Exception
     */
    public function translateArticle(Article $article, array $targetLocales = ['fr', 'es'])
    {
        $translations = [];
        $translatableFields = [
            'title', 'short_description', 'content', 'meta_title', 'meta_description'
        ];

        foreach ($targetLocales as $locale) {
            $translations[$locale] = [];

            foreach ($translatableFields as $field) {
                if (!empty($article->$field)) {
                    try {
                        $translations[$locale][$field] = $this->translateText(
                            $article->$field,
                            $locale
                        );
                    } catch (Exception $e) {
                        Log::warning("Failed to translate field {$field} for article {$article->id}", [
                            'field' => $field,
                            'article_id' => $article->id,
                            'locale' => $locale,
                            'error' => $e->getMessage()
                        ]);
                        // Keep original text as fallback
                        $translations[$locale][$field] = $article->$field;
                    }
                } else {
                    $translations[$locale][$field] = '';
                }
            }
        }

        Log::info('Article translation completed with text-by-text approach', [
            'article_id' => $article->id,
            'locales' => $targetLocales,
            'fields_translated' => count($translatableFields)
        ]);

        return $translations;
    }

    /**
     * Translate a term to target locales using text-by-text translation
     *
     * @param TermsAndConditions $term
     * @param array $targetLocales
     * @return array
     * @throws Exception
     */
    public function translateTerm(TermsAndConditions $term, array $targetLocales = ['fr', 'es'])
    {
        $translations = [];
        $translatableFields = ['title', 'content'];

        foreach ($targetLocales as $locale) {
            $translations[$locale] = [];

            foreach ($translatableFields as $field) {
                if (!empty($term->$field)) {
                    try {
                        $translations[$locale][$field] = $this->translateText(
                            $term->$field,
                            $locale
                        );
                    } catch (Exception $e) {
                        Log::warning("Failed to translate field {$field} for term {$term->id}", [
                            'field' => $field,
                            'term_id' => $term->id,
                            'locale' => $locale,
                            'error' => $e->getMessage()
                        ]);
                        // Keep original text as fallback
                        $translations[$locale][$field] = $term->$field;
                    }
                } else {
                    $translations[$locale][$field] = '';
                }
            }
        }

        Log::info('Term translation completed with text-by-text approach', [
            'term_id' => $term->id,
            'locales' => $targetLocales,
            'fields_translated' => count($translatableFields)
        ]);

        return $translations;
    }

    /**
     * Build structured prompt for Gemini
     *
     * @param Listing $listing
     * @param array $targetLocales
     * @return string
     */
    protected function buildTranslationPrompt(Listing $listing, array $targetLocales)
    {
        $translatableFields = [
            'title' => $listing->title,
            'description' => $listing->description,
            'short_description' => $listing->short_description,
            'special_notes' => $listing->special_notes,
            'cancellation_policy' => $listing->cancellation_policy,
            'rental_terms' => $listing->rental_terms,
            'pickup_info' => $listing->pickup_info,
            'meta_title' => $listing->meta_title,
            'meta_description' => $listing->meta_description,
        ];

        // Remove null/empty fields
        $translatableFields = array_filter($translatableFields, function($value) {
            return !is_null($value) && $value !== '';
        });

        $localeNames = [
            'fr' => 'French',
            'es' => 'Spanish',
            'ar' => 'Arabic',
            'de' => 'German',
            'it' => 'Italian',
            'pt' => 'Portuguese',
            'ru' => 'Russian',
            'zh' => 'Chinese',
            'ja' => 'Japanese'
        ];

        $targetLanguages = array_map(function($locale) use ($localeNames) {
            return $localeNames[$locale] ?? $locale;
        }, $targetLocales);

        $prompt = "You are a professional translator specializing in tourism and vacation rental content. ";
        $prompt .= "Translate the following rental listing content from English to " . implode(' and ', $targetLanguages) . ". ";
        $prompt .= "Maintain a professional, inviting tone suitable for tourists. ";
        $prompt .= "Preserve any specific location names, property names, and contact information exactly as they appear. ";
        $prompt .= "For SEO fields (meta_title, meta_description), ensure they are optimized for search engines in the target language. ";
        $prompt .= "Return ONLY a valid JSON object with the following structure (no markdown, no explanations):\n";
        $prompt .= "{\n";
        
        foreach ($targetLocales as $locale) {
            $prompt .= "  \"$locale\": {\n";
            foreach (array_keys($translatableFields) as $field) {
                $prompt .= "    \"$field\": \"translated text\",\n";
            }
            $prompt = rtrim($prompt, ",\n") . "\n";
            $prompt .= "  },\n";
        }
        $prompt = rtrim($prompt, ",\n") . "\n";
        $prompt .= "}\n\n";
        
        $prompt .= "Content to translate:\n";
        $prompt .= json_encode($translatableFields, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE);

        return $prompt;
    }

    /**
     * Build structured prompt for article translation
     *
     * @param Article $article
     * @param array $targetLocales
     * @return string
     */
    protected function buildArticleTranslationPrompt(Article $article, array $targetLocales)
    {
        $translatableFields = [
            'title' => $article->title,
            'short_description' => $article->short_description,
            'content' => $article->content,
            'meta_title' => $article->meta_title,
            'meta_description' => $article->meta_description,
        ];

        // Remove null/empty fields
        $translatableFields = array_filter($translatableFields, function($value) {
            return !is_null($value) && $value !== '';
        });

        $localeNames = [
            'fr' => 'French',
            'es' => 'Spanish',
            'ar' => 'Arabic',
            'de' => 'German',
            'it' => 'Italian',
            'pt' => 'Portuguese',
            'ru' => 'Russian',
            'zh' => 'Chinese',
            'ja' => 'Japanese'
        ];

        $targetLanguages = array_map(function($locale) use ($localeNames) {
            return $localeNames[$locale] ?? $locale;
        }, $targetLocales);

        $prompt = "You are a professional translator specializing in article and blog content. ";
        $prompt .= "Translate the following article content from English to " . implode(' and ', $targetLanguages) . ". ";
        $prompt .= "Maintain a professional, engaging tone suitable for readers interested in the topic. ";
        $prompt .= "Preserve any specific names, locations, and technical terms as appropriate. ";
        $prompt .= "For SEO fields (meta_title, meta_description), ensure they are optimized for search engines in the target language. ";
        $prompt .= "CRITICAL: For the content field containing HTML, you must preserve ALL HTML tags, attributes, and structure exactly as they appear. ";
        $prompt .= "Only translate the text content between HTML tags, never modify, remove, or alter any HTML markup. ";
        $prompt .= "Example: '<p>Hello <strong>world</strong></p>' becomes '<p>Bonjour <strong>monde</strong></p>' in French. ";
        $prompt .= "Return ONLY a valid JSON object with the following structure (no markdown, no explanations):\n";
        $prompt .= "{\n";
        
        foreach ($targetLocales as $locale) {
            $prompt .= "  \"$locale\": {\n";
            foreach (array_keys($translatableFields) as $field) {
                $prompt .= "    \"$field\": \"translated text\",\n";
            }
            $prompt = rtrim($prompt, ",\n") . "\n";
            $prompt .= "  },\n";
        }
        $prompt = rtrim($prompt, ",\n") . "\n";
        $prompt .= "}\n\n";
        
        $prompt .= "Content to translate:\n";
        $prompt .= json_encode($translatableFields, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE);

        return $prompt;
    }

    /**
     * Build structured prompt for term translation
     *
     * @param TermsAndConditions $term
     * @param array $targetLocales
     * @return string
     */
    protected function buildTermTranslationPrompt(TermsAndConditions $term, array $targetLocales)
    {
        $translatableFields = [
            'title' => $term->title,
            'content' => $term->content,
        ];

        // Remove null/empty fields
        $translatableFields = array_filter($translatableFields, function($value) {
            return !is_null($value) && $value !== '';
        });

        $localeNames = [
            'fr' => 'French',
            'es' => 'Spanish',
            'ar' => 'Arabic',
            'de' => 'German',
            'it' => 'Italian',
            'pt' => 'Portuguese',
            'ru' => 'Russian',
            'zh' => 'Chinese',
            'ja' => 'Japanese'
        ];

        $targetLanguages = array_map(function($locale) use ($localeNames) {
            return $localeNames[$locale] ?? $locale;
        }, $targetLocales);

        $prompt = "You are a professional translator specializing in legal documents and terms of service. ";
        $prompt .= "Translate the following terms and conditions content from English to " . implode(' and ', $targetLanguages) . ". ";
        $prompt .= "Maintain a formal, professional tone appropriate for legal documentation. ";
        $prompt .= "Preserve any specific legal terms, company names, and jurisdictional references as appropriate. ";
        $prompt .= "Ensure the translation maintains the legal intent and meaning of the original text. ";
        $prompt .= "CRITICAL: For the content field containing HTML, you must preserve ALL HTML tags, attributes, and structure exactly as they appear. ";
        $prompt .= "Only translate the text content between HTML tags, never modify, remove, or alter any HTML markup. ";
        $prompt .= "Example: '<p>Terms of <strong>Service</strong></p>' becomes '<p>Conditions de <strong>Service</strong></p>' in French. ";
        $prompt .= "Return ONLY a valid JSON object with the following structure (no markdown, no explanations):\n";
        $prompt .= "{\n";
        
        foreach ($targetLocales as $locale) {
            $prompt .= "  \"$locale\": {\n";
            foreach (array_keys($translatableFields) as $field) {
                $prompt .= "    \"$field\": \"translated text\",\n";
            }
            $prompt = rtrim($prompt, ",\n") . "\n";
            $prompt .= "  },\n";
        }
        $prompt = rtrim($prompt, ",\n") . "\n";
        $prompt .= "}\n\n";
        
        $prompt .= "Content to translate:\n";
        $prompt .= json_encode($translatableFields, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE);

        return $prompt;
    }

    /**
     * Make API request to Gemini with retries
     *
     * @param string $prompt
     * @return array
     * @throws Exception
     */
    protected function makeApiRequest(string $prompt)
    {
        $attempt = 0;
        $lastError = null;

        while ($attempt < $this->maxRetries) {
            try {
                Log::info('Making Gemini API request', [
                    'attempt' => $attempt + 1,
                    'api_key_exists' => !empty($this->apiKey),
                    'api_key_length' => strlen($this->apiKey),
                    'api_url' => $this->apiUrl
                ]);

                $response = Http::withHeaders([
                    'Content-Type' => 'application/json',
                ])
                ->timeout(30)
                ->post($this->apiUrl . '?key=' . $this->apiKey, [
                    'contents' => [
                        [
                            'parts' => [
                                ['text' => $prompt]
                            ]
                        ]
                    ],
                    'generationConfig' => [
                        'temperature' => 0.3,
                        'topK' => 1,
                        'topP' => 0.95,
                        'maxOutputTokens' => 4096,
                    ],
                    'safetySettings' => [
                        [
                            'category' => 'HARM_CATEGORY_HARASSMENT',
                            'threshold' => 'BLOCK_ONLY_HIGH'
                        ],
                        [
                            'category' => 'HARM_CATEGORY_HATE_SPEECH',
                            'threshold' => 'BLOCK_ONLY_HIGH'
                        ],
                        [
                            'category' => 'HARM_CATEGORY_SEXUALLY_EXPLICIT',
                            'threshold' => 'BLOCK_ONLY_HIGH'
                        ],
                        [
                            'category' => 'HARM_CATEGORY_DANGEROUS_CONTENT',
                            'threshold' => 'BLOCK_ONLY_HIGH'
                        ]
                    ]
                ]);

                if ($response->successful()) {
                    $data = $response->json();
                    
                    Log::info('Gemini API response received', [
                        'has_candidates' => isset($data['candidates']),
                        'response_keys' => array_keys($data ?? [])
                    ]);
                    
                    if (isset($data['candidates'][0]['content']['parts'][0]['text'])) {
                        return $data;
                    }
                    
                    throw new Exception('Invalid response structure from Gemini API');
                }

                $lastError = 'Gemini API error: ' . $response->status() . ' - ' . $response->body();
                Log::error('Gemini API request failed', [
                    'status' => $response->status(),
                    'body' => substr($response->body(), 0, 500)
                ]);
                
            } catch (Exception $e) {
                $lastError = $e->getMessage();
            }

            $attempt++;
            
            if ($attempt < $this->maxRetries) {
                usleep($this->retryDelay * 1000 * $attempt); // Exponential backoff
            }
        }

        Log::error('Gemini translation failed after ' . $this->maxRetries . ' attempts', [
            'error' => $lastError
        ]);

        throw new Exception('Translation failed: ' . $lastError);
    }

    /**
     * Parse and validate translation response
     *
     * @param array $response
     * @param array $targetLocales
     * @return array
     * @throws Exception
     */
    protected function parseTranslationResponse(array $response, array $targetLocales)
    {
        if (!isset($response['candidates'][0]['content']['parts'][0]['text'])) {
            throw new Exception('Invalid response structure from Gemini API');
        }

        $text = $response['candidates'][0]['content']['parts'][0]['text'];
        
        // Clean up the response (remove markdown code blocks if present)
        $text = preg_replace('/```json\s*|\s*```/i', '', $text);
        $text = trim($text);
        
        // Parse JSON
        $translations = json_decode($text, true);
        
        if (json_last_error() !== JSON_ERROR_NONE) {
            Log::error('Failed to parse Gemini translation response', [
                'response' => $text,
                'error' => json_last_error_msg()
            ]);
            throw new Exception('Failed to parse translation response: ' . json_last_error_msg());
        }

        // Validate structure
        foreach ($targetLocales as $locale) {
            if (!isset($translations[$locale])) {
                throw new Exception("Missing translation for locale: $locale");
            }
            
            if (!is_array($translations[$locale])) {
                throw new Exception("Invalid translation format for locale: $locale");
            }
        }

        // Log parsed translations for debugging
        Log::info('Parsed translations from Gemini', [
            'locales' => array_keys($translations),
            'translations_data' => array_map(function($trans) {
                return [
                    'fields' => array_keys($trans),
                    'content_length' => isset($trans['content']) ? strlen($trans['content']) : 0,
                    'content_preview' => isset($trans['content']) ? substr($trans['content'], 0, 100) : null
                ];
            }, $translations)
        ]);

        return $translations;
    }

    /**
     * Check rate limiting
     *
     * @return bool
     */
    protected function checkRateLimit()
    {
        $key = 'gemini_api_rate_limit';
        $limit = config('services.gemini.rate_limit', 60); // requests per minute
        $current = Cache::get($key, 0);
        
        if ($current >= $limit) {
            return false;
        }
        
        return true;
    }

    /**
     * Record API usage for rate limiting
     *
     * @return void
     */
    protected function recordApiUsage()
    {
        $key = 'gemini_api_rate_limit';
        $current = Cache::get($key, 0);
        
        // Increment counter with 60 second expiry
        Cache::put($key, $current + 1, 60);
        
        // Also track daily usage
        $dailyKey = 'gemini_api_daily_' . date('Y-m-d');
        $dailyCount = Cache::get($dailyKey, 0);
        Cache::put($dailyKey, $dailyCount + 1, 86400); // 24 hours
    }

    /**
     * Translate a single text string to a target locale
     *
     * @param string $text
     * @param string $targetLocale
     * @param string $sourceLocale
     * @return string
     * @throws Exception
     */
    public function translateText($text, $targetLocale, $sourceLocale = 'en')
    {
        if (empty($text)) {
            return '';
        }

        // Check rate limiting
        if (!$this->checkRateLimit()) {
            throw new Exception('Rate limit exceeded. Please try again later.');
        }

        $languageMap = [
            'en' => 'English',
            'fr' => 'French',
            'es' => 'Spanish'
        ];

        $sourceLanguage = $languageMap[$sourceLocale] ?? 'English';
        $targetLanguage = $languageMap[$targetLocale] ?? 'French';

        // Detect format type and create appropriate prompt
        $isHtml = $this->isHtmlContent($text);

        if ($isHtml) {
            $prompt = "Translate the following HTML content from {$sourceLanguage} to {$targetLanguage}. " .
                     "CRITICAL: Preserve ALL HTML tags, attributes, and structure exactly as they appear. " .
                     "Only translate the text content between HTML tags, never modify, remove, or alter any HTML markup. " .
                     "Return the complete HTML with translated text content:\n\n{$text}";
        } else {
            $prompt = "Translate the following text from {$sourceLanguage} to {$targetLanguage}. " .
                     "Preserve the exact formatting and structure of the original text. " .
                     "Return ONLY the translated text with the same formatting:\n\n{$text}";
        }

        try {
            $response = $this->client
                ->generativeModel($this->model)
                ->generateContent($prompt);

            // Record API usage for rate limiting
            $this->recordApiUsage();

            return trim($response->text());
        } catch (Exception $e) {
            Log::error('Gemini translation failed for text', [
                'error' => $e->getMessage(),
                'text' => $text,
                'target_locale' => $targetLocale
            ]);
            throw $e;
        }
    }

    /**
     * Get API usage statistics
     *
     * @return array
     */
    public function getUsageStats()
    {
        return [
            'current_minute' => Cache::get('gemini_api_rate_limit', 0),
            'daily' => Cache::get('gemini_api_daily_' . date('Y-m-d'), 0),
            'limit_per_minute' => config('services.gemini.rate_limit', 60),
        ];
    }

    /**
     * Translate specific fields only
     *
     * @param Listing $listing
     * @param array $fields
     * @param array $targetLocales
     * @return array
     */
    public function translateFields(Listing $listing, array $fields, array $targetLocales = ['fr', 'es'])
    {
        // Create a temporary listing with only selected fields
        $tempListing = new Listing();
        
        foreach ($fields as $field) {
            if (isset($listing->$field)) {
                $tempListing->$field = $listing->$field;
            }
        }
        
        return $this->translateListing($tempListing, $targetLocales);
    }

    /**
     * Batch translate multiple listings
     *
     * @param array $listings
     * @param array $targetLocales
     * @return array
     */
    public function batchTranslate(array $listings, array $targetLocales = ['fr', 'es'])
    {
        $results = [];
        
        foreach ($listings as $listing) {
            try {
                $results[$listing->id] = [
                    'success' => true,
                    'translations' => $this->translateListing($listing, $targetLocales)
                ];
            } catch (Exception $e) {
                $results[$listing->id] = [
                    'success' => false,
                    'error' => $e->getMessage()
                ];
            }
            
            // Small delay between requests to avoid rate limiting
            usleep(500000); // 0.5 seconds
        }
        
        return $results;
    }

    /**
     * Translate a page to target locales using text-by-text translation
     *
     * @param \App\Models\Page $page
     * @param array $targetLocales
     * @return array
     * @throws Exception
     */
    public function translatePage($page, array $targetLocales = ['fr', 'es'])
    {
        $translations = [];

        foreach ($targetLocales as $locale) {
            $translations[$locale] = [];

            // Translate simple text fields
            $simpleFields = ['meta_title', 'meta_description'];
            foreach ($simpleFields as $field) {
                if (!empty($page->$field)) {
                    try {
                        $translations[$locale][$field] = $this->translateText(
                            $page->$field,
                            $locale
                        );
                    } catch (Exception $e) {
                        Log::warning("Failed to translate field {$field} for page", [
                            'field' => $field,
                            'locale' => $locale,
                            'error' => $e->getMessage()
                        ]);
                        // Keep original text as fallback
                        $translations[$locale][$field] = $page->$field;
                    }
                } else {
                    $translations[$locale][$field] = '';
                }
            }

            // Handle content_sections (array of sections with title and text)
            if (!empty($page->content_sections)) {
                $contentSections = $page->content_sections;

                // Ensure it's an array (could be JSON string from database)
                if (is_string($contentSections)) {
                    $contentSections = json_decode($contentSections, true) ?: [];
                }

                $translatedSections = [];
                foreach ($contentSections as $index => $section) {
                    $translatedSection = [];

                    // Translate title
                    if (!empty($section['title'])) {
                        try {
                            $translatedSection['title'] = $this->translateText(
                                $section['title'],
                                $locale
                            );
                        } catch (Exception $e) {
                            Log::warning("Failed to translate section title for page", [
                                'section_index' => $index,
                                'locale' => $locale,
                                'error' => $e->getMessage()
                            ]);
                            $translatedSection['title'] = $section['title'];
                        }
                    } else {
                        $translatedSection['title'] = '';
                    }

                    // Translate text
                    if (!empty($section['text'])) {
                        try {
                            $translatedSection['text'] = $this->translateText(
                                $section['text'],
                                $locale
                            );
                        } catch (Exception $e) {
                            Log::warning("Failed to translate section text for page", [
                                'section_index' => $index,
                                'locale' => $locale,
                                'error' => $e->getMessage()
                            ]);
                            $translatedSection['text'] = $section['text'];
                        }
                    } else {
                        $translatedSection['text'] = '';
                    }

                    $translatedSections[] = $translatedSection;
                }
                $translations[$locale]['content_sections'] = $translatedSections;
            } else {
                $translations[$locale]['content_sections'] = [];
            }
        }

        Log::info('Page translation completed with text-by-text approach', [
            'locales' => $targetLocales,
            'sections_count' => is_array($page->content_sections) ? count($page->content_sections) : 0
        ]);

        return $translations;
    }

    /**
     * Build structured prompt for page translation
     *
     * @param \App\Models\Page $page
     * @param array $targetLocales
     * @return string
     */
    protected function buildPageTranslationPrompt($page, array $targetLocales)
    {
        $translatableFields = [
            'meta_title' => $page->meta_title,
            'meta_description' => $page->meta_description,
            'content_sections' => $page->content_sections,
        ];

        // Remove null/empty fields
        $translatableFields = array_filter($translatableFields, function($value) {
            return !is_null($value) && $value !== '' && $value !== [];
        });

        // Handle content_sections specifically
        if (isset($translatableFields['content_sections'])) {
            // Ensure it's an array (could be JSON string from database)
            if (is_string($translatableFields['content_sections'])) {
                $translatableFields['content_sections'] = json_decode($translatableFields['content_sections'], true) ?: [];
            }
        }

        $localeNames = [
            'fr' => 'French',
            'es' => 'Spanish',
            'ar' => 'Arabic',
            'de' => 'German',
            'it' => 'Italian',
            'pt' => 'Portuguese',
            'ru' => 'Russian',
            'zh' => 'Chinese',
            'ja' => 'Japanese'
        ];

        $targetLanguages = array_map(function($locale) use ($localeNames) {
            return $localeNames[$locale] ?? $locale;
        }, $targetLocales);

        $prompt = "You are a professional translator specializing in web page and SEO content. ";
        $prompt .= "Translate the following page content from English to " . implode(' and ', $targetLanguages) . ". ";
        $prompt .= "Maintain a professional tone suitable for the web. ";
        $prompt .= "Preserve any specific names, locations, and technical terms as appropriate. ";
        $prompt .= "For SEO fields (meta_title, meta_description), ensure they are optimized for search engines in the target language. ";
        $prompt .= "For content_sections, translate both title and text fields within each section. ";
        $prompt .= "Return ONLY a valid JSON object with the following structure (no markdown, no explanations):\n";
        $prompt .= "{\n";
        
        foreach ($targetLocales as $locale) {
            $prompt .= "  \"$locale\": {\n";
            foreach (array_keys($translatableFields) as $field) {
                if ($field === 'content_sections') {
                    $prompt .= "    \"$field\": [{\"title\": \"translated title\", \"text\": \"translated text\"}],\n";
                } else {
                    $prompt .= "    \"$field\": \"translated text\",\n";
                }
            }
            $prompt = rtrim($prompt, ",\n") . "\n";
            $prompt .= "  },\n";
        }
        $prompt = rtrim($prompt, ",\n") . "\n";
        $prompt .= "}\n\n";
        
        $prompt .= "Content to translate:\n";
        $prompt .= json_encode($translatableFields, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE);

        return $prompt;
    }

    /**
     * Detect if content contains HTML markup
     *
     * @param string $text
     * @return bool
     */
    protected function isHtmlContent($text)
    {
        // Check for common HTML tags
        return (bool) preg_match('/<\s*[a-zA-Z][^>]*>/', $text);
    }
}