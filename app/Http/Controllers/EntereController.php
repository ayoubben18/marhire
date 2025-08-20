<?php

namespace App\Http\Controllers;

use App\Models\Agency;
use App\Models\Listing;
use App\Models\TermsAndConditions;
use App\Services\SEOService;
use Illuminate\Http\Request;
use App\Models\Article;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Str;
use App\Models\SubCategory;
use App\Models\SubCategoryOption;

class EntereController extends Controller
{
    protected $SEOservice;

    public function __construct(SEOService $SEOService)
    {
        $this->SEOservice = $SEOService;
    }

    public function home(Request $request)
    {
        $page = $this->SEOservice->getPage('/');
        return view('site.home')->with('page', $page);
    }

    public function aboutus(Request $request)
    {
        $page = $this->SEOservice->getPage('about-us');
        return view('site.aboutus')->with('page', $page);
    }

    public function list_property(Request $request)
    {
        $page = $this->SEOservice->getPage('list-your-property');
        return view('site.list_property')->with('page', $page);
    }
    public function support(Request $request)
    {
        $page = $this->SEOservice->getPage('support');
        return view('site.support')->with('page', $page);
    }

    public function how_we_work(Request $request)
    {
        $page = $this->SEOservice->getPage('how-we-work');
        return view('site.how_we_work')->with('page', $page);
    }

    public function faq(Request $request)
    {
        $page = $this->SEOservice->getPage('faq');
        return view('site.faq')->with('page', $page);
    }

    public function category(Request $request, $locale = null, string $slug = null)
    {
        // Handle the case where locale is optional in routes
        // If only one parameter is passed, it's the slug, not locale
        if ($slug === null && $locale !== null) {
            $slug = $locale;
            $locale = app()->getLocale();
        }
        
        $categories = ['car-rental', 'private-driver', 'boats', 'things-to-do'];

        if (!in_array($slug, $categories))
            return abort(404);
        $page = $this->SEOservice->getPage('category/' . $slug);

        return view('site.category')->with([
            'slug' => $slug,
            'page' => $page
        ]);
    }
    public function categoryCity(Request $request, $locale = null, string $slug = null, string $city = null)
    {
        // Handle the case where locale is optional in routes
        // If two parameters are passed, they are slug and city, not locale and slug
        if ($city === null && $slug !== null && $locale !== null) {
            $city = $slug;
            $slug = $locale;
            $locale = app()->getLocale();
        }
        
        $categories = ['car-rental', 'private-driver', 'boats', 'things-to-do'];
        $page = $this->SEOservice->getPage('category/' . $slug . '/$city');

        if (!in_array($slug, $categories))
            return abort(404);

        return view('site.category')->with([
            'slug' => $slug,
            'city' => $city,
            'page' => $page
        ]);
    }

    public function subcategory(Request $request, $locale = null, string $category = null, string $subcategory = null)
    {
        // Handle the case where locale is optional in routes
        // If two parameters are passed, they are category and subcategory, not locale and category
        if ($subcategory === null && $category !== null && $locale !== null) {
            $subcategory = $category;
            $category = $locale;
            $locale = app()->getLocale();
        }
        
        $categories = ['car-rental', 'private-driver', 'boats', 'things-to-do'];

        if (!in_array($category, $categories) || !$this->checkSubCategoryExists($category, $subcategory))
            return abort(404);


        return view('site.subcategory')->with([
            'category' => $category,
            'subcategory' => $subcategory
        ]);
    }

