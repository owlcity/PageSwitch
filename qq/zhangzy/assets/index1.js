

jQuery.browser={};(function(){jQuery.browser.msie=false; jQuery.browser.version=0;if(navigator.userAgent.match(/MSIE ([0-9]+)./)){ jQuery.browser.msie=true;jQuery.browser.version=RegExp.$1;}})();



(function(a) {
    a.fn.DB_tabMotionBanner = function(b) {
        var c = {
            key: "",
            autoRollingTime: 3000,
            bgSpeed: 1000,
            motion: ""
        };
        a.extend(c, b);
        return this.each(function() {
            var h = a(this);
            var k = h.find(".DB_imgSet");
            var r = h.find(".DB_imgSet li");
            var i = h.find(".DB_menuSet");
            var m = h.find(".DB_menuSet li");
            var e = h.find(".DB_bgSet li");
            var q = h.find(".DB_next");
            var g = h.find(".DB_prev");
            var f = r.length;
            var p = 0;
            var j = 0;
            s();
            function s() {
                
                l();
                d();
                t();
                o()
            }
            function l() {
                k.css({
                    position: "relative"
                });
                r.css({
                    position: "absolute"
                });
                for (var y = 0; y < f; y++) {
                    if (y == p) {
                        r.eq(y).show()
                    } else {
                        r.eq(y).hide()
                    }
                }
                for (var y = 0; y < r.length; y++) {
                    var x = r.eq(y).find("img");
                    for (var w = 0; w < x.length; w++) {
                        var A = x.eq(w);
                        var v = c.motion[A.attr("class")];
                        if (v != null) {
                            var z = Number(A.css("left").split("px")[0]);
                            var B = Number(A.css("top").split("px")[0]);
                            A.data({
                                x2: z,
                                y2: B,
                                x1: z + v.left,
                                y1: B + v.top,
                                opacity: v.opacity,
                                speed: v.speed,
                                delay: v.delay == null ? 0 : v.delay
                            })
                        }
                    }
                }
            }
            function d() {
                h.bind("mouseenter",
                function() {
                    clearInterval(j);
                    q.show();
                    g.show()
                });
                h.bind("mouseleave",
                function() {
                    t();
                    q.hide();
                    g.hide()
                });
                m.bind("click",
                function() {
                    if (a(this).index() != p) {
                        p = a(this).index();
                        o()
                    }
                });
                m.bind("mouseenter",
                function() {
                    n(a(this).find("img"), "src", "_off", "_on")
                });
                m.bind("mouseleave",
                function() {
                    if (p != a(this).index()) {
                        n(a(this).find("img"), "src", "_on", "_off")
                    }
                });
                q.bind("click",
                function() {
                    u()
                });
                g.bind("click",
                function() {
                    p--;
                    if (p == -1) {
                        p = f - 1
                    }
                    o()
                })
            }
            function u() {
                p = ++p % f;
                o()
            }
            function t() {
                j = setInterval(u, c.autoRollingTime)
            }
            function o() {
                for (var z = 0; z < r.length; z++) {
                    var A = r.eq(z);
                    var y = e.eq(z);
                    if (p == z) {
                        A.show();
                        var x = A.find("img");
                        for (var w = 0; w < x.length; w++) {
                            var A = x.eq(w);
                            var v = c.motion[A.attr("class")];
                            if (v != null) {
                                if (A.attr("src").indexOf(".png") > 0 && a.browser.msie && a.browser.version < 9) {
                                    A.css({
                                        left: A.data("x1"),
                                        top: A.data("y1"),
                                        opacity: 1,
                                        display: "none"
                                    })
                                } else {
                                    A.css({
                                        left: A.data("x1"),
                                        top: A.data("y1"),
                                        opacity: A.data("opacity")
                                    })
                                }
                                A.stop().delay(A.data("delay")).queue(function() {
                                    a(this).css("display", "block");
                                    a(this).dequeue()
                                }).animate({
                                    left: A.data("x2"),
                                    top: A.data("y2"),
                                    opacity: 1
                                },
                                A.data("speed"))
                            }
                        }
                        n(m.eq(z).find("img"), "src", "_off", "_on");
                        m.eq(z).addClass("select");
                        y.stop(true, true).fadeIn(c.bgSpeed)
                    } else {
                        A.hide();
                        n(m.eq(z).find("img"), "src", "_on", "_off");
                        m.eq(z).removeClass("select");
                        y.stop(true, true).fadeOut(c.bgSpeed)
                    }
                }
            }
            function n(w, z, v, x) {
                var y = w.attr(z);
                if (String(y).search(v) != -1) {
                    w.attr(z, y.replace(v, x))
                }
            }
        })
    }
})(jQuery);


