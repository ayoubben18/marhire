<!doctype html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <!-- CSRF Token -->
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <title>{{ config('business_name', 'Laravel') . ' - '}} @yield('title')</title>

    <script>
        const root = document.querySelector(':root');

        root.style.setProperty('--color1', "{{ config('color1') }}");
        root.style.setProperty('--color2', "{{ config('color2') }}");
        root.style.setProperty('--color3', "{{ config('color3') }}");

        function getCookie(name) {
            let nameEQ = name + "=";
            let ca = document.cookie.split(';');
            for(let i = 0; i < ca.length; i++) {
                let c = ca[i];
                while (c.charAt(0) == ' ') c = c.substring(1, c.length);
                if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
            }
            return null;
        }

        //sidebar
        let sidebarStatus = getCookie('sidebarStatus');

    </script>

    <!-- Favicon -->
    <link rel="icon"  href="{{ asset('images/favicon.ico') }}"/>
    
    <!-- Fonts -->
    <link rel="dns-prefetch" href="//fonts.gstatic.com">
    <link href="https://fonts.googleapis.com/css?family=Nunito" rel="stylesheet">

    <!-- Jquery -->
    <script type="text/javascript" src="https://cdn.jsdelivr.net/jquery/latest/jquery.min.js"></script>
    
    <!-- Bootstrap -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/bootstrap/4.6.2/js/bootstrap.min.js" integrity="sha512-7rusk8kGPFynZWu26OKbTeI+QPoYchtxsmPeBqkHIEXJxeun4yJ4ISYe7C6sz9wdxeE1Gk3VxsIWgCZTc+vX3g==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap/4.6.2/css/bootstrap.min.css" integrity="sha512-rt/SrQ4UNIaGfDyEXZtNcyWvQeOq0QLygHluFQcSjaGB04IxWhal71tKuzP6K8eYXYB6vJV4pHkXcmFGGQ1/0w==" crossorigin="anonymous" referrerpolicy="no-referrer" />

    <!-- Font Awesome -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.0/css/all.min.css" integrity="sha512-xh6O/CkQoPOWDdYTDqeRdPCVd1SpvCA9XXcUnZS2FmJNp1coAFzvtCN9BmamE+4aHK8yyUHUSCcJHgXloTyT2A==" crossorigin="anonymous" referrerpolicy="no-referrer" />
    <script src="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.0/js/all.min.js" integrity="sha512-naukR7I+Nk6gp7p5TMA4ycgfxaZBJ7MO5iC3Fp6ySQyKFHOGfpkSZkYVWV5R7u7cfAicxanwYQ5D1e17EfJcMA==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>

    <!-- Owl JS -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/OwlCarousel2/2.3.4/assets/owl.carousel.min.css" integrity="sha512-tS3S5qG0BlhnQROyJXvNjeEM4UpMXHrQfTGmbQ1gKmelCxlSEBUaxhRBj/EFTzpbP4RVSrpEikbmdJobCvhE3g==" crossorigin="anonymous" referrerpolicy="no-referrer" />
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/OwlCarousel2/2.3.4/assets/owl.theme.default.min.css" integrity="sha512-sMXtMNL1zRzolHYKEujM2AqCLUR9F2C4/05cdbxjjLSRvMQIciEPCQZo++nk7go3BtSuK9kfa/s+a4f4i5pLkw==" crossorigin="anonymous" referrerpolicy="no-referrer" />
    <script src="https://cdnjs.cloudflare.com/ajax/libs/OwlCarousel2/2.3.4/owl.carousel.min.js" integrity="sha512-bPs7Ae6pVvhOSiIcyUClR7/q2OAsRiovw4vAkX+zJbw3ShAeeqezq50RIIcIURq7Oa20rW2n2q+fyXBNcU9lrw==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>

    <!-- FullCalendar -->
    <link href="https://cdn.jsdelivr.net/npm/fullcalendar@6.1.8/index.global.min.css" rel="stylesheet">
    
    <!-- DataTables -->
    <link rel="stylesheet" type="text/css" href="https://cdn.datatables.net/1.13.1/css/jquery.dataTables.css">
    <script type="text/javascript" charset="utf8" src="https://cdn.datatables.net/1.13.1/js/jquery.dataTables.js"></script>

    <script src="https://cdn.datatables.net/responsive/2.4.0/js/dataTables.responsive.min.js"></script>
    
    <!-- DataTables Scroller JS -->
    <script src="https://cdn.datatables.net/scroller/2.0.7/js/dataTables.scroller.min.js"></script>
    
    <!-- Select2 -->
    <link href="https://cdn.jsdelivr.net/npm/select2@4.1.0-beta.1/dist/css/select2.min.css" rel="stylesheet" />
    <script src="https://cdn.jsdelivr.net/npm/select2@4.1.0-beta.1/dist/js/select2.min.js"></script>

    <!-- Themify Icons --> 
    <link rel="stylesheet" type="text/css" href=" {{ asset('css/libs/themify-icons.css') }}">

    <!-- DateRangePicker -->
    <script type="text/javascript" src="https://cdn.jsdelivr.net/momentjs/latest/moment-with-locales.min.js"></script>
    <script type="text/javascript" src="https://cdn.jsdelivr.net/npm/daterangepicker/daterangepicker.min.js"></script>
    <link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/npm/daterangepicker/daterangepicker.css" />

    <!-- Scripts -->
    <script src="{{ asset('js/app.js') }}" defer></script>

    <!-- Styles -->
    <link href="{{ asset('css/dashboard.css') }}" rel="stylesheet">
    <link href="{{ asset('css/app.css') }}" rel="stylesheet">

    <style>
        .notification-dropdown .icon-status-info:after{
            display: none;
        }
        .notification-dropdown.unseen .icon-status-info:after{
            display: inline-block;
        }
    </style>