    public function checkSubCategoryExists($category, $subcategory)
    {
        // Define your category ID and subcategory NAME map
        $map = [
            'car-rental' => [
                'id' => 2,
                'subcategories' => ['Car Type', 'Car Model'],
            ],
            'private-driver' => [
                'id' => 3,
                'subcategories' => ['Vehicule Type'],
            ],
            'boats' => [
                'id' => 4,
                'subcategories' => ['Boat Type', 'Purpose'],
            ],
            'things-to-do' => [
                'id' => 5,
                'subcategories' => ['Activity Type'],
            ],
        ];

        if (!isset($map[$category])) {
            return false;
        }

        $categoryId = $map[$category]['id'];
        $subCategoryNames = $map[$category]['subcategories'];

        // Fetch subcategories by name and category ID
        $subCategoryIds = SubCategory::where('id_category', $categoryId)
            ->whereIn('subcategory', $subCategoryNames)
            ->pluck('id');

        if ($subCategoryIds->isEmpty()) {
            return false;
        }

        // Fetch subcategory options and slugify them
        $optionSlugs = SubCategoryOption::whereIn('subcategory_id', $subCategoryIds)
            ->pluck('option')
            ->map(fn($opt) => Str::slug($opt))
            ->toArray();

        // Check if the incoming slug exists
        return in_array(Str::slug($subcategory), $optionSlugs);
    }

    public function city(Request $request, $locale = null, string $city = null)
    {
        // Handle the case where locale is optional in routes
        // If only one parameter is passed, it's the city, not locale
        if ($city === null && $locale !== null) {
            $city = $locale;
            $locale = app()->getLocale();
        }
        
        $page = $this->SEOservice->getPage('city/*');

        return view('site.city')->with('city', ucfirst(strtolower($city)))
            ->with('page', $page);
    }

    public function listing(Request $request, $locale = null, string $slug = null)
    {
        // Handle the case where locale is optional in routes
        // If only one parameter is passed, it's the slug, not locale
        if ($slug === null && $locale !== null) {
            $slug = $locale;
            $locale = app()->getLocale();
        }
        
        // Be resilient in test/empty DB environments: don't 404 if listing is missing
        // Use optimized translation loading - only current locale + English fallback
        $listing = Listing::where('slug', $slug)
            ->withCurrentTranslations()
            ->with(['city', 'provider', 'galleries'])
            ->first();
        $page = $this->SEOservice->getPage($slug, 'listing');
        
        // Generate SEO meta tags with language support
        $seoData = [];
        if ($listing) {
            // Get translated meta data with fallback
            $translatedMeta = $this->SEOservice->getTranslatedMeta($listing, [
                'meta_title', 
                'meta_description',
                'title',
                'description'
            ]);
            
            $seoData = [
                'title' => $translatedMeta['meta_title'] ?? $translatedMeta['title'] ?? $listing->title,
                'description' => $translatedMeta['meta_description'] ?? $translatedMeta['description'] ?? Str::limit($listing->description, 160),
                'keywords' => $listing->meta_keywords ?? '',
                'og_type' => 'product',
                'og_title' => $translatedMeta['meta_title'] ?? $translatedMeta['title'] ?? $listing->title,
                'og_description' => $translatedMeta['meta_description'] ?? $translatedMeta['description'] ?? Str::limit($listing->description, 160),
            ];
            
            // Add image if available
            if ($listing->galleries && count($listing->galleries) > 0) {
                $seoData['og_image'] = asset($listing->galleries[0]->file_path);
                $seoData['twitter_image'] = asset($listing->galleries[0]->file_path);
            }
        }
        
        $metaTags = $this->SEOservice->generateMetaTags($seoData);

        return view('site.listing')
            ->with('slug', $slug)
            ->with('page', $page)
            ->with('listing', $listing)
            ->with('metaTags', $metaTags);
    }

    public function carsearch(Request $request)
    {
        return view('site.search')->with('type', 'car');
    }

    public function privatesearch(Request $request)
    {
        return view('site.search')->with('type', 'private');
    }

    public function boatsearch(Request $request)
    {
        return view('site.search')->with('type', 'boat');
    }

    public function thingstodosearch(Request $request)
    {
        return view('site.search')->with('type', 'activity');
    }

    public function agency(Request $request, $locale = null, string $agency_name = null)
    {
        // Handle the case where locale is optional in routes
        // If only one parameter is passed, it's the agency_name, not locale
        if ($agency_name === null && $locale !== null) {
            $agency_name = $locale;
            $locale = app()->getLocale();
        }
        
        $agency = Agency::where('slug', $agency_name)
            ->where('status', 'Active')
            ->firstOrFail();
        $page = $this->SEOservice->getPage('agency/*');

        return view('site.agency')->with('agency', $agency_name)
            ->with('agency_name', $agency->agency_name)
            ->with('page', $page);
    }

