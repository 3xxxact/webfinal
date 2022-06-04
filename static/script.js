'use strict';
//работа с корзиной
const products = document.querySelectorAll('.list_product .product');
const contentCart = document.querySelector('.content_cart');
products.forEach((product) => {
  const btn = product.querySelector('button');
  btn.addEventListener('click', () => {
    const productClone = product.cloneNode(true);
    contentCart.appendChild(productClone);
    showData();
    productClone.style.height = '';
    const removeBtn = productClone.querySelector('button');
    removeBtn.textContent = 'Удалить из корзины';
    removeBtn.addEventListener('click', () => {
      productClone.remove();
      showData();
    });
  });

  function showData() {
    const productsCart = contentCart.querySelectorAll('.product'),
        productsPrice = contentCart.querySelectorAll('.product .price'), // все цены
        priceTotal = document.querySelector('.price_total'), // строка с общей суммой
        countGoods = document.querySelector('.counter');
    let sum = 0;
    countGoods.textContent = productsCart.length;
    productsPrice.forEach((Price) => {
        let price = parseFloat(Price.textContent.slice(1));
        sum += price;
    });
    priceTotal.textContent = sum;
}
});




$(function()
{
  $('.title_box').click(function() //раскрытие списков категорий
  {
     $(this).toggleClass('open');
     $(this).next('.list_link').toggleClass('open');
  });
  $('#slider_price').slider({  //фильтр по цене
    max: 1000, 
    min: 0,
    range: true,
    values: [190, 728],
    slide: function( event, ui) {
      $('input[name="minPrice"]').val( '$'+ ui.values[0]);
      $('input[name="maxPrice"]').val( '$'+ ui.values[1]);
    }
  });

  $('input[name="minPrice"]').val( 
    $('#slider_price').slider('values', 0) );
  $('input[name="maxPrice"]').val( 
      $('#slider_price').slider('values', 1) );

  $('#cart, #order, .title_cart').click(function(){ //открытие окна корзины и регистрации
    $('#cart_box').toggleClass('open');
  });
  $('#sign').click(function(){
    $('#black_fill').toggleClass('open');
    $('#modal').toggleClass('open');
    document.body.style.overflow = 'hidden';
  });
  $('#close_mod, #black_fill').click(function(){
    $('#black_fill').toggleClass('open');
    $('#modal').toggleClass('open');
    document.body.style.overflow = '';
  });

});

var app = new Vue({
  el: '#form1',
  data: function () {
    return {
    email : "",
    emailBlured : false,
    valid : false,
    submitted : false,
    password:"",
    passwordBlured:false
    }
  },

  methods:{

    validate : function(){
this.emailBlured = true;
this.passwordBlured = true;
if( this.validEmail(this.email) && this.validPassword(this.password)){
this.valid = true;
}
},

validEmail : function(email) {
   
var re = /(.+)@(.+){2,}\.(.+){2,}/;
if(re.test(email.toLowerCase())){
  return true;
}

},

validPassword : function(password) {
   if (password.length > 7) {
    return true;
   }
},

submit : function(){
this.validate();
if(this.valid){
this.submitted = true;
}
}
}
});