<?php

namespace App\Services;

use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Log;

class ImageProcessingService
{
    private const RECOMMENDED_WIDTH = 1000;
    private const RECOMMENDED_HEIGHT = 750;
    private const MAX_FILE_SIZE = 2 * 1024 * 1024; // 2MB in bytes (PHP limit)
    
    /**
     * Process uploaded images - convert to WebP and resize
     *
     * @param UploadedFile $file
     * @param string $destination
     * @param string $baseFileName
     * @return array|null Returns array with file info or null on failure
     */
    public function processImage(UploadedFile $file, string $destination, string $baseFileName): ?array
    {
        try {
            // Validate file
            if (!$this->validateImage($file)) {
                return null;
            }

            // Ensure destination directory exists
            if (!file_exists($destination)) {
                mkdir($destination, 0755, true);
            }

            // Get original file info
            $originalExtension = strtolower($file->getClientOriginalExtension());
            $originalFileName = $baseFileName . '.' . $originalExtension;
            $webpFileName = $baseFileName . '.webp';
            
            $originalPath = $destination . '/' . $originalFileName;
            $webpPath = $destination . '/' . $webpFileName;

            // Create image resource from uploaded file
            $imageResource = $this->createImageResource($file->getPathname(), $originalExtension);
            if (!$imageResource) {
                Log::warning('Failed to create image resource', ['file' => $file->getClientOriginalName()]);
                return null;
            }

            // Get original dimensions
            $originalWidth = imagesx($imageResource);
            $originalHeight = imagesy($imageResource);

            // Calculate new dimensions while preserving aspect ratio
            $dimensions = $this->calculateResizeDimensions($originalWidth, $originalHeight);

            // Create resized image
            $resizedImage = imagecreatetruecolor($dimensions['width'], $dimensions['height']);
            
            // Preserve transparency for PNG
            if ($originalExtension === 'png') {
                imagealphablending($resizedImage, false);
                imagesavealpha($resizedImage, true);
                $transparent = imagecolorallocatealpha($resizedImage, 255, 255, 255, 127);
                imagefill($resizedImage, 0, 0, $transparent);
            }

            // Resize the image
            imagecopyresampled(
                $resizedImage, $imageResource,
                0, 0, 0, 0,
                $dimensions['width'], $dimensions['height'],
                $originalWidth, $originalHeight
            );

            // Save original format (resized)
            $originalSaved = $this->saveImage($resizedImage, $originalPath, $originalExtension);
            
            // Save WebP version
            $webpSaved = imagewebp($resizedImage, $webpPath, 85); // 85% quality

            // Clean up memory
            imagedestroy($imageResource);
            imagedestroy($resizedImage);

            if (!$originalSaved || !$webpSaved) {
                Log::warning('Failed to save processed images', [
                    'original_saved' => $originalSaved,
                    'webp_saved' => $webpSaved,
                    'file' => $file->getClientOriginalName()
                ]);
                return null;
            }

            // Return file information with proper path formatting
            // Handle both standard public path and cPanel public_html path
            $originalRelativePath = $this->convertToWebPath($originalPath);
            $webpRelativePath = $this->convertToWebPath($webpPath);
            
            return [
                'original_path' => $originalRelativePath,
                'webp_path' => $webpRelativePath,
                'original_name' => $originalFileName,
                'webp_name' => $webpFileName,
                'width' => $dimensions['width'],
                'height' => $dimensions['height'],
                'original_size' => $file->getSize(),
                'processed_at' => now()
            ];

        } catch (\Exception $e) {
            Log::error('Image processing failed', [
                'error' => $e->getMessage(),
                'file' => $file->getClientOriginalName()
            ]);
            return null;
        }
    }

    /**
     * Validate uploaded image file
     *
     * @param UploadedFile $file
     * @return bool
     */
    private function validateImage(UploadedFile $file): bool
    {
        // Check if file is valid
        if (!$file->isValid()) {
            return false;
        }

        // Check file size (2MB max - PHP limit)
        if ($file->getSize() > self::MAX_FILE_SIZE) {
            Log::warning('File size exceeds limit', [
                'file_size' => $file->getSize(),
                'max_size' => self::MAX_FILE_SIZE,
                'file' => $file->getClientOriginalName()
            ]);
            return false;
        }

        // Check file extension
        $allowedExtensions = ['jpg', 'jpeg', 'png'];
        $extension = strtolower($file->getClientOriginalExtension());
        if (!in_array($extension, $allowedExtensions)) {
            Log::warning('Invalid file extension', [
                'extension' => $extension,
                'allowed' => $allowedExtensions,
                'file' => $file->getClientOriginalName()
            ]);
            return false;
        }

        // Check MIME type
        $allowedMimes = ['image/jpeg', 'image/jpg', 'image/png'];
        if (!in_array($file->getMimeType(), $allowedMimes)) {
            Log::warning('Invalid MIME type', [
                'mime_type' => $file->getMimeType(),
                'allowed' => $allowedMimes,
                'file' => $file->getClientOriginalName()
            ]);
            return false;
        }

        return true;
    }

