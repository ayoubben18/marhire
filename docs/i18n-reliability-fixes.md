# Internationalization (i18n) Reliability Fixes

## Overview
This document outlines critical fixes required to make the MarHire i18n architecture production-ready. The current implementation has race conditions, performance issues, and synchronization problems that must be resolved.

## Critical Issues Summary

1. **N+1 Query Problem** - Each translation triggers separate database query
2. **React Re-render Loops** - Infinite loops in LanguageContext
3. **Multiple Sources of Truth** - URL, localStorage, session competing
4. **Page Reload on Language Switch** - Loses all application state
5. **No Translation Caching** - Repeated expensive database queries
6. **Missing Error Boundaries** - No graceful degradation

## Implementation Plan

### Phase 1: Database Performance (Week 1)

#### 1.1 Fix N+1 Query Problem

**Problem:**
```php
// Current: Each getTranslation() triggers a new query
foreach ($listings as $listing) {
    $title = $listing->getTranslation('title', 'fr'); // New query!
}
// 100 listings = 101 queries
```

**Solution:**
```php
// Add eager loading scope to Translatable models
public function scopeWithTranslations($query, $locale = null) {
    return $query->with(['translations' => function($q) use ($locale) {
        if ($locale) {
            $q->where('locale', $locale)
              ->orWhere('locale', config('app.fallback_locale'));
        }
    }]);
}

// Usage in controllers
$listings = Listing::withTranslations($locale)->get();
```

#### 1.2 Add Translation Caching

**Implementation:**
```php
// In Translatable trait
public function getCachedTranslation($field, $locale = null) {
    $locale = $locale ?: app()->getLocale();
    $cacheKey = "trans.{$this->getTable()}.{$this->id}.{$locale}.{$field}";
    
    return Cache::remember($cacheKey, 3600, function() use ($field, $locale) {
        return $this->getTranslation($field, $locale);
    });
}

// Clear cache on translation update
public function clearTranslationCache() {
    $pattern = "trans.{$this->getTable()}.{$this->id}.*";
    Cache::flush($pattern);
}
```

### Phase 2: React State Management (Week 1)

#### 2.1 Fix Infinite Re-render Loops

**Problem:**
```javascript
// Current problematic code
useEffect(() => {
    if (urlLocale !== currentLanguage) {
        setCurrentLanguage(urlLocale);
    }
}, [i18n, currentLanguage]); // currentLanguage in deps causes loop!
```

**Solution:**
```javascript
// Fixed LanguageContext.jsx
useEffect(() => {
    const syncWithUrl = () => {
        const urlLocale = getLocaleFromUrl();
        setCurrentLanguage(urlLocale || 'en');
    };
    
    // Initial sync
    syncWithUrl();
    
    // Listen for URL changes only
    window.addEventListener('popstate', syncWithUrl);
    
    return () => {
        window.removeEventListener('popstate', syncWithUrl);
    };
}, []); // Empty deps - only run once
```

#### 2.2 Single Source of Truth

**Implementation:**
```javascript
// New useLocale hook - URL as single source of truth
export const useLocale = () => {
    const [locale, setLocale] = useState(() => {
        // URL is the ONLY source of truth
        const urlLocale = window.location.pathname.match(/^\/([a-z]{2})\//)?.[1];
        return urlLocale || 'en';
    });
    
    const changeLocale = useCallback((newLocale) => {
        // Update URL without reload
        const currentPath = window.location.pathname;
        const pathWithoutLocale = currentPath.replace(/^\/[a-z]{2}/, '');
        const newPath = `/${newLocale}${pathWithoutLocale}`;
        
        // Use history API to avoid reload
        window.history.pushState({locale: newLocale}, '', newPath);
        
        // Update state
        setLocale(newLocale);
        
        // Update i18n
        i18n.changeLanguage(newLocale);
        
        // Save preference (but don't use for detection)
        localStorage.setItem('preferredLocale', newLocale);
        
    }, []);
    
    return { locale, changeLocale };
};
```

