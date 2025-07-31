<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use App\Models\User;
use App\Models\Zone;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use Auth;

class UtilisateurController extends Controller
{

    public function listutilisateurs(Request $request)
    {
        $utilisateurs = User::where('email','!=', 'supadmin@gmail.com')->latest()->get();
        
        return view('utilisateurs.list')->with('utilisateurs', $utilisateurs);
    }

    public function connect(Request $request, $id)
    {
        session()->put('connected_user', Auth::id()); 
        
        Auth::loginUsingId($id, true);

        return redirect('/dashboard');
    }

    public function backToAccount(Request $request)
    {
        if(session()->has('connected_user'))
        {
            $idUser =  session()->get('connected_user');
            session()->forget('connected_user');

            Auth::loginUsingId($idUser, true);

            return redirect('/dashboard');
        }

        return abort(404);
    }

    public function newUtilisateur(Request $request)
    {
        return view('utilisateurs.new_compte');
    }

    public function insertUtilisateur(Request $request)
    {
        $validated = $request->validate([
            'nom' => 'required|string',
            'prenom' => 'required|string',
            'email' => 'required|unique:users',
            'telephone' => 'required|numeric',
            'password' => 'required|min:6',
            'password_confirmation' => 'required|same:password|min:6'
        ]);

        if($validated)
        {
            $user = User::create([
                'nom' => $request->nom,
                'prenom' => $request->prenom,
                'email' => $request->email,
                'telephone' => $request->telephone,
                'type_compte' => $request->role,
                'password' => Hash::make($request->password),
                'valide_compte' => 1,
            ]);

            return back()->with('inserted', true);
        }
    }

    public function updateUtilisateur(Request $request, $id)
    {
        $utilisateur = User::find($id);

        if($utilisateur)
        {
            return view('utilisateurs.update')->with('utilisateur', $utilisateur);
        }

        abort(404);
    }

    public function saveUtilisateur(Request $request)
    {
        $validated = $request->validate([
            'nom' => 'required|string',
            'prenom' => 'required|string',
            'telephone' => 'required|numeric',
            'password_confirmation' => 'same:password',
            'email' => ['required', Rule::unique('users', 'email')->ignore($request->id)]
        ]);

        $utilisateur = User::find($request->id);

        if($utilisateur)
        {
            $updatedUser = [
                'nom' => $request->nom,
                'prenom' => $request->prenom,
                'telephone' => $request->telephone,
                'email' => $request->email,
                'valide_compte' => 1,
            ];

            if(!empty($request->password))
            {
                $updatedUser['password'] = Hash::make($request->password);
            }

            $utilisateur->update($updatedUser);

            return back()->with('updated', true);
        }

        abort(404);
    }

    public function deleteUtilisateur(Request $request)
    {
        $utilisateur = User::find($request->id);

        if($utilisateur)
        {
            $utilisateur->delete();

            return 'success';
        }

        return false;
    }
}