    /**
     * Create image resource from file
     *
     * @param string $filePath
     * @param string $extension
     * @return resource|false
     */
    private function createImageResource(string $filePath, string $extension)
    {
        switch ($extension) {
            case 'jpg':
            case 'jpeg':
                return imagecreatefromjpeg($filePath);
            case 'png':
                return imagecreatefrompng($filePath);
            default:
                return false;
        }
    }

    /**
     * Save image in specified format
     *
     * @param resource $imageResource
     * @param string $filePath
     * @param string $format
     * @return bool
     */
    private function saveImage($imageResource, string $filePath, string $format): bool
    {
        switch ($format) {
            case 'jpg':
            case 'jpeg':
                return imagejpeg($imageResource, $filePath, 90); // 90% quality
            case 'png':
                return imagepng($imageResource, $filePath, 2); // Compression level 2 (0-9)
            default:
                return false;
        }
    }

    /**
     * Calculate resize dimensions while preserving aspect ratio
     *
     * @param int $originalWidth
     * @param int $originalHeight
     * @return array
     */
    private function calculateResizeDimensions(int $originalWidth, int $originalHeight): array
    {
        $targetWidth = self::RECOMMENDED_WIDTH;
        $targetHeight = self::RECOMMENDED_HEIGHT;

        // If image is already smaller than target, don't upscale
        if ($originalWidth <= $targetWidth && $originalHeight <= $targetHeight) {
            return [
                'width' => $originalWidth,
                'height' => $originalHeight
            ];
        }

        // Calculate aspect ratios
        $originalRatio = $originalWidth / $originalHeight;
        $targetRatio = $targetWidth / $targetHeight;

        // Determine new dimensions based on which dimension should be constrained
        if ($originalRatio > $targetRatio) {
            // Image is wider than target ratio, constrain by width
            $newWidth = $targetWidth;
            $newHeight = (int) round($targetWidth / $originalRatio);
        } else {
            // Image is taller than target ratio, constrain by height
            $newHeight = $targetHeight;
            $newWidth = (int) round($targetHeight * $originalRatio);
        }

        return [
            'width' => $newWidth,
            'height' => $newHeight
        ];
    }

    /**
     * Get validation rules for image uploads
     *
     * @return array
     */
    public function getValidationRules(): array
    {
        $maxSizeMB = self::MAX_FILE_SIZE / (1024 * 1024);
        
        return [
            'images.*' => [
                'image',
                'mimes:jpeg,jpg,png',
                'max:' . (self::MAX_FILE_SIZE / 1024), // Laravel expects size in KB
                'dimensions:min_width=100,min_height=100' // Minimum dimensions to ensure quality
            ]
        ];
    }

    /**
     * Get validation messages for image uploads
     *
     * @return array
     */
    public function getValidationMessages(): array
    {
        $maxSizeMB = self::MAX_FILE_SIZE / (1024 * 1024);
        
        return [
            'images.required' => 'Please select at least one image to upload.',
            'images.array' => 'Images must be uploaded as an array.',
            'images.*.image' => 'File :position is not a valid image file.',
            'images.*.mimes' => 'Image :position must be a JPEG, JPG, or PNG file.',
            'images.*.max' => "Image :position exceeds the maximum size of {$maxSizeMB}MB.",
            'images.*.dimensions' => 'Image :position must be at least 100x100 pixels.',
            'images.*.uploaded' => "Image :position failed to upload. Please check file size (max {$maxSizeMB}MB) and format (JPG/PNG only)."
        ];
    }

    /**
     * Get file size limit in MB for display
     *
     * @return int
     */
    public function getMaxFileSizeMB(): int
    {
        return self::MAX_FILE_SIZE / (1024 * 1024);
    }

    /**
     * Get recommended dimensions
     *
     * @return array
     */
    public function getRecommendedDimensions(): array
    {
        return [
            'width' => self::RECOMMENDED_WIDTH,
            'height' => self::RECOMMENDED_HEIGHT
        ];
    }

    /**
     * Convert absolute file path to web-accessible relative path
     * Handles both standard Laravel public and cPanel public_html paths
     *
     * @param string $absolutePath
     * @return string
     */
    private function convertToWebPath(string $absolutePath): string
    {
        // Remove various possible base paths to get the web-accessible path
        $webPath = $absolutePath;
        
        // Try removing public_html path (cPanel)
        if (str_contains($webPath, '/public_html/')) {
            $parts = explode('/public_html/', $webPath);
            $webPath = '/' . end($parts);
        }
        // Try removing standard Laravel public path
        elseif (str_contains($webPath, '/public/')) {
            $parts = explode('/public/', $webPath);
            $webPath = '/' . end($parts);
        }
        // If neither worked, try to extract just the /images/listings/ part
        elseif (str_contains($webPath, '/images/listings/')) {
            $parts = explode('/images/listings/', $webPath);
            $webPath = '/images/listings/' . end($parts);
        }
        
        // Ensure path starts with /
        if (!str_starts_with($webPath, '/')) {
            $webPath = '/' . ltrim($webPath, '/');
        }
        
        return $webPath;
    }
}