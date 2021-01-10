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

    /**
     * FANCYBOX
     */
    $('[data-fancybox-modal]').fancybox({
        trapFocus: true,
        autoFocus: false,
        touch: false,
    });
});
