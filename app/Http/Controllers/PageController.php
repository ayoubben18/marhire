<?php

namespace App\Http\Controllers;

use App\Models\Page;
use App\Services\SEOService;
use Illuminate\Http\Request;
use Spatie\Sitemap\Sitemap;
use Spatie\Sitemap\Tags\Url;
use Auth;
use App\Models\Agency;
use App\Models\City;
use App\Models\Category;
use App\Models\Listing;
use App\Models\Article;

class PageController extends Controller
{
    public function list(Request $request)
    {
        $layout = Auth::user()->isAdmin() ? 'layouts.dashboard_admin' : 'layouts.dashboard';
        $pages = Page::orderByDesc('id')->get();
        return view('pages.list', compact('pages', 'layout'));
    }

    public function new(Request $request)
    {
        $layout = Auth::user()->isAdmin() ? 'layouts.dashboard_admin' : 'layouts.dashboard';
        return view('pages.add', compact('layout'));
    }

    public function insert(Request $request)
    {
        $validated = $request->validate([
            'slug' => 'required|string|unique:pages,slug',
            'meta_title' => 'nullable|string',
            'meta_description' => 'nullable|string',
            'schema_markup' => 'nullable|string',
            'content_sections' => 'nullable|array',
            'content_sections.*.title' => 'required_with:content_sections|string',
            'content_sections.*.text' => 'required_with:content_sections|string',
        ]);

        Page::create($validated);

        return back()->with('inserted', true);
    }

    public function edit(Request $request, $id)
    {
        $layout = Auth::user()->isAdmin() ? 'layouts.dashboard_admin' : 'layouts.dashboard';
        $page = Page::findOrFail($id);
        return view('pages.update', compact('page', 'layout'));
    }

    public function update(Request $request)
    {
        $page = Page::findOrFail($request->id);

        $validated = $request->validate([
            'slug' => 'required|string|unique:pages,slug,' . $page->id,
            'meta_title' => 'nullable|string',
            'meta_description' => 'nullable|string',
            'schema_markup' => 'nullable|string',
            'content_sections' => 'nullable|array',
            'content_sections.*.title' => 'required_with:content_sections|string',
            'content_sections.*.text' => 'required_with:content_sections|string',
        ]);

        $page->update($validated);

        return back()->with('updated', 'success');
    }

    public function delete(Request $request)
    {
        $page = Page::findOrFail($request->id);
        $page->delete();

        return 'success';
    }

    public function get_free_texts(Request $request, SEOService $SEOService)
    {
        $page = $SEOService->getPage($request->slug);
        return response()->json($page);
    }

    public function update_sitemap(Request $request)
    {
        $sitemap = Sitemap::create();
        //static pages
        $sitemap->add(Url::create('/')->setPriority(1));
        $sitemap->add(Url::create('/about-us'));
        $sitemap->add(Url::create('/how-we-work'));
        $sitemap->add(Url::create('/list-your-property'));
        $sitemap->add(Url::create('/faq'));
        $sitemap->add(Url::create('/support'));
        $sitemap->add(Url::create('/blog'));
        $sitemap->add(Url::create('/terms-conditions'));
        $sitemap->add(Url::create('/privacy-policy'));
        $sitemap->add(Url::create('/cookie-policy'));
        $sitemap->add(Url::create('/cancellation-policy'));
        $sitemap->add(Url::create('/insurance-conditions'));
        $sitemap->add(Url::create('/category/car-rental'));
        $sitemap->add(Url::create('/category/private-driver'));
        $sitemap->add(Url::create('/category/boats'));
        $sitemap->add(Url::create('/category/boats'));
        $sitemap->add(Url::create('category/things-to-do'));

        //cities
        $cities = City::all();

        foreach ($cities as $city) {
            $url = Url::create('/city/' . strtolower($city->city_name))
                ->setPriority(0.8);

            if ($city->updated_at) {
                $url->setLastModificationDate($city->updated_at);
            }

            $sitemap->add($url);
        }

        //categories
        $categories = ['car-rental', 'private-driver', 'boats', 'things-to-do'];

        foreach ($categories as $category) {
            $url = Url::create('/category/' . $category)
                ->setPriority(0.8);

            $sitemap->add($url);
        }

        foreach ($categories as $category) {
            foreach ($cities as $city) 
            {
                $url = Url::create('/category/' . $category . '/city/' . strtolower($city->city_name))
                    ->setPriority(0.8);

                $sitemap->add($url);
            }
        }

        //articles
        $articles = Article::all();

        foreach ($articles as $article) {
            $url = Url::create('/article/' . strtolower($article->slug))
                ->setPriority(0.8);

            if ($article->updated_at) {
                $url->setLastModificationDate($article->updated_at);
            }

            $sitemap->add($url);
        }

        //listings
        $listings = Article::all();

        foreach ($listings as $listing) {
            $url = Url::create('/details/' . strtolower($listing->slug))
                ->setPriority(0.8);

            if ($listing->updated_at) {
                $url->setLastModificationDate($listing->updated_at);
            }

            $sitemap->add($url);
        }
        
        //agencies
        $agencies = Agency::where('status', 'Active')->get();

        foreach ($agencies as $agency) {
            $url = Url::create('/agency/' . strtolower($agency->slug))
                ->setPriority(0.8);

            if ($agency->updated_at) {
                $url->setLastModificationDate($agency->updated_at);
            }

            $sitemap->add($url);
        }

        $sitemap->writeToFile(public_path('sitemap.xml'));

        return response()->json(['status' => 'sitemap generated']);
    }
}
