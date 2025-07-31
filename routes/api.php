<?php

use App\Http\Controllers\AgencyController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\CityController;
use App\Http\Controllers\EntereController;
use App\Http\Controllers\ListingController;
use App\Http\Controllers\PageController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\BookingController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::post('bookings-per-month', [BookingController::class, 'bookingsPerMonth'])->middleware('auth:sanctum');
Route::post('get-filters', [BookingController::class, 'getFilters'])->middleware('auth:sanctum');
Route::get('legal_content_api', [EntereController::class, 'legal_content_api']);
Route::get('get_articles_api', [EntereController::class, 'get_articles_api']);
Route::get('get_article_api', [EntereController::class, 'get_article_api']);
Route::get('get_recommended_listings', [ListingController::class, 'get_recommended_listings']);
Route::get('get_dynamic_filter_options', [ListingController::class, 'get_dynamic_filter_options']);
Route::get('get_agency', [AgencyController::class, 'get_agency']);
Route::get('get_cities', [CityController::class, 'get_cities']);
Route::get('get_categories', [CategoryController::class, 'get_categories']);
Route::get('get_search_results', [ListingController::class, 'get_search_results']);
Route::get('get_listing', [ListingController::class, 'get_listing']);
Route::get('related_products', [ListingController::class, 'related_products']);
Route::post('agency_request', [AgencyController::class, 'agency_request']);
Route::post('submit_contact', [EntereController::class, 'submit_contact']);
Route::get('get_free_texts', [PageController::class, 'get_free_texts']);
// Add rate limiting to booking endpoints
Route::middleware(['throttle:60,1'])->group(function () {
    Route::post('bookings/submit', [BookingController::class, 'submitBooking']);
    Route::post('bookings/calculate-price', [BookingController::class, 'calculatePrice']);
});