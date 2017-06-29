$(document).ready(function() {

    // Global variables
    $navigationActive = false;

    $fade = $('.fadeMe');
    $button = $('button.btn-navigation');
    $navigation = $('nav.menu-appear');
    $orderedNavigation = $('ol.navigation-ol');

    $bothLines = $button.find('span:nth-child(2), span:nth-child(5)');
    $middleLines = $button.find('span:nth-child(3), span:nth-child(4)');

    $transitionName = 'easeOutCubic';
    $transitionCloseName = 'easeInCubic';
    $animationTime = 300;
    $hoverTransitionTime = 400;

    function openNavigation() {
        // Variables
        $lines = $orderedNavigation.find('li').length;
        $x = 1;
        $navigationActive = true;

        // Moving the navigation to right: 0 instantly, without any animation, then animate the navigation footer to fade in.
        $navigation.stop(true, true).css({ right: 0 });
        $navigation.find('footer').stop(true, true).animate({ opacity: 1 }, $hoverTransitionTime, $transitionCloseName);

        if( $(window).width() < 768 ) {
            $fade.stop(true, true).delay(300).css({ display: 'inherit' }).animate({ opacity: '0.5' }, $animationTime, $transitionName);
            // $('html, body').css('overflow', 'hidden');
        } else {
            $fade.stop(true, true).delay(300).css({ display: 'inherit' }).animate({ opacity: '0.5' }, $animationTime, $transitionName);
        }

        // Using while function to find each line and animate it with giving 50ms delay, dublicating it for each transition.
        while($x < $lines) {

            // Fades in first 5 list items.
            if( $x <= 6 ) $orderedNavigation.find('li.front-line:nth-child(' + $x + ')').stop(true, true).delay( (50 * $x) ).animate({ left: 0, opacity: 1 }, $hoverTransitionTime, $transitionCloseName);

            // Fades in the UL
            if( $x == 7 ) $orderedNavigation.find('ul').stop(true, true).delay(500).animate({ left: 0, opacity: 1 }, $hoverTransitionTime, $transitionCloseName);

            $x++;
        }

        $bothLines.stop(true, true).addClass('opened');
        $middleLines.hide();
        $button.css({ padding: 0 });
    }

    function closeNavigation() {
        // Variables
        $navigationActive = false;

        // Closing the navigation and moving each li to left by 300 pixels, as well as fading out footer, after the animation hiding the $navigation.
        $orderedNavigation.find('li.front-line').stop(true, true).animate({ left: '360px' }, 300, $transitionCloseName);
        $orderedNavigation.find('ul').stop(true, true).animate({ left: '300px' }, 700, $transitionCloseName);
        $navigation.find('footer').stop(true, true).animate({ opacity: 0 }, $hoverTransitionTime, $transitionCloseName);

        setTimeout(function() {
            $navigation.stop(true, true).css({ right: '-380px' });
            $middleLines.fadeIn(300).animate({ color: 'black' }, $animationTime, $transitionCloseName);
        }, 350);

        $button.css({ padding: '0 40px' });

        // Fading out and disappearing the .fadeMe background.
        $fade.stop(true, true).animate({ opacity: 0 }, $animationTime, $transitionCloseName, function() {
            $fade.delay(300).css({ display: 'none' });
        });

        $bothLines.stop(true, true).removeClass('opened hoverActive').animate({ color: 'black' }, $animationTime, $transitionCloseName);
    }

    // Hover over a hamburger menu text and icon in the header.
    $('button.btn-navigation, .fadeMe').on({
        click: function() {
            if( !$navigationActive ) {
                openNavigation();
            } else {
                closeNavigation();
            }
        },
        mouseenter: function () {

            // Adding hover effect on the stripped lines when the navigation is active (making the lines lighter by ~20%)
            if( $navigationActive ) $bothLines.addClass('hoverActive');
        },
        mouseleave: function () {

            // Removing the hover effect when the navigation is active.
            if( $navigationActive ) $bothLines.removeClass('hoverActive');
        }
    });

    $orderedNavigation.find('li a').hover(function() {
        $(this).parent().toggleClass('active');
    })
});