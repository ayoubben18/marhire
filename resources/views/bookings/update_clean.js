// Clean, working JavaScript for booking edit form
$(document).ready(function() {
    // Global variables
    const booking = @json($booking);
    let addonsOptions = '<option value="" selected disabled>--Choose Addon--</option>';
    
    // Main initialization function - simple and sequential
    function initializeBookingForm() {
        console.log('Initializing booking form for category:', booking.category_id);
        
        // Step 1: Set category (this shows/hides relevant fields)
        $('#category_id').val(booking.category_id);
        toggleFieldsByCategory(booking.category_id);
        
        // Step 2: Set all basic fields
        setBasicFields();
        
        // Step 3: Set category-specific fields
        setCategorySpecificFields();
        
        // Step 4: Load listings based on category
        setTimeout(() => {
            loadListingsForCategory();
        }, 500);
        
        // Step 5: After listings are loaded, trigger change to load addons and calculate price
        setTimeout(() => {
            if (booking.listing_id) {
                $('#listing_id').trigger('change');
            }
        }, 1500);
        
        // Step 6: Calculate initial price
        setTimeout(() => {
            calculatePrice();
        }, 2000);
    }
    
    // Set basic fields that are common to all categories
    function setBasicFields() {
        $('#first_name').val(booking.first_name);
        $('#last_name').val(booking.last_name);
        $('#email').val(booking.email);
        $('#whatsapp').val(booking.whatsapp);
        $('#country').val(booking.country);
        $('#flight_number').val(booking.flight_number);
        $('#discount_or_extra').val(booking.discount_or_extra || 0);
    }
    
    // Set fields specific to each category
    function setCategorySpecificFields() {
        const categoryId = parseInt(booking.category_id);
        
        switch (categoryId) {
            case 2: // Car Rental
                $('#pickup_date').val(booking.pickup_date);
                $('#dropoff_date').val(booking.dropoff_date);
                $('#pickup_time').val(booking.pickup_time);
                $('#dropoff_time').val(booking.dropoff_time);
                $('#pickup_location').val(booking.pickup_location);
                $('#droppoff_location').val(booking.droppoff_location);
                $('#date_of_birth').val(booking.date_of_birth);
                break;
                
            case 3: // Private Driver
                $('#prefered_date').val(booking.prefered_date);
                $('#number_of_people').val(booking.number_of_people);
                $('#pickup_time_private').val(booking.pickup_time);
                $('#service_types').val(booking.service_types);
                $('#road_types').val(booking.road_types);
                $('#airport_or_intercity').val(booking.airport_or_intercity);
                $('#car_type').val(booking.car_type);
                $('#city_a_id').val(booking.city_a_id);
                $('#city_b_id').val(booking.city_b_id);
                $('#number_of_passengers').val(booking.number_of_passengers);
                $('#number_of_luggage').val(booking.number_of_luggage);
                $('#pickup_address').val(booking.pickup_address);
                $('#dropoff_address').val(booking.dropoff_address);
                break;
                
            case 4: // Boat Rental
                $('#duration').val(booking.duration);
                $('#propose').val(booking.propose);
                $('#prefered_date').val(booking.prefered_date);
                $('#number_of_people').val(booking.number_of_people);
                break;
                
            case 5: // Activities
                $('#activity_type').val(booking.activity_type);
                $('#pricing_option_id').val(booking.pricing_option_id);
                $('#prefered_date').val(booking.prefered_date);
                $('#number_of_people').val(booking.number_of_people);
                $('#time_preference').val(booking.time_preference);
                break;
        }
    }
    
    // Load listings based on category
    function loadListingsForCategory() {
        const categoryId = parseInt(booking.category_id);
        console.log('Loading listings for category:', categoryId);
        
        switch (categoryId) {
            case 2: // Car Rental - doesn't need special loading
                loadCategoryListings(categoryId);
                break;
                
            case 3: // Private Driver
                loadPrivateDriverListings();
                break;
                
            case 4: // Boat Rental
                loadCategoryListings(categoryId);
                break;
                
            case 5: // Activities
                if (booking.activity_type) {
                    loadActivityListings(booking.activity_type);
                } else {
                    loadCategoryListings(categoryId);
                }
                break;
                
            default:
                loadCategoryListings(categoryId);
                break;
        }
    }
    
    // Load listings for general categories
    function loadCategoryListings(categoryId) {
        $.ajax({
            type: 'post',
            url: '{{ route("categories.getListings") }}',
            data: {
                category_id: categoryId
            },
            dataType: 'json',
            success: function(resp) {
                let options = '<option value="" disabled>--Choose Option--</option>';
                
                resp.listings.forEach(function(listing) {
                    const pricePerHour = parseFloat(listing.price_per_hour) || 0;
                    const pricePerHalfDay = parseFloat(listing.price_per_half_day) || 0;
                    const pricePerDay = parseFloat(listing.price_per_day) || 0;
                    const pricePerWeek = parseFloat(listing.price_per_week) || 0;
                    const pricePerMonth = parseFloat(listing.price_per_month) || 0;
                    const isSelected = listing.id == booking.listing_id ? 'selected' : '';
                    
                    options += `<option value="${listing.id}" ${isSelected}
                                data-durations="${listing.duration_options || ''}"
                                data-proposes="${listing.purpose_tags || ''}"
                                data-price-per-hour="${pricePerHour}"
                                data-price-per-half-day="${pricePerHalfDay}"
                                data-price-per-day="${pricePerDay}"
                                data-price-per-week="${pricePerWeek}"
                                data-price-per-month="${pricePerMonth}"
                                data-private-or-group="${listing.private_or_group || 'Group'}"
                                >${listing.title}</option>`;
                });
                
                $('#listing_id').html(options);
                console.log('Loaded', resp.listings.length, 'listings for category', categoryId);
            },
            error: function(xhr, status, error) {
                console.error('Error loading listings:', error);
            }
        });
    }
    
    // Load listings for private driver
    function loadPrivateDriverListings() {
        const airportOrIntercity = booking.airport_or_intercity;
        const carType = booking.car_type;
        const cityA = booking.city_a_id;
        const cityB = booking.city_b_id;
        
        console.log('Loading private driver listings with:', {
            airportOrIntercity, carType, cityA, cityB
        });
        
        if (airportOrIntercity && carType && cityA && cityB) {
            $.ajax({
                type: 'post',
                url: '{{ route("bookings.getListings") }}',
                data: {
                    airportOrIntercity: airportOrIntercity,
                    car_type: carType,
                    city_a_id: cityA,
                    city_b_id: cityB
                },
                dataType: 'json',
                success: function(resp) {
                    let options = '<option value="" disabled>--Choose Option--</option>';
                    
                    resp.listings.forEach(function(listing) {
                        const airport_one = listing.pricings && listing.pricings[0] ? listing.pricings[0].airport_one : 0;
                        const airport_round = listing.pricings && listing.pricings[0] ? listing.pricings[0].airport_round : 0;
                        const intercity_one = listing.pricings && listing.pricings[0] ? listing.pricings[0].intercity_one : 0;
                        const intercity_round = listing.pricings && listing.pricings[0] ? listing.pricings[0].intercity_round : 0;
                        const isSelected = listing.id == booking.listing_id ? 'selected' : '';
                        
                        options += `<option value="${listing.id}" ${isSelected}
                                    airport_one="${airport_one}"
                                    airport_round="${airport_round}"
                                    intercity_one="${intercity_one}"
                                    intercity_round="${intercity_round}"
                                    >${listing.title}</option>`;
                    });
                    
                    $('#listing_id').html(options);
                    console.log('Loaded', resp.listings.length, 'private driver listings');
                },
                error: function(xhr, status, error) {
                    console.error('Error loading private driver listings:', error);
                    // Fallback to category listings
                    loadCategoryListings(3);
                }
            });
        } else {
            // If required fields are missing, try loading category listings
            loadCategoryListings(3);
        }
    }
    
    // Load listings for activities
    function loadActivityListings(activityType) {
        if (!activityType) {
            loadCategoryListings(5);
            return;
        }
        
        $.ajax({
            type: 'post',
            url: '{{ route("bookings.getActivityListings") }}',
            data: {
                activity_type: activityType
            },
            dataType: 'json',
            success: function(resp) {
                let options = '<option value="" disabled>--Choose Option--</option>';
                
                resp.listings.forEach(function(listing) {
                    const pricePerHour = parseFloat(listing.price_per_hour) || 0;
                    const pricePerHalfDay = parseFloat(listing.price_per_half_day) || 0;
                    const pricePerDay = parseFloat(listing.price_per_day) || 0;
                    const pricePerWeek = parseFloat(listing.price_per_week) || 0;
                    const pricePerMonth = parseFloat(listing.price_per_month) || 0;
                    const isSelected = listing.id == booking.listing_id ? 'selected' : '';
                    
                    options += `<option value="${listing.id}" ${isSelected}
                                data-durations="${listing.duration_options || ''}"
                                data-proposes="${listing.purpose_tags || ''}"
                                data-price-per-hour="${pricePerHour}"
                                data-price-per-half-day="${pricePerHalfDay}"
                                data-price-per-day="${pricePerDay}"
                                data-price-per-week="${pricePerWeek}"
                                data-price-per-month="${pricePerMonth}"
                                data-private-or-group="${listing.private_or_group || 'Group'}"
                                >${listing.title}</option>`;
                });
                
                $('#listing_id').html(options);
                console.log('Loaded', resp.listings.length, 'activity listings');
            },
            error: function(xhr, status, error) {
                console.error('Error loading activity listings:', error);
                loadCategoryListings(5);
            }
        });
    }
    
    // Listing change handler - loads addons and pricing options
    $('#listing_id').change(function() {
        const listing_id = $(this).val();
        const category_id = $('#category_id').val();
        
        if (!listing_id) return;
        
        console.log('Listing changed to:', listing_id);
        
        // Load addons for this listing
        loadAddonsForListing(listing_id);
        
        // Load pricing options for private driver
        if (category_id == 3 || category_id == 5) {
            loadPricingOptions(listing_id);
        }
        
        // Recalculate price
        setTimeout(() => {
            calculatePrice();
        }, 500);
    });
    
    // Load addons for a listing
    function loadAddonsForListing(listingId) {
        $.ajax({
            type: 'post',
            url: '{{ route("listings.getAddons") }}',
            data: {
                listing_id: listingId
            },
            dataType: 'json',
            success: function(resp) {
                let options = '<option value="" disabled selected>--Choose Option--</option>';
                
                resp.addons.forEach(function(addon) {
                    options += `<option value="${addon.id}" data-price="${addon.price}">
                                ${addon.addon} (${parseFloat(addon.price).toFixed(2)}€)</option>`;
                });
                
                addonsOptions = options;
                
                // Update existing addon selects
                $('.addon').each(function() {
                    const currentValue = $(this).val();
                    $(this).html(options);
                    if (currentValue) {
                        $(this).val(currentValue);
                    }
                });
                
                console.log('Loaded', resp.addons.length, 'addons');
            },
            error: function(xhr, status, error) {
                console.error('Error loading addons:', error);
            }
        });
    }
    
    // Load pricing options for private driver and activities
    function loadPricingOptions(listingId) {
        $.ajax({
            type: 'post',
            url: '{{ route("listings.getPricing") }}',
            data: {
                listing_id: listingId
            },
            dataType: 'json',
            success: function(resp) {
                let options = '<option value="" disabled selected>--Choose Option--</option>';
                
                resp.options.forEach(function(option) {
                    options += `<option value="${option.id}" data-price="${option.price}">${option.element}</option>`;
                });
                
                $('#pricing_option_id').html(options);
                
                // Set selected pricing option if exists
                if (booking.pricing_option_id) {
                    $('#pricing_option_id').val(booking.pricing_option_id);
                }
                
                console.log('Loaded pricing options');
            },
            error: function(xhr, status, error) {
                console.error('Error loading pricing options:', error);
            }
        });
    }
    
    // Simple price calculation
    function calculatePrice() {
        const category_id = parseInt($('#category_id').val());
        if (!category_id) return;
        
        let totalPrice = 0;
        let addonsTotal = 0;
        
        // Calculate addon totals
        $('select.addon').each(function() {
            const selectedOption = $(this).find(':selected');
            const addonPrice = parseFloat(selectedOption.data('price')) || 0;
            if (addonPrice > 0) {
                addonsTotal += addonPrice;
            }
        });
        
        // Calculate base price based on category
        if (category_id === 2) {
            // Car rental - calculate based on days
            const startDate = $('#pickup_date').val();
            const endDate = $('#dropoff_date').val();
            const pricePerDay = parseFloat($('#listing_id option:selected').data('price-per-day')) || 0;
            
            if (startDate && endDate) {
                const start = new Date(startDate);
                const end = new Date(endDate);
                const diffMs = end - start;
                const diffDays = Math.ceil(diffMs / (1000 * 60 * 60 * 24)) || 1;
                totalPrice = pricePerDay * diffDays;
            }
        } else if (category_id === 3) {
            // Private driver - use pricing from attributes
            const airportOrIntercity = $('#airport_or_intercity').val();
            const $selectedOption = $('#listing_id option:selected');
            
            if (airportOrIntercity.includes('Airport')) {
                if (airportOrIntercity.includes('One Way')) {
                    totalPrice = parseFloat($selectedOption.attr('airport_one')) || 0;
                } else {
                    totalPrice = parseFloat($selectedOption.attr('airport_round')) || 0;
                }
            } else {
                if (airportOrIntercity.includes('One Way')) {
                    totalPrice = parseFloat($selectedOption.attr('intercity_one')) || 0;
                } else {
                    totalPrice = parseFloat($selectedOption.attr('intercity_round')) || 0;
                }
            }
        } else {
            // Other categories - use selected pricing option or default price
            const pricingOption = $('#pricing_option_id option:selected');
            if (pricingOption.length) {
                totalPrice = parseFloat(pricingOption.data('price')) || 0;
            } else {
                totalPrice = parseFloat($('#listing_id option:selected').data('price-per-day')) || 0;
            }
        }
        
        // Apply discount or extra
        const discountOrExtra = parseFloat($('#discount_or_extra').val()) || 0;
        totalPrice += discountOrExtra;
        
        // Update UI
        $('.booking-pricing-item.price .amount').text(totalPrice.toFixed(2) + '€');
        $('.booking-pricing-item.addons .amount').text(addonsTotal.toFixed(2) + '€');
        $('.booking-pricing-item.total .amount').text((totalPrice + addonsTotal).toFixed(2) + '€');
        
        console.log('Price calculated:', {
            base: totalPrice,
            addons: addonsTotal,
            total: totalPrice + addonsTotal
        });
    }
    
    // Toggle fields based on category
    function toggleFieldsByCategory(categoryId) {
        $('[data-categories]').hide();
        $(`[data-categories*="${categoryId}"]`).show();
    }
    
    // Event handlers for field changes
    $('#category_id').change(function() {
        const categoryId = $(this).val();
        toggleFieldsByCategory(categoryId);
        
        // Clear listing dropdown
        $('#listing_id').html('<option value="" disabled selected>--Choose Option--</option>');
        
        // Load listings for new category
        if (categoryId == 4 || categoryId == 5) {
            loadCategoryListings(categoryId);
        }
    });
    
    // Private driver field changes - reload listings
    $('#airport_or_intercity, #car_type, #city_a_id, #city_b_id').change(function() {
        const categoryId = parseInt($('#category_id').val());
        if (categoryId === 3) {
            const airportOrIntercity = $('#airport_or_intercity').val();
            const carType = $('#car_type').val();
            const cityA = $('#city_a_id').val();
            const cityB = $('#city_b_id').val();
            
            if (airportOrIntercity && carType && cityA && cityB) {
                loadPrivateDriverListings();
            }
        }
    });
    
    // Activity type change - reload listings
    $('#activity_type').change(function() {
        const activityType = $(this).val();
        if (activityType) {
            loadActivityListings(activityType);
        }
    });
    
    // Price recalculation triggers
    $('#pickup_date, #dropoff_date, #pricing_option_id, #discount_or_extra').change(function() {
        calculatePrice();
    });
    
    // Add addon row
    $('#add-addon').click(function() {
        const row = `<tr>
            <td>
                <select name="addons[]" class="form-control addon" required>
                    ${addonsOptions}
                </select>
            </td>
            <td>
                <button type="button" class="btn btn-sm remove-addon" style="color:#ff313b;">
                    <i class="fa-solid fa-trash-can"></i>
                </button>
            </td>
        </tr>`;
        
        $('#addons-table tbody').append(row);
        calculatePrice();
    });
    
    // Remove addon row
    $(document).on('click', '.remove-addon', function() {
        $(this).closest('tr').remove();
        calculatePrice();
    });
    
    // Addon change - recalculate price
    $(document).on('change', '.addon', function() {
        calculatePrice();
    });
    
    // Form validation
    function validateForm() {
        // Add your validation logic here
        return true;
    }
    
    $('#submit-form-btn').click(function() {
        if (validateForm()) {
            $('#bookingFrm').submit();
        } else {
            $('html, body').animate({
                scrollTop: 10
            }, 500);
        }
    });
    
    // Initialize the form
    initializeBookingForm();
});