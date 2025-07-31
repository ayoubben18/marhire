<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Notification extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'type',
        'etat_colis',
        'code_colis',
        'message',
        'id_client',
        'id_obj',
        'id_user',
        'seen'
    ];

    public function user()
    {
        return $this->belongsTo(User::class, 'id_user');
    }

    public function colis()
    {
        return $this->belongsTo(Colis::class, 'id_obj');
    }
}
