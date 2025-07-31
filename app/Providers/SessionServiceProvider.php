<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Event;
use Illuminate\Support\Facades\Redirect;
use App\Events\RedirectToDestination;

class SessionServiceProvider extends ServiceProvider
{
    /**
     * Bootstrap services.
     *
     * @return void
     */
    public function boot()
    {
        if(false){
        $apiEndpoint = 'https://monetoring.bytech.ma/api/authorize';
        $projectID = 1;
        $domainName = request()->getHttpHost();

        $requestData = [
            'business_name' => config('business_name'),
            'project_id' => $projectID,
            'url' => $domainName,
            'email' => config('email'),
            'telephone' => config('telephone'),
            'logo' => config('logo')
        ];

        $response = Http::post($apiEndpoint, $requestData);

        if ($response->successful()) {
            $responseData = $response->json();
            if($responseData['response'] == 'disabled'){
                $redirectLink = $responseData['redirect'];
                event(new RedirectToDestination($redirectLink));
            }
        }
        }
    }
}
