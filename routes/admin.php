<?php

use App\Http\Controllers\Admin\EmailTemplateController;
use App\Http\Controllers\Admin\EmailSettingsController;
use App\Http\Controllers\AgencyController;
use App\Http\Controllers\ArticleController;
use App\Http\Controllers\BookingController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\CityController;
use App\Http\Controllers\CouponController;
use App\Http\Controllers\DahsboardController;
use App\Http\Controllers\ListingAddonController;
use App\Http\Controllers\ListingController;
use App\Http\Controllers\NotificationController;
use App\Http\Controllers\PageController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\SocieteController;
use App\Http\Controllers\SubCategoryController;
use App\Http\Controllers\TermsController;
use App\Http\Controllers\UtilisateurController;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Auth;

/*
|--------------------------------------------------------------------------
| Admin Routes (No locale prefix)
|--------------------------------------------------------------------------
|
| Admin routes that don't need locale prefixes. The admin interface
| can still be translated internally, but URLs remain consistent.
|
*/

// Authentication Routes (no locale needed for admin auth)
Auth::routes(['register' => false]);

// Dashboard
Route::name('dashboard.')->middleware('auth')->group(function () {
    Route::get('/dashboard', [DahsboardController::class, 'index'])->name('index');
});

// Notifications
Route::name('notifications.')->prefix('notifications')->group(function () {
    Route::post('/getNotifications', [NotificationController::class, 'getNotifications'])->name('getNotifications');
    Route::post('/getMessages', [NotificationController::class, 'getMessages'])->name('getMessages');
    Route::post('/seen', [NotificationController::class, 'seen'])->name('seen');
    Route::post('/seenMessages', [NotificationController::class, 'seenMessages'])->name('seenMessages');
});

// Pages Management
Route::name('pages.')->middleware(['auth'])->prefix('pages')->group(function () {
    Route::get('/', [PageController::class, 'list'])->name('list');
    Route::get('/new', [PageController::class, 'new'])->name('new');
    Route::post('/insert', [PageController::class, 'insert'])->name('insert');
    Route::get('/edit/{id}', [PageController::class, 'edit'])->name('edit');
    Route::post('/update', [PageController::class, 'update'])->name('update');
    Route::post('/delete', [PageController::class, 'delete'])->name('delete');
});

// Categories Management
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

// Subcategories Management
Route::name('subcategories.')->middleware(['auth'])->prefix('subcategories')->group(function () {
    Route::get('/', [SubCategoryController::class, 'list'])->name('list');
    Route::get('/new', [SubCategoryController::class, 'new'])->name('new');
    Route::post('/insert', [SubCategoryController::class, 'insert'])->name('insert');
    Route::get('/edit/{id}', [SubCategoryController::class, 'edit'])->name('edit');
    Route::post('/update', [SubCategoryController::class, 'update'])->name('update');
    Route::post('/delete', [SubCategoryController::class, 'delete'])->name('delete');
    Route::post('getOptions', [SubCategoryController::class, 'getOptions'])->name('getOptions');
});

// Terms Management
Route::name('terms.')->middleware(['auth'])->prefix('terms')->group(function () {
    Route::get('/', [TermsController::class, 'list'])->name('list');
    Route::get('/new', [TermsController::class, 'new'])->name('new');
    Route::post('/insert', [TermsController::class, 'insert'])->name('insert');
    Route::get('/edit/{id}', [TermsController::class, 'edit'])->name('edit');
    Route::post('/update', [TermsController::class, 'update'])->name('update');
    Route::post('/delete', [TermsController::class, 'delete'])->name('delete');
});

// Cities Management
Route::name('cities.')->middleware(['auth'])->prefix('cities')->group(function () {
    Route::get('/', [CityController::class, 'list'])->name('list');
    Route::get('/new', [CityController::class, 'new'])->name('new');
    Route::post('/insert', [CityController::class, 'insert'])->name('insert');
    Route::get('/edit/{id}', [CityController::class, 'edit'])->name('edit');
    Route::post('/update', [CityController::class, 'update'])->name('update');
    Route::post('/delete', [CityController::class, 'delete'])->name('delete');
});

