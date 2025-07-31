<?php

namespace App\Listeners;

use App\Events\UserValidated;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;
use App\Mail\SendValidateMail;

class SendUserValidatedEmail implements ShouldQueue
{
    /**
     * Create the event listener.
     *
     * @return void
     */
    public function __construct()
    {
        //
    }

    /**
     * Handle the event.
     *
     * @param  \App\Events\UserValidated  $event
     * @return void
     */
    public function handle(UserValidated $event)
    {
        $user = $event->user;
        \Mail::to($user->email)
                    ->send(new SendValidateMail($user));
    }
}
