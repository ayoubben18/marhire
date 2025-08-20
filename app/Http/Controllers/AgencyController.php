<?php

namespace App\Http\Controllers;

use App\Models\Agency;
use App\Models\AgencyFeature;
use App\Models\AgencySubCategory;
use App\Models\Category;
use App\Models\City;
use App\Models\SubCategory;
use App\Services\SEOService;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

class AgencyController extends Controller
{
    public function list(Request $request)
    {
        $layout = 'layouts.dashboard_admin';
        $agencies = Agency::latest()->get();

        return view('agencies.list')->with([
            'layout' => $layout,
            'agencies' => $agencies
        ]);
    }

    public function new(Request $request)
    {
        $layout = 'layouts.dashboard_admin';
        $cities = City::orderBy('city_name')->get();
        $categories = Category::orderBy('category')->get();
        $subCategories = SubCategory::orderBy('subCategory')->get();

        return view('agencies.new')->with([
            'layout' => $layout,
            'cities' => $cities,
            'categories' => $categories,
            'subCategories' => $subCategories
        ]);
    }

    public function insert(Request $request, SEOService $SEOService)
    {
        $request->validate([
            'agency_name' => 'required',
            'id_city' => ['required', Rule::notIn([-1])],
            'category_id' => ['required', Rule::notIn([-1])]
        ]);

        $logo = '';
		$slug = $SEOService->generateSlug('agency', $request->agency_name);
		if($request->hasFile('logo'))
		{
			$logoFileName = 'agency_' . uniqid() . '.' . $request->logo->extension();  
			$destination = $this->getImagesDestination();
     
        	$request->logo->move($destination, $logoFileName);
			
			// Convert to web-accessible path for storage
			$fullPath = $destination . '/' . $logoFileName;
			$logo = $this->convertToWebPath($fullPath);
		}

        $agency = Agency::create([
            'slug' => $slug,
            'agency_name' => $request->agency_name,
            'id_city' => $request->id_city,
            'category_id' => $request->category_id,
            'contact_name' => $request->contact_name,
            'phone_number' => $request->phone_number,
            'ice_number' => $request->ice_number,
            'rc_number' => $request->rc_number,
            'whatsapp' => $request->whatsapp,
            'email' => $request->email,
            'notes' => $request->notes,
            'short_description' => $request->short_description,
            'description' => $request->description,
            'agency_logo' => $logo
        ]);

        if($agency && $request->has('features_icon'))
        {
            foreach ($request->features as $index => $name) {        
                $iconPath = 'feature_' . uniqid() . '.' . $request->file('features_icon')[$index]->extension();  
                $request->file('features_icon')[$index]->move(public_path('images') . '/icons', $iconPath);
                $iconPath = 'images/icons/' . $iconPath;

                AgencyFeature::create([
                    'feature' => $name,
                    'icon' => $iconPath,
                    'agency_id' => $agency->id
                ]);
            }
        }

        if($agency && $request->has('subcategories'))
        {
            foreach ($request->subcategories as $index => $sub) {    
                $subId = $sub ? $sub : -1;    
                $option = $request->options[$index] ? $request->options[$index] : -1;

                AgencySubCategory::create([
                    'subcategory_id' => $subId,
                    'option_id' => $option,
                    'agency_id' => $agency->id
                ]);
            }
        }

        return back()->with('inserted', true);
    }

    public function edit(Request $request, $id)
    {
        $layout = 'layouts.dashboard_admin';
        $agency = Agency::where('id',$id)->first();
        $cities = City::orderBy('city_name')->get();
        $categories = Category::orderBy('category')->get();
        $subCategories = SubCategory::orderBy('subCategory')->get();

        return view('agencies.update')->with([
            'layout' => $layout,
            'agency' => $agency,
            'cities' => $cities,
            'categories' => $categories,
            'subCategories' => $subCategories
        ]);
    }

    public function changeStatus(Request $request)
    {
        $agency = Agency::findOrFail($request->id);

        $agency->update([
            'status' => $request->status
        ]);

        return 'success';
    }

