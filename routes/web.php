<?php

use App\Http\Controllers\AgencyController;
use App\Http\Controllers\ArticleController;
use App\Http\Controllers\BookingController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\CityController;
use App\Http\Controllers\CouponController;
use App\Http\Controllers\DahsboardController;
use App\Http\Controllers\EntereController;
use App\Http\Controllers\ListingAddonController;
use App\Http\Controllers\ListingController;
use App\Http\Controllers\NotificationController;
use App\Http\Controllers\PageController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\SocieteController;
use App\Http\Controllers\SubCategoryController;
use App\Http\Controllers\TermsController;
use App\Http\Controllers\UtilisateurController;
use App\Http\Controllers\Admin\EmailTemplateController;
use App\Http\Controllers\Admin\EmailSettingsController;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;


/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

// Redirect root to user's preferred locale or default
Route::get('/', function (\Illuminate\Http\Request $request) {
    // Check session for saved locale
    if ($request->session()->has('locale')) {
        $locale = $request->session()->get('locale');
        if (in_array($locale, config('app.supported_locales', ['en']))) {
            return redirect('/' . $locale);
        }
    }
    
    // Check cookie for saved locale (from frontend localStorage)
    if ($request->cookie('i18nextLng')) {
        $locale = $request->cookie('i18nextLng');
        if (in_array($locale, config('app.supported_locales', ['en']))) {
            return redirect('/' . $locale);
        }
    }
    
    // Fall back to browser preference
    $acceptLanguage = $request->header('Accept-Language');
    if ($acceptLanguage) {
        foreach (config('app.supported_locales', ['en']) as $supportedLocale) {
            if (str_contains(strtolower($acceptLanguage), $supportedLocale)) {
                return redirect('/' . $supportedLocale);
            }
        }
    }
    
    // Default to English
    return redirect('/en');
});

// Locale switching endpoint with security
Route::post('/locale/switch', function (\Illuminate\Http\Request $request) {
    // Validate input with strict rules
    $request->validate([
        'locale' => 'required|string|max:5|regex:/^[a-z]{2}$/'
    ]);
    
    $locale = $request->input('locale');
    $supportedLocales = config('app.supported_locales', ['en']);
    
    // Use strict comparison for security
    if (in_array($locale, $supportedLocales, true)) {
        $request->session()->put('locale', $locale);
    }
    
    return redirect()->back()->withInput();
})->name('locale.switch')->middleware('throttle:10,1'); // Rate limiting: 10 requests per minute

// Catch-all routes for non-localized PUBLIC URLs - redirect to localized version
// NOTE: These are only for public-facing routes, not admin routes
Route::get('/details/{slug}', function (\Illuminate\Http\Request $request, $slug) {
    $locale = 'en'; // Default locale
    $supportedLocales = config('app.supported_locales', ['en', 'fr', 'es']);
    
    // Check all cookies (both from Cookie header and Laravel's cookie handling)
    $cookieValue = $request->cookie('i18nextLng') ?: $_COOKIE['i18nextLng'] ?? null;
    
    if ($cookieValue && in_array($cookieValue, $supportedLocales)) {
        $locale = $cookieValue;
    }
    // Check session for saved preference if no cookie
    elseif ($request->session()->has('locale')) {
        $savedLocale = $request->session()->get('locale');
        if (in_array($savedLocale, $supportedLocales)) {
            $locale = $savedLocale;
        }
    }
    // Fall back to browser language if no session or cookie
    else {
        $acceptLanguage = $request->header('Accept-Language');
        if ($acceptLanguage) {
            foreach ($supportedLocales as $supportedLocale) {
                if (str_contains(strtolower($acceptLanguage), $supportedLocale)) {
                    $locale = $supportedLocale;
                    break;
                }
            }
        }
    }
    
    // Preserve query parameters
    $queryString = $request->getQueryString();
    $redirectUrl = "/$locale/details/$slug";
    if ($queryString) {
        $redirectUrl .= '?' . $queryString;
    }
    
    return redirect($redirectUrl);
})->where('slug', '.*');

