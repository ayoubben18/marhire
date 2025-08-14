<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddEssentialIndexes extends Migration
{
    /**
     * Run the migrations.
     * 
     * This migration adds only essential indexes that are safe for production.
     * Only adds indexes for columns that definitely exist.
     *
     * @return void
     */
    public function up()
    {
        // Add indexes to listings table for common queries
        Schema::table('listings', function (Blueprint $table) {
            // Only add index if it doesn't exist
            $sm = Schema::getConnection()->getDoctrineSchemaManager();
            $indexesFound = $sm->listTableIndexes('listings');
            
            if (!array_key_exists('listings_category_id_index', $indexesFound)) {
                $table->index('category_id', 'listings_category_id_index');
            }
            
            if (!array_key_exists('listings_city_id_index', $indexesFound)) {
                $table->index('city_id', 'listings_city_id_index');
            }
        });

        // Add indexes to bookings table for common queries
        Schema::table('bookings', function (Blueprint $table) {
            $sm = Schema::getConnection()->getDoctrineSchemaManager();
            $indexesFound = $sm->listTableIndexes('bookings');
            
            if (!array_key_exists('bookings_listing_id_index', $indexesFound)) {
                $table->index('listing_id', 'bookings_listing_id_index');
            }
            
            if (!array_key_exists('bookings_category_id_index', $indexesFound)) {
                $table->index('category_id', 'bookings_category_id_index');
            }
        });

        // Add indexes to listing_galleries for image queries
        Schema::table('listing_galleries', function (Blueprint $table) {
            $sm = Schema::getConnection()->getDoctrineSchemaManager();
            $indexesFound = $sm->listTableIndexes('listing_galleries');
            
            if (!array_key_exists('listing_galleries_listing_id_index', $indexesFound)) {
                $table->index('listing_id', 'listing_galleries_listing_id_index');
            }
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        // Remove indexes from listings table
        Schema::table('listings', function (Blueprint $table) {
            $sm = Schema::getConnection()->getDoctrineSchemaManager();
            $indexesFound = $sm->listTableIndexes('listings');
            
            if (array_key_exists('listings_category_id_index', $indexesFound)) {
                $table->dropIndex('listings_category_id_index');
            }
            
            if (array_key_exists('listings_city_id_index', $indexesFound)) {
                $table->dropIndex('listings_city_id_index');
            }
        });

        // Remove indexes from bookings table
        Schema::table('bookings', function (Blueprint $table) {
            $sm = Schema::getConnection()->getDoctrineSchemaManager();
            $indexesFound = $sm->listTableIndexes('bookings');
            
            if (array_key_exists('bookings_listing_id_index', $indexesFound)) {
                $table->dropIndex('bookings_listing_id_index');
            }
            
            if (array_key_exists('bookings_category_id_index', $indexesFound)) {
                $table->dropIndex('bookings_category_id_index');
            }
        });

        // Remove indexes from listing_galleries table
        Schema::table('listing_galleries', function (Blueprint $table) {
            $sm = Schema::getConnection()->getDoctrineSchemaManager();
            $indexesFound = $sm->listTableIndexes('listing_galleries');
            
            if (array_key_exists('listing_galleries_listing_id_index', $indexesFound)) {
                $table->dropIndex('listing_galleries_listing_id_index');
            }
        });
    }
}