$( document ).ready(function() {
    function changeFooterPosition() {
        $screenHeight = $(window).height();
        $bodyHeight = $('body').height();
        $headerHeight = $('header.header-started').height();

        if( $screenHeight > ($bodyHeight + $headerHeight) ) {
            $('footer.page-footer').css({ position: 'absolute', bottom: 0, width: '100%' });
            $('body').css({ backgroundColor: '#f3f3f3' });
        } else {
            $('footer.page-footer').css({ position: 'initial', bottom: 'initial', width: 'initial' });
        }
    }

    $(window).resize(function() {
        changeFooterPosition();
    });

    changeFooterPosition();
});