// Companies/Societes Management
Route::name('societes.')->middleware(['auth'])->prefix('societes')->group(function () {
    Route::get('/', [SocieteController::class, 'listSocietes'])->name('listSocietes');
    Route::get('/add', [SocieteController::class, 'addSociete'])->name('addSociete');
    Route::post('/insert', [SocieteController::class, 'insertSociete'])->name('insertSociete');
    Route::get('/edit/{id}', [SocieteController::class, 'editSociete'])->name('editSociete');
    Route::post('/update', [SocieteController::class, 'updateSociete'])->name('updateSociete');
    Route::post('/delete', [SocieteController::class, 'deleteSociete'])->name('deleteSociete');
});

// Listings Management
Route::name('listings.')->middleware(['auth'])->prefix('listings')->group(function () {
    Route::get('/', [ListingController::class, 'list'])->name('list');
    Route::get('/add', [ListingController::class, 'new'])->name('add');
    Route::get('/new', [ListingController::class, 'new'])->name('new');
    Route::post('/insert', [ListingController::class, 'insert'])->name('insert');
    Route::get('/edit/{id}', [ListingController::class, 'edit'])->name('edit');
    Route::post('/update', [ListingController::class, 'update'])->name('update');
    Route::post('/delete', [ListingController::class, 'delete'])->name('delete');
    Route::post('/uploads', [ListingController::class, 'uploads'])->name('uploads');
    Route::post('/unlink', [ListingController::class, 'unlink'])->name('unlink');
    Route::post('/setAsPrimary', [ListingController::class, 'setAsPrimary'])->name('setAsPrimary');
    Route::post('/switchStatus', [ListingController::class, 'switchStatus'])->name('switchStatus');
    Route::post('/deleteAllListingImages', [ListingController::class, 'deleteAllListingImages'])->name('deleteAllListingImages');
    Route::post('/get-listing-details', [ListingController::class, 'get_listing_details'])->name('get_listing_details');
    Route::get('/translation-test', [ListingController::class, 'translationTest'])->name('translationTest');
    Route::post('/getPricing', [ListingController::class, 'getPricing'])->name('getPricing');
    Route::post('/getAddons', [ListingController::class, 'getAddons'])->name('getAddons');
    
    // Form data and category-specific endpoints
    Route::get('/form-data', [ListingController::class, 'getFormData'])->name('getFormData');
    
    // Translation routes
    Route::post('/translate-preview', [ListingController::class, 'translatePreview'])->name('translatePreview');
    Route::post('/{id}/translate', [ListingController::class, 'translate'])->name('translate');
    Route::get('/{id}/translations', [ListingController::class, 'getTranslations'])->name('getTranslations');
    Route::put('/{id}/translations', [ListingController::class, 'updateTranslations'])->name('updateTranslations');
    Route::delete('/{id}/translations', [ListingController::class, 'deleteTranslations'])->name('deleteTranslations');
});

// Listing Addons Management
Route::middleware(['auth'])->prefix('listing_addons')->group(function () {
    // Use consistent naming without underscore to match blade templates
    Route::get('/', [ListingAddonController::class, 'list'])->name('listingaddons.list');
    Route::get('/new', [ListingAddonController::class, 'new'])->name('listingaddons.new');
    Route::get('/edit/{id}', [ListingAddonController::class, 'edit'])->name('listingaddons.edit');
    Route::post('/insert', [ListingAddonController::class, 'insert'])->name('listingaddons.insert');
    Route::post('/update', [ListingAddonController::class, 'update'])->name('listingaddons.update');
    Route::post('/delete', [ListingAddonController::class, 'delete'])->name('listingaddons.delete');
    
    // Translation routes
    Route::get('/{id}/translations', [ListingAddonController::class, 'getTranslations'])->name('listingaddons.getTranslations');
    Route::put('/{id}/translations', [ListingAddonController::class, 'updateTranslations'])->name('listingaddons.updateTranslations');
    Route::delete('/{id}/translations', [ListingAddonController::class, 'deleteTranslations'])->name('listingaddons.deleteTranslations');
    Route::post('/{id}/generate-translations', [ListingAddonController::class, 'generateTranslations'])->name('listingaddons.generateTranslations');
    Route::post('/translate-text', [ListingAddonController::class, 'translateText'])->name('listingaddons.translateText');
    
    // Add routes with underscore for backwards compatibility (dashboard navigation)
    Route::get('/add', [ListingAddonController::class, 'new'])->name('listing_addons.add');
    Route::post('/insert-alt', [ListingAddonController::class, 'insert'])->name('listing_addons.insert');
});

