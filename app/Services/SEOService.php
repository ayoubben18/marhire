<?php

namespace App\Services;
use App\Models\Article;
use App\Models\Listing;
use App\Models\Page;
use Illuminate\Support\Str;
use App\Models\Agency;

class SEOService
{
    public function generateSlug($postType, $postTitle)
    {
        switch ($postType) {
            case 'agency':
                $slug = Str::slug($postTitle);
                $originalSlug = $slug;
                $i = 1;

                while (
                    Agency::where('slug', $slug)
                        ->exists()
                ) {
                    $slug = $originalSlug . '-' . $i;
                    $i++;
                }
                return $slug;
             case 'listing':
                $slug = Str::slug($postTitle);
                $originalSlug = $slug;
                $i = 1;

                while (
                    Listing::where('slug', $slug)
                        ->exists()
                ) {
                    $slug = $originalSlug . '-' . $i;
                    $i++;
                }
                return $slug;
        }

        return null;
    }

    public function getPage($slug, $type = 'page')
    {
        if($type == 'article')
        {
            $page = Article::where('slug', $slug)->first();
        }
        elseif($type == 'listing')
        {
            $page = Listing::where('slug', $slug)->first();
        }
        else{
            $page = Page::where('slug', $slug)->first();
        }
        

        return $page;
    }
}