### Phase 3: Remove Page Reloads (Week 2)

#### 3.1 Update Language Switcher

**Old Approach (causes reload):**
```javascript
// Current - triggers page reload
window.location.href = `/${newLocale}${path}`;
```

**New Approach (no reload):**
```javascript
// LanguageSwitcher.jsx
const handleLanguageChange = async (languageCode) => {
    // Update URL without reload
    const currentPath = window.location.pathname;
    const pathWithoutLocale = currentPath.replace(/^\/[a-z]{2}/, '');
    const newPath = `/${languageCode}${pathWithoutLocale}`;
    
    // Push state change
    window.history.pushState({locale: languageCode}, '', newPath);
    
    // Dispatch custom event for other components
    window.dispatchEvent(new CustomEvent('localechange', {
        detail: { locale: languageCode }
    }));
    
    // Update i18n
    await i18n.changeLanguage(languageCode);
    
    // Update Laravel session via AJAX
    await fetch('/api/locale/set', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').content
        },
        body: JSON.stringify({ locale: languageCode })
    });
    
    setIsOpen(false);
};
```

#### 3.2 Add API Endpoint for Locale Updates

```php
// routes/api.php
Route::post('/locale/set', function (Request $request) {
    $request->validate(['locale' => 'required|in:en,fr,es']);
    
    session(['locale' => $request->locale]);
    app()->setLocale($request->locale);
    
    return response()->json(['success' => true]);
});
```

### Phase 4: Error Boundaries (Week 2)

#### 4.1 Translation Error Boundary

```javascript
// components/I18nErrorBoundary.jsx
class I18nErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: null };
    }
    
    static getDerivedStateFromError(error) {
        return { hasError: true, error };
    }
    
    componentDidCatch(error, errorInfo) {
        console.error('Translation error:', error, errorInfo);
        
        // Report to error tracking service
        if (window.Sentry) {
            window.Sentry.captureException(error);
        }
    }
    
    render() {
        if (this.state.hasError) {
            return (
                <div className="translation-error">
                    <p>Translation loading failed. Using default language.</p>
                    <button onClick={() => window.location.reload()}>
                        Reload Page
                    </button>
                </div>
            );
        }
        
        return this.props.children;
    }
}
```

#### 4.2 Fallback for Missing Translations

```javascript
// i18n configuration
i18n.init({
    fallbackLng: 'en',
    
    // Return key if translation missing
    missingKeyHandler: (lng, ns, key, fallbackValue) => {
        console.warn(`Missing translation: ${lng}/${ns}/${key}`);
        
        // Report to analytics
        if (window.gtag) {
            window.gtag('event', 'missing_translation', {
                language: lng,
                key: key
            });
        }
        
        // Return fallback or key
        return fallbackValue || key;
    },
    
    // Load translations with retry
    backend: {
        loadPath: '/locales/{{lng}}/{{ns}}.json',
        
        // Retry on failure
        requestOptions: {
            cache: 'default',
            credentials: 'same-origin',
            mode: 'cors',
        },
        
        // Custom load function with retry
        request: async (options, url, payload, callback) => {
            try {
                const response = await fetch(url);
                if (!response.ok) throw new Error('Failed to load');
                const data = await response.json();
                callback(null, { data, status: 200 });
            } catch (error) {
                // Retry once
                setTimeout(async () => {
                    try {
                        const response = await fetch(url);
                        const data = await response.json();
                        callback(null, { data, status: 200 });
                    } catch (retryError) {
                        callback(retryError, { status: 500 });
                    }
                }, 1000);
            }
        }
    }
});
```

### Phase 5: Performance Monitoring (Week 3)

#### 5.1 Add Translation Performance Metrics

