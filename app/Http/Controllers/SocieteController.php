<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Config;
use App\Models\Societe;
use App\Services\ImageProcessingService;

class SocieteController extends Controller
{
    public function get(Request $request)
    {
        $societe = Societe::first();
        return view('configuration.get')->with('societe', $societe);
    }

    public function save(Request $request, ImageProcessingService $imageProcessingService)
    {
        $validated = $request->validate([
            'raison_sociale' => 'required|string',
            'email' => 'required|email',
            'telephone' => 'required|numeric',
        ]);

        $societe = Societe::first();
		$updatedData =  [
            'raison_sociale' => $request->raison_sociale,
            'email' => $request->email,
            'addresse' => $request->addresse,
            'telephone' => $request->telephone,
            'ville' => 'casablanca',
            'siteweb' => $request->siteweb,
            'instagram' => $request->instagram,
            'facebook' => $request->facebook,
            'whatsapp' => $request->whatsapp,
            'youtube' => $request->youtube,
            'twitter' => $request->twitter,
            'color1' => $request->color1,
            'color2' => $request->color2,
            'color3' => $request->color3
        ];
        
		if($request->hasFile('image'))
		{
            // Use ImageProcessingService for robust image handling
            $destination = public_path('images');
            $baseFileName = 'logo_' . time(); // Add timestamp to avoid conflicts
            
            $processedImage = $imageProcessingService->processImage($request->file('image'), $destination, $baseFileName);
            
            if ($processedImage) {
                $updatedData['logo'] = $processedImage['original_path'];
            } else {
                return back()->withErrors(['image' => 'Failed to process logo image. Please check file format and size.']);
            }
		}

        if($societe)
        {
            $societe->update($updatedData);
        }
        else
        {
            Societe::create($updatedData);
        }

        return back()->with('inserted', true);
    }

    public function upload(Request $request, ImageProcessingService $imageProcessingService)
	{
		if($request->hasFile('image'))
		{
            // Use ImageProcessingService for robust image handling
            $destination = public_path('images');
            $baseFileName = 'logo_' . time(); // Add timestamp to avoid conflicts
            
            $processedImage = $imageProcessingService->processImage($request->file('image'), $destination, $baseFileName);
            
            if ($processedImage) {
                $imagePath = $processedImage['original_path'];
                
                $soc = Societe::first();
                $soc->update([
                    'logo' => $imagePath
                ]);
                
                return asset($imagePath);
            } else {
                return response()->json(['error' => 'Failed to process logo image. Please check file format and size.'], 400);
            }
		}
		
		return response()->json(['error' => 'No image file provided.'], 400);
	}
}
