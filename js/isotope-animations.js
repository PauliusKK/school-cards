$( document ).ready(function() {

    function changeFooterPosition() {
        $screenHeight = $(window).height();
        $postsHeight = $('section.content-posts').height();
        $navigationHeight = $('section.content-navigation').height();
        $headerHeight = $('header.header-started').height();
        $footerHeight = $('footer.page-footer').height();

        if( $(window).width() < 768 ) {
            $pageHeight = $postsHeight + $navigationHeight + $headerHeight + 50 + $footerHeight;
        } else {
            $pageHeight = $postsHeight + $navigationHeight + $headerHeight + 150 + $footerHeight;
        }

        if( $screenHeight > $pageHeight ) {
            $('footer.page-footer').css({ position: 'absolute', bottom: 0, width: '100%' });
        } else {
            $('footer.page-footer').css({ position: 'initial', bottom: 'initial', width: 'initial' });
        }
    }

    // Adds masonry animation to free-content page.
    function isotopeAnimation() {
        $container = $('section.content-posts .container');

        if( $(window).width() < 991 ) {
            $container.isotope({
                itemSelector: '.content-post',
                layoutMode: 'fitRows',
                fitRows: {
                    gutter: 20
                }
            });
        } else {
            $container.isotope({
                itemSelector: '.content-post',
                layoutMode: 'fitRows',
                fitRows: {
                    gutter: 40
                }
            });
        }

        $('section.content-navigation ul').on('click', 'a', function() {
            var filterValue = $(this).attr('data-filter');
            $container.isotope({ filter: filterValue });
            $container.isotope('layout');
            changeFooterPosition();

            $(this).parent().parent().find('li').each(function() {
                if( $(this).hasClass('active') ) $(this).removeClass('active');
            });

            $(this).parent().addClass('active');
        });
    }

    isotopeAnimation();

    $(window).resize(function() {
        changeFooterPosition();
        isotopeAnimation();
    });
});