```php
// app/Services/TranslationMetrics.php
class TranslationMetrics {
    public static function recordQuery($model, $locale, $duration) {
        Cache::increment("translation_queries_{$model}_{$locale}");
        
        if ($duration > 100) { // Log slow queries
            Log::warning('Slow translation query', [
                'model' => $model,
                'locale' => $locale,
                'duration' => $duration
            ]);
        }
    }
    
    public static function getStats() {
        return [
            'total_queries' => Cache::get('translation_queries_total', 0),
            'cache_hits' => Cache::get('translation_cache_hits', 0),
            'cache_misses' => Cache::get('translation_cache_misses', 0),
            'hit_rate' => // calculate
        ];
    }
}
```

#### 5.2 Frontend Performance Tracking

```javascript
// utils/i18nMetrics.js
export const trackTranslationPerformance = () => {
    const startTime = performance.now();
    
    i18n.on('loaded', (loaded) => {
        const loadTime = performance.now() - startTime;
        
        // Send to analytics
        if (window.gtag) {
            window.gtag('event', 'translation_load', {
                event_category: 'performance',
                event_label: 'i18n',
                value: Math.round(loadTime)
            });
        }
        
        // Log slow loads
        if (loadTime > 1000) {
            console.warn(`Slow translation load: ${loadTime}ms`);
        }
    });
};
```

## Testing Strategy

### Unit Tests

```php
// tests/Unit/TranslatableTest.php
public function test_eager_loading_reduces_queries() {
    $this->seed(ListingSeeder::class);
    
    DB::enableQueryLog();
    
    // Without eager loading
    $listings = Listing::take(10)->get();
    foreach ($listings as $listing) {
        $listing->getTranslation('title', 'fr');
    }
    $withoutEagerLoading = count(DB::getQueryLog());
    
    DB::flushQueryLog();
    
    // With eager loading
    $listings = Listing::withTranslations('fr')->take(10)->get();
    foreach ($listings as $listing) {
        $listing->getTranslation('title', 'fr');
    }
    $withEagerLoading = count(DB::getQueryLog());
    
    $this->assertLessThan($withoutEagerLoading, $withEagerLoading);
    $this->assertEquals(2, $withEagerLoading); // Only 2 queries total
}
```

### Integration Tests

```javascript
// tests/i18n.test.js
describe('Language Switching', () => {
    it('should change language without page reload', async () => {
        const initialUrl = window.location.href;
        
        // Trigger language change
        await changeLanguage('fr');
        
        // URL should change
        expect(window.location.pathname).toContain('/fr/');
        
        // Page should not reload
        expect(window.location.href).not.toBe(initialUrl);
        expect(document.body).toBeDefined();
        
        // Translations should update
        expect(i18n.language).toBe('fr');
    });
    
    it('should handle missing translations gracefully', async () => {
        // Remove translation file
        mockFetchError('/locales/xx/translation.json');
        
        // Should not throw
        await expect(changeLanguage('xx')).resolves.not.toThrow();
        
        // Should fallback to English
        expect(i18n.language).toBe('en');
    });
});
```

## Rollout Strategy

### Week 1
- Implement database performance fixes
- Deploy with feature flag
- Monitor query performance

### Week 2
- Fix React state management
- Remove page reloads
- A/B test with 10% of users

### Week 3
- Add error boundaries
- Implement caching
- Expand to 50% of users

### Week 4
- Full rollout
- Performance monitoring
- Iterate based on metrics

## Success Metrics

1. **Performance**
   - Database queries reduced by 90%
   - Translation load time < 200ms
   - Zero page reloads on language switch

2. **Reliability**
   - Zero infinite loops
   - < 0.1% translation errors
   - 100% graceful degradation

3. **User Experience**
   - Language switch time < 100ms
   - No state loss on switch
   - Smooth transitions

## Rollback Plan

If issues arise:
1. Revert to page-reload based switching
2. Disable translation caching
3. Fall back to server-side only translations
4. Monitor and fix issues
5. Re-deploy with fixes