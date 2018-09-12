    $(document).ready(function(){

            // Custom method to validate username
            $.validator.addMethod("regx", function(value, element, regexpr) {
                    return regexpr.test(value);
            }, "Password must be between 6-12 characters in length, including letters (A-Z, a-z) and numbers (0-9). Without any special symbols (^@()_#*+/\"?!=.{}~`&) and spaces");

            $.validator.addMethod("regx_first_name", function(value, element, regexpr) {
                return regexpr.test(value);
            }, "Name must be more than 2 characters in length, without any special symbols and spaces");

            $.validator.addMethod("regx_last_name", function(value, element, regexpr) {
                return regexpr.test(value);
            }, "Last name must be more than 2 characters in length, without any special symbols and spaces");

            $.validator.addMethod("regx_phone", function(value, element, regexpr) {
                return regexpr.test(value);
            }, "Phone must be more than 6 characters in length, including only numbers without any special symbols and spaces");

            $.validator.addMethod("regx_phonecc", function(value, element, regexpr) {
                return regexpr.test(value);
            }, "Code must be valid");

            $.validator.addMethod("emailRegex", function(value, element) {
                return this.optional(element) || /^[a-z0-9_.-]{2,15}@[a-z0-9_-]{2,15}.[a-z]{1,7}$/i.test(value);
            }, "Email must be valid");

            $.validator.addMethod("regx_terms", function(value, element, regexpr) {
                return regexpr.test(value);
            }, "You must agree to the Terms $ Conditions");
            
            $("#finishBtn").click(function(){
                var form = $("#bigForm2");
                
                //show the next fieldset
    form.validate({
        rules:{

            first_name:{
            required: true,
            regx_first_name: /^(([a-zA-Z]{2,25}\s{0,1}[a-zA-Z]{2,25})|([a-zA-Z]{2,25}))$/,
            minlength: 2,
            maxlength: 64
        },

        last_name:{
            required: true,
            regx_last_name: /^[a-zA-Z]{2,}\s?$/,
            minlength: 2,
            maxlength: 64

        },

        email:{
            required: true,
            email: true,

        },

        phone:{
            required: true,
            minlength: 6,
            regx_phone:/^[0-9-]{5,25}$/,
            maxlength: 25,
        },

        phonecc:{
            required: true,
            minlength: 2,
            maxlength: 5,
            regx_phonecc: /^\+[0-9]*$/,
        },

        password:{
            required: true,
            regx: /^(([a-z0-9]*\d+[a-z]+[a-z0-9]*)|([a-z0-9]*[a-z]+\d+[a-z0-9]*))$/i,
            minlength: 6,
            maxlength: 12,
        },

        terms:{
            required: true,
        }
    },

    messages:{

        first_name:{
            required: "The first name field is required",
            minlength: "First name must be at least 6",
            maxlength: "First name can be a maximum of 12",
        },

        last_name:{
            required: "The last name field is required",
            minlength: "Last name must be at least 6",
            maxlength: "Last name can be a maximum of 12",
        },

        email:{
            required: "The email field is required",
            email: "The email must be a valid address",
        },

        phone:{
            required: "The phone number field is required",
            regx_phone: "The phone number must be a valid",
            minlength: "Telephone number must be at least 6",
            maxlength: "The phone number must be a valid",
        },

        phonecc:{
            required: "The Code field is required",
            regx_phonecc: "The Code must be a valid",
            minlength: "The Code must be at least 2",
            maxlength: "The Code must be a valid",
        },

        password:{
            required: "The password field is required",
            minlength: "The password must be at least 6 characters",
            maxlength: "The password may not be greater than 12 characters",
        },
        
        terms:{
            required: "You must agree to the Terms & Conditions"
        }
    },

                    submitHandler: function(form, event) {
                    event.preventDefault();
                    $(".prelouder").show();
                    var msg = $(form).serialize();
                    $(form).find('#finishBtn').text('WAIT...');
                    var linkAdress = makeSendAdress();
                    // console.log('adress= ' + form);
                    // console.log('data= ' + msg);
                    $.post(linkAdress, msg)
                    .done(function(data){
                        var obj_data = JSON.parse(data);
                        adress_redir = obj_data.redirect;
                        var httpsImage = obj_data.image.replace(/\.[a-z]{2}\./,'.');
                        httpsImage = httpsImage.replace('http','https');
                        // console.log(httpsImage)

         
                        
                        $('.broker_image').attr('src', httpsImage);  
                        $('.btn_redir').attr('href', adress_redir);
                        $(form).find('#finishBtn').text('SIGNUP');
                        $('#popUp').show();
                        // $('#popUp').append(pixel);


                        // console.log(data);
                    }).fail(function(jqXHR, textStatus, errorThrown) {
                        obj_data = JSON.parse(jqXHR.responseText)
                        for(key in obj_data.errors){alert(obj_data.errors[key])}
                        // alert( 'Register form field error' );
                        $(".prelouder").hide();
                        $(form).find('#finishBtn').text('SIGNUP');
                      });

                  }
                });
            });
    });
            

    function makeSendAdress(){
        var tmp = location.hostname.replace(/[a-z]{2}\./,'');
            tmp = 'https://cabinet.' + tmp + '/api/register';
        return tmp;
    }