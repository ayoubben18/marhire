# Frontend Architecture - MarHire

## Executive Summary

MarHire employs a **hybrid React architecture** that bridges traditional Laravel Blade templating with modern React components. The frontend architecture prioritizes **internationalization**, **component reusability**, and **performance** while maintaining compatibility with the existing Laravel infrastructure.

## Framework & Setup

### Core Technology Stack
- **Framework**: React 18.3.1 with TypeScript 5.7.2 support
- **Build Tool**: Laravel Mix 6.0.6 (Webpack-based)
- **Styling**: Tailwind CSS 3.4.17 + shadcn/ui components + MUI 6.5.0
- **State Management**: React Context API + Local Component State
- **Internationalization**: i18next 25.3.2 + react-i18next 15.6.1
- **HTTP Client**: Axios with CSRF and locale middleware
- **Icons**: React Icons + Lucide React + MUI Icons

### Development Environment
```json
{
  "entry_points": [
    "resources/js/main.tsx",
    "resources/js/dashboard.tsx"
  ],
  "build_command": "npm run production",
  "dev_command": "npm run dev"
}
```

### Key Dependencies Analysis
- **UI Libraries**: Heavy use of MUI, shadcn/ui, and Radix UI for consistent components
- **Charts**: Recharts for dashboard analytics
- **Forms**: React Hook Form patterns with custom validation
- **Carousel**: Embla Carousel and Swiper for galleries
- **Date/Time**: React DatePicker for booking forms

## Architecture Pattern: Blade-React Hybrid

### Unique Rendering Strategy
MarHire uses a **DOM mounting strategy** where React components are selectively mounted to specific DOM elements defined in Blade templates:

```tsx
// Main entry point strategy
const homeRoot = document.getElementById("home_root");
const listingRoot = document.getElementById("listing_root");
const categoryRoot = document.getElementById("category_root");

if (homeRoot) {
    const root = ReactDOM.createRoot(homeRoot);
    root.render(<AppWrapper><Home /></AppWrapper>);
}

if (listingRoot) {
    const slug = listingRoot.dataset.slug;
    const root = ReactDOM.createRoot(listingRoot);
    root.render(<AppWrapper><Listing slug={slug} /></AppWrapper>);
}
```

### Benefits & Challenges
**Benefits:**
- Gradual React adoption in Laravel app
- Server-side routing with client-side interactivity
- SEO-friendly with Laravel blade rendering
- Data injection via HTML data attributes

**Challenges:**
- No client-side routing (relies on Laravel routes)
- Complex state management across page refreshes
- Potential hydration issues
- Limited component reuse across different pages

## Component Architecture

### Component Organization Structure
```
resources/js/
├── components/
│   ├── ui/                    # shadcn/ui components
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   └── carousel.tsx
│   ├── site/                  # Public-facing components
│   │   ├── HeroSection.jsx
│   │   ├── BookingFrm.jsx
│   │   ├── SingleListing*.jsx
│   │   └── SearchItem.jsx
│   └── BookingEmailModal.tsx  # Admin components
├── pages/                     # Page-level components
│   ├── Home.jsx
│   ├── Listing.jsx
│   └── Search.jsx
├── contexts/                  # React Context providers
├── utils/                     # Utility functions
└── i18n.js                   # Internationalization config
```

### Component Naming Conventions
- **Pages**: PascalCase (e.g., `Home.jsx`, `ListYourProperty.jsx`)
- **Site Components**: PascalCase with descriptive names (e.g., `SingleListingGallery.jsx`)
- **UI Components**: lowercase with hyphens (e.g., `button.tsx`, matching shadcn/ui)
- **Utilities**: camelCase (e.g., `localeManager.js`, `bookingHelpers.js`)

### Component Composition Patterns

#### 1. Page-Level Components
```jsx
// Typical page component structure
const Home = () => {
    const { t } = useTranslation();
    
    return (
        <>
            <HeroSection withBar={true}/>
            <ExplorePopular />
            <Recommended type="cars" classes="bg-blue"/>
            <WhyChooseUs features={features} />
            <Footer />
        </>
    );
};
```