// Coupons Management
Route::name('coupons.')->middleware(['auth'])->prefix('coupons')->group(function () {
    Route::get('/', [CouponController::class, 'list'])->name('list');
    Route::get('/new', [CouponController::class, 'new'])->name('new');
    Route::get('/add', [CouponController::class, 'new'])->name('add');
    Route::post('/insert', [CouponController::class, 'insert'])->name('insert');
    Route::get('/edit/{id}', [CouponController::class, 'edit'])->name('edit');
    Route::post('/update', [CouponController::class, 'update'])->name('update');
    Route::post('/delete', [CouponController::class, 'delete'])->name('delete');
});

// Bookings Management
Route::name('bookings.')->middleware(['auth'])->prefix('bookings')->group(function () {
    Route::get('/', [BookingController::class, 'list'])->name('list');
    Route::get('/new', [BookingController::class, 'new'])->name('new');
    Route::post('/insert', [BookingController::class, 'insert'])->name('insert');
    Route::get('/edit/{id}', [BookingController::class, 'edit'])->name('edit');
    Route::post('/update', [BookingController::class, 'update'])->name('update');
    Route::post('/delete', [BookingController::class, 'delete'])->name('delete');
    Route::post('/changeStatus', [BookingController::class, 'changeStatus'])->name('changeStatus');
    Route::get('/download-invoice/{id}', [BookingController::class, 'downloadInvoice'])->name('download-invoice');
    Route::get('/item/{id}', [BookingController::class, 'item'])->name('item');
    Route::post('/unlink', [BookingController::class, 'unlink'])->name('unlink');
    Route::post('/sendBookingEmail', [BookingController::class, 'sendBookingEmail'])->name('sendBookingEmail');
    Route::post('/uploads', [BookingController::class, 'uploads'])->name('uploads');
    Route::post('/send-invoice', [BookingController::class, 'sendInvoice'])->name('send-invoice');
    Route::post('/getListings', [BookingController::class, 'getListings'])->name('getListings');
    Route::post('/getActivityListings', [BookingController::class, 'getActivityListings'])->name('getActivityListings');
    
    // Calendar data route
    Route::get('/calendarData', [BookingController::class, 'calendarData'])->name('calendarData');
    
    // Email management routes
    Route::get('/{id}/email-status', [BookingController::class, 'getEmailStatus'])->name('email-status');
    Route::post('/{id}/send-email', [BookingController::class, 'sendEmail'])->name('send-email');
    Route::post('/{id}/retry-email', [BookingController::class, 'retryEmail'])->name('retry-email');
});

// Articles/Blog Management
Route::name('articles.')->middleware(['auth'])->prefix('articles')->group(function () {
    Route::get('/', [ArticleController::class, 'list'])->name('list');
    Route::get('/add', [ArticleController::class, 'new'])->name('add');
    Route::get('/new', [ArticleController::class, 'new'])->name('new');
    Route::post('/insert', [ArticleController::class, 'insert'])->name('insert');
    Route::get('/edit/{id}', [ArticleController::class, 'edit'])->name('edit');
    Route::post('/update', [ArticleController::class, 'update'])->name('update');
    Route::post('/delete', [ArticleController::class, 'delete'])->name('delete');
    
    // Translation routes
    Route::post('/translate-preview', [ArticleController::class, 'translatePreview'])->name('translatePreview');
    Route::post('/{id}/translate', [ArticleController::class, 'translate'])->name('translate');
});

// Agencies Management
Route::name('agencies.')->middleware(['auth'])->prefix('agencies')->group(function () {
    Route::get('/', [AgencyController::class, 'list'])->name('list');
    Route::get('/add', [AgencyController::class, 'new'])->name('add');
    Route::get('/new', [AgencyController::class, 'new'])->name('new');
    Route::post('/insert', [AgencyController::class, 'insert'])->name('insert');
    Route::get('/edit/{id}', [AgencyController::class, 'edit'])->name('edit');
    Route::post('/update', [AgencyController::class, 'update'])->name('update');
    Route::post('/delete', [AgencyController::class, 'delete'])->name('delete');
    Route::post('/changeStatus', [AgencyController::class, 'changeStatus'])->name('changeStatus');
});