// Catch other common non-localized routes
Route::get('/category/{slug}', function (\Illuminate\Http\Request $request, $slug) {
    $supportedLocales = config('app.supported_locales', ['en', 'fr', 'es']);
    $cookieValue = $request->cookie('i18nextLng') ?: $_COOKIE['i18nextLng'] ?? null;
    $locale = $cookieValue ?: $request->session()->get('locale', 'en');
    if (!in_array($locale, $supportedLocales)) {
        $locale = 'en';
    }
    $queryString = $request->getQueryString();
    $redirectUrl = "/$locale/category/$slug";
    if ($queryString) {
        $redirectUrl .= '?' . $queryString;
    }
    return redirect($redirectUrl);
})->where('slug', '.*');

Route::get('/about-us', function (\Illuminate\Http\Request $request) {
    $supportedLocales = config('app.supported_locales', ['en', 'fr', 'es']);
    $cookieValue = $request->cookie('i18nextLng') ?: $_COOKIE['i18nextLng'] ?? null;
    $locale = $cookieValue ?: $request->session()->get('locale', 'en');
    if (!in_array($locale, $supportedLocales)) {
        $locale = 'en';
    }
    return redirect("/$locale/about-us");
});

Route::get('/list-your-property', function (\Illuminate\Http\Request $request) {
    $supportedLocales = config('app.supported_locales', ['en', 'fr', 'es']);
    $cookieValue = $request->cookie('i18nextLng') ?: $_COOKIE['i18nextLng'] ?? null;
    $locale = $cookieValue ?: $request->session()->get('locale', 'en');
    if (!in_array($locale, $supportedLocales)) {
        $locale = 'en';
    }
    return redirect("/$locale/list-your-property");
});

Route::get('/support', function (\Illuminate\Http\Request $request) {
    $supportedLocales = config('app.supported_locales', ['en', 'fr', 'es']);
    $cookieValue = $request->cookie('i18nextLng') ?: $_COOKIE['i18nextLng'] ?? null;
    $locale = $cookieValue ?: $request->session()->get('locale', 'en');
    if (!in_array($locale, $supportedLocales)) {
        $locale = 'en';
    }
    return redirect("/$locale/support");
});

Route::get('/sitemap', function (\Illuminate\Http\Request $request) {
    $supportedLocales = config('app.supported_locales', ['en', 'fr', 'es']);
    $cookieValue = $request->cookie('i18nextLng') ?: $_COOKIE['i18nextLng'] ?? null;
    $locale = $cookieValue ?: $request->session()->get('locale', 'en');
    if (!in_array($locale, $supportedLocales)) {
        $locale = 'en';
    }
    return redirect("/$locale/sitemap");
});

Route::get('/how-we-work', function (\Illuminate\Http\Request $request) {
    $supportedLocales = config('app.supported_locales', ['en', 'fr', 'es']);
    $cookieValue = $request->cookie('i18nextLng') ?: $_COOKIE['i18nextLng'] ?? null;
    $locale = $cookieValue ?: $request->session()->get('locale', 'en');
    if (!in_array($locale, $supportedLocales)) {
        $locale = 'en';
    }
    return redirect("/$locale/how-we-work");
});

Route::get('/faq', function (\Illuminate\Http\Request $request) {
    $supportedLocales = config('app.supported_locales', ['en', 'fr', 'es']);
    $cookieValue = $request->cookie('i18nextLng') ?: $_COOKIE['i18nextLng'] ?? null;
    $locale = $cookieValue ?: $request->session()->get('locale', 'en');
    if (!in_array($locale, $supportedLocales)) {
        $locale = 'en';
    }
    return redirect("/$locale/faq");
});

// Removed /terms redirect - conflicts with admin route

Route::get('/blog', function (\Illuminate\Http\Request $request) {
    $supportedLocales = config('app.supported_locales', ['en', 'fr', 'es']);
    $cookieValue = $request->cookie('i18nextLng') ?: $_COOKIE['i18nextLng'] ?? null;
    $locale = $cookieValue ?: $request->session()->get('locale', 'en');
    if (!in_array($locale, $supportedLocales)) {
        $locale = 'en';
    }
    return redirect("/$locale/blog");
});

