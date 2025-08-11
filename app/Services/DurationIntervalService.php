<?php

namespace App\Services;

class DurationIntervalService
{
    /**
     * Generate boat duration options in 30-minute intervals
     * From 0.5 hours to 8 hours by default
     * 
     * @param float $minDuration
     * @param float $maxDuration
     * @param float $interval
     * @return array
     */
    public function generateBoatDurationOptions(
        float $minDuration = 0.5, 
        float $maxDuration = 8.0, 
        float $interval = 0.5
    ): array {
        $options = [];
        
        for ($duration = $minDuration; $duration <= $maxDuration; $duration += $interval) {
            $options[] = [
                'value' => $duration,
                'label' => $this->formatDurationLabel($duration),
                'display' => $this->formatDurationDisplay($duration)
            ];
        }
        
        return $options;
    }

    /**
     * Generate activity duration options
     * More flexible intervals for activities (can be longer)
     * 
     * @param array $customDurations
     * @return array
     */
    public function generateActivityDurationOptions(array $customDurations = []): array
    {
        // Default activity durations
        $defaultDurations = [
            1, 1.5, 2, 2.5, 3, 4, 5, 6, 8, 12, 24, 48
        ];
        
        $durations = !empty($customDurations) ? $customDurations : $defaultDurations;
        $options = [];
        
        foreach ($durations as $duration) {
            $duration = (float) $duration;
            $options[] = [
                'value' => $duration,
                'label' => $this->formatDurationLabel($duration),
                'display' => $this->formatDurationDisplay($duration)
            ];
        }
        
        // Sort by duration value
        usort($options, function($a, $b) {
            return $a['value'] <=> $b['value'];
        });
        
        return $options;
    }

    /**
     * Validate if a duration is a valid interval
     * For boats: must be 30-minute intervals
     * For activities: more flexible
     * 
     * @param float $duration
     * @param string $category
     * @return bool
     */
    public function validateDurationInterval(float $duration, string $category = 'boat'): bool
    {
        // Check basic range
        if ($duration <= 0) {
            return false;
        }
        
        switch ($category) {
            case 'boat':
                // Must be 30-minute intervals (0.5, 1.0, 1.5, etc.)
                return fmod($duration, 0.5) === 0.0 && $duration >= 0.5 && $duration <= 24;
                
            case 'activity':
                // More flexible for activities
                return $duration >= 0.5 && $duration <= 168; // Up to 1 week
                
            default:
                return $duration >= 0.5 && $duration <= 24;
        }
    }

    /**
     * Format duration as human-readable label
     * Examples: "30 min", "1 hour", "2.5 hours"
     * 
     * @param float $duration Duration in hours
     * @return string
     */
    public function formatDurationLabel(float $duration): string
    {
        if ($duration < 1) {
            $minutes = $duration * 60;
            return $minutes . ' min';
        }
        
        if ($duration == 1) {
            return '1 hour';
        }
        
        // Handle decimal hours
        if (fmod($duration, 1) === 0.5) {
            $hours = floor($duration);
            return $hours . '.5 hours';
        }
        
        if (fmod($duration, 1) === 0.0) {
            return (int) $duration . ' hours';
        }
        
        // For other decimals, show as decimal
        return number_format($duration, 1) . ' hours';
    }

    /**
     * Format duration for display in forms/UI
     * More compact format
     * 
     * @param float $duration
     * @return string
     */
    public function formatDurationDisplay(float $duration): string
    {
        if ($duration < 1) {
            return (int)($duration * 60) . 'm';
        }
        
        if (fmod($duration, 1) === 0.0) {
            return (int) $duration . 'h';
        }
        
        return number_format($duration, 1) . 'h';
    }

    /**
     * Parse duration string back to float
     * Handles formats like "2.5 hours", "90 min", "2h", "30m"
     * 
     * @param string $durationString
     * @return float|null
     */
    public function parseDurationString(string $durationString): ?float
    {
        $durationString = trim($durationString);
        
        // Handle "X min" or "X minutes"
        if (preg_match('/^(\d+(?:\.\d+)?)\s*(?:min|minutes?)$/i', $durationString, $matches)) {
            return (float) $matches[1] / 60; // Convert minutes to hours
        }
        
        // Handle "X hour" or "X hours"
        if (preg_match('/^(\d+(?:\.\d+)?)\s*(?:hour|hours?)$/i', $durationString, $matches)) {
            return (float) $matches[1];
        }
        
        // Handle "Xh" format
        if (preg_match('/^(\d+(?:\.\d+)?)h$/i', $durationString, $matches)) {
            return (float) $matches[1];
        }
        
        // Handle "Xm" format
        if (preg_match('/^(\d+)m$/i', $durationString, $matches)) {
            return (float) $matches[1] / 60;
        }
        
        // Handle pure numbers (assume hours)
        if (is_numeric($durationString)) {
            return (float) $durationString;
        }
        
        return null;
    }

