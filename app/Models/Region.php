<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use DB;

class Region extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'letter',
        'region',
        'villes',
        'remarque'
    ];

    public function undeliveredColis()
    {
        $villesArray = explode(',', $this->villes);

        return Colis::join('detail_livraisons', 'colis.id', 'detail_livraisons.id_colis')
                    ->where('status_colis', 'Reçue')
                    ->where('distribution', 'Non')
                    ->whereIn('zone', $villesArray)
                    ->get()->count();
    }

    public static function getRegionLetter($zoneId)
    {
        $region = Region::whereRaw("FIND_IN_SET(?, villes)", [$zoneId])
        ->first();

        return $region->letter ?? '';
    }

    public static function generateNextLetter()
    {
        // Get the last `letter` in the table
        $lastLetter = DB::table('regions')->orderBy('id', 'desc')->value('letter');

        if (!$lastLetter) {
            return 'A';
        }

        // Extract the letter and the number parts
        preg_match('/^([A-Z]+)(\d*)$/', $lastLetter, $matches);
        $letter = $matches[1];
        $number = isset($matches[2]) && $matches[2] !== '' ? (int)$matches[2] : 0;

        // Check if letter should be incremented or number added
        if ($number > 0) {
            $nextLetter = $letter . ($number + 1);
        } else {
            if ($letter === 'Z') {
                $nextLetter = 'A2';
            } else {
                $nextLetter = ++$letter;
            }
        }

        return $nextLetter;
    }
}