// Add missing catch-all redirects for other client routes
Route::get('/city/{city}', function (\Illuminate\Http\Request $request, $city) {
    $supportedLocales = config('app.supported_locales', ['en', 'fr', 'es']);
    $cookieValue = $request->cookie('i18nextLng') ?: $_COOKIE['i18nextLng'] ?? null;
    $locale = $cookieValue ?: $request->session()->get('locale', 'en');
    if (!in_array($locale, $supportedLocales)) {
        $locale = 'en';
    }
    $queryString = $request->getQueryString();
    $redirectUrl = "/$locale/city/$city";
    if ($queryString) {
        $redirectUrl .= '?' . $queryString;
    }
    return redirect($redirectUrl);
})->where('city', '.*');

Route::get('/car-search', function (\Illuminate\Http\Request $request) {
    $supportedLocales = config('app.supported_locales', ['en', 'fr', 'es']);
    $cookieValue = $request->cookie('i18nextLng') ?: $_COOKIE['i18nextLng'] ?? null;
    $locale = $cookieValue ?: $request->session()->get('locale', 'en');
    if (!in_array($locale, $supportedLocales)) {
        $locale = 'en';
    }
    $queryString = $request->getQueryString();
    $redirectUrl = "/$locale/car-search";
    if ($queryString) {
        $redirectUrl .= '?' . $queryString;
    }
    return redirect($redirectUrl);
});

Route::get('/private-search', function (\Illuminate\Http\Request $request) {
    $supportedLocales = config('app.supported_locales', ['en', 'fr', 'es']);
    $cookieValue = $request->cookie('i18nextLng') ?: $_COOKIE['i18nextLng'] ?? null;
    $locale = $cookieValue ?: $request->session()->get('locale', 'en');
    if (!in_array($locale, $supportedLocales)) {
        $locale = 'en';
    }
    $queryString = $request->getQueryString();
    $redirectUrl = "/$locale/private-search";
    if ($queryString) {
        $redirectUrl .= '?' . $queryString;
    }
    return redirect($redirectUrl);
});

Route::get('/boat-search', function (\Illuminate\Http\Request $request) {
    $supportedLocales = config('app.supported_locales', ['en', 'fr', 'es']);
    $cookieValue = $request->cookie('i18nextLng') ?: $_COOKIE['i18nextLng'] ?? null;
    $locale = $cookieValue ?: $request->session()->get('locale', 'en');
    if (!in_array($locale, $supportedLocales)) {
        $locale = 'en';
    }
    $queryString = $request->getQueryString();
    $redirectUrl = "/$locale/boat-search";
    if ($queryString) {
        $redirectUrl .= '?' . $queryString;
    }
    return redirect($redirectUrl);
});

Route::get('/thingstodo-search', function (\Illuminate\Http\Request $request) {
    $supportedLocales = config('app.supported_locales', ['en', 'fr', 'es']);
    $cookieValue = $request->cookie('i18nextLng') ?: $_COOKIE['i18nextLng'] ?? null;
    $locale = $cookieValue ?: $request->session()->get('locale', 'en');
    if (!in_array($locale, $supportedLocales)) {
        $locale = 'en';
    }
    $queryString = $request->getQueryString();
    $redirectUrl = "/$locale/thingstodo-search";
    if ($queryString) {
        $redirectUrl .= '?' . $queryString;
    }
    return redirect($redirectUrl);
});

Route::get('/agency/{agency_name}', function (\Illuminate\Http\Request $request, $agency_name) {
    $supportedLocales = config('app.supported_locales', ['en', 'fr', 'es']);
    $cookieValue = $request->cookie('i18nextLng') ?: $_COOKIE['i18nextLng'] ?? null;
    $locale = $cookieValue ?: $request->session()->get('locale', 'en');
    if (!in_array($locale, $supportedLocales)) {
        $locale = 'en';
    }
    $queryString = $request->getQueryString();
    $redirectUrl = "/$locale/agency/$agency_name";
    if ($queryString) {
        $redirectUrl .= '?' . $queryString;
    }
    return redirect($redirectUrl);
})->where('agency_name', '.*');

