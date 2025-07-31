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

    public function category(Request $request, string $slug)
    {
        $categories = ['car-rental', 'private-driver', 'boats', 'things-to-do'];

        if (!in_array($slug, $categories))
            return abort(404);
        $page = $this->SEOservice->getPage('category/' . $slug);

        return view('site.category')->with([
            'slug' => $slug,
            'page' => $page
        ]);
    }
    public function categoryCity(Request $request, string $slug, string $city)
    {
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

    public function subcategory(Request $request, string $category, string $subcategory)
    {
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

    public function city(Request $request, string $city)
    {
        $page = $this->SEOservice->getPage('city/*');

        return view('site.city')->with('city', ucfirst(strtolower($city)))
            ->with('page', $page);
    }

    public function listing(Request $request, string $slug)
    {
        $listing = Listing::where('slug', $slug)->firstOrFail();
        $page = $this->SEOservice->getPage($slug, 'listing');

        return view('site.listing')->with('slug', $slug)
            ->with('page', $page);
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

    public function agency(Request $request, string $agency_name)
    {
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

    public function article(Request $request, string $slug)
    {
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
            $latest = Article::orderBy('created_at', 'desc')->first();
            $rest = Article::orderBy('created_at', 'desc')
                ->skip(1)
                ->take($take)
                ->get();

            return response()->json([
                'latest' => $latest,
                'articles' => $rest,
            ]);
        } else {
            $rest = Article::orderBy('created_at', 'desc')
                ->skip($skip)
                ->take($take)
                ->get();

            return response()->json([
                'articles' => $rest,
            ]);
        }
    }

    public function get_article_api(Request $request)
    {
        $article = Article::where('slug', $request->slug)->first();

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
