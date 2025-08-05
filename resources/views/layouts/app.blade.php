@php
$isNotSticky = (
request()->is('/') ||
request()->is('city/*') ||
request()->is('details/*') ||
request()->is('car-search') ||
request()->is('private-search') ||
request()->is('boat-search') ||
request()->is('thingstodo-search') ||
request()->is('agency/*') ||
request()->is('blog') ||
request()->is('terms-conditions') ||
request()->is('privacy-policy') ||
request()->is('cookie-policy') ||
request()->is('cancellation-policy') ||
request()->is('insurance-conditions') ||
request()->is('article/*')
);
@endphp
<!doctype html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    @yield('meta')
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <title>@yield('title')</title>
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
        .sticky {
            position: sticky;
            top: 0;
            z-index: 1000;
            background: #fafefc;
        }

        @media (max-width: 767.98px) {
            .trip-mobile-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 12px 16px;
                background: #fff;
                border-bottom: 1px solid #f1f1f1;
                z-index: 1100;
                position: relative;
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
                position: fixed;
                left: 0;
                top: 60px;
                width: 100vw;
                box-shadow: 0 6px 24px rgba(0, 0, 0, 0.06);
                border-bottom-left-radius: 14px;
                border-bottom-right-radius: 14px;
                padding: 18px 18px 12px 18px;
                z-index: 1200;
                animation: fadeDown .32s;
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

    </style>
</head>
<body class="site {{ $isNotSticky ? '' : 'sticky' }}">
    <div id="google_translate_element" style="display:none"></div>
    <script type="text/javascript">
        function googleTranslateElementInit() {
            new google.translate.TranslateElement({
                pageLanguage: 'en'
                , includedLanguages: 'en,fr,es'
                , autoDisplay: false
            }, 'google_translate_element');
        }

    </script>
    <script src="//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"></script>
    <!-- DESKTOP HEADER (unchanged, your design) -->
    <div class="nav-container d-none d-md-flex {{ $isNotSticky ? '' : 'sticky' }}">
        <div class="head-left">
            <a class="navbar-brand" href="/">
                <img src="{{ $isNotSticky ? asset(config('logo')): asset('images/logo-light.png') }}" alt="Logo">
            </a>
        </div>
        <div class="head-center">
            <div class="nav-searchbar">
                <div class="nav-searchbar__content">
                    <input type="text" placeholder="Listing, City, etc" id="nav_searchbar__txt" />
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
                    <span class="ml-2 text-uppercase" class="lang-name">EN</span>
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
                    Travel Shop
                </a>
                <div class="dropdown-menu dropdown-menu-right catDropdown" aria-labelledby="catDropdown">
                    <a href="/category/car-rental" class="dropdown-item d-flex align-items-center"><span class="icon"><i class="fa fa-car"></i></span> Car Rentals</a>
                    <a href="/category/private-driver" class="dropdown-item d-flex align-items-center"><span class="icon"><i class="fa fa-user-tie"></i></span> Private Drivers</a>
                    <a href="/category/boats" class="dropdown-item d-flex align-items-center"><span class="icon"><i class="fa fa-ship"></i></span> Boat Rentals</a>
                    <a href="/category/things-to-do" class="dropdown-item d-flex align-items-center"><span class="icon"><i class="fa fa-compass"></i></span> Things to Do</a>
                </div>
            </div>
            <a href="/support" class="head-navs-item">Support / Help Center <span class="head-navs-icon"><i class="fa-solid fa-headset"></i></span></a>
            <a href="/list-your-property" class="head-navs-item">List Your Property</a>
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
                    <input type="text" name="q" class="form-control" placeholder="Listing, City, etc" style="
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
            <a href="/category/car-rental" class="trip-link"><i class="fa fa-car"></i>Car Rentals</a>
            <a href="/category/private-driver" class="trip-link"><i class="fa fa-user-tie"></i>Private Drivers</a>
            <a href="/category/boats" class="trip-link"><i class="fa fa-ship"></i>Boat Rentals</a>
            <a href="/category/things-to-do" class="trip-link"><i class="fa fa-compass"></i>Things to Do</a>
            <a href="/support" class="trip-link"><i class="fa fa-headset"></i>Support / Help Center</a>
            <a href="/list-your-property" class="trip-link btn btn-main mt-1 mb-2" style="color:#fff;">List Your Property</a>
            <!-- Language Switcher -->
            <div class="dropdown">
                <button class="d-flex align-items-center dropdown-toggle" type="button" id="langMobileDropdown" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    <img class="flag-img" src="{{ asset(app()->getLocale() == 'fr' ? 'images/fr.png' : (app()->getLocale() == 'es' ? 'images/es.png' : 'images/en.png')) }}" alt="{{ strtoupper(app()->getLocale()) }}" style="width:20px;">
                    <span class="ml-2 text-uppercase" class="lang-name">EN</span>
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

        let flagImg = '/images/en.png';

        function setLanguage(lang) {
            // Wait for widget to load
            var combo = document.querySelector('select.goog-te-combo');

            if (!combo) {
                setTimeout(function() {
                    setLanguage(lang);
                }, 500);
                return;
            }
            combo.value = lang;

            if (lang === 'fr') {
                flagImg = '/images/fr.png';
            } else if (lang === 'es') {
                flagImg = '/images/es.png';
            }

            $('.flag-img').attr('src', flagImg)
            localStorage.setItem('lang', lang);
            combo.dispatchEvent(new Event('change'));
        }

        let lang = localStorage.getItem('lang') || 'en';

        if (lang === 'fr') {
            flagImg = '/images/fr.png';
        } else if (lang === 'es') {
            flagImg = '/images/es.png';
        }
        $('.flag-img').attr('src', flagImg);

    </script>
</body>
</html>
