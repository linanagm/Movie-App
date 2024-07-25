/// <reference types="../@types/jquery" />
"use strict";

export class Form{

    constructor(){
        this.nameRegex = /^[a-zA-z\s]{1,36}$/;
        this.emailRegex = /^[a-zA-Z0-9]+@[a-z0-9]+\.[a-z]{3}$/;
        this.phoneRegex = /^(02)?(01)[0125][0-9]{8}$/;
        this.ageRegex = /^(1[6-9]|[2-9][0-9]|100)$/;
        this.passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

        this.nameErrorText = "Invalid Name , only Characters allowed";
        this.emailErrorText = "Invalid Email , try example@domain.com";
        this.phoneErrorText = "Invalid Phone Number";
        this.ageErrorText = "Your age must be over 16+";
        this.passwordErrorText = "password must contain numbers & letters at least 8 character";
        this.repassErrorText = "Password not match";

        this.passwordInput = '';

    }

    /* ***************** run form validation function ******************* */
    runFormValidation(){
        this.isValid('#nameInput',this.nameRegex, this.nameErrorText);
        this.isValid('#emailInput',this.emailRegex, this.emailErrorText);
        this.isValid('#phoneInput',this.phoneRegex, this.phoneErrorText);
        this.isValid('#ageInput',this.ageRegex, this.ageErrorText);
        this.isValid('#passwordInput',this.passwordRegex, this.passwordErrorText);
        
        this.repasswordValidation(); 
        this.shakeBtn();    
        this.showPass();
    }


    /* ****************** Home Code ****************************** */
    //check validation for name & password & phone & age & email 
    isValid(selector,regex , errorText){

        $(selector).on('input' ,(e)=>{
            const inputSelector =$(e.target)
            const value = inputSelector.val();
            const errorElement = inputSelector.next('.error');//next error element
            const errorHtmlSelector= $(errorElement);
            

            if(value == ""){
                this.hideError(errorHtmlSelector , inputSelector)
            }
            else if(regex.test(value)){
                this.hideError(errorHtmlSelector , inputSelector)
                
                console.log('name is true');
            }else{
                console.log('name is false');
                this.showError( errorHtmlSelector, inputSelector);
                errorHtmlSelector.html(errorText);
            }
        })
    }

    showError(errorSelector, inputSelector){
        inputSelector.css("border-bottom-color", "rgb(214, 46, 51)");
        errorSelector.removeClass('animate__animated animate__fadeOutUp');
        errorSelector.addClass('animate__animated animate__flipInX');

    }

    hideError(errorSelector , inputSelector){
        inputSelector.css("border-bottom-color", "#CED4DA");
        errorSelector.html(null);
        errorSelector.removeClass('animate__animated animate__flipInX');
        errorSelector.addClass('animate__animated animate__fadeOutUp');

    }

    //if error element has animate__flipInX class then error was shown
    checkClassError(){
        if($('#contactUs .error').hasClass('animate__flipInX'))
        {
           return true;
        }
        else
        {
          return false;
        }
    }

    shakeBtn (){
        $('#contactUs form input').on('input' ,()=>{
            
            if(this.checkClassError()){
                $(`#contactUs form button`).on('mouseenter' , this.formButtonValidation);
                $('#contactUs form button').addClass('animate__shakeX bg-danger buttonFormActive');
                $('#contactUs form button').css({'cursor':'default','userSelect':'none'});

            }else{
                $('#contactUs form button').removeClass('animate__shakeX bg-danger buttonFormActive');
                $('#contactUs form button').css({"marginLeft":"0px"});
                $('#contactUs form button').off('mouseenter', this.formButtonValidation);
                $('#contactUs form button').removeClass('animate__shakeX bg-danger buttonFormActive');
                $('#contactUs form button').css('cursor','pointer');

            }
        })
    }

    formButtonValidation(){
        let buttonLocation =  $(`#contactUs form button`).css("marginLeft")
            if(buttonLocation == "250px")
            {
               $(`#contactUs form button`).css({"marginLeft":"0px"});
            }
            else
            {
               $(`#contactUs form button`).css({"marginLeft":"250px"});
            }
           $(`#contactUs form button`).on('keydown',function(e){
               if(e.key == "Enter")
               {
                   e.preventDefault();
               }
           })
    }

    /* **** repassword check **** */
    repasswordValidation(){
        $('#repasswordInput').on("input", ()=>{
            const repassError =  $('#repasswordInput').next('.error');
            const repassInput = $('#repasswordInput');
            
            if(repassInput.val() == "")
            {
                this.hideError(repassError,repassInput);
            }
            else if(repassInput.val() == $('#passwordInput').val())
            {
                this.hideError(repassError,repassInput);
            }
            else
            {
                this.showError(repassError, repassInput)
                $(repassError).html(this.repassErrorText);
            }
        })
    }
    
    //show and hide password 
    showPass(){
        //if attr is password change to -> text & change eye icon
        $('.showPass').on('click' , function(){
            if($('#passwordInput').attr('type') == 'password'){
                $('#passwordInput').attr('type' , 'text');
                $('.showPass').html('<i data-show="show" class="fa-solid fa-eye"></i>');

            }else{
                $('#passwordInput').attr('type' , 'password');
                $('.showPass').html('<i data-show="show" class="fa-solid fa-eye-slash"></i>');
            }
        })
    
        //focus event
        //=====================
        
            $('#passwordInput').on('focus', function() {
                $('.showPass').css({
                    'opacity': '1'
                }).removeClass('animate__fadeOutDown').addClass('animate__fadeInUp');
            }).on('blur', function() {
                setTimeout(function() {
                    if (!$('#passwordInput').is(':focus')) {
                        $('.showPass').css({
                            'opacity': '0'
                        }).removeClass('animate__fadeInUp').addClass('animate__fadeOutDown');
                    }
                }, 100);
        
            });
            $('.showPass').on('mousedown', function(e) {
                e.preventDefault();
                $('#passwordInput').on('focus');
            });
        
        
        

//show password with icon
//repassword match

//sidenav module ==> adjust animation when open
//organize code in index.js
//catch api error ==> change img path & default img
//==> change title object 


    }

}
