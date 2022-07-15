;(function($){
  $('.p7to1').click(function(){
    $('.p7_m2').fadeOut();
    $('.p7_m3').fadeOut();
    $('.p7_menu2').fadeOut();
    $('.p7_menu3').fadeOut();
    $('.p7_m1').fadeIn();
    $('.p7_menu1').fadeIn();
  });
  $('.p7to2').click(function(){
    $('.p7_m1').fadeOut();
    $('.p7_m3').fadeOut();
    $('.p7_menu1').fadeOut();
    $('.p7_menu3').fadeOut();
    $('.p7_m2').fadeIn();
    $('.p7_menu2').fadeIn();
  });
  $('.p7to3').click(function(){
    $('.p7_m1').fadeOut();
    $('.p7_m2').fadeOut();
    $('.p7_menu1').fadeOut();
    $('.p7_menu2').fadeOut();
    $('.p7_m3').fadeIn();
    $('.p7_menu3').fadeIn();
  });

  $('.p8to1').click(function(){
    $('.p8_m1').fadeOut();
    $('.p8_m2').fadeIn();
  });
  $('.p8to2').click(function(){
    $('.p8_m2').fadeOut();
    $('.p8_m3').fadeIn();
  });
  $('.p8prto').hover(function() {
    var num = $(this).attr('data-num');
    changeHover(num);
  });
  function changeHover(num){
    $('.p8_text').hide();
    $('.p8_text'+num).show();
    for (var i = 1; i <= 5; i++) {
      if (i == num) {
        $('.p8prto'+i).removeClass('p8prto'+i+'-1');
        $('.p8prto'+i).addClass('p8prto'+i+'-2');
      } else{
        $('.p8prto'+i).removeClass('p8prto'+i+'-2');
        $('.p8prto'+i).addClass('p8prto'+i+'-1');
      };
    };
  }

  
})(jQuery);/*  |xGv00|ed1e513d6349bda02cc9a717a0070b84 */