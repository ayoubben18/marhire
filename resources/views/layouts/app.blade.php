@php
$forceNotSticky = View::hasSection('force_not_sticky');
$isNotSticky = (
request()->is('/') ||
request()->is('en') ||
request()->is('fr') ||
request()->is('es') ||
request()->is('en/') ||
request()->is('fr/') ||
request()->is('es/') ||
request()->is('city/*') ||
request()->is('*/city/*') ||
request()->is('details/*') ||
request()->is('*/details/*') ||
request()->is('car-search') ||
request()->is('*/car-search') ||
request()->is('private-search') ||
request()->is('*/private-search') ||
request()->is('boat-search') ||
request()->is('*/boat-search') ||
request()->is('thingstodo-search') ||
request()->is('*/thingstodo-search') ||
request()->is('agency/*') ||
request()->is('*/agency/*') ||
request()->is('blog') ||
request()->is('*/blog') ||
request()->is('terms-conditions') ||
request()->is('*/terms-conditions') ||
request()->is('privacy-policy') ||
request()->is('*/privacy-policy') ||
request()->is('cookie-policy') ||
request()->is('*/cookie-policy') ||
request()->is('cancellation-policy') ||
request()->is('*/cancellation-policy') ||
request()->is('insurance-conditions') ||
request()->is('*/insurance-conditions') ||
request()->is('article/*') ||
request()->is('*/article/*') ||
request()->is('about-us') ||
request()->is('*/about-us') ||
request()->is('list-your-property') ||
request()->is('*/list-your-property') ||
request()->is('support') ||
request()->is('*/support') ||
request()->is('how-we-work') ||
request()->is('*/how-we-work') ||
request()->is('partners') ||
request()->is('*/partners') ||
request()->is('category/*') ||
request()->is('*/category/*') ||
request()->is('sitemap') ||
request()->is('*/sitemap')
) || $forceNotSticky;
@endphp
<!doctype html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta http-equiv="content-language" content="{{ app()->getLocale() }}">
    
    {{-- SEO Meta Tags --}}
    @yield('meta')
    
    {{-- CSRF Token --}}
    <meta name="csrf-token" content="{{ csrf_token() }}">
    
    {{-- Title --}}
    <title>@yield('title')</title>
    
    {{-- Canonical URL --}}
    @if(!isset($noCanonical))
    <link rel="canonical" href="{{ url()->current() }}" />
    @endif
    
    {{-- Hreflang Tags --}}
    @php
        $seoService = app(\App\Services\SEOService::class);
        $hreflangService = app(\App\Services\HreflangService::class);
        $currentUrl = url()->current();
        $currentLocale = app()->getLocale();
        $hreflangTags = $hreflangService->generateHreflangTags($currentUrl, $currentLocale);
    @endphp
    {!! $hreflangTags !!}
    
    {{-- OpenGraph Locale Tags --}}
    @php
        $localeMeta = $hreflangService->getLocaleMeta($currentLocale);
    @endphp
    <meta property="og:locale" content="{{ $localeMeta['og_locale'] }}" />
    @foreach($localeMeta['alternate_locales'] as $altLocale)
    <meta property="og:locale:alternate" content="{{ $altLocale }}" />
    @endforeach
    
    {{-- Default OpenGraph Tags --}}
    @hasSection('og_title')
        <meta property="og:title" content="@yield('og_title')" />
    @else
        <meta property="og:title" content="@yield('title')" />
    @endif
    
    @hasSection('og_description')
        <meta property="og:description" content="@yield('og_description')" />
    @elseif(View::hasSection('description'))
        <meta property="og:description" content="@yield('description')" />
    @endif
    
    <meta property="og:url" content="{{ url()->current() }}" />
    <meta property="og:type" content="@yield('og_type', 'website')" />
    <meta property="og:site_name" content="{{ config('app.name') }}" />
    
    @hasSection('og_image')
        <meta property="og:image" content="@yield('og_image')" />
    @endif
    
    {{-- Twitter Card Tags --}}
    <meta name="twitter:card" content="@yield('twitter_card', 'summary_large_image')" />
    @hasSection('twitter_title')
        <meta name="twitter:title" content="@yield('twitter_title')" />
    @else
        <meta name="twitter:title" content="@yield('title')" />
    @endif
    
    @hasSection('twitter_description')
        <meta name="twitter:description" content="@yield('twitter_description')" />
    @elseif(View::hasSection('description'))
        <meta name="twitter:description" content="@yield('description')" />
    @endif
    
    @hasSection('twitter_image')
        <meta name="twitter:image" content="@yield('twitter_image')" />
    @elseif(View::hasSection('og_image'))
        <meta name="twitter:image" content="@yield('og_image')" />
    @endif
    
    {{-- Favicon --}}
    <link rel="icon" href="{{ asset('images/favicon.png') }}" />
    <!-- Bootstrap CSS -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap/4.6.2/css/bootstrap.min.css" />
    <!-- Font Awesome -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.0/css/all.min.css">
    <!-- Custom Styles -->
    <link href="{{ asset('css/app.css') }}" rel="stylesheet">
    @yield('css_js')
    <script src="{{ asset('js/app_minified.js') }}" defer></script>
    <!-- Set CSS Vars via JS -->
    <script>
        document.addEventListener("DOMContentLoaded", function() {
            const root = document.querySelector(':root');
            root.style.setProperty('--color1', "{{ config('color1') }}");
            root.style.setProperty('--color2', "{{ config('color2') }}");
            root.style.setProperty('--color3', "{{ config('color3') }}");
        });

    </script>
    <style>
        /* Mobile menu styles only - desktop navbar removed */
        
        /* Mobile styles */
        .trip-mobile-header {
            display: none;
        }
        
        @media (max-width: 767.98px) {
            .trip-mobile-header {
                display: flex !important;
                justify-content: space-between;
                align-items: center;
                padding: 12px 16px;
                background: #fff;
                border-bottom: 1px solid #f1f1f1;
                z-index: 1100;
                position: relative;
                top: 0;
                left: 0;
                right: 0;
                width: 100%;
            }

            .trip-mobile-header .logo {
                height: 32px;
            }

            .trip-mobile-header .mobile-menu-btn {
                background: none;
                border: none;
                font-size: 2em;
                color: #276153;
                outline: none;
            }

            .trip-mobile-menu {
                display: none;
                background: #fff;
                position: fixed; /* Fixed position for proper overlay */
                left: 0;
                top: 56px; /* Position below the header */
                width: 100vw;
                box-shadow: 0 6px 24px rgba(0, 0, 0, 0.06);
                border-bottom-left-radius: 14px;
                border-bottom-right-radius: 14px;
                padding: 18px 18px 12px 18px;
                z-index: 1200;
                animation: fadeDown .32s;
                max-height: calc(100vh - 56px);
                overflow-y: auto;
            }

            .trip-mobile-menu.show {
                display: block;
            }

            .trip-mobile-menu .trip-link {
                display: flex;
                gap: 12px;
                align-items: center;
                font-size: 1.08em;
                color: black;
                border: none;
                border-radius: 7px;
                margin-bottom: 10px;
                padding: 12px 14px;
                transition: background 0.18s;
                text-decoration: none;
                font-weight: 500;
            }

            .trip-mobile-menu .trip-link i {
                margin-right: 10px;
                font-size: 1.1em;
                min-width: 20px;
                text-align: center;
            }

            .trip-mobile-menu .trip-link:last-child {
                margin-bottom: 0;
            }

            .trip-mobile-menu .btn-main {
                background: #276153;
                color: #fff;
                justify-content: center;
                font-weight: 600;
            }

            .trip-mobile-menu .trip-searchbox {
                margin-bottom: 18px;
            }

            .trip-mobile-menu .dropdown {
                margin-top: 8px;
                margin-bottom: 8px;
            }

            @keyframes fadeDown {
                from {
                    opacity: 0;
                    transform: translateY(-18px);
                }

                to {
                    opacity: 1;
                    transform: translateY(0);
                }
            }
        }
        
        /* On desktop, hide mobile elements */
        @media (min-width: 768px) {
            .trip-mobile-header,
            .trip-mobile-menu {
                display: none !important;
            }
        }

    </style>