Route::get('/article/{slug}', function (\Illuminate\Http\Request $request, $slug) {
    $supportedLocales = config('app.supported_locales', ['en', 'fr', 'es']);
    $cookieValue = $request->cookie('i18nextLng') ?: $_COOKIE['i18nextLng'] ?? null;
    $locale = $cookieValue ?: $request->session()->get('locale', 'en');
    if (!in_array($locale, $supportedLocales)) {
        $locale = 'en';
    }
    $queryString = $request->getQueryString();
    $redirectUrl = "/$locale/article/$slug";
    if ($queryString) {
        $redirectUrl .= '?' . $queryString;
    }
    return redirect($redirectUrl);
})->where('slug', '.*');

Route::get('/terms-conditions', function (\Illuminate\Http\Request $request) {
    $supportedLocales = config('app.supported_locales', ['en', 'fr', 'es']);
    $cookieValue = $request->cookie('i18nextLng') ?: $_COOKIE['i18nextLng'] ?? null;
    $locale = $cookieValue ?: $request->session()->get('locale', 'en');
    if (!in_array($locale, $supportedLocales)) {
        $locale = 'en';
    }
    return redirect("/$locale/terms-conditions");
});

Route::get('/privacy-policy', function (\Illuminate\Http\Request $request) {
    $supportedLocales = config('app.supported_locales', ['en', 'fr', 'es']);
    $cookieValue = $request->cookie('i18nextLng') ?: $_COOKIE['i18nextLng'] ?? null;
    $locale = $cookieValue ?: $request->session()->get('locale', 'en');
    if (!in_array($locale, $supportedLocales)) {
        $locale = 'en';
    }
    return redirect("/$locale/privacy-policy");
});

Route::get('/cookie-policy', function (\Illuminate\Http\Request $request) {
    $supportedLocales = config('app.supported_locales', ['en', 'fr', 'es']);
    $cookieValue = $request->cookie('i18nextLng') ?: $_COOKIE['i18nextLng'] ?? null;
    $locale = $cookieValue ?: $request->session()->get('locale', 'en');
    if (!in_array($locale, $supportedLocales)) {
        $locale = 'en';
    }
    return redirect("/$locale/cookie-policy");
});

Route::get('/cancellation-policy', function (\Illuminate\Http\Request $request) {
    $supportedLocales = config('app.supported_locales', ['en', 'fr', 'es']);
    $cookieValue = $request->cookie('i18nextLng') ?: $_COOKIE['i18nextLng'] ?? null;
    $locale = $cookieValue ?: $request->session()->get('locale', 'en');
    if (!in_array($locale, $supportedLocales)) {
        $locale = 'en';
    }
    return redirect("/$locale/cancellation-policy");
});

Route::get('/insurance-conditions', function (\Illuminate\Http\Request $request) {
    $supportedLocales = config('app.supported_locales', ['en', 'fr', 'es']);
    $cookieValue = $request->cookie('i18nextLng') ?: $_COOKIE['i18nextLng'] ?? null;
    $locale = $cookieValue ?: $request->session()->get('locale', 'en');
    if (!in_array($locale, $supportedLocales)) {
        $locale = 'en';
    }
    return redirect("/$locale/insurance-conditions");
});

Route::get('/category/{category}/subcategory/{subcat}', function (\Illuminate\Http\Request $request, $category, $subcat) {
    $supportedLocales = config('app.supported_locales', ['en', 'fr', 'es']);
    $cookieValue = $request->cookie('i18nextLng') ?: $_COOKIE['i18nextLng'] ?? null;
    $locale = $cookieValue ?: $request->session()->get('locale', 'en');
    if (!in_array($locale, $supportedLocales)) {
        $locale = 'en';
    }
    $queryString = $request->getQueryString();
    $redirectUrl = "/$locale/category/$category/subcategory/$subcat";
    if ($queryString) {
        $redirectUrl .= '?' . $queryString;
    }
    return redirect($redirectUrl);
})->where(['category' => '.*', 'subcat' => '.*']);

Route::get('/category/{slug}/{city}', function (\Illuminate\Http\Request $request, $slug, $city) {
    $supportedLocales = config('app.supported_locales', ['en', 'fr', 'es']);
    $cookieValue = $request->cookie('i18nextLng') ?: $_COOKIE['i18nextLng'] ?? null;
    $locale = $cookieValue ?: $request->session()->get('locale', 'en');
    if (!in_array($locale, $supportedLocales)) {
        $locale = 'en';
    }
    $queryString = $request->getQueryString();
    $redirectUrl = "/$locale/category/$slug/$city";
    if ($queryString) {
        $redirectUrl .= '?' . $queryString;
    }
    return redirect($redirectUrl);
})->where(['slug' => '.*', 'city' => '.*']);

// Routes with locale prefix (pattern defined in RouteServiceProvider)
Route::group(['prefix' => '{locale?}'], function () {
    
    //Auth Routes moved to admin.php - no locale needed
    //Auth::routes(['register' => false]);
    
    //Frontend
    Route::name('entere.')->group(function () {
    Route::get('/', [EntereController::class, 'home'])->name('home');
    Route::get('/about-us', [EntereController::class, 'aboutus'])->name('aboutus');
    Route::get('/list-your-property', [EntereController::class, 'list_property'])->name('list_property');
    Route::get('/support', [EntereController::class, 'support'])->name('support');
    Route::get('/how-we-work', [EntereController::class, 'how_we_work'])->name('how_we_work');
    Route::get('/faq', [EntereController::class, 'faq'])->name('faq');
    Route::get('/sitemap', function(){ return view('site.sitemap'); })->name('sitemap');
    Route::get('/partners', [EntereController::class, 'partners'])->name('partners');
    Route::get('/terms', [EntereController::class, 'terms'])->name('terms');
    Route::get('/city/{city}', action: [EntereController::class, 'city'])->name('city');
    Route::get('/category/{slug}', [EntereController::class, 'category'])->name('category');
    Route::get('/category/{category}/subcategory/{subcat}', [EntereController::class, 'subcategory'])->name('subcategory');
    Route::get('/category/{slug}/{city}', [EntereController::class, 'categoryCity'])->name('categoryCity');
    Route::get('/details/{slug}', [EntereController::class, 'listing'])->name('listing');
    Route::get('/car-search', [EntereController::class, 'carsearch'])->name('carsearch');
    Route::get('/private-search', [EntereController::class, 'privatesearch'])->name('privatesearch');
    Route::get('/boat-search', [EntereController::class, 'boatsearch'])->name('boatsearch');
    Route::get('/thingstodo-search', [EntereController::class, 'thingstodosearch'])->name('thingstodosearch');
    Route::get('/agency/{agency_name}', [EntereController::class, 'agency'])->name('agency');
    Route::get('/blog', [EntereController::class, 'blog'])->name('blog');
    Route::get('/article/{slug}', [EntereController::class, 'article'])->name('article');
    Route::get('/terms-conditions', [EntereController::class, 'terms'])->name('terms-conditions');
    Route::get('/privacy-policy', [EntereController::class, 'privacy'])->name('privacy');
    Route::get('/cookie-policy', [EntereController::class, 'cookies'])->name('cookies');
    Route::get('/cancellation-policy', [EntereController::class, 'cancellation'])->name('cancellation');
    Route::get('/insurance-conditions', [EntereController::class, 'insurance'])->name('insurance');

    });

    // =========================================================================
    // ADMIN ROUTES HAVE BEEN MOVED TO routes/admin.php
    // These routes no longer need locale prefixes for consistency
    // The routes below are commented out but kept for reference during migration
    // =========================================================================
    
    /* ADMIN ROUTES MOVED TO routes/admin.php - START COMMENT BLOCK
    //Pages
    Route::name('pages.')->middleware(['auth'])->prefix('pages')->group(function () {
    Route::get('/', [PageController::class, 'list'])->name('list');
    Route::get('/new', [PageController::class, 'new'])->name('new');
    Route::post('/insert', [PageController::class, 'insert'])->name('insert');
    Route::get('/edit/{id}', [PageController::class, 'edit'])->name('edit');
    Route::post('/update', [PageController::class, 'update'])->name('update');
    Route::post('/delete', [PageController::class, 'delete'])->name('delete');
    });

    //Categories
    Route::name('categories.')->middleware(['auth'])->prefix('categories')->group(function () {
    Route::get('/', [CategoryController::class, 'list'])->name('list');
    Route::get('/new', [CategoryController::class, 'new'])->name('new');
    Route::post('/insert', [CategoryController::class, 'insert'])->name('insert');
    Route::get('/edit/{id}', [CategoryController::class, 'edit'])->name('edit');
    Route::post('/update', [CategoryController::class, 'update'])->name('update');
    Route::post('/delete', [CategoryController::class, 'delete'])->name('delete');
    Route::post('getSubcategories', [CategoryController::class, 'getSubcategories'])->name('getSubcategories');
    Route::post('getListings', [CategoryController::class, 'getListings'])->name('getListings');
    Route::post('getCategoryData', [CategoryController::class, 'getCategoryData'])->name('getCategoryData');
    });

    //Subcategories
    Route::name('subcategories.')->middleware(['auth'])->prefix('subcategories')->group(function () {
    Route::get('/', [SubCategoryController::class, 'list'])->name('list');
    Route::get('/new', [SubCategoryController::class, 'new'])->name('new');
    Route::post('/insert', [SubCategoryController::class, 'insert'])->name('insert');
    Route::get('/edit/{id}', [SubCategoryController::class, 'edit'])->name('edit');
    Route::post('/update', [SubCategoryController::class, 'update'])->name('update');
    Route::post('/delete', [SubCategoryController::class, 'delete'])->name('delete');
    Route::post('getOptions', [SubCategoryController::class, 'getOptions'])->name('getOptions');
    });

    //Terms
    Route::name('terms.')->middleware(['auth'])->prefix('terms')->group(function () {
    Route::get('/', [TermsController::class, 'list'])->name('list');
    Route::get('/new', [TermsController::class, 'new'])->name('new');
    Route::post('/insert', [TermsController::class, 'insert'])->name('insert');
    Route::get('/edit/{id}', [TermsController::class, 'edit'])->name('edit');
    Route::post('/update', [TermsController::class, 'update'])->name('update');
    Route::post('/delete', [TermsController::class, 'delete'])->name('delete');
    });

    //Cities
    Route::name('cities.')->middleware('auth')->prefix('cities')->group(function () {
    Route::get('/', [CityController::class, 'list'])->name('list');
    Route::post('new', [CityController::class, 'insert'])->name('insert');
    Route::post('update', [CityController::class, 'update'])->name('update');
    Route::post('delete', [CityController::class, 'delete'])->name('delete');
    });

    //Coupons
    Route::name('coupons.')->middleware(['auth'])->prefix('coupons')->group(function () {
    Route::get('/', [CouponController::class, 'list'])->name('list');
    Route::get('/new', [CouponController::class, 'new'])->name('new');
    Route::post('/insert', [CouponController::class, 'insert'])->name('insert');
    Route::get('/edit/{id}', [CouponController::class, 'edit'])->name('edit');
    Route::post('/update', [CouponController::class, 'update'])->name('update');
    Route::post('/delete', [CouponController::class, 'delete'])->name('delete');
    });

    //Agencies
    Route::name('agencies.')->middleware('auth')->prefix('agencies')->group(function () {
    Route::get('/', [AgencyController::class, 'list'])->name('list');
    Route::post('getAgencies', [AgencyController::class, 'getAgencies'])->name('getAgencies');
    Route::get('new', [AgencyController::class, 'new'])->name('new');
    Route::post('new', [AgencyController::class, 'insert'])->name('insert');
    Route::get('edit/{id}', [AgencyController::class, 'edit'])->name('edit');
    Route::post('update', [AgencyController::class, 'update'])->name('update');
    Route::post('delete', [AgencyController::class, 'delete'])->name('delete');
    Route::post('changeStatus', [AgencyController::class, 'changeStatus'])->name('changeStatus');
    });

    //Articles
    Route::name('articles.')->middleware('auth')->prefix('articles')->group(function () {
    Route::get('/', [ArticleController::class, 'list'])->name('list');
    Route::get('new', [ArticleController::class, 'new'])->name('new');
    Route::post('new', [ArticleController::class, 'insert'])->name('insert');
    Route::get('edit/{id}', [ArticleController::class, 'edit'])->name('edit');
    Route::post('update', [ArticleController::class, 'update'])->name('update');
    Route::post('delete', [ArticleController::class, 'delete'])->name('delete');
    });

    //Listings
    Route::name('listings.')->middleware('auth')->prefix('listings')->group(function () {
    Route::get('/', [ListingController::class, 'list'])->name('list');
    Route::get('new', [ListingController::class, 'new'])->name('new');
    Route::post('new', [ListingController::class, 'insert'])->name('insert');
    Route::get('edit/{id}', [ListingController::class, 'edit'])->name('edit');
    Route::post('update', [ListingController::class, 'update'])->name('update');
    Route::post('delete', [ListingController::class, 'delete'])->name('delete');
    Route::post('/getAddons', [ListingController::class, 'getAddons'])->name('getAddons');
    Route::post('/getDetails', [ListingController::class, 'getDetails'])->name('getDetails');
    Route::post('/getPricing', [ListingController::class, 'getPricing'])->name('getPricing');
    
    // Translation routes
    Route::post('{id}/translate', [ListingController::class, 'translate'])->name('translate');
    Route::get('{id}/translations', [ListingController::class, 'getTranslations'])->name('getTranslations');
    Route::put('{id}/translations', [ListingController::class, 'updateTranslations'])->name('updateTranslations');
    Route::delete('{id}/translations', [ListingController::class, 'deleteTranslations'])->name('deleteTranslations');
    Route::get('translation-stats', [ListingController::class, 'translationStats'])->name('translationStats');
    Route::post('translate-preview', [ListingController::class, 'translatePreview'])->name('translatePreview');
    
    // Translation test page
    Route::get('translation-test', function() {
        $listings = \App\Models\Listing::with('translations')->take(10)->get();
        return view('listings.translation-test', compact('listings'));
    })->name('translationTest');
    });

    //ListingAddons
    Route::name('listingaddons.')->middleware(['auth'])->prefix('listingaddons')->group(function () {
    Route::get('/', [ListingAddonController::class, 'list'])->name('list');
    Route::get('/new', [ListingAddonController::class, 'new'])->name('new');
    Route::post('/insert', [ListingAddonController::class, 'insert'])->name('insert');
    Route::get('/edit/{id}', [ListingAddonController::class, 'edit'])->name('edit');
    Route::post('/update', [ListingAddonController::class, 'update'])->name('update');
    Route::post('/delete', [ListingAddonController::class, 'delete'])->name('delete');
    Route::post('/getAddons', [ListingAddonController::class, 'getAddons'])->name('getAddons');
    });

    //Bookings
    Route::name('bookings.')->middleware('auth')->prefix('bookings')->group(function () {
    Route::get('/', [BookingController::class, 'list'])->name('list');
    Route::get('new', [BookingController::class, 'new'])->name('new');
    Route::post('new', [BookingController::class, 'insert'])->name('insert');
    Route::get('edit/{id}', [BookingController::class, 'edit'])->name('edit');
    Route::post('update', [BookingController::class, 'update'])->name('update');
    Route::post('delete', [BookingController::class, 'delete'])->name('delete');
    Route::post('changeStatus', [BookingController::class, 'changeStatus'])->name('changeStatus');
    Route::post('getListings', [BookingController::class, 'getListings'])->name('getListings');
    Route::post('getActivityListings', [BookingController::class, 'getActivityListings'])->name('getActivityListings');
    Route::get('calendarData', [BookingController::class, 'calendarData'])->name('calendarData');
    Route::get('{id}/email-status', [BookingController::class, 'getEmailStatus'])->name('email-status');
    Route::post('{id}/send-email', [BookingController::class, 'sendEmail'])->name('send-email');
    Route::post('{id}/retry-email', [BookingController::class, 'retryEmail'])->name('retry-email');
    Route::get('{id}/download-invoice', [BookingController::class, 'downloadInvoice'])->name('download-invoice');
    });

    //Utilisateur
    Route::name('utilisateur.')->group(function () {

    Route::middleware(['auth'])->prefix('users/')->group(function () {
        Route::get('/', [UtilisateurController::class, 'listUtilisateurs'])->name('list_utilisateurs');
        Route::get('new', [UtilisateurController::class, 'newUtilisateur'])->name('new');
        Route::post('new', [UtilisateurController::class, 'insertUtilisateur'])->name('insert');
        Route::get('edit/{id}', [UtilisateurController::class, 'updateUtilisateur'])->whereNumber('id')->name('update');
        Route::post('update', [UtilisateurController::class, 'saveUtilisateur'])->name('save');
        Route::post('delete', [UtilisateurController::class, 'deleteUtilisateur'])->name('delete');
        });
        Route::post('activate', [UtilisateurController::class, 'activate'])->name('activate');
    Route::post('deactivate', [UtilisateurController::class, 'deactivate'])->name('deactivate');
    });

    //Parametrage
    Route::name('parametrage.')->middleware(['auth'])->prefix('settings')->group(function () {
    Route::get('/', [SocieteController::class, 'get'])->name('get');
    Route::post('/', [SocieteController::class, 'save'])->name('save');
    Route::post('upload', [SocieteController::class, 'upload'])->name('upload');
    });

    //Profile
    Route::name('profile.')->middleware('auth')->prefix('profile')->group(function () {
    Route::get('/', [ProfileController::class, 'get'])->name('get');
    Route::post('/', [ProfileController::class, 'save'])->name('save');
    Route::post('upload', [ProfileController::class, 'upload'])->name('upload');
    });

    //Email Templates
    Route::middleware(['auth'])->prefix('admin')->name('admin.')->group(function () {
    Route::get('/email-templates', [EmailTemplateController::class, 'index'])->name('email-templates.index');
    Route::get('/email-templates/{template}/edit', [EmailTemplateController::class, 'edit'])->name('email-templates.edit');
    Route::put('/email-templates/{template}', [EmailTemplateController::class, 'update'])->name('email-templates.update');
    Route::post('/email-templates/{template}/reset', [EmailTemplateController::class, 'reset'])->name('email-templates.reset');
    Route::get('/email-templates/{template}/preview', [EmailTemplateController::class, 'preview'])->name('email-templates.preview');
    Route::get('/email-templates/preview-multilingual', [EmailTemplateController::class, 'previewMultilingual'])->name('email-templates.preview-multilingual');
    
    // Email Settings
    Route::get('/email-settings', [EmailSettingsController::class, 'index'])->name('email-settings');
    Route::post('/email-settings', [EmailSettingsController::class, 'update'])->name('email-settings.update');
    Route::post('/email-settings/test', [EmailSettingsController::class, 'sendTest'])->name('email-settings.test');
    
    // Email History
        Route::get('/email-history', [\App\Http\Controllers\Admin\EmailHistoryController::class, 'index'])->name('email-history');
    });
    END COMMENT BLOCK - ADMIN ROUTES MOVED TO routes/admin.php */

}); // End of locale group

Route::get('clear', function () {
    Artisan::call('config:clear');
    Artisan::call('view:clear');
    Artisan::call('cache:clear');
    Artisan::call('route:clear');

    return "cache cleared";
});

Route::get('/update_sitemap', [PageController::class, 'update_sitemap']);

Route::get('cache-generate', function () {
    Artisan::call('config:cache');
    Artisan::call('view:cache');
    Artisan::call('route:cache');

    return "cache generated";
});
