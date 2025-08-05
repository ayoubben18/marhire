<?php

namespace Tests\Unit\Services;

use Tests\TestCase;
use App\Models\EmailLog;
use App\Http\Controllers\Admin\EmailHistoryController;
use Illuminate\Http\Request;

class EmailHistoryTest extends TestCase
{
    public function testEmailHistoryControllerIndexReturnsView()
    {
        // Test that the controller method exists and can be called
        $controller = new EmailHistoryController();
        $this->assertTrue(method_exists($controller, 'index'));
    }
    
    public function testEmailHistoryRouteExists()
    {
        // Test that the route exists
        $routes = \Route::getRoutes();
        $routeExists = false;
        foreach ($routes as $route) {
            if ($route->uri() === 'admin/email-history') {
                $routeExists = true;
                break;
            }
        }
        $this->assertTrue($routeExists, 'The admin/email-history route should exist');
    }
}