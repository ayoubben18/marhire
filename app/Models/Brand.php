<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Auth;

class Brand extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'brand',
        'telephone',
        'lien_store',
        'email',
        'logo',
        'id_user',
    ];

    public function scopeMyBrands($query)
    {
        if(Auth::user()->isStaff())
        {
            return $query->where('id_user', Auth::user()->id_client);
        }
        else
        {
            return $query->where('id_user', Auth::id());
        }
    }
}
