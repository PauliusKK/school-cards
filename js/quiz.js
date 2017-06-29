jQuery(document).ready(function() {

    function base64_decode(encodedData) {

        var decodeUTF8string = function (str) {
            // Going backwards: from bytestream, to percent-encoding, to original string.
            return decodeURIComponent(str.split('').map(function (c) {
                return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
            }).join(''))
        }
        if (typeof window !== 'undefined') {
            if (typeof window.atob !== 'undefined') {
                return decodeUTF8string(window.atob(encodedData))
            }
        } else {
            return new Buffer(encodedData, 'base64').toString('utf-8')
        }
        var b64 = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/='
        var o1
        var o2
        var o3
        var h1
        var h2
        var h3
        var h4
        var bits
        var i = 0
        var ac = 0
        var dec = ''
        var tmpArr = []
        if (!encodedData) {
            return encodedData
        }
        encodedData += ''
        do {
            // unpack four hexets into three octets using index points in b64
            h1 = b64.indexOf(encodedData.charAt(i++))
            h2 = b64.indexOf(encodedData.charAt(i++))
            h3 = b64.indexOf(encodedData.charAt(i++))
            h4 = b64.indexOf(encodedData.charAt(i++))
            bits = h1 << 18 | h2 << 12 | h3 << 6 | h4
            o1 = bits >> 16 & 0xff
            o2 = bits >> 8 & 0xff
            o3 = bits & 0xff
            if (h3 === 64) {
                tmpArr[ac++] = String.fromCharCode(o1)
            } else if (h4 === 64) {
                tmpArr[ac++] = String.fromCharCode(o1, o2)
            } else {
                tmpArr[ac++] = String.fromCharCode(o1, o2, o3)
            }
        } while (i < encodedData.length)
        dec = tmpArr.join('')
        return decodeUTF8string(dec.replace(/\0+$/, ''))
    }

    var schoolOfCardsQuiz = 'eyJsaXN0X2lkIjo3NzQxNywiZm9ybV9zbHVnIjoic29tZS1xdWl6IiwiZm9ybV9nb2FsIjoic29tZS1xdWl6LWdvYWwiLCJxdWVzdGlvbnMiOnsicV9nZW5kZXIiOnsicXVlc3Rpb24iOiJQbGVhc2UsIHNlbGVjdCBZb3VyIGdlbmRlciIsImFuc3dlcnMiOnsibWFsZSI6Ik1hbGUiLCJmZW1hbGUiOiJGZW1hbGUifX0sInFfYWdlIjp7InF1ZXN0aW9uIjoiSG93IG9sZCBhcmUgWW91PyIsImFuc3dlcnMiOnsiMTBfMjEiOiJGcm9tIDEwIHRvIDIxIiwiMjJfMzIiOiJGcm9tIDIyIHRvIDMyIiwiMzNfNDAiOiJGcm9tIDMzIHRvIDQwIn19LCJxX2luY29tZSI6eyJxdWVzdGlvbiI6IllvdXIgbW9udGhseSBpbmNvbWU/IiwiYW5zd2VycyI6eyIyayI6IlVwIHRvICQyMDAwIiwiNWsiOiJVcCB0byAkNTAwMCIsIjEwayI6IlVwIHRvICQxMCwwMDAifX19fQ==';

    function render_quiz() {

        // Decoding, parsing JSON.
        var decodedStr = jQuery.trim( base64_decode(schoolOfCardsQuiz) );
        try { var json = JSON.parse(decodedStr); }
        catch(e){}

        // If there's no JSON decoded, do not run the script.
        if( !json ) return false;

        // Variables
        var quiz_name = 'school_of_cards_quiz';
        var tab_id = 0;
        var allTabs = Object.keys(json.questions).length;

        // Variables - html, forms.
        var html = '';
        var formContainer = '<form id="'+ quiz_name +'_form">';
        var hiddenInput = '<input type="hidden" name="_quiz" value="'+ schoolOfCardsQuiz +'">';

        // If there's something wrong, do not create HTMLs.
        if( !jQuery('#' + quiz_name).length || typeof(json) !== 'object' || typeof(json.questions) === 'undefined' ) return false;

        // We're starting and creating content if there's no errors.
        html += formContainer + hiddenInput;


        // Going thru each question and creating content in it
        for( var field in json.questions ) {

            // Variables
            var active = '';
            var config = json.questions[field];

            // Showing up the first question.
            if( tab_id == 0 ) active = ' md-show';

            var quizClose = '<i class="icon-icon-close md-close"></i>';
            var quizTab = '<div id="question-'+ tab_id +'" class="md-modal md-effect-12' + active +'">' + quizClose + '<div class="container"><div class="md-content">';
            var quizH3 = '<h3>Question '+ (tab_id + 1) +' of '+ (allTabs + 1) +'</h3>';
            var quizH2 = '<h2>' + config.question + '</h2>';
            var hiddenValueInput = '<input type="hidden" id="'+ quiz_name + '_'+ field +'" name="'+ field +'" value="">';

            // Adding more content. You can see variables values above.
            html += quizTab + quizH3 + quizH2 + hiddenValueInput;


            // Going thru all the answers and extracting their values
            for( var answer_id in config.answers ) {

                // Variables
                var answer = config.answers[answer_id];

                // Creating an answer button with the answer text in it.
                var answerButton = '<button class="answer" data-field="'+ quiz_name +'_'+ field +'" data-value="'+ answer_id +'">' + answer + '</button>';

                // Adding answer to the content
                html += answerButton;
            }

            // Ending a question (modal) with three div ends.
            html += '</div></div></div>';


            // Adding one more 'question' at the end that contains inputs to store the name and email of the user.
            if( tab_id == allTabs - 1 ) {

                // Variables
                var errorNameText = '<p id="error_first_name"></p>';
                var errorEmailText = '<p id="error_email"></p>';

                var nameInput = '<input class="form-input" type="text" name="first_name" placeholder="Name" value="" required>';
                var emailInput = '<input class="form-input" type="text" name="email" placeholder="E-mail" value="" required>';

                var finishButton = '<button id="email-pop-up-btn" type="submit" class="main-button light-red finish"><a>Finish</a></button>';

                // Changing already existing variables so the styles can be good.
                quizTab = '<div id="question-'+ (tab_id + 1) +'" class="md-modal md-effect-12">' + quizClose + '<div class="container"><div class="md-content">';
                quizH2 = '<h2>Enter your name and email</h2>';

                // Now, after everything, we're just adding more content. And ending divs with the last line.
                html += quizTab + quizH2 + errorNameText + nameInput + errorEmailText + emailInput + finishButton;
                html += "</div></div></div>";
            }

            tab_id++;
        }

        // Ending a form.
        html += '</div></form>';

        // Adding all of the created content to the DIV that's in .html file.
        $('#school_of_cards_quiz').html(html);

        // $('#question-0').addClass('md-show');

        $("button.answer").click(function(e){

            e.preventDefault();
            e.stopPropagation();

            // Variables
            $tab = $(this).closest(".md-modal").attr('id').match(/[\d\.]+/g).toString();
            $tab++;

            // console.log('#question-' + ($tab + 1));
            // $(this).

            // Adds value to the hidden input.
            $('#' + $(this).attr('data-field') ).val( $(this).attr('data-value') );

            // Hides the current question and appears the second one.
            $(this).closest("#question-" + $tab).removeClass('md-show');

            $('#question-' + $tab).addClass('md-show');
        });

        $('button.main-button.finish').click(function(e){
            e.preventDefault();
            e.stopPropagation();

            /** Submit data to server **/
            var fdata = $('#school_of_cards_quiz_form').serializeArray();
            var data = {};

            for( var i = 0; i < fdata.length; i++ ) {
                data[ fdata[i].name ] = fdata[i].value;
            }

            if( jQuery.trim(data.email) === '') $('p#error_first_name').text('Please provide your name.');

            if( jQuery.trim(data.name) === '') $('#error_email').text('Please provide your email address.');

            jQuery.ajax({
                method: 'post',
                dataType: 'json',
                data: data,
                url: '/api/quiz',
                success: function(response)
                {
                    console.log(response);
                }
            });

            return;
        });
    }

    render_quiz();
});