</head>
<body class="nk-body bg-lighter npc-general has-sidebar ">
    <div class="nk-app-root">
        <div class="nk-main ">
            <div class="nk-sidebar nk-sidebar-fixed is-dark is-compact" data-content="sidebarMenu">
                <div class="nk-sidebar-element nk-sidebar-head">
                    <div class="nk-menu-trigger">
                        <a href="#" class="nk-nav-toggle nk-quick-nav-icon d-xl-none" data-target="sidebarMenu"><em class="icon ni ni-arrow-left"></em></a>
                        <a href="#" class="nk-nav-compact nk-quick-nav-icon d-none d-xl-inline-flex" data-target="sidebarMenu"><em class="icon ni ni-menu"></em></a>
                    </div>
                    <div class="nk-sidebar-brand">
                        {{--
                        <a href="{{ route('dashboard.index') }}" class="logo-link nk-sidebar-logo d-none">
                            <img class="logo-light logo-img" src="./images/logo.png" srcset="./images/logo2x.png 2x" alt="logo">
                            <img class="logo-dark logo-img" src="./images/logo-dark.png" srcset="./images/logo-dark2x.png 2x" alt="logo-dark">
                        </a>
                        --}}
                    </div>
                </div>
                <div class="nk-sidebar-element nk-sidebar-body">
                    <div class="nk-sidebar-content">
                        <div class="nk-sidebar-menu" data-simplebar>
                            <ul class="nk-menu">
                                <li class="nk-menu-item">
                                    <a href="{{ route('dashboard.index') }}" class="nk-menu-link">
                                        <span class="nk-menu-icon"><em class="icon ni ni-home"></em></span>
                                        <span class="nk-menu-text">Dashboard</span>
                                    </a>
                                </li>
                                
                                <li class="nk-menu-item has-sub">
                                    <a href="javascript:void(0);" class="nk-menu-link nk-menu-toggle">
                                        <span class="nk-menu-icon"><em class="icon ni ni-calender-date"></em></span>
                                        <span class="nk-menu-text">Bookings</span>
                                    </a>
                                    <ul class="nk-menu-sub">
                                        <li class="nk-menu-item">
                                            <a href="{{ route('bookings.list') }}" class="nk-menu-link"><span class="nk-menu-text">List</span></a>
                                        </li>
                                        <li class="nk-menu-item">
                                            <a href="{{ route('bookings.new') }}" class="nk-menu-link"><span class="nk-menu-text">New Booking</span></a>
                                        </li>
                                    </ul>
                                </li>

                                <li class="nk-menu-item has-sub">
                                    <a href="javascript:void(0);" class="nk-menu-link nk-menu-toggle">
                                        <span class="nk-menu-icon"><em class="icon ti ti-car"></em></span>
                                        <span class="nk-menu-text">Listings</span>
                                    </a>
                                    <ul class="nk-menu-sub">
                                        <li class="nk-menu-item">
                                            <a href="{{ route('listings.list') }}" class="nk-menu-link"><span class="nk-menu-text">List</span></a>
                                        </li>
                                        <li class="nk-menu-item">
                                            <a href="{{ route('listings.add') }}" class="nk-menu-link"><span class="nk-menu-text">New Listing</span></a>
                                        </li>
                                    </ul>
                                </li>

                                <li class="nk-menu-item has-sub">
                                    <a href="javascript:void(0);" class="nk-menu-link nk-menu-toggle">
                                        <span class="nk-menu-icon"><em class="icon ti ti-briefcase"></em></span>
                                        <span class="nk-menu-text">Agencies</span>
                                    </a>
                                    <ul class="nk-menu-sub">
                                        <li class="nk-menu-item">
                                            <a href="{{ route('agencies.list') }}" class="nk-menu-link"><span class="nk-menu-text">List</span></a>
                                        </li>
                                        <li class="nk-menu-item">
                                            <a href="{{ route('agencies.add') }}" class="nk-menu-link"><span class="nk-menu-text">New agency</span></a>
                                        </li>
                                    </ul>
                                </li>

                                <li class="nk-menu-item has-sub">
                                    <a href="{{ route('categories.list') }}" class="nk-menu-link">
                                        <span class="nk-menu-icon"><em class="icon ti ti-bookmark-alt"></em></span>
                                        <span class="nk-menu-text">Categories</span>
                                    </a>
                                </li>

                                <li class="nk-menu-item has-sub">
                                    <a href="{{ route('subcategories.list') }}" class="nk-menu-link">
                                        <span class="nk-menu-icon"><em class="icon ti ti-view-list"></em></span>
                                        <span class="nk-menu-text">Subcategories</span>
                                    </a>
                                </li>
                                <li class="nk-menu-item has-sub">
                                    <a href="{{ route('pages.list') }}" class="nk-menu-link">
                                        <span class="nk-menu-icon"><em class="icon ti ti-view-list"></em></span>
                                        <span class="nk-menu-text">Pages</span>
                                    </a>
                                </li>

                                <li class="nk-menu-item has-sub">
                                    <a href="javascript:void(0);" class="nk-menu-link nk-menu-toggle">
                                        <span class="nk-menu-icon"><em class="icon ni ni-puzzle"></em></span>
                                        <span class="nk-menu-text">Addons</span>
                                    </a>
                                    <ul class="nk-menu-sub">
                                        <li class="nk-menu-item">
                                            <a href="{{ route('listingaddons.list') }}" class="nk-menu-link"><span class="nk-menu-text">List</span></a>
                                        </li>
                                        <li class="nk-menu-item">
                                            <a href="{{ route('listingaddons.new') }}" class="nk-menu-link"><span class="nk-menu-text">New addon</span></a>
                                        </li>
                                    </ul>
                                </li>
                                
                                <li class="nk-menu-item has-sub">
                                    <a href="javascript:void(0);" class="nk-menu-link nk-menu-toggle">
                                        <span class="nk-menu-icon"><em class="icon ni ni-ticket-alt"></em></span>
                                        <span class="nk-menu-text">Coupons</span>
                                    </a>
                                    <ul class="nk-menu-sub">
                                        <li class="nk-menu-item">
                                            <a href="{{ route('coupons.list') }}" class="nk-menu-link"><span class="nk-menu-text">List</span></a>
                                        </li>
                                        <li class="nk-menu-item">
                                            <a href="{{ route('coupons.new') }}" class="nk-menu-link"><span class="nk-menu-text">New Coupon</span></a>
                                        </li>
                                    </ul>
                                </li>

                                <li class="nk-menu-item has-sub">
                                    <a href="{{ route('cities.list') }}" class="nk-menu-link">
                                        <span class="nk-menu-icon"><em class="icon ti ti-location-pin"></em></span>
                                        <span class="nk-menu-text">Cities</span>
                                    </a>
                                </li>
                                <li class="nk-menu-item has-sub">
                                    <a href="{{ route('articles.list') }}" class="nk-menu-link">
                                        <span class="nk-menu-icon"><em class="icon ti ti-agenda"></em></span>
                                        <span class="nk-menu-text">Articles</span>
                                    </a>
                                </li>
                                <li class="nk-menu-item has-sub">
                                    <a href="{{ route('terms.list') }}" class="nk-menu-link">
                                        <span class="nk-menu-icon"><em class="icon ti ti-agenda"></em></span>
                                        <span class="nk-menu-text">Terms</span>
                                    </a>
                                </li>
                                
                                <li class="nk-menu-item has-sub">
                                    <a href="#" class="nk-menu-link nk-menu-toggle">
                                        <span class="nk-menu-icon"><em class="icon ni ni-users"></em></span>
                                        <span class="nk-menu-text">Users</span>
                                    </a>
                                    <ul class="nk-menu-sub">
                                        <li class="nk-menu-item">
                                            <a href="{{ route('list_utilisateurs') }}" class="nk-menu-link"><span class="nk-menu-text">Users list</span></a>
                                        </li>
                                    </ul>
                                </li>

                                <li class="nk-menu-item has-sub">
                                    <a href="javascript:void(0);" class="nk-menu-link nk-menu-toggle">
                                        <span class="nk-menu-icon"><em class="icon ni ni-bell"></em></span>
                                        <span class="nk-menu-text">Notifications</span>
                                    </a>
                                    <ul class="nk-menu-sub">
                                        <li class="nk-menu-item">
                                            <a href="{{ route('admin.email-templates.index') }}" class="nk-menu-link"><span class="nk-menu-text">Email Templates</span></a>
                                        </li>
                                        <li class="nk-menu-item">
                                            <a href="{{ route('admin.email-settings.index') }}" class="nk-menu-link"><span class="nk-menu-text">Email Settings</span></a>
                                        </li>
                                        <li class="nk-menu-item">
                                            <a href="{{ route('admin.email-history') }}" class="nk-menu-link"><span class="nk-menu-text">Email History</span></a>
                                        </li>
                                    </ul>
                                </li>

                                <li class="nk-menu-item has-sub">
                                    <a href="#" class="nk-menu-link nk-menu-toggle">
                                        <span class="nk-menu-icon"><em class="icon ti ti-settings"></em></span>
                                        <span class="nk-menu-text">Settings</span>
                                    </a>
                                    <ul class="nk-menu-sub">
                                        <li class="nk-menu-item">
                                            <a href="{{ route('parametrage.get') }}" class="nk-menu-link"><span class="nk-menu-text">Générale</span></a>
                                        </li>
                                    </ul>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <div class="nk-wrap ">
                <div class="nk-header nk-header-fixed is-light">
                    <div class="container-fluid">
                        <div class="nk-header-wrap">
                            <div class="nk-menu-trigger d-xl-none ml-n1">
                                <a href="#" class="nk-nav-toggle nk-quick-nav-icon" data-target="sidebarMenu"><em class="icon ni ni-menu"></em></a>
                            </div>
                            <div class="nk-header-brand">
                                <a href="{{ route('dashboard.index') }}" class="logo-link">
                                    <img class="logo-light logo-img" src="{{ asset(config('logo')) }}" srcset="{{ asset(config('logo')) }} 2x" alt="logo">
                                    <img class="logo-dark logo-img" src="{{ asset(config('logo')) }}" srcset="{{ asset(config('logo')) }} 2x" alt="logo-dark">
                                </a>
                            </div>
                            <div class="nk-header-news d-none d-xl-block">
                                <div class="nk-news-list">
                                   
                                </div>
                            </div>
                            <div class="nk-header-tools">
                                <ul class="nk-quick-nav">
                                    <li class="dropdown messages-dropdown mr-n1">
                                        <a href="#" class="dropdown-toggle nk-quick-nav-icon" data-toggle="dropdown" aria-expanded="false">
                                            <div class="icon-status icon-status-info"><em class="icon ni ni-chat-circle"></em></div>
                                        </a>
                                        <div class="dropdown-menu dropdown-menu-xl dropdown-menu-right dropdown-menu-s1" style="">
                                            <div class="dropdown-head">
                                                <span class="sub-title nk-dropdown-title">Messages</span>
                                                {{-- <a href="#">Mark All as Read</a> --}}
                                            </div>
                                            <div class="dropdown-body">
                                                <div class="nk-messages">

                                                </div>
                                            </div>
                                            {{-- <div class="dropdown-foot center">
                                                <a href="#">Voir Tous</a>
                                            </div> --}}
                                        </div>
                                    </li>
                                    <li class="dropdown notification-dropdown mr-n1">
                                        <a href="#" class="dropdown-toggle nk-quick-nav-icon" data-toggle="dropdown" aria-expanded="false">
                                            <div class="icon-status icon-status-info"><em class="icon ni ni-bell"></em></div>
                                        </a>
                                        <div class="dropdown-menu dropdown-menu-xl dropdown-menu-right dropdown-menu-s1" style="">
                                            <div class="dropdown-head">
                                                <span class="sub-title nk-dropdown-title">Notifications</span>
                                                {{-- <a href="#">Mark All as Read</a> --}}
                                            </div>
                                            <div class="dropdown-body">
                                                <div class="nk-notification">

                                                </div><!-- .nk-notification -->
                                            </div><!-- .nk-dropdown-body -->
                                            <div class="dropdown-foot center">
                                                <a href="#">See All</a>
                                            </div>
                                        </div>
                                    </li>
                                    <li class="dropdown user-dropdown">
                                        <a href="#" class="dropdown-toggle" data-toggle="dropdown">
                                            <div class="user-toggle">
                                                <div class="user-avatar sm">
                                                    <img class="pr-img" src="{{ asset(auth()->user()->image) }}">
                                                </div>
                                            </div>
                                        </a>
                                        <div class="dropdown-menu dropdown-menu-md dropdown-menu-right dropdown-menu-s1">
                                            <div class="dropdown-inner user-card-wrap bg-lighter d-none d-md-block">
                                                <div class="user-card">
                                                    <div class="user-avatar">
                                                        <img class="pr-img" src="{{ asset(auth()->user()->image) }}">
                                                    </div>
                                                    <div class="user-info">
                                                        <span class="lead-text">{{ auth()->user()->prenom . ' ' . auth()->user()->nom }}</span>
                                                        <span class="sub-text">{{ auth()->user()->email }}</span>
                                                    </div>

                                                </div>
                                            </div>
                                            <div class="dropdown-inner">
                                                <ul class="link-list">
                                                    <li><a href="{{ route('profile.get') }}"><em class="icon ni ni-user-alt"></em><span>My profile</span></a></li>
                                                    <li><a href="{{ route('parametrage.get') }}"><em class="icon ni ni-setting-alt"></em><span>Settings</span></a></li>
                                                </ul>
                                            </div>
                                            <div class="dropdown-inner">
                                                <ul class="link-list">
                                                    <form action="{{ route('logout') }}" method="post">
                                                        @csrf
                                                        <li><button class="btn btn-logout p-0" type="submit"><em class="icon ni ni-signout"></em><span>Logout</span></button></li>
                                                    </form>
                                                </ul>
                                            </div>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="nk-content ">
                    @yield('content')
                </div>
                <div class="nk-footer">
                    <div class="container-fluid">
                        <div class="nk-footer-wrap">
                            <div class="nk-footer-copyright"> &copy; {{ date("Y") }} {{ config('business_name') }}.
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div class="loader">
        <img src="{{ asset('images/loader.gif')}}"/>
    </div>

    <!-- JavaScript -->
    <script src="{{ asset('js/bundle.js?ver=2.9.0') }}"></script>
    <script src="{{ asset('js/scripts.js?ver=2.9.0') }}"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/sweetalert/2.1.2/sweetalert.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/fullcalendar@6.1.8/index.global.min.js"></script>

    <script>
        $.ajaxSetup({
            headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
            }
        });

        if(sidebarStatus == 'open')
        {
            $('.nk-sidebar-fixed').removeClass('is-compact');
            $('.nk-nav-compact').addClass('compact-active');
        }
        else
        {
            $('.nk-sidebar-fixed').addClass('is-compact');
            $('.nk-nav-compact').removeClass('compact-active');
        }

        $(document).ready(function(){
            var token = $('meta[name="csrf-token"]').attr('content');

            function makeAjaxCall() {
                $.ajax({
                    url: "{{ route('notifications.getNotifications')}}",
                    type: "post",
                    headers: {
                        'X-CSRF-TOKEN': token
                    },
                    dataType: 'json',
                    success: function(data){
                        $('.nk-notification').empty();
                        $('.nk-notification').html(data.html);

                        if(data.unseenNotificationsExist)
                        {
                            $('.notification-dropdown').addClass('unseen');
                        }
                        else
                        {
                            $('.notification-dropdown').removeClass('unseen');
                        }
                    }
                });

                $.ajax({
                    url: "{{ route('notifications.getMessages')}}",
                    type: "post",
                    headers: {
                        'X-CSRF-TOKEN': token
                    },
                    dataType: 'json',
                    success: function(data){
                        $('.nk-messages').empty();
                        $('.nk-messages').html(data.html);

                        if(data.unseenMessagesExist === true)
                        {
                            $('.messages-dropdown').addClass('unseen');
                        }
                        else
                        {
                            $('.messages-dropdown').removeClass('unseen');
                        }
                    }
                });
            }

            makeAjaxCall();
            setInterval(makeAjaxCall, 10000);

            $('body').on('click', '.notification-dropdown', function(){
                $.ajax({
                    url: "{{ route('notifications.seen')}}",
                    type: "post",
                    headers: {
                        'X-CSRF-TOKEN': token
                    },
                    success: function(data){
                        if(data == 'success')
                        {
                            $('.notification-dropdown').removeClass('unseen');
                        }
                    }
                });
            });

            $('body').on('click', '.messages-dropdown', function(){
                $.ajax({
                    url: "{{ route('notifications.seenMessages')}}",
                    type: "post",
                    headers: {
                        'X-CSRF-TOKEN': token
                    },
                    success: function(data){
                        if(data == 'success')
                        {
                            $('.messages-dropdown').removeClass('unseen');
                        }
                    }
                });
            });
            
        });

        $('.nk-nav-compact').click(function(){
            if($(this).hasClass('compact-active'))
            {
                setCookie('sidebarStatus', 'close', 1);
            }
            else
            {
                setCookie('sidebarStatus', 'open', 1);
            }
        });

        function setCookie(name, value, days) {
            let expires = "";
            if (days) {
                let date = new Date();
                date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
                expires = "; expires=" + date.toUTCString();
            }
            document.cookie = name + "=" + (value || "")  + expires + "; path=/";
        }

        
    </script>

    @stack('scripts')

</body>
</html>