$('.DB_tab25').DB_tabMotionBanner({
  key:'b28551',
  autoRollingTime:4000,                            
  bgSpeed:500,
  motion:
  {
    
    c_B_t1:{top:-50,opacity:0,speed:500,delay:100},
    c_B_tc1:{top:50,opacity:0,speed:500,delay:500},

    c_B_t2:{top:-50,opacity:0,speed:500,delay:100},
    c_B_tc2:{top:50,opacity:0,speed:500,delay:500},

    c_B_t3:{top:-50,opacity:0,speed:500,delay:100},
    c_B_tc3:{top:50,opacity:0,speed:500,delay:500},

    c_B_t4:{top:-50,opacity:0,speed:500,delay:100},
    c_B_tc4:{top:50,opacity:0,speed:500,delay:500},

    end:null
  }
  
})




$(document).ready(function(){
  
  $('.p4_layer .my_audio').click(function(){
    
    for(var i=0;i<3;i++){
      $('.p4_layer .my_audio').find("audio")[i].pause();
      if($('.p4_layer .my_audio').find("audio")[i].currentTime != 0){
        $('.p4_layer .my_audio').find("audio")[i].currentTime = 0; 
      } 
      $('.p4_layer .my_audio').find('img.c_play').attr('src','http://mat1.gtimg.com/fashion/mengyi/meijibangyang/34/c_play.png');
      $('.p4_layer .my_audio').parent().next().removeClass("cur");
      }
    for(var i=0;i<3;i++){
      $('.p4_layer .my_audio').eq(i).find("audio")[0].onended = function(){
        $('.p4_layer .my_audio').find('img.c_play').attr('src','http://mat1.gtimg.com/fashion/mengyi/meijibangyang/34/c_play.png');
        $('.p4_layer .my_audio').parent().next().removeClass("cur");
      };
    };
    $(this).find('img.c_play').attr('src','http://mat1.gtimg.com/fashion/mengyi/meijibangyang/34/c_play.gif').parent().parent().next().addClass("cur");
    $(this).find('audio')[0].play();
    
  })


  $.tabA=function(tabnav,tabcon,navh) {
    $(tabnav + ' span').mouseenter(function() {
      var index=$(this).index();
      $(tabnav + ' span').removeClass(navh);
      $(this).addClass(navh);
      $(tabcon).hide();
      $(tabcon).eq(index).show();
    });
  };


  $.tabA(".Dwrap",".DCon","Cur");

    //婊氬姩娣诲姞鏍峰紡
  $(window).scroll(function() {
      var mm = $('[data-style]');
      mm.each(function(){
      var xx = $(this).attr("data-style");
      var imagePos = $(this).offset().top;

      var topOfWindow = $(window).scrollTop();
      //console.log(topOfWindow)
          if (imagePos < topOfWindow+200) {
              $(this).addClass(xx);
          }
          if (imagePos > topOfWindow+600) {
              $(this).removeClass(xx);
          }
      });
  });


    
})

$(function(){
    navpos();
    var AA = $("#A").offset().top;
    var BB = $("#B").offset().top;
    var CC = $("#C").offset().top;
    var DD = $("#D").offset().top;
    var EE = $("#E").offset().top;

    $(window).scroll(function() {
        var scroH = $(this).scrollTop();
        if (scroH >= EE) {
            set_cur(".E");
        } else if (scroH >= DD) {
            set_cur(".D");
        } else if (scroH >= CC) {
            set_cur(".C");
        } else if (scroH >= BB) {
            set_cur(".B");
        } else if (scroH >= AA) {
            set_cur(".A");
        }
    });

    $(".nav li").click(function() {
        var el = $(this).attr('class');
        $('html, body').animate({
            scrollTop: $("#" + el).offset().top
        }, {
            easing: 'easeOutSine',
            duration: 300,
            complete: function() {}
        });
    });
});
$(window).resize(function() {
    navpos();
});

function navpos() {}

function set_cur(n) {
    if ($(".nav li").hasClass("cur")) {
        $(".nav li").removeClass("cur");
    }
    $(".nav li" + n).addClass("cur");
}
/*  |xGv00|626f91fb5c0b997d69665c0e4b5e9a19 */