    public function blog(Request $request)
    {
        $page = $this->SEOservice->getPage('blog');

        return view('site.blog')->with('page', $page);
    }

    public function terms(Request $request)
    {
        $page = $this->SEOservice->getPage('terms-conditions');
        return view('site.legal')
            ->with('title', 'Terms & Conditions')
            ->with('type', 'terms')
            ->with('page', $page);
    }

    public function privacy(Request $request)
    {
        $page = $this->SEOservice->getPage('privacy-policy');
        return view('site.legal')
            ->with('title', 'Privacy Policy')
            ->with('type', 'privacy')
            ->with('page', $page);
    }

    public function cookies(Request $request)
    {
        $page = $this->SEOservice->getPage('cookie-policy');
        return view('site.legal')
            ->with('title', 'Cookie Policy')
            ->with('type', 'cookie')
            ->with('page', $page);
    }

    public function cancellation(Request $request)
    {
        $page = $this->SEOservice->getPage('cancellation-policy');
        return view('site.legal')
            ->with('title', 'Cancellation Policy')
            ->with('type', 'cancellation')
            ->with('page', $page);
    }

    public function insurance(Request $request)
    {
        $page = $this->SEOservice->getPage('insurance-conditions');

        return view('site.legal')
            ->with('title', 'Insurance Conditions')
            ->with('type', 'insurance')
            ->with('page', $page);
    }

    public function article(Request $request, $locale = null, string $slug = null)
    {
        // Handle the case where locale is optional in routes
        // If only one parameter is passed, it's the slug, not locale
        if ($slug === null && $locale !== null) {
            $slug = $locale;
            $locale = app()->getLocale();
        }
        
        $article = Article::where('slug', $slug)->firstOrFail();
        $page = $this->SEOservice->getPage($slug, 'article');

        return view('site.article')
            ->with('slug', $slug)
            ->with('title', 'Article')
            ->with('page', $page);
    }

    //API Functions
    public function legal_content_api(Request $request)
    {
        $type = $request->type;
        $legal = TermsAndConditions::where('title', $type)->firstOrFail();

        return response()->json(['content' => $legal->content, 'type' => $type]);
    }

    public function get_articles_api(Request $request)
    {
        $skip = $request->input('skip', 0);
        $take = 6;

        if ($skip == 0) {
            $latest = Article::withCurrentTranslations()->with('category')->orderBy('created_at', 'desc')->first();
            $rest = Article::withCurrentTranslations()->with('category')->orderBy('created_at', 'desc')
                ->skip(1)
                ->take($take)
                ->get();

            // Add translated fields for easy frontend consumption
            $latest['translated_fields'] = $latest ? $latest->getCurrentTranslatedData() : [];
            
            foreach ($rest as $article) {
                $article['translated_fields'] = $article->getCurrentTranslatedData();
            }

            return response()->json([
                'latest' => $latest,
                'articles' => $rest,
            ]);
        } else {
            $rest = Article::withCurrentTranslations()->with('category')->orderBy('created_at', 'desc')
                ->skip($skip)
                ->take($take)
                ->get();

            // Add translated fields for easy frontend consumption
            foreach ($rest as $article) {
                $article['translated_fields'] = $article->getCurrentTranslatedData();
            }

            return response()->json([
                'articles' => $rest,
            ]);
        }
    }

    public function get_article_api(Request $request)
    {
        $article = Article::withCurrentTranslations()->with('category')->where('slug', $request->slug)->first();
        
        if ($article) {
            // Add translated fields for easy frontend consumption
            $article['translated_fields'] = $article->getCurrentTranslatedData();
        }

        return response()->json(['article' => $article]);
    }

    public function submit_contact(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email',
            'phone' => 'nullable|string|max:30',
            'message' => 'required|string',
        ]);

        // Now you have $validated as an array.
        Mail::to('contact@marhire.com')->send(new \App\Mail\SendContactMail($validated));

        return response()->json(['success' => true]);
    }
}
