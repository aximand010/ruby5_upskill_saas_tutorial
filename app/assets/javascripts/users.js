/* global $, Stripe */
//Document ready.
$(document).on('turbolinks:load', function(){
  var theFrom = $('#pro_form');
  var submitBtn = $('#form-submit-btn');
  //Set Stripe public key.
  Stripe.setPublishableKey( $('meta[name="stripe-key"]').attr('content') );
  
  //When user clicks from submit btn.
  submitBtn.click(function(event){
    //prevent default submission behavior.
    event.preventDefault();
    submitBtn.val("Proccessing").prop('disabled', true);
    
    //collect the credit card fields.
    var ccNum = $('#card_number').val(),
        cvcNum = $('#card_code').val(),
        expMonth = $('#card_month').val(),
        expYear = $('#card_year').val();
    //use stripe js libary to check for card errors.
    
    var errors = false;
    //Validate card number.
    if(!Stripe.card.validateCardNumber(ccNum)) {
      error = true;
      alert('The credit card number appears to be invalid')
    }

    //Validate cvc.
    if(!Stripe.card.validateCVC(cvcNum)) {
      error = true;
      alert('The CVC appears to be invalid')
    }

     //Validate cvc.
    if(!Stripe.card.validateExpiry(expMonth, expYear)) {
      error = true;
      alert('The expiration date appears to be invalid')
    }


    if(errors) {
    //If there are card erors, don't send to stripe.
      submitBtn.prop('disabled', false).val("Sign Up"); 
    } else {
        Stripe.createToken({
        number: ccNum,
        cvc: cvcNum,
        exp_month: expMonth,
        exp_year: expYear
      }, stripeResponseHandler);
    }
    //send the card info to Stripe.
    return false;
  });
  
  //Stripe will return a card token.
  function stripeResponseHandler(status, reposne){
    //Get the token from the response
    var token = response.id;
    
    
    //inject the card token in a hidden field.
    theFrom.append( $('<input type="hidden" name="user[stripe_card_token]">').val(token));
    
    //Submit the Sing Up Button.
    theFrom.get(0).submit();
  });
});