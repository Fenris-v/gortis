$(document).ready(() => {
    /**
     * SLICK
     */
    $('.news__items').slick({
        infinite: true,
        arrows: false,
        dots: true,
        slidesToShow: 3,
        autoplay: true,
        autoplaySpeed: 4000,
        speed: 1000,
        responsive: [{
            breakpoint: 640,
            settings: {
                slidesToShow: 1
            }
        }]
    });

    /**
     * HAMBURGER
     */
    $('.menu-toggle-inner').on('click', () => {
        $('.adaptive-menu-toggle').toggleClass('adaptive-menu-toggle--open');
        $('.headerNav_adaptive').toggleClass('header_opened');
    });

    /**
     * MENU
     */
    $('.header__nav a').on('mouseenter', (e) => {
        var parent = $(e.target).parent('li');
        var el = parent.find('.submenu');

        if (el.length > 0) {
            $(el[0]).css('display', 'flex');
        }
    });

    $('.header__nav li').on('mouseleave', (e) => {
        var parent = $(e.target).parent('li');
        var el = parent.find('.submenu');

        if (el.length > 0) {
            $(el[0]).css('display', 'none');
        }
    });

    // Is mobile object

    var isMobile = {
        Android: function() {
            return navigator.userAgent.match(/Android/i);
        },
        BlackBerry: function() {
            return navigator.userAgent.match(/BlackBerry/i);
        },
        iOS: function() {
            return navigator.userAgent.match(/iPhone|iPad|iPod/i);
        },
        Opera: function() {
            return navigator.userAgent.match(/Opera Mini/i);
        },
        Windows: function() {
            return navigator.userAgent.match(/IEMobile/i) || navigator.userAgent.match(/WPDesktop/i);
        },
        any: function() {
            return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
        }
    };
    
    if(isMobile.any() && window.innerWidth < 1100) {
        // mobile submenu

        $('.adaptive-menu__link.has_child').on('click', function(e) {
            e.preventDefault();
            $(this).next( ".menu_2levelList").slideToggle( "slow", function() {
                // Animation complete.
            });
            $(this).toggleClass('iconRotated');

        });

    }


    /**
     * FANCYBOX
     */
    $('[data-fancybox-modal]').fancybox({
        trapFocus: true,
        autoFocus: false,
        touch: false,
    });
});