    public function update(Request $request)
    {
        $request->validate([
            'agency_name' => 'required',
            'id_city' => ['required', Rule::notIn([-1])],
            'category_id' => ['required', Rule::notIn([-1])]
        ]);

        $agency = Agency::findOrFail($request->id);
        $logo = $agency->agency_logo;
		
        // Handle logo deletion
        if($request->has('delete_logo') && $request->delete_logo == '1') {
            // Delete the physical file if it exists - check both possible paths
            if($agency->agency_logo) {
                $publicPath = public_path($agency->agency_logo);
                $cPanelPath = str_replace('/public/', '/public_html/', $publicPath);
                
                if (file_exists($publicPath)) {
                    unlink($publicPath);
                } elseif (file_exists($cPanelPath)) {
                    unlink($cPanelPath);
                }
            }
            $logo = null;
        }
        
		if($request->hasFile('logo'))
		{
			// Delete old logo if exists - check both possible paths
			if($agency->agency_logo) {
				$publicPath = public_path($agency->agency_logo);
				$cPanelPath = str_replace('/public/', '/public_html/', $publicPath);
				
				if (file_exists($publicPath)) {
					unlink($publicPath);
				} elseif (file_exists($cPanelPath)) {
					unlink($cPanelPath);
				}
			}
			
			$logoFileName = 'agency_' . uniqid() . '.' . $request->logo->extension();  
			$destination = $this->getImagesDestination();
     
        	$request->logo->move($destination, $logoFileName);
			
			// Convert to web-accessible path for storage
			$fullPath = $destination . '/' . $logoFileName;
			$logo = $this->convertToWebPath($fullPath);
		}

        $agency->update([
            'agency_name' => $request->agency_name,
            'id_city' => $request->id_city,
            'category_id' => $request->category_id,
            'contact_name' => $request->contact_name,
            'phone_number' => $request->phone_number,
            'ice_number' => $request->ice_number,
            'rc_number' => $request->rc_number,
            'whatsapp' => $request->whatsapp,
            'email' => $request->email,
            'notes' => $request->notes,
            'short_description' => $request->short_description,
            'description' => $request->description,
            'agency_logo' => $logo
        ]);

        // if($agency && $request->has('features_icon'))
        // {
        //     foreach ($request->features as $index => $name) {        
        //         $iconPath = 'feature_' . uniqid() . '.' . $request->file('features_icon')[$index]->extension();  
        //         $request->file('features_icon')[$index]->move(public_path('images') . '/icons', $iconPath);
        //         $iconPath = 'images/icons/' . $iconPath;

        //         AgencyFeature::create([
        //             'feature' => $name,
        //             'icon' => $iconPath,
        //             'agency_id' => $agency->id
        //         ]);
        //     }
        // }

        return back()->with('updated', true);
    }

    public function getAgencies(Request $request)
    {
        $query = Agency::orderBy('agency_name');

        if($request->has('category_id'))
        {
            $query->where('category_id', $request->category_id);
        }

        $agencies = $query->get();

        return response()->json(['agencies' => $agencies]);
    }

    //API
    public function get_agency(Request $request){
        $agency = Agency::where('slug', $request->slug)
                        ->with('city')
                        ->with('category')
                        ->firstOrFail();

        return response()->json(['agency' => $agency]);
    }

    /**
     * Get the correct destination path for image uploads
     * Handles both local development and cPanel deployment
     *
     * @return string
     */
    private function getImagesDestination(): string
    {
        // Use environment variable to determine if we're on cPanel
        if (env('CPANEL_ENV', false) === true || env('CPANEL_ENV', false) === 'true') {
            // cPanel: Use public_html/images/agencies for web-accessible storage
            $basePath = base_path();
            $publicHtmlPath = dirname($basePath) . '/public_html/images/agencies';
            
            // Create directory if it doesn't exist
            if (!file_exists($publicHtmlPath)) {
                mkdir($publicHtmlPath, 0755, true);
            }
            
            return $publicHtmlPath;
        }
        
        // Local development or standard deployment: use Laravel's public path
        $publicPath = public_path('images/agencies');
        
        // Create directory if it doesn't exist
        if (!file_exists($publicPath)) {
            mkdir($publicPath, 0755, true);
        }
        
        return $publicPath;
    }

    /**
     * Convert absolute file path to web-accessible relative path
     * Handles both standard Laravel public and cPanel public_html paths
     *
     * @param string $absolutePath
     * @return string
     */
    private function convertToWebPath(string $absolutePath): string
    {
        // Remove various possible base paths to get the web-accessible path
        $webPath = $absolutePath;
        
        // Try removing public_html path (cPanel)
        if (str_contains($webPath, '/public_html/')) {
            $parts = explode('/public_html/', $webPath);
            $webPath = end($parts);
        }
        // Try removing standard Laravel public path
        elseif (str_contains($webPath, '/public/')) {
            $parts = explode('/public/', $webPath);
            $webPath = end($parts);
        }
        // If neither worked, try to extract just the /images/agencies/ part
        elseif (str_contains($webPath, '/images/agencies/')) {
            $parts = explode('/images/agencies/', $webPath);
            $webPath = 'images/agencies/' . end($parts);
        }
        
        // Remove leading slash if present (we want relative path for storage)
        $webPath = ltrim($webPath, '/');
        
        return $webPath;
    }

    public function agency_request(Request $request, SEOService $SEOService)
    {
        $slug = $SEOService->generateSlug('agency', $request->agency_name);
		
        $agency = Agency::create([
            'slug' => $slug,
            'agency_name' => $request->companyName,
            'id_city' => $request->city,
            'category_id' => $request->category,
            'contact_name' => $request->ownerName,
            'phone_number' => $request->phone,
            'ice_number' => $request->iceNumber,
            'rc_number' => $request->rcNumber,
            'whatsapp' => $request->whatsapp,
            'email' => $request->email,
            'notes' => $request->description,
            'status' => 'Need Approval'
        ]);

        return response()->json($request->all());
    }
}
