/**
 * Модуль форм на сайте
 * @type {Object}
 */
var site = {};

site.forms = {

    /** Инициализация форм */
    init: function () {
        $('#post_vote').on('submit', this.submitVoteForm);

        this.initLoginAjaxForm();
    },

    /** Инициализирует форму авторизации */
    initLoginAjaxForm: function () {
        var $form = $('#login_form');
        $form.on('submit', function (e) {
            e.preventDefault();
            $.ajax({
                type: 'POST',
                dataType: 'json',
                url: '/' + window.pageData.lang + '/users/login_do.json?redirect_disallow=1',
                data: $form.serialize(),

                success: function (data) {
                    var loginSuccess = !data.data;
                    if (loginSuccess) {
                        location.reload(true);
                    }

                    var loginFailed = (data.data && data.data.from_page);
                    if (loginFailed) {
                        site.forms.showErrorMessage($form, getLabel('js-login_do_try_again'));
                    }
                }
            });
        });
    },

    /**
     * Выводит в форме сообщение об ошибке
     * @param {jQuery} $form форма
     * @param {String} message сообщение
     */
    showErrorMessage: function ($form, message) {
        $('.field_error_message', $form).remove();
        $('<div>', {
            'class': 'field_error_message',
            html: message
        }).appendTo($form);
    },

    /** Отправляет выбранный вариант опроса и выводит результаты опроса */
    submitVoteForm: function (e) {
        e.preventDefault();
        var $voteForm = $('#post_vote');
        var voteId = $voteForm.data('vote_id');
        var selected = $('input[name=answer]:checked', $voteForm).val();

        $.post('/vote/post/' + selected, function () {
            $.getJSON('/udata://vote/results/' + voteId + '.json', function (data) {
                var optionList = data.items.item;

                console.log(optionList);

                var html = '<div class="result_interview">';

                for (var item in optionList) {
                    if (!optionList.hasOwnProperty(item)) {
                        continue;
                    }

                    html +=
                        '            <div class="row">' +
                        '                <div class="text">' +
                        '                    <span></span>' +
                        '                </div>' +
                        '                <div class="result clearfix">' +
                        '                    <div class="result_range">' + optionList[item].item_name + '</div>' +
                        '                    <span class="result_num">' + optionList[item]['score-rel'] + '%</span>' +
                        '                </div>' +
                        '            </div>';
                }

                html += '</div>';

                $('.radio_form').html(html);
            });
        });
    },
};

$(function () {
    site.forms.init();
});
