<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\EmailLog;
use Illuminate\Http\Request;

class EmailHistoryController extends Controller
{
    public function index(Request $request)
    {
        $query = EmailLog::with('booking:id')
            ->orderBy('created_at', 'desc');
        
        if ($request->has('status') && $request->status !== 'all') {
            $query->where('status', $request->status);
        }
        
        $emails = $query->paginate(20);
        
        return view('admin.email-history', compact('emails'));
    }
}