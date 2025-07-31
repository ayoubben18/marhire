<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Auth;
use File;

class ProfileController extends Controller
{
    public function get(Request $request)
    {
        $profile = Auth::user();

        $layout = 'layouts.dashboard_admin';

        return view('profile.myprofile')->with('profile', $profile)
                                        ->with('layout', $layout);
    }

    public function save(Request $request)
    {
        $validated = $request->validate([
            'nom' => 'required|string',
            'prenom' => 'required|string',
            'telephone' => 'required|numeric',
            'password_confirmation' => 'same:password'
        ]);

        $profile = User::findOrFail(Auth::id());

        $updatedUser = [
            'nom' => $request->nom,
            'prenom' => $request->prenom,
            'telephone' => $request->telephone
        ];

        if(!empty($request->password)){
            $updatedUser['password'] = Hash::make($request->password);
        }
            
        $profile->update($updatedUser);

        return back()->with('updated', true);
    }

    public function upload(Request $request)
	{
		$imageName = null;
		
		if($request->hasFile('image'))
		{
			$imageName = 'user_' . uniqid() . '.' . $request->image->extension();  
     
        	$request->image->move(public_path('images') . '/profiles', $imageName);
			
			$imageName = 'images/profiles/' . $imageName;
		}
		
		$user = User::where('id', Auth::id())->first();
		
		$user->update([
			'image' => $imageName
		]);
		
		return asset($imageName);
	}
}
