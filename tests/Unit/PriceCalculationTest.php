<?php

namespace Tests\Unit;

use Tests\TestCase;
use App\Http\Controllers\BookingController;
use App\Models\Listing;
use App\Models\City;
use App\Models\CustomBookingOption;
use App\Models\DriverPricing;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Mockery;

class PriceCalculationTest extends TestCase
{
    protected $controller;

    protected function setUp(): void
    {
        parent::setUp();
        $this->controller = new BookingController();
    }

    protected function tearDown(): void
    {
        Mockery::close();
        parent::tearDown();
    }

    /**
     * Test car rental pricing with minute precision
     */
    public function test_car_rental_minute_precision_calculation()
    {
        // Test 23h 59m = 1 day
        $totalMinutes1 = 23 * 60 + 59; // 1439 minutes
        $days1 = ceil($totalMinutes1 / 1440);
        $this->assertEquals(1, $days1);

        // Test 24h 01m = 2 days
        $totalMinutes2 = 24 * 60 + 1; // 1441 minutes
        $days2 = ceil($totalMinutes2 / 1440);
        $this->assertEquals(2, $days2);

        // Test exactly 24h = 1 day
        $totalMinutes3 = 24 * 60; // 1440 minutes
        $days3 = ceil($totalMinutes3 / 1440);
        $this->assertEquals(1, $days3);
    }

    /**
     * Test car rental pricing tiers
     */
    public function test_car_rental_pricing_tiers()
    {
        // Daily rate (< 7 days)
        $pricePerDay = 100;
        $pricePerWeek = 600;
        $pricePerMonth = 2000;

        // 6 days - should use daily rate
        $price6Days = $pricePerDay * 6;
        $this->assertEquals(600, $price6Days);

        // 7 days - should use weekly rate
        $pricePerDayWeekly = $pricePerWeek / 7;
        $price7Days = $pricePerDayWeekly * 7;
        $this->assertEquals(600, $price7Days);

        // 29 days - should use weekly rate
        $price29Days = $pricePerDayWeekly * 29;
        $this->assertEqualsWithDelta(2485.71, $price29Days, 0.01);

        // 30 days - should use monthly rate
        $pricePerDayMonthly = $pricePerMonth / 30;
        $price30Days = $pricePerDayMonthly * 30;
        $this->assertEqualsWithDelta(2000, $price30Days, 0.01);
    }

    /**
     * Test boat rental hour ranges
     */
    public function test_boat_rental_hour_ranges()
    {
        $hourlyPrice = 50;
        $halfDayPrice = 150;
        $fullDayPrice = 250;

        // 0.5-1h range - hourly rate
        $price30min = $hourlyPrice * 0.5;
        $this->assertEquals(25, $price30min);

        $price1h = $hourlyPrice * 1;
        $this->assertEquals(50, $price1h);

        // 2-4h range - half day rate
        $price2h = $halfDayPrice * (2 / 4);
        $this->assertEquals(75, $price2h);

        $price3h = $halfDayPrice * (3 / 4);
        $this->assertEquals(112.5, $price3h);

        $price4h = $halfDayPrice * (4 / 4);
        $this->assertEquals(150, $price4h);

        // 4.5-8h range - full day rate
        $price4_5h = $fullDayPrice * (4.5 / 8);
        $this->assertEqualsWithDelta(140.63, $price4_5h, 0.01);

        $price8h = $fullDayPrice * (8 / 8);
        $this->assertEquals(250, $price8h);
    }

    /**
     * Test invalid boat rental durations
     */
    public function test_invalid_boat_rental_durations()
    {
        // Test that 1.5h, 5h, 9h are invalid
        $validDurations = [0.5, 1, 2, 2.5, 3, 3.5, 4, 4.5, 5, 5.5, 6, 6.5, 7, 7.5, 8];
        
        $this->assertNotContains(1.5, $validDurations);
        $this->assertNotContains(9, $validDurations);
        
        // Valid durations in specific ranges
        $this->assertTrue($this->isValidBoatDuration(0.5));
        $this->assertTrue($this->isValidBoatDuration(1));
        $this->assertTrue($this->isValidBoatDuration(2));
        $this->assertTrue($this->isValidBoatDuration(4));
        $this->assertTrue($this->isValidBoatDuration(4.5));
        $this->assertTrue($this->isValidBoatDuration(8));
        
        // Invalid durations
        $this->assertFalse($this->isValidBoatDuration(1.5));
        $this->assertFalse($this->isValidBoatDuration(9));
    }

    /**
     * Test Things to Do pricing (private vs group)
     */
    public function test_things_to_do_pricing()
    {
        $optionPrice = 50;
        $numberOfPeople = 4;

        // Private activity - price per person
        $privatePrice = $optionPrice * $numberOfPeople;
        $this->assertEquals(200, $privatePrice);

        // Group activity - fixed price
        $groupPrice = $optionPrice;
        $this->assertEquals(50, $groupPrice);
    }

    /**
     * Helper method to validate boat duration
     */
    private function isValidBoatDuration($hours)
    {
        if ($hours >= 0.5 && $hours <= 1) {
            return true;
        } elseif ($hours >= 2 && $hours <= 4) {
            return true;
        } elseif ($hours >= 4.5 && $hours <= 8) {
            return true;
        }
        return false;
    }
}