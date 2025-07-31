$(document).ready(function() {

    try{
        $(".select2-single").select2();
    }catch(e){

    }
    

    //Ajax header
    $.ajaxSetup({
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        }
    });

    //Initialize dataTable
    $('#dataTables').DataTable({
        "aLengthMenu": [
            [5, 10, 25, -1],
            [5, 10, 25, "All"]
        ],
        "iDisplayLength": 10,

        "language": {
            "sProcessing": "chargement ...",
            "sLengthMenu": "Show _MENU_",
            "sZeroRecords": "Aucun résultat",
            "sInfo": "إظهار _START_ إلى _END_ من أصل _TOTAL_ مدخل",
            "sInfo": "_START_ à _END_",
            "sInfoEmpty": "",
            "sInfoFiltered": "",
            "sInfoPostFix": "",
            "sSearch": "Search:",
            "sUrl": "",
            "oPaginate": {
                "sFirst": "|<",
                "sPrevious": "Previous",
                "sNext": "Next",
                "sLast": ">|"
            }
        }
    });

    //Initialize owl carousel
    $('.owl-carousel').owlCarousel({
        loop: true,
        margin: 10,
        dots: false,
        nav: true,
        mouseDrag: false,
        autoplay: true,
        animateOut: 'slideOutUp',
        responsive: {
            0: {
                items: 1
            },
            600: {
                items: 1
            },
            1000: {
                items: 1
            }
        }
    });


    // Select all links with hashes
    $('a[href*="#"]')
        // Remove links that don't actually link to anything
        .not('[href="#"]')
        .not('[href="#0"]')
        .click(function(event) {
            // On-page links
            if (
                location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') &&
                location.hostname == this.hostname
            ) {
                // Figure out element to scroll to
                var target = $(this.hash);
                target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
                // Does a scroll target exist?
                if (target.length) {
                    // Only prevent default if animation is actually gonna happen
                    event.preventDefault();
                    $('html, body').animate({
                        scrollTop: target.offset().top
                    }, 1000, function() {
                        // Callback after animation
                        // Must change focus!
                        var $target = $(target);
                        $target.focus();
                        if ($target.is(":focus")) { // Checking if the target was focused
                            return false;
                        } else {
                            $target.attr('tabindex', '-1'); // Adding tabindex for elements not focusable
                            $target.focus(); // Set focus again
                        };
                    });
                }
            }
        });

    $('.nbr-up').each(function() {
        var $this = $(this);
        jQuery({ Counter: 0 }).animate({ Counter: $this.attr('data-stop') }, {
            duration: 1000,
            easing: 'swing',
            step: function(now) {
                $this.text(Math.ceil(now));
            }
        });
    });

    $('#filterFrm').submit(function(e) {
        e.preventDefault();

    });

    $('body').on('click', '.delete', function() {
        let id = $(this).data('id');
    });

    $('.filter-header').click(function(){
        $('#filterSection').collapse('toggle');
        $('.icon-chevron').toggleClass('d-none');
    });
});