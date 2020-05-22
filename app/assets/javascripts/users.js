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
    
    //collect the credit card fields.
    var ccNum = $('#card_number').val(),
        cvcNum = $('#card_code').val(),
        expMonth = $('#card_month').val(),
        expYear = $('#card_year').val();
        
    //send the card info to Stripe.
    Stripe.createToken({
      number: ccNum,
      cvc: cvcNum,
      exp_month: expMonth,
      exp_year: expYear
    }, stripeResponseHandler);
    
    
  });
  
 
  //Stripe will return a card token.
  //inject card token as hidden field into form.
  //Submit for to our Rails app.
});