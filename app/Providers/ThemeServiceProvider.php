<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\Config;
use App\Models\Societe;

class ThemeServiceProvider extends ServiceProvider
{
    /**
     * Bootstrap services.
     *
     * @return void
     */
    public function boot()
    {
        $societe = Societe::first();

        if($societe)
        {
            Config::set([
                'business_name' => $societe->raison_sociale,
                'logo' => $societe->logo,
                'email' => $societe->email,
                'telephone' => $societe->telephone,
                'ville' => $societe->ville,
                'addresse' => $societe->addresse,
                'siteweb' => $societe->siteweb,
                'instagram' => $societe->instagram,
                'facebook' => $societe->facebook,
                'whatsapp' => $societe->whatsapp,
                'youtube' => $societe->youtube,
                'twitter' => $societe->twitter,
                'color1' => $societe->color1,
                'color2' => $societe->color2,
                'color3' => $societe->color3
            ]);
        }
    }
}
