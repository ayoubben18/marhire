<?php

namespace App\Models;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use Illuminate\Database\Eloquent\SoftDeletes;
use Auth;

class User extends Authenticatable implements MustVerifyEmail
{
    use SoftDeletes, HasApiTokens, HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'nom',
        'prenom',
        'cin',
        'adresse',
        'codepostal',
        'pays',
        'type_compte',
        'email',
        'telephone',
        'telephone2',
        'valide_compte',
        'image',
        'google_id',
        'id_client',
        'password',
        'api_token',
        'secret_key'
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    public function isAdmin()
    {
        if($this->type_compte == 'admin')
        {
            return true;
        }

        return false;
    }

    public function isAgence()
    {
        if($this->type_compte == 'livreur')
        {
            return true;
        }

        return false;
    }

    public function isClient()
    {
        if($this->type_compte == 'client')
        {
            return true;
        }

        return false;
    }

    public function isStaff()
    {
        if($this->type_compte == 'staff')
        {
            return true;
        }

        return false;
    }
    
    public function isActivate()
    {
        return $this->valide_compte;
    }

    public function colis()
    {
        return $this->hasMany(Colis::class, 'id_distributeur');
    }

    public function isLivreur()
    {
        if($this->type_compte == 'livreur')
        {
            return true;
        }

        return false;
    }
    public function isSousLivreur()
    {
        if($this->type_compte == 'sous livreur')
        {
            return true;
        }

        return false;
    }

    public function isAgenceOrSousLivreur()
    {
        if($this->type_compte == 'livreur' || $this->type_compte == 'sous livreur')
        {
            return true;
        }

        return false;
    }
    public function scopeClients($query)
    {
        return $query->where('type_compte', 'client');
    }
    public function scopeMyStaff($query)
    {
        return $query->where('type_compte', 'staff')->where('id_client', Auth::id());
    }

    public function scopeLivreurs($query)
    {
        return $query->where('type_compte', 'livreur');
    }

    public function scopeSousLivreurs($query)
    {
        return $query->where('type_compte', 'sous livreur');
    }

    public function scopeAdmins($query)
    {
        return $query->where('type_compte', 'admin')->where('id', '!=', Auth::id());
    }

    public function scopeActiveClients($query)
    {
        return $query->where('type_compte', 'client')->where('valide_compte', 1);
    }

    public function quartier()
    {
        return $this->belongsTo(Zone::class, 'zone');
    }

    public function region()
    {
        return $this->belongsTo(Region::class, 'zone');
    }

    public function agence()
    {
        return $this->belongsTo(User::class, 'id_agence');
    }

    public function commissions()
    {
        return $this->hasMany(CommissionLivreur::class, 'id_livreur');
    }

    public function hasPermission($permission)
    {
        return $this->$permission == 1;
    }
}
