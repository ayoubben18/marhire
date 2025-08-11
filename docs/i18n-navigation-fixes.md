# i18n Navigation Issues - Fix Document

## Issues Identified

### 1. **Hardcoded URLs in React Components**
**Problem**: All React components (e.g., Footer.jsx) have hardcoded URLs without locale prefixes
```jsx
// Current (incorrect):
<a href="/about-us">{t('navigation.about')}</a>

// Should be:
<a href={`/${locale}/about-us`}>{t('navigation.about')}</a>
```

**Affected Files**:
- `resources/js/components/site/Footer.jsx`
- All other React components with internal links

### 2. **Missing URL Helper Function**
**Problem**: No centralized function to generate locale-aware URLs in React
**Solution Needed**: Create a `useLocalizedUrl` hook or utility function

### 3. **Language Switching URL Update**
**Problem**: Language switching updates URL client-side but doesn't reload page to get new content from Laravel
**Current Behavior**: Uses `window.history.pushState` which doesn't trigger a page reload
**Expected Behavior**: Should reload page with new locale to get translated content from backend

### 4. **React Components Not Using Locale in API Calls**
**Problem**: API calls don't include locale prefix
**Solution Needed**: Update `apiLocale.js` utility to be used consistently

## Required Fixes

### Fix 1: Create URL Helper Utility
Create `resources/js/utils/urlHelper.js`:
```javascript
export const getLocalizedUrl = (path) => {
    const currentLocale = window.location.pathname.match(/^\/(en|fr|es)/)?.[1] || 'en';
    
    // Remove leading slash if present
    const cleanPath = path.startsWith('/') ? path.substring(1) : path;
    
    // Return localized URL
    return `/${currentLocale}/${cleanPath}`;
};

export const useLocalizedUrl = () => {
    const { i18n } = useTranslation();
    
    return (path) => {
        const locale = i18n.language || 'en';
        const cleanPath = path.startsWith('/') ? path.substring(1) : path;
        return `/${locale}/${cleanPath}`;
    };
};
```

### Fix 2: Update Footer Component
Update all href attributes in `resources/js/components/site/Footer.jsx`:
```jsx
import { getLocalizedUrl } from '../../utils/urlHelper';

// Replace all hardcoded hrefs
<a href={getLocalizedUrl('about-us')}>{t('navigation.about')}</a>
<a href={getLocalizedUrl('support')}>{t('navigation.support')}</a>
// etc...
```

### Fix 3: Fix Language Switching
Update `resources/js/contexts/LanguageContext.jsx`:
```javascript
const changeLanguage = async (languageCode) => {
    if (languageCode === currentLanguage) return;

    setIsChangingLanguage(true);
    try {
        // Update localStorage first
        localStorage.setItem('i18nextLng', languageCode);
        
        // Get current path without locale
        const currentPath = window.location.pathname;
        const pathWithoutLocale = currentPath.replace(/^\/(en|fr|es)/, '');
        
        // Reload page with new locale
        window.location.href = `/${languageCode}${pathWithoutLocale || '/'}`;
        
    } catch (error) {
        console.error('Error changing language:', error);
        setIsChangingLanguage(false);
    }
};
```

### Fix 4: Update All React Components with Links
Components that need updating:
- `HeroSection.jsx` - search bar actions
- `ExplorePopular.jsx` - category links
- `Recommended.jsx` - listing links
- `SearchItem.jsx` - listing detail links
- `BannerMobile.jsx` - mobile navigation
- `RelatedProducts.jsx` - product links
- `FooterRecommendation.jsx` - recommendation links
- Any other component with `<a>` tags or navigation

### Fix 5: Update API Calls
Ensure all API calls use the locale:
```javascript
// In components making API calls
import { getApiUrl } from '../utils/apiLocale';

// Use for API calls
const response = await fetch(getApiUrl('/api/listings'));
```

### Fix 6: Update Laravel Blade Navbar
Check if navbar in blade templates needs locale-aware URLs:
```blade
{{-- In navigation blade files --}}
<a href="{{ route('entere.about', ['locale' => app()->getLocale()]) }}">About</a>
```

## Implementation Order

1. **Step 1**: Create `urlHelper.js` utility
2. **Step 2**: Update `LanguageContext.jsx` to reload page on language change
3. **Step 3**: Update `Footer.jsx` as a test case
4. **Step 4**: Test language switching and navigation
5. **Step 5**: Update all other React components
6. **Step 6**: Test all pages with different locales
7. **Step 7**: Update API calls if needed

## Testing Checklist

- [ ] Language switcher reloads page with new locale
- [ ] All footer links work with locale prefix
- [ ] Direct navigation to `/fr/about-us` works
- [ ] Direct navigation to `/es/support` works
- [ ] API calls include locale when needed
- [ ] No 404 errors when navigating
- [ ] Browser back/forward works correctly
- [ ] LocalStorage persists language preference
- [ ] Page content changes when switching language

## Additional Considerations

1. **SEO Impact**: Ensure proper hreflang tags in head
2. **Sitemap**: Update sitemap to include localized URLs
3. **Canonical URLs**: Set proper canonical URLs for each locale
4. **Social Sharing**: Ensure shared URLs include locale
5. **Email Links**: Update email templates to include locale in URLs

## Error Prevention

1. Add middleware to redirect URLs without locale to default locale
2. Add 404 handler that checks if URL just missing locale
3. Add console warnings in development for hardcoded URLs
4. Consider using TypeScript for better type safety

## Performance Optimization

1. Cache translated routes in localStorage
2. Preload translation files for faster switching
3. Use React.lazy() for language-specific components
4. Consider server-side rendering for better SEO

This document provides a comprehensive plan to fix all i18n navigation issues in the MarHire application.