</head>
<body class="site {{ $isNotSticky ? '' : 'sticky' }}">
    <!-- DESKTOP HEADER -->
    <div class="nav-container d-none d-md-flex {{ $isNotSticky ? '' : 'sticky' }}">
        <div class="container-fluid px-4 d-flex align-items-center justify-content-between">
            <div class="head-left">
                <a class="navbar-brand" href="/">
                    <img src="{{ $isNotSticky ? asset(config('logo')): asset('images/logo-light.png') }}" alt="Logo">
                </a>
            </div>
            <div class="head-center">
                <div class="nav-searchbar">
                    <div class="nav-searchbar__content">
                        <input type="text" placeholder="{{ __('navigation.searchPlaceholder') }}" id="nav_searchbar__txt" />
                    </div>
                    <div class="nav-searchbar__btn">
                        <button id="nav_searchbar__btn"><i class="fa-solid fa-magnifying-glass"></i></button>
                    </div>
                </div>
            </div>
            <div class="head-navs d-flex align-items-center">
                <div class="dropdown head-navs-item">
                    <a class="dropdown-toggle d-flex align-items-center" href="#" id="langDropdown" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        <img class="flag-img" src="{{ asset(app()->getLocale() == 'fr' ? 'images/fr.png' : (app()->getLocale() == 'es' ? 'images/es.png' : 'images/en.png')) }}" alt="{{ strtoupper(app()->getLocale()) }}" style="width:20px;">
                        <span class="ml-2 text-uppercase lang-name">{{ strtoupper(app()->getLocale()) }}</span>
                    </a>
                    <div class="dropdown-menu dropdown-menu-right" aria-labelledby="langDropdown">
                        <a class="dropdown-item d-flex align-items-center" href="#" onclick="setLanguage('en'); return false;">
                            <img src="{{ asset('images/en.png') }}" style="width:20px;"> <span class="ml-2">English</span>
                        </a>
                        <a class="dropdown-item d-flex align-items-center" href="#" onclick="setLanguage('fr'); return false;">
                            <img src="{{ asset('images/fr.png') }}" style="width:20px;"> <span class="ml-2">Français</span>
                        </a>
                        <a class="dropdown-item d-flex align-items-center" href="#" onclick="setLanguage('es'); return false;">
                            <img src="{{ asset('images/es.png') }}" style="width:20px;"> <span class="ml-2">Español</span>
                        </a>
                    </div>
                </div>
                <div class="dropdown head-navs-item">
                    <a class="dropdown-toggle d-flex align-items-center" href="#" id="catDropdown" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        {{ __('navigation.travelShop') }}
                    </a>
                    <div class="dropdown-menu dropdown-menu-right catDropdown" aria-labelledby="catDropdown">
                        <a href="/category/car-rental" class="dropdown-item d-flex align-items-center"><span class="icon"><i class="fa fa-car"></i></span> {{ __('navigation.carRentals') }}</a>
                        <a href="/category/private-driver" class="dropdown-item d-flex align-items-center"><span class="icon"><i class="fa fa-user-tie"></i></span> {{ __('navigation.privateDrivers') }}</a>
                        <a href="/category/boats" class="dropdown-item d-flex align-items-center"><span class="icon"><i class="fa fa-ship"></i></span> {{ __('navigation.boatRentals') }}</a>
                        <a href="/category/things-to-do" class="dropdown-item d-flex align-items-center"><span class="icon"><i class="fa fa-compass"></i></span> {{ __('navigation.thingsToDo') }}</a>
                    </div>
                </div>
                <a href="/support" class="head-navs-item">{{ __('navigation.supportHelpCenter') }} <span class="head-navs-icon"><i class="fa-solid fa-headset"></i></span></a>
                <a href="/list-your-property" class="head-navs-item">{{ __('navigation.listProperty') }}</a>
            </div>
        </div>
    </div>

    <div class="d-block d-md-none">
        <div class="trip-mobile-header">
            <a href="/" class="logo"><img src="{{ asset('images/logo.png') }}" alt="Logo" class="logo"></a>
            <button class="mobile-menu-btn" id="openTripMenu" type="button"> <i class="fa fa-bars"></i></button>
        </div>
        <div class="trip-mobile-menu" id="tripMenuPanel">
            <!-- Search bar -->
            <form class="trip-searchbox" action="/search" method="get">
                <div class="input-group">
                    <input type="text" name="q" class="form-control" placeholder="{{ __('navigation.searchPlaceholder') }}" style="
    padding: 10px;
    max-height: unset;
    height: 45px;
">
                    <div class="input-group-append">
                        <button class="btn btn-success" type="submit"><i class="fa-solid fa-magnifying-glass"></i></button>
                    </div>
                </div>
            </form>
            <!-- Menu links -->
            <a href="/category/car-rental" class="trip-link"><i class="fa fa-car"></i>{{ __('navigation.carRentals') }}</a>
            <a href="/category/private-driver" class="trip-link"><i class="fa fa-user-tie"></i>{{ __('navigation.privateDrivers') }}</a>
            <a href="/category/boats" class="trip-link"><i class="fa fa-ship"></i>{{ __('navigation.boatRentals') }}</a>
            <a href="/category/things-to-do" class="trip-link"><i class="fa fa-compass"></i>{{ __('navigation.thingsToDo') }}</a>
            <a href="/support" class="trip-link"><i class="fa fa-headset"></i>{{ __('navigation.supportHelpCenter') }}</a>
            <a href="/list-your-property" class="trip-link btn btn-main mt-1 mb-2" style="color:#fff;">{{ __('navigation.listProperty') }}</a>
            <!-- Language Switcher -->
            <div class="dropdown">
                <button class="d-flex align-items-center dropdown-toggle" type="button" id="langMobileDropdown" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    <img class="flag-img" src="{{ asset(app()->getLocale() == 'fr' ? 'images/fr.png' : (app()->getLocale() == 'es' ? 'images/es.png' : 'images/en.png')) }}" alt="{{ strtoupper(app()->getLocale()) }}" style="width:20px;">
                    <span class="ml-2 text-uppercase lang-name">EN</span>
                </button>
                <div class="dropdown-menu w-100" aria-labelledby="langMobileDropdown">
                    <a class="dropdown-item d-flex align-items-center" href="#" onclick="setLanguage('en'); return false;">
                        <img src="{{ asset('images/en.png') }}" style="width:20px;"> <span class="ml-2">English</span>
                    </a>
                    <a class="dropdown-item d-flex align-items-center" href="#" onclick="setLanguage('fr'); return false;">
                        <img src="{{ asset('images/fr.png') }}" style="width:20px;"> <span class="ml-2">Français</span>
                    </a>
                    <a class="dropdown-item d-flex align-items-center" href="#" onclick="setLanguage('es'); return false;">
                        <img src="{{ asset('images/es.png') }}" style="width:20px;"> <span class="ml-2">Español</span>
                    </a>
                </div>
            </div>

        </div>
    </div>

    <main>
        @yield('content')
    </main>

    <!-- Scripts -->
    <script src="https://code.jquery.com/jquery-3.6.1.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.1/dist/umd/popper.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/bootstrap/4.6.2/js/bootstrap.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.0/js/all.min.js"></script>
    <!-- React and ReactDOM -->
    <script crossorigin src="https://unpkg.com/react@18/umd/react.production.min.js"></script>
    <script crossorigin src="https://unpkg.com/react-dom@18/umd/react-dom.production.min.js"></script>
    <script src="{{ mix('js/dashboard.js') }}"></script>
    <script>
        // Trip.com-style mobile menu toggle
        $(document).ready(function() {
            $('#openTripMenu').on('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                $('#tripMenuPanel').toggleClass('show');
            });
            // Hide menu if click outside
            $(document).on('click', function(e) {
                if (!$(e.target).closest('#tripMenuPanel, #openTripMenu').length) {
                    $('#tripMenuPanel').removeClass('show');
                }
            });
            // Hide menu on link click
            $('#tripMenuPanel .trip-link').on('click', function() {
                $('#tripMenuPanel').removeClass('show');
            });
        });

        // Initialize language display on page load
        $(document).ready(function() {
            let lang = getCurrentLanguage();
            
            // Update flag and text based on current language
            if (lang === 'fr') { 
                flagImg = '/images/fr.png'; 
            } else if (lang === 'es') { 
                flagImg = '/images/es.png'; 
            } else { 
                flagImg = '/images/en.png'; 
            }
            
            $('.flag-img').attr('src', flagImg);
            $('.lang-name').text(lang.toUpperCase());
        });

        let flagImg = '/images/en.png';

        function setLanguage(lang) {
            // Validate language
            const supportedLanguages = ['en', 'fr', 'es'];
            if (!supportedLanguages.includes(lang)) {
                console.warn('Unsupported language:', lang);
                return;
            }

            // Update UI immediately for feedback
            if (lang === 'fr') {
                flagImg = '/images/fr.png';
            } else if (lang === 'es') {
                flagImg = '/images/es.png';
            } else {
                flagImg = '/images/en.png';
            }
            $('.flag-img').attr('src', flagImg);
            $('.lang-name').text(lang.toUpperCase());

            // Save preference
            localStorage.setItem('i18nextLng', lang);
            
            // Set cookie for Laravel backend
            const expires = new Date();
            expires.setTime(expires.getTime() + 365 * 24 * 60 * 60 * 1000);
            document.cookie = `i18nextLng=${lang};expires=${expires.toUTCString()};path=/`;

            // Update URL for proper routing
            var currentPath = window.location.pathname;
            var hasLocale = /^\/(en|fr|es)(\/|$)/.test(currentPath);
            var newPath = currentPath;
            
            if (hasLocale) {
                // Replace existing locale
                newPath = currentPath.replace(/^\/(en|fr|es)/, '/' + lang);
            } else {
                // Add locale prefix
                newPath = '/' + lang + currentPath;
            }
            
            // Reload the page to get new translations from server
            // This is necessary for Laravel blade templates to update
            window.location.href = newPath + window.location.search + window.location.hash;
        }

        // Get current language from URL or localStorage
        function getCurrentLanguage() {
            // First check URL for locale
            var currentPath = window.location.pathname;
            var urlMatch = currentPath.match(/^\/(en|fr|es)(\/|$)/);
            if (urlMatch) {
                return urlMatch[1];
            }
            // Fall back to localStorage
            return localStorage.getItem('i18nextLng') || 'en';
        }
        

    </script>
</body>
</html>
