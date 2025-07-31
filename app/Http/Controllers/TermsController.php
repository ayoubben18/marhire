<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\TermsAndConditions;
use Auth;

class TermsController extends Controller
{
    public function list(Request $request){
        $layout = Auth::user()->isAdmin() ? 'layouts.dashboard_admin' : 'layouts.dashboard';
        $terms = TermsAndConditions::latest()->get();

        return view('terms.list')->with([
                                          'layout' => $layout, 
                                          'terms' => $terms
                                        ]);
    }

    public function new(Request $request){
        $layout = Auth::user()->isAdmin() ? 'layouts.dashboard_admin' : 'layouts.dashboard';

        return view('terms.add')->with([
                                        'layout' => $layout
                                    ]);
    }

    public function insert(Request $request){
        $validated = $request->validate([
            'title' => 'required'
        ]);

        $term = TermsAndConditions::create([
            'title' => $request->title,
            'content' => $request->content
        ]);

        return back()->with('inserted', true);
    }

    public function edit(Request $request, $id){
        $layout = Auth::user()->isAdmin()?'layouts.dashboard_admin':'layouts.dashboard';
        $term = TermsAndConditions::where('id', $id)->first();

        if($term)
        {
            return view('terms.update')->with([
                                                'layout' => $layout,
                                                'term' => $term
                                            ]);
        }

        abort(404);
    }

    public function update(Request $request){
        $validated = $request->validate([
            'title' => 'required'
        ]);

        $term = TermsAndConditions::findOrFail($request->id);

        $term->update([
            'title' => $request->title,
            'content' => $request->content
        ]);

        return back()->with('updated', true);
    }

    public function delete(Request $request){
        $term = TermsAndConditions::findOrFail($request->id);

        $term->delete();
        return 'success';
    }
}
