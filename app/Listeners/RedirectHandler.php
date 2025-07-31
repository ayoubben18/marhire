<?php

namespace App\Listeners;

use App\Events\RedirectToDestination;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Support\Facades\Redirect;

class RedirectHandler
{
    public function handle(RedirectToDestination $event)
    {
        $redirectLink = $event->redirectLink;
        
        abort(redirect($redirectLink));
    }
}