#### 2. Feature-Rich Form Components
```jsx
// Complex forms with multi-step logic
const BookingFrm = ({ listing, categoryId, searchParams }) => {
    const [currentStep, setCurrentStep] = useState(0);
    // ... extensive state management
    
    return (
        <div className="booking-form">
            {currentStep === 0 && <BookingDetailsStep />}
            {currentStep === 1 && <ClientInfoStep />}
        </div>
    );
};
```

#### 3. Conditional Rendering by Category
```jsx
// Category-specific component rendering
const HeroSection = ({ withBar, text, tab }) => {
    const [activeTab, setActiveTab] = useState(tab || "cars");
    
    return (
        <div className="searchbox__frm">
            {activeTab === "cars" && <CarRentalForm />}
            {activeTab === "drivers" && <PrivateDriverForm />}
            {activeTab === "boats" && <BoatForm />}
            {activeTab === "activity" && <ThingsToDoForm />}
        </div>
    );
};
```

## State Management Architecture

### Primary Strategy: Context API + Local State
```jsx
// Global contexts for cross-cutting concerns
<I18nextProvider i18n={i18n}>
    <LanguageProvider>
        <Suspense fallback={<LoadingFallback />}>
            {children}
        </Suspense>
    </LanguageProvider>
</I18nextProvider>
```

### State Management Patterns

#### 1. Language Context (Global)
```jsx
const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
    const [currentLanguage, setCurrentLanguage] = useState(initialLanguage);
    const [isChangingLanguage, setIsChangingLanguage] = useState(false);
    
    const changeLanguage = async (languageCode) => {
        setIsChangingLanguage(true);
        switchLocale(languageCode); // Triggers page reload
    };
    
    return (
        <LanguageContext.Provider value={value}>
            {children}
        </LanguageContext.Provider>
    );
};
```

#### 2. Component-Level State (Complex Forms)
```jsx
// BookingFrm component manages ~50+ state variables
const [startDate, setStartDate] = useState("");
const [endDate, setEndDate] = useState("");
const [errors, setErrors] = useState({});
const [selectedAddons, setSelectedAddons] = useState([]);
// ... extensive state management for booking forms
```

### Data Flow Patterns
1. **Props Down**: Data passed from Blade templates via HTML data attributes
2. **Context Across**: Language and user preferences via Context API  
3. **Local Up**: Form state managed locally with validation helpers
4. **API Integration**: Axios with automatic locale headers

## Internationalization (i18n) Architecture

### Advanced Multi-Language Implementation

#### Core Configuration
```javascript
// i18n.js - Sophisticated locale detection
const getInitialLanguage = () => {
    // 1. Admin routes always use English or saved preference
    if (checkIsAdminRoute()) return "en";
    
    // 2. Public routes detect from URL path
    const localeMatch = path.match(/^\/(en|fr|es)(\/|$)/);
    if (localeMatch) return localeMatch[1];
    
    // 3. Fallback to localStorage or default
    return localStorage.getItem("i18nextLng") || "en";
};
```

#### URL-Based Locale Management
```javascript
// Automatic URL locale handling
i18n.on("languageChanged", (lng) => {
    if (isAdminRoute()) {
        document.documentElement.lang = lng;
        return; // Skip URL manipulation for admin
    }
    
    const currentPath = window.location.pathname;
    const hasLocale = /^\/(en|fr|es)(\/|$)/.test(currentPath);
    
    if (hasLocale) {
        const newPath = currentPath.replace(/^\/(en|fr|es)/, `/${lng}`);
        window.history.pushState(null, "", newPath);
    }
});
```

#### Locale Manager Utilities
```javascript
// localeManager.js - Centralized locale logic
export const switchLocale = (newLocale) => {
    localStorage.setItem('i18nextLng', newLocale);
    const pathWithoutLocale = getPathWithoutLocale();
    window.location.href = `/${newLocale}${pathWithoutLocale}`;
};

export const initializeLocale = () => {
    if (isAdminRoute()) return true; // Skip for admin
    return !ensureLocaleInUrl(); // Redirect if needed
};
```

#### Translation Usage Patterns
```jsx
// Component-level translations
const Home = () => {
    const { t } = useTranslation();
    
    const features = [
        {
            title: t('home.why.features.localExperts.title'),
            desc: t('home.why.features.localExperts.desc'),
        }
    ];
    
    return <h1>{t("home.hero.title")}</h1>;
};
```

### Translation File Structure
```
public/locales/
├── en/translation.json
├── fr/translation.json  
└── es/translation.json
```

