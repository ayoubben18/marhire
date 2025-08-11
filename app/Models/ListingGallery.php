<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class ListingGallery extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'listing_id',
        'file_name',
        'file_path'
    ];

    /**
     * Check if the image is WebP format
     *
     * @return bool
     */
    public function isWebP(): bool
    {
        return str_ends_with($this->file_path, '.webp');
    }

    /**
     * Get the full URL of the image
     *
     * @return string
     */
    public function getFullUrl(): string
    {
        return url($this->file_path);
    }

    /**
     * Get the WebP version path if this is an original format
     * or original path if this is WebP
     *
     * @return string|null
     */
    public function getAlternativeFormatPath(): ?string
    {
        if ($this->isWebP()) {
            // Convert WebP path to original format
            $originalPath = str_replace('.webp', '', $this->file_path);
            $possibleExtensions = ['.jpg', '.jpeg', '.png'];
            
            foreach ($possibleExtensions as $ext) {
                $testPath = $originalPath . $ext;
                if (file_exists(public_path($testPath))) {
                    return $testPath;
                }
            }
        } else {
            // Convert original format to WebP
            $info = pathinfo($this->file_path);
            $webpPath = $info['dirname'] . '/' . $info['filename'] . '.webp';
            
            if (file_exists(public_path($webpPath))) {
                return $webpPath;
            }
        }
        
        return null;
    }

    /**
     * Scope to get only WebP images
     *
     * @param \Illuminate\Database\Eloquent\Builder $query
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopeWebpOnly($query)
    {
        return $query->where('file_path', 'like', '%.webp');
    }

    /**
     * Scope to get only original format images
     *
     * @param \Illuminate\Database\Eloquent\Builder $query
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopeOriginalOnly($query)
    {
        return $query->where('file_path', 'not like', '%.webp');
    }
}
