$(document).ready(function() {
    $('.signup-btn').on('click', function () {
        $(this).addClass('active');
        $('.login-btn').removeClass('active');
        $('.wl-signup').slideDown(300);
        $('.wl-login').css('display','none');
        $('.register-title').css('display','none');
        $('.signup-title').css('display','block');
    });
    $('.login-btn').on('click', function () {
        $(this).addClass('active');
        $('.signup-btn').removeClass('active');
        $('.wl-login').slideDown(300);
        $('.wl-signup').css('display','none');
        $('.signup-title').css('display','none');
        $('.register-title').css('display','block');
    });
    // $('#email-form-2 .btn').on('click', function () {
    //     $('#email-form-2 .wl-signup').slideToggle('300');
    // });
    $('#email-form-2 .btn.w-button').on('click', function () {
        $('#email-form-2 .wl-signup').slideToggle('300');
    });
});