## Styling Architecture

### Multi-Framework Approach
MarHire combines multiple CSS approaches:

#### 1. Tailwind CSS (Primary)
```jsx
// Utility-first classes for layout and spacing
<div className="flex items-center justify-center p-4">
    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
</div>
```

#### 2. shadcn/ui Components (Design System)
```tsx
// Type-safe, composable UI components
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground shadow hover:bg-primary/90",
        destructive: "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
      }
    }
  }
);
```

#### 3. Material-UI Components (Complex Forms)
```jsx
// MUI for complex form controls and dialogs
import { Dialog, CircularProgress, Stepper, Step, StepLabel } from "@mui/material";

<Dialog open={showDialog}>
    <DialogContent>
        <Stepper activeStep={currentStep}>
            <Step><StepLabel>Details</StepLabel></Step>
            <Step><StepLabel>Client Info</StepLabel></Step>
        </Stepper>
    </DialogContent>
</Dialog>
```

#### 4. Custom CSS Classes (Legacy/Specific)
```jsx
// Custom CSS for site-specific styling
<div className="hero-section">
    <div className="hero-section--banner banner1">
        <div className="hero--bg-overlay"></div>
    </div>
</div>
```

### Responsive Design Approach
```jsx
// React Responsive for breakpoint-based rendering
import { useMediaQuery } from 'react-responsive';

const Home = () => {
    const isMobile = useMediaQuery({ maxWidth: 900 });
    
    return (
        <>
            {isMobile ? <BannerMobile /> : <HeroSection withBar={true}/>}
        </>
    );
};
```

## API Integration Patterns

### Axios Configuration with Locale Support
```javascript
// bootstrap.js - Global Axios configuration
window.axios.defaults.headers.common["X-CSRF-TOKEN"] = token.content;

// Automatic locale header injection
window.axios.interceptors.request.use((config) => {
    const locale = getLocale();
    config.headers["Accept-Language"] = locale;
    config.headers["X-Locale"] = locale;
    
    // Add locale to GET parameters
    if (!config.method || config.method.toUpperCase() === "GET") {
        const url = new URL(config.url, window.location.origin);
        url.searchParams.set("locale", locale);
        config.url = url.toString();
    }
    
    return config;
});
```

### API Integration Examples

#### 1. Form Submission with Error Handling
```tsx
const sendEmail = async () => {
    setSending(true);
    
    try {
        const response = await axios.post(`/bookings/${bookingId}/send-email`, {
            email_type: emailType,
            _token: document.querySelector('meta[name="csrf-token"]')?.getAttribute('content')
        });
        
        swal({ title: "Success!", text: "Email sent successfully", icon: "success" });
        setEmailStatus(response.data.history.email_status);
    } catch (err) {
        let errorMessage = 'An error occurred while sending the email';
        if (err.response?.status === 422 && err.response?.data?.mismatch) {
            errorMessage = err.response.data.message;
        }
        swal({ title: "Error!", text: errorMessage, icon: "error" });
    } finally {
        setSending(false);
    }
};
```

#### 2. Data Fetching Patterns
```jsx
// Typical data fetching in useEffect
useEffect(() => {
    if (bookingId) {
        fetchEmailStatus();
    }
}, [bookingId]);

const fetchEmailStatus = async () => {
    setLoading(true);
    try {
        const response = await axios.get(`/bookings/${bookingId}/email-status`);
        setEmailStatus(response.data.email_status);
        setBooking(response.data.booking);
    } catch (err) {
        setError('Failed to load email status');
    } finally {
        setLoading(false);
    }
};
```

## Build Configuration & Performance

### Laravel Mix Setup
```javascript
// webpack.mix.js
mix.ts('resources/js/dashboard.tsx', 'public/js').react()
   .ts('resources/js/main.tsx', 'public/js').react()
   .postCss('resources/css/tailwind.css', 'public/css', [
       require('tailwindcss'),
       require('autoprefixer'),
   ])
   .version();
```

### Performance Optimizations

#### 1. Code Splitting by Page
- Separate bundles for `dashboard.tsx` and `main.tsx`
- Components loaded only when needed via DOM mounting strategy

#### 2. Lazy Loading Patterns
```jsx
// Suspense boundaries for i18n loading
<Suspense fallback={<LoadingFallback />}>
    {children}
</Suspense>
```

