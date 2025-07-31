<?php

namespace App\Http\Controllers;

use App\Models\Article;
use App\Models\TermsAndConditions;
use Auth;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class ArticleController extends Controller
{
    public function list(Request $request)
    {
        $layout = Auth::user()->isAdmin() ? 'layouts.dashboard_admin' : 'layouts.dashboard';
        $articles = Article::latest()->get();

        return view('articles.list')->with([
            'layout' => $layout,
            'articles' => $articles
        ]);
    }

    public function new(Request $request)
    {
        $layout = Auth::user()->isAdmin() ? 'layouts.dashboard_admin' : 'layouts.dashboard';

        return view('articles.add')->with([
            'layout' => $layout
        ]);
    }

    public function insert(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required'
        ]);
        $slug = $this->generateUniqueSlug($request->title);

        $logo = '';

        if ($request->hasFile('featured_img')) {
            $logo = 'article_' . uniqid() . '.' . $request->featured_img->extension();

            $request->featured_img->move(public_path('images') . '/articles', $logo);

            $logo = 'images/articles/' . $logo;
        }

        $article = Article::create([
            'title' => $request->title,
            'short_description' => $request->short_description,
            'content' => $request->content,
            'slug' => $slug,
            'featured_img' => $logo,
            'meta_title' => $request->meta_title,
            'meta_description' => $request->meta_description,
            'schema' => $request->schema,
            'user_id' => Auth::id()
        ]);

        return back()->with('inserted', true);
    }

    public static function generateUniqueSlug($title)
    {
        $slug = Str::slug($title);
        $originalSlug = $slug;
        $i = 1;

        while (
            Article::where('slug', $slug)
                ->exists()
        ) {
            $slug = $originalSlug . '-' . $i;
            $i++;
        }
        return $slug;
    }

    public function edit(Request $request, $id)
    {
        $layout = Auth::user()->isAdmin() ? 'layouts.dashboard_admin' : 'layouts.dashboard';
        $article = Article::findOrFail($id);

        return view('articles.update')->with([
            'layout' => $layout,
            'article' => $article
        ]);
    }

    public function update(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required'
        ]);

        $article = Article::findOrFail($request->id);

        $logo = $article->featured_img;

        if ($request->hasFile('featured_img')) {
            $logo = 'article_' . uniqid() . '.' . $request->featured_img->extension();

            $request->featured_img->move(public_path('images') . '/articles', $logo);

            $logo = 'images/articles/' . $logo;
        }

        $article->update([
            'title' => $request->title,
            'short_description' => $request->short_description,
            'content' => $request->content,
            'featured_img' => $logo,
            'meta_title' => $request->meta_title,
            'meta_description' => $request->meta_description,
            'schema' => $request->schema,
        ]);

        return back()->with('updated', true);
    }

    public function delete(Request $request)
    {
        $article = Article::findOrFail($request->id);

        $article->delete();
        return 'success';
    }
}
