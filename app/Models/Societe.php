<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Societe extends Model
{
    use HasFactory;

    protected $fillable = [
        'raison_sociale',
        'logo',
        'email',
        'telephone',
        'ville',
        'addresse',
        'siteweb',
        'instagram',
        'facebook',
        'whatsapp',
        'youtube',
        'twitter',
        'facture_liv_mode',
        'color1',
        'color2',
        'color3'
    ];
}