#### 3. React.memo Optimization
```tsx
// Memo for expensive components
const BookingEmailModal = React.memo(({ bookingId, onClose }) => {
    // Component logic
}, (prevProps, nextProps) => {
    return prevProps.bookingId === nextProps.bookingId;
});
```

## Testing Strategy

### Current Testing Setup
- **Frontend Testing**: Limited - relies on manual testing
- **Type Safety**: TypeScript for critical components (modals, forms)
- **Error Boundaries**: Basic error handling in forms and API calls

### Recommended Testing Approach
```javascript
// Suggested testing stack (not currently implemented)
{
  "unit": "React Testing Library + Jest",
  "integration": "Cypress for booking flows", 
  "e2e": "Playwright for multi-language testing"
}
```

## Technical Debt & Improvement Opportunities

### Current Technical Debt

#### 1. State Management Complexity
- **Issue**: BookingFrm component has 50+ state variables
- **Impact**: Difficult to maintain, debug, and test
- **Solution**: Implement useReducer or state management library

#### 2. Inconsistent Component Patterns
- **Issue**: Mix of .jsx and .tsx files, different styling approaches
- **Impact**: Developer confusion, inconsistent UX
- **Solution**: Standardize on TypeScript, unified design system

#### 3. No Client-Side Routing
- **Issue**: Full page refreshes for navigation
- **Impact**: Poor user experience, lost state
- **Solution**: Implement React Router with proper SSR support

#### 4. API Error Handling Inconsistency
- **Issue**: Different error handling patterns across components
- **Impact**: Inconsistent user feedback
- **Solution**: Centralized error handling service

### Performance Optimizations

#### 1. Bundle Size Analysis
```bash
# Current bundles (estimated)
main.js: ~800KB (unminified)
dashboard.js: ~400KB (unminified)
```

#### 2. Recommended Optimizations
- **Tree Shaking**: Remove unused MUI components
- **Code Splitting**: Split by route/feature
- **Image Optimization**: Implement lazy loading for galleries
- **Bundle Analysis**: Add webpack-bundle-analyzer

### Scalability Improvements

#### 1. Component Library Strategy
- **Current**: Mix of MUI, shadcn/ui, custom components
- **Recommended**: Standardize on single design system
- **Benefits**: Consistent UX, smaller bundle size, easier maintenance

#### 2. State Management Evolution
```javascript
// Current: Context + Local State
// Recommended: Zustand or Redux Toolkit for complex forms
const useBookingStore = create((set) => ({
  bookingData: {},
  setBookingData: (data) => set((state) => ({ 
    bookingData: { ...state.bookingData, ...data } 
  })),
}));
```

#### 3. Type Safety Enhancement
- **Current**: Partial TypeScript adoption
- **Recommended**: Full TypeScript migration with strict mode
- **Benefits**: Better DX, fewer runtime errors, improved maintainability

## Architecture Recommendations

### Short-term Improvements (1-2 months)
1. **Standardize TypeScript**: Convert all .jsx files to .tsx
2. **Implement Error Boundaries**: Catch and handle React errors gracefully
3. **Bundle Optimization**: Remove unused dependencies, implement tree shaking
4. **Form State Refactoring**: Use useReducer for complex forms like BookingFrm

### Medium-term Improvements (3-6 months)
1. **Client-Side Routing**: Implement React Router with SSR support
2. **State Management**: Introduce Zustand or Redux Toolkit for global state
3. **Testing Infrastructure**: Set up React Testing Library + Cypress
4. **Component Library**: Standardize on single design system

### Long-term Improvements (6+ months)
1. **Architecture Migration**: Move to Next.js for better SSR/SSG
2. **Micro-Frontend**: Split admin and public interfaces
3. **Performance Monitoring**: Implement Core Web Vitals tracking
4. **Progressive Web App**: Add PWA features for mobile experience

## Conclusion

MarHire's frontend architecture successfully balances **Laravel integration** with **modern React patterns**. The internationalization system is particularly sophisticated, handling complex URL routing and locale management. However, there are significant opportunities for improvement in state management, component standardization, and performance optimization.

The hybrid approach provides a solid foundation for gradual modernization while maintaining backward compatibility with the existing Laravel infrastructure. The key to future success will be addressing the technical debt while preserving the strengths of the current multilingual and responsive design implementation.