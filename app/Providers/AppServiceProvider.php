<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\Schema;
use Illuminate\Auth\Notifications\VerifyEmail;
use Illuminate\Notifications\Messages\MailMessage;
use App\Services\Email\EmailServiceInterface;
use App\Services\Email\EmailService;
use App\Repositories\EmailLogRepository;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        // Bind EmailService interface
        $this->app->bind(EmailServiceInterface::class, EmailService::class);
        
        // Register EmailLogRepository as singleton
        $this->app->singleton(EmailLogRepository::class, function ($app) {
            return new EmailLogRepository();
        });
    }

    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {
        Schema::defaultStringLength(191);
        
        // Only force HTTPS if the request is actually coming through HTTPS
        // This allows the app to work on both HTTP and HTTPS
        if (request()->secure() || request()->server('HTTP_X_FORWARDED_PROTO') == 'https') {
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