    /**
     * Convert duration array to comma-separated string (for database storage)
     * 
     * @param array $durations
     * @return string
     */
    public function durationsToString(array $durations): string
    {
        $filtered = array_filter($durations, function($duration) {
            return is_numeric($duration) && $duration > 0;
        });
        
        return implode(',', $filtered);
    }

    /**
     * Convert comma-separated duration string to array
     * 
     * @param string $durationsString
     * @return array
     */
    public function stringToDurations(string $durationsString): array
    {
        if (empty($durationsString)) {
            return [];
        }
        
        $durations = explode(',', $durationsString);
        $result = [];
        
        foreach ($durations as $duration) {
            $duration = trim($duration);
            if (is_numeric($duration) && (float) $duration > 0) {
                $result[] = (float) $duration;
            }
        }
        
        // Sort durations
        sort($result);
        
        return $result;
    }

    /**
     * Get predefined duration sets for different categories
     * 
     * @param string $category
     * @param string $type
     * @return array
     */
    public function getPredefinedDurations(string $category, string $type = 'default'): array
    {
        switch ($category) {
            case 'boat':
                switch ($type) {
                    case 'short':
                        return $this->generateBoatDurationOptions(0.5, 4);
                    case 'long':
                        return $this->generateBoatDurationOptions(0.5, 12);
                    default:
                        return $this->generateBoatDurationOptions();
                }
                
            case 'activity':
                switch ($type) {
                    case 'tours':
                        return $this->generateActivityDurationOptions([2, 3, 4, 6, 8]);
                    case 'experiences':
                        return $this->generateActivityDurationOptions([1, 1.5, 2, 3, 4]);
                    case 'multi_day':
                        return $this->generateActivityDurationOptions([24, 48, 72, 96, 120]);
                    default:
                        return $this->generateActivityDurationOptions();
                }
                
            default:
                return [];
        }
    }

    /**
     * Suggest optimal duration intervals based on pricing strategy
     * 
     * @param array $existingPrices Price array with keys like 'price_per_hour', 'price_per_half_day', etc.
     * @return array
     */
    public function suggestDurationIntervals(array $existingPrices = []): array
    {
        $suggestions = [];
        
        if (!empty($existingPrices['price_per_hour'])) {
            $suggestions = array_merge($suggestions, [0.5, 1, 1.5, 2, 3, 4]);
        }
        
        if (!empty($existingPrices['price_per_half_day'])) {
            $suggestions = array_merge($suggestions, [4, 5, 6]);
        }
        
        if (!empty($existingPrices['price_per_day'])) {
            $suggestions = array_merge($suggestions, [8, 10, 12]);
        }
        
        // Remove duplicates and sort
        $suggestions = array_unique($suggestions);
        sort($suggestions);
        
        return array_map(function($duration) {
            return [
                'value' => $duration,
                'label' => $this->formatDurationLabel($duration),
                'display' => $this->formatDurationDisplay($duration)
            ];
        }, $suggestions);
    }

    /**
     * Calculate price for a specific duration based on base rates
     * 
     * @param float $duration
     * @param array $baseRates
     * @return float|null
     */
    public function calculatePriceForDuration(float $duration, array $baseRates): ?float
    {
        // Priority order for rate selection
        $rateKeys = [
            'price_per_hour',
            'price_per_half_day', 
            'price_per_day',
            'price_per_week',
            'price_per_month'
        ];
        
        foreach ($rateKeys as $rateKey) {
            if (!empty($baseRates[$rateKey])) {
                $baseRate = (float) $baseRates[$rateKey];
                
                switch ($rateKey) {
                    case 'price_per_hour':
                        return $baseRate * $duration;
                        
                    case 'price_per_half_day':
                        if ($duration <= 4) {
                            return $baseRate * ($duration / 4);
                        }
                        break;
                        
                    case 'price_per_day':
                        if ($duration <= 8) {
                            return $baseRate * ($duration / 8);
                        }
                        break;
                }
            }
        }
        
        return null;
    }
}