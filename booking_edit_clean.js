// CLEAN WORKING IMPLEMENTATION FOR BOOKING EDIT FORM
$(document).ready(function() {
    // ========================================
    // GLOBAL VARIABLES
    // ========================================
    const booking = window.bookingData; // Will be set from blade template
    let addonsOptions = '<option value="" selected disabled>--Choose Addon--</option>';
    
    console.log('Starting booking form initialization', booking);
    
    // ========================================
    // INITIALIZATION
    // ========================================
    function init() {
        // Hide all category-specific fields first
        $('[data-categories]').hide();
        
        // Set category and show relevant fields
        $('#category_id').val(booking.category_id);
        $(`[data-categories*="${booking.category_id}"]`).show();
        
        // Set all form fields
        setFormFields();
        
        // Load listings after a short delay
        setTimeout(() => {
            loadListings();
        }, 500);
        
        // Setup event handlers
        setupEventHandlers();
    }
    
    // ========================================
    // SET FORM FIELDS
    // ========================================
    function setFormFields() {
        // Common fields
        $('#first_name').val(booking.first_name);
        $('#last_name').val(booking.last_name);
        $('#email').val(booking.email);
        $('#whatsapp').val(booking.whatsapp);
        $('#country').val(booking.country);
        $('#flight_number').val(booking.flight_number);
        $('#discount_or_extra').val(booking.discount_or_extra || 0);
        
        // Category specific fields
        switch(parseInt(booking.category_id)) {
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
                $('#prefered_date').val(booking.prefered_date);
                $('#number_of_people').val(booking.number_of_people);
                $('#time_preference').val(booking.time_preference);
                break;
        }
    }
    
    // ========================================
    // LOAD LISTINGS
    // ========================================
    function loadListings() {
        const categoryId = parseInt(booking.category_id);
        
        if (categoryId === 3) {
            // Private Driver - special handling
            loadPrivateDriverListings();
        } else if (categoryId === 5 && booking.activity_type) {
            // Activities with activity type
            loadActivityListings();
        } else {
            // All other categories
            loadCategoryListings(categoryId);
        }
    }
    
    function loadCategoryListings(categoryId) {
        $.ajax({
            type: 'post',
            url: window.routes.categoriesGetListings,
            data: { 
                category_id: categoryId,
                _token: $('meta[name="csrf-token"]').attr('content')
            },
            dataType: 'json',
            success: function(resp) {
                populateListingDropdown(resp.listings, 'category');
            },
            error: function() {
                console.error('Failed to load category listings');
            }
        });
    }
    
    function loadPrivateDriverListings() {
        // Check if we have all required fields
        const airportOrIntercity = booking.airport_or_intercity || $('#airport_or_intercity').val();
        const carType = booking.car_type || $('#car_type').val();
        const cityA = booking.city_a_id || $('#city_a_id').val();
        const cityB = booking.city_b_id || $('#city_b_id').val();
        
        if (!airportOrIntercity || !carType || !cityA || !cityB) {
            // Fall back to category listings if missing data
            loadCategoryListings(3);
            return;
        }
        
        $.ajax({
            type: 'post',
            url: window.routes.bookingsGetListings,
            data: {
                airportOrIntercity: airportOrIntercity,
                car_type: carType,
                city_a_id: cityA,
                city_b_id: cityB,
                _token: $('meta[name="csrf-token"]').attr('content')
            },
            dataType: 'json',
            success: function(resp) {
                populateListingDropdown(resp.listings, 'private_driver');
            },
            error: function() {
                console.error('Failed to load private driver listings');
                loadCategoryListings(3);
            }
        });
    }
    
    function loadActivityListings() {
        const activityType = booking.activity_type || $('#activity_type').val();
        
        if (!activityType) {
            loadCategoryListings(5);
            return;
        }
        
        $.ajax({
            type: 'post',
            url: window.routes.bookingsGetActivityListings,
            data: { 
                activity_type: activityType,
                _token: $('meta[name="csrf-token"]').attr('content')
            },
            dataType: 'json',
            success: function(resp) {
                populateListingDropdown(resp.listings, 'activity');
            },
            error: function() {
                console.error('Failed to load activity listings');
                loadCategoryListings(5);
            }
        });
    }
    
    function populateListingDropdown(listings, type) {
        let options = '<option value="" disabled>--Choose Option--</option>';
        
        listings.forEach(function(listing) {
            const isSelected = listing.id == booking.listing_id ? 'selected' : '';
            
            if (type === 'private_driver') {
                // Private driver specific attributes
                const pricing = listing.pricings && listing.pricings[0] ? listing.pricings[0] : {};
                options += `<option value="${listing.id}" ${isSelected}
                    airport_one="${pricing.airport_one || 0}"
                    airport_round="${pricing.airport_round || 0}"
                    intercity_one="${pricing.intercity_one || 0}"
                    intercity_round="${pricing.intercity_round || 0}"
                    >${listing.title}</option>`;
            } else {
                // Regular listings with price data
                options += `<option value="${listing.id}" ${isSelected}
                    data-price-per-hour="${listing.price_per_hour || 0}"
                    data-price-per-half-day="${listing.price_per_half_day || 0}"
                    data-price-per-day="${listing.price_per_day || 0}"
                    data-price-per-week="${listing.price_per_week || 0}"
                    data-price-per-month="${listing.price_per_month || 0}"
                    data-durations="${listing.duration_options || ''}"
                    data-proposes="${listing.purpose_tags || ''}"
                    data-private-or-group="${listing.private_or_group || 'Group'}"
                    >${listing.title}</option>`;
            }
        });
        
        $('#listing_id').html(options);
        
        // If we have a selected listing, trigger change to load addons
        if (booking.listing_id) {
            setTimeout(() => {
                $('#listing_id').trigger('change');
            }, 300);
        }
    }
    
    // ========================================
    // LOAD ADDONS
    // ========================================
    function loadAddons(listingId) {
        if (!listingId) return;
        
        $.ajax({
            type: 'post',
            url: window.routes.listingsGetAddons,
            data: { 
                listing_id: listingId,
                _token: $('meta[name="csrf-token"]').attr('content')
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
                
                // Load pricing options for categories 3 and 5
                if ([3, 5].includes(parseInt(booking.category_id))) {
                    loadPricingOptions(listingId);
                }
                
                // Calculate price
                setTimeout(calculatePrice, 300);
            }
        });
    }
    
    function loadPricingOptions(listingId) {
        $.ajax({
            type: 'post',
            url: window.routes.listingsGetPricing,
            data: { 
                listing_id: listingId,
                _token: $('meta[name="csrf-token"]').attr('content')
            },
            dataType: 'json',
            success: function(resp) {
                let options = '<option value="" disabled>--Choose Option--</option>';
                resp.options.forEach(function(option) {
                    const isSelected = option.id == booking.pricing_option_id ? 'selected' : '';
                    options += `<option value="${option.id}" ${isSelected} data-price="${option.price}">
                        ${option.element}</option>`;
                });
                $('#pricing_option_id').html(options);
            }
        });
    }
    
    // ========================================
    // PRICE CALCULATION
    // ========================================
    function calculatePrice() {
        const categoryId = parseInt($('#category_id').val());
        let basePrice = 0;
        let addonsTotal = 0;
        
        // Calculate addon prices
        $('.addon').each(function() {
            const price = parseFloat($(this).find(':selected').data('price')) || 0;
            addonsTotal += price;
        });
        
        // Calculate base price by category
        switch(categoryId) {
            case 2: // Car Rental
                const startDate = $('#pickup_date').val();
                const endDate = $('#dropoff_date').val();
                const pricePerDay = parseFloat($('#listing_id option:selected').data('price-per-day')) || 0;
                
                if (startDate && endDate) {
                    const days = Math.ceil((new Date(endDate) - new Date(startDate)) / (1000 * 60 * 60 * 24)) || 1;
                    basePrice = pricePerDay * days;
                }
                break;
                
            case 3: // Private Driver
                const airportOrIntercity = $('#airport_or_intercity').val();
                const $listing = $('#listing_id option:selected');
                
                if (airportOrIntercity) {
                    if (airportOrIntercity.includes('Airport')) {
                        basePrice = airportOrIntercity.includes('One Way') ? 
                            parseFloat($listing.attr('airport_one')) || 0 :
                            parseFloat($listing.attr('airport_round')) || 0;
                    } else {
                        basePrice = airportOrIntercity.includes('One Way') ?
                            parseFloat($listing.attr('intercity_one')) || 0 :
                            parseFloat($listing.attr('intercity_round')) || 0;
                    }
                }
                break;
                
            case 4: // Boat Rental
            case 5: // Activities
                const $pricingOption = $('#pricing_option_id option:selected');
                if ($pricingOption.length) {
                    basePrice = parseFloat($pricingOption.data('price')) || 0;
                } else {
                    basePrice = parseFloat($('#listing_id option:selected').data('price-per-day')) || 0;
                }
                break;
        }
        
        // Add discount/extra
        const discountOrExtra = parseFloat($('#discount_or_extra').val()) || 0;
        basePrice += discountOrExtra;
        
        // Update UI
        const total = basePrice + addonsTotal;
        $('.booking-pricing-item.price .amount').text(basePrice.toFixed(2) + '€');
        $('.booking-pricing-item.addons .amount').text(addonsTotal.toFixed(2) + '€');
        $('.booking-pricing-item.total .amount').text(total.toFixed(2) + '€');
        
        // Show/hide per day based on category
        if (categoryId === 2) {
            $('.booking-pricing-item.per_day').show();
        } else {
            $('.booking-pricing-item.per_day').hide();
        }
    }
    
    // ========================================
    // EVENT HANDLERS
    // ========================================
    function setupEventHandlers() {
        // Category change
        $('#category_id').change(function() {
            const categoryId = $(this).val();
            $('[data-categories]').hide();
            $(`[data-categories*="${categoryId}"]`).show();
            $('#listing_id').html('<option value="" disabled selected>--Choose Option--</option>');
            
            if (categoryId == 4 || categoryId == 5) {
                loadCategoryListings(categoryId);
            }
        });
        
        // Listing change
        $('#listing_id').change(function() {
            const listingId = $(this).val();
            if (listingId) {
                loadAddons(listingId);
            }
        });
        
        // Private driver fields change
        $('#airport_or_intercity, #car_type, #city_a_id, #city_b_id').change(function() {
            if (parseInt($('#category_id').val()) === 3) {
                loadPrivateDriverListings();
            }
        });
        
        // Activity type change
        $('#activity_type').change(function() {
            if (parseInt($('#category_id').val()) === 5) {
                loadActivityListings();
            }
        });
        
        // Price recalculation triggers
        $('#pickup_date, #dropoff_date, #pricing_option_id, #discount_or_extra').change(calculatePrice);
        $(document).on('change', '.addon', calculatePrice);
        
        // Add addon
        $('#add-addon').click(function() {
            $('#addons-table tbody').append(`
                <tr>
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
                </tr>
            `);
        });
        
        // Remove addon
        $(document).on('click', '.remove-addon', function() {
            $(this).closest('tr').remove();
            calculatePrice();
        });
        
        // Form submit
        $('#submit-form-btn').click(function() {
            $('#bookingFrm').submit();
        });
    }
    
    // ========================================
    // START INITIALIZATION  
    // ========================================
    init();
});