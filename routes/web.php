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

//Auth Routes
Auth::routes(['register' => false]);

//Frontend
Route::name('entere.')->group(function () {
    Route::get('/', [EntereController::class, 'home'])->name('home');
    Route::get('/about-us', [EntereController::class, 'aboutus'])->name('aboutus');
    Route::get('/list-your-property', [EntereController::class, 'list_property'])->name('list_property');
    Route::get('/support', [EntereController::class, 'support'])->name('support');
    Route::get('/how-we-work', [EntereController::class, 'how_we_work'])->name('how_we_work');
    Route::get('/faq', [EntereController::class, 'faq'])->name('faq');
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
    Route::get('/terms-conditions', [EntereController::class, 'terms'])->name('terms');
    Route::get('/privacy-policy', [EntereController::class, 'privacy'])->name('privacy');
    Route::get('/cookie-policy', [EntereController::class, 'cookies'])->name('cookies');
    Route::get('/cancellation-policy', [EntereController::class, 'cancellation'])->name('cancellation');
    Route::get('/insurance-conditions', [EntereController::class, 'insurance'])->name('insurance');

});

//Dashboard
Route::name('dashboard.')->middleware('auth')->group(function () {
    Route::get('/dashboard', [DahsboardController::class, 'index'])->name('index');
});

//Notifications
Route::name('notifications.')->prefix('notifications')->group(function () {
    Route::post('/getNotifications', [NotificationController::class, 'getNotifications'])->name('getNotifications');
    Route::post('/getMessages', [NotificationController::class, 'getMessages'])->name('getMessages');
    Route::post('/seen', [NotificationController::class, 'seen'])->name('seen');
    Route::post('/seenMessages', [NotificationController::class, 'seenMessages'])->name('seenMessages');
});

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
    Route::post('getOptions', [subCategoryController::class, 'getOptions'])->name('getOptions');
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
