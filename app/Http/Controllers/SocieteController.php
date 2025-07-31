<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Config;
use App\Models\Societe;

class SocieteController extends Controller
{
    public function get(Request $request)
    {
        $societe = Societe::first();
        return view('configuration.get')->with('societe', $societe);
    }

    public function save(Request $request)
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
        $imageName = null;
        
		if($request->hasFile('image'))
		{
			$imageName = 'logo.' . $request->image->extension();  
     
        	$request->image->move(public_path('images'), $imageName);
			
			$imageName = "images/" . $imageName;
            $updatedData['logo'] = $imageName;
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

    public function upload(Request $request)
	{
		$imageName = null;
		
        
		if($request->hasFile('image'))
		{
			$imageName = 'logo.' . $request->image->extension();  
     
        	$request->image->move(public_path('images'), $imageName);
			
			$imageName = 'images/' . $imageName;
		}
		
		$soc = Societe::first();
		
		$soc->update([
			'logo' => $imageName
		]);
		
		return asset($imageName);
	}
}
