<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\Schema;
use Illuminate\Auth\Notifications\VerifyEmail;
use Illuminate\Notifications\Messages\MailMessage;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        // 
    }

    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {
        Schema::defaultStringLength(191);
        if($this->app->environment('production')) {
            \URL::forceScheme('https');
        }

        // VerifyEmail::toMailUsing(function (object $notifiable, string $url) {
        //     return (new MailMessage)
        //         ->greeting('Salut ' . $notifiable->prenom . " ,")
        //         ->subject(env('APP_DOMAIN_NAME','') . ': Vérification de l\'adresse e-mail')
        //         ->line('Pour continuer la création de votre compte ' . env('APP_DOMAIN_NAME','') . ', veuillez vérifier votre adresse e-mail ci-dessous.')
        //         ->action('Vérifier mon adresse e-mail', $url);
        // });
    }
}