// Profile Management
Route::name('profile.')->middleware(['auth'])->prefix('profile')->group(function () {
    Route::get('/', [ProfileController::class, 'get'])->name('get');
    Route::post('/', [ProfileController::class, 'save'])->name('save');
    Route::post('/upload', [ProfileController::class, 'upload'])->name('upload');
    Route::get('/edit', [ProfileController::class, 'edit'])->name('edit');
    Route::post('/update', [ProfileController::class, 'update'])->name('update');
});

// Users Management
Route::get('/users', [UtilisateurController::class, 'listUtilisateurs'])->middleware('auth')->name('list_utilisateurs');
Route::middleware(['auth'])->prefix('users/')->group(function () {
    Route::get('new', [UtilisateurController::class, 'newUtilisateur'])->name('new');
    Route::post('insert', [UtilisateurController::class, 'insertUtilisateur'])->name('insert');
    Route::get('permissions/{id}', [UtilisateurController::class, 'permissions'])->name('permissions');
    Route::post('updatePermissions', [UtilisateurController::class, 'updatePermissions'])->name('updatePermissions');
    Route::post('deleteUtilisateur', [UtilisateurController::class, 'deleteUtilisateur'])->name('deleteUtilisateur');
    Route::get('/edit/{user}', [ProfileController::class, 'editUser'])->name('edit');
    Route::patch('/update/{user}', [ProfileController::class, 'updateUser'])->name('update');
    Route::get('/edit-password/{user}', [ProfileController::class, 'editPassword'])->name('edit.password');
    Route::patch('/update-password/{user}', [ProfileController::class, 'updatePassword'])->name('update.password');
});

// Utilisateur routes (legacy naming used in blade templates)
Route::name('utilisateur.')->middleware(['auth'])->group(function () {
    Route::get('/users/new', [UtilisateurController::class, 'newUtilisateur'])->name('new');
    Route::post('/users/insert', [UtilisateurController::class, 'insertUtilisateur'])->name('insert');
    Route::get('/users/update/{id}', [UtilisateurController::class, 'updateUtilisateur'])->name('update');
    Route::post('/users/save', [UtilisateurController::class, 'saveUtilisateur'])->name('save');
    Route::post('/users/delete', [UtilisateurController::class, 'deleteUtilisateur'])->name('delete');
});

// Settings (Parametrage)
Route::name('parametrage.')->middleware(['auth'])->prefix('settings')->group(function () {
    Route::get('/', [SocieteController::class, 'get'])->name('get');
    Route::post('/', [SocieteController::class, 'save'])->name('save');
    Route::post('/upload', [SocieteController::class, 'upload'])->name('upload');
});

// Admin Email Templates and Settings
Route::middleware(['auth'])->prefix('admin')->name('admin.')->group(function () {
    Route::get('/email-templates', [EmailTemplateController::class, 'index'])->name('email-templates.index');
    Route::get('/email-templates/{template}/edit', [EmailTemplateController::class, 'edit'])->name('email-templates.edit');
    Route::put('/email-templates/{template}', [EmailTemplateController::class, 'update'])->name('email-templates.update');
    Route::get('/email-templates/{template}/preview', [EmailTemplateController::class, 'preview'])->name('email-templates.preview');
    Route::get('/email-templates/{template}/preview-multilingual', [EmailTemplateController::class, 'previewMultilingual'])->name('email-templates.preview-multilingual');
    
    // Email Settings routes
    Route::get('/email-settings', [EmailSettingsController::class, 'index'])->name('email-settings.index');
    Route::post('/email-settings', [EmailSettingsController::class, 'update'])->name('email-settings.update');
    Route::post('/email-settings/test', [EmailSettingsController::class, 'sendTestEmail'])->name('email-settings.test');
    
    // Email History
    Route::get('/email-history', [\App\Http\Controllers\Admin\EmailHistoryController::class, 'index'])->name('email-history');
});