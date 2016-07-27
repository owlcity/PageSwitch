
/**
 * 
 * @authors wgqth (wgqth@qq.com)
 * @date    2015-03-13 20:47:21
 * @version $Id$
 */
;(function($){
  //导航菜单
  navpos();
  var A_top = $("#A").offset().top;
  var B_top = $("#B").offset().top;
  var C_top = $("#C").offset().top;
  var D_top = $("#D").offset().top;
  var E_top = $("#E").offset().top;
  var F_top = $("#F").offset().top;
  $(window).scroll(function() {
    var scroH = $(this).scrollTop();
    if (scroH >= F_top) {
      set_cur(".F");
    } else if (scroH >= E_top) {
      set_cur(".E");
    } else if (scroH >= D_top) {
      set_cur(".D");
    } else if (scroH >= C_top) {
      set_cur(".C");
    } else if (scroH >= B_top) {
      set_cur(".B");
    } else if (scroH >= A_top) {
      set_cur(".A");
    }
  });

  $(".nav li").click(function() {
    var el = $(this).attr('class');
    //console.log(el)
    $('html, body').animate({
      scrollTop: $("#" + el).offset().top
    }, {
      easing: 'easieEaseOutQuad',
      duration: 1000,
      complete: function() {}
    });
  });

  $(window).resize(function() {
    navpos();
  });
  function navpos() {}
  function set_cur(n) {
    if ($(".nav li").find("a").hasClass("cur")) {
      $(".nav li").find("a").removeClass("cur");
    }
    $(".nav li" + n).find("a").addClass("cur");
  }
  $(function() {
    $("a.toB").click(function() {
      $("html, body").animate({
        scrollTop: $($(this).attr("href")).offset().top + "px"
      }, {
        duration: 1000,
        easing: "swing"
      });
      return false;
    });
  });


  //造型师
  $tabB = $('div.PeoTab code');
  $tabB.hover(function() {
    $parent = $(this).parent().parent();
    $ul = $('code', $parent);
    var index = $ul.index(this);
    $ul.eq(index).addClass('curS').siblings().removeClass('curS');
    $('.divBox', $parent).eq(index).show().siblings().hide();
  });


  //产品
  $(".container").find(".c_BOX").each(
      function() {
          $(this).mouseenter(
              function() {
                  $(this).find(".NBox").show();
                  $(this).css("z-index","111")
              }
          );
          $(this).mouseleave(
              function() {
                  $(this).css("z-index","0")
                  $(this).find(".NBox").hide();
              }
          );
      }
    );


  //触发skrollr
  var s = skrollr.init({
    edgeStrategy: 'set',
    easing: {
      WTF: Math.random,
      inverted: function(p) {
        return 1-p;
      }
    }
  });

  //滚动添加样式
  $(window).scroll(function() {
      var mm = $('[data-style]');
      mm.each(function(){
      var xx = $(this).attr("data-style");
      var imagePos = $(this).offset().top;

      var topOfWindow = $(window).scrollTop();
          if (imagePos < topOfWindow+200) {
              $(this).addClass(xx);
          }
          if (imagePos > topOfWindow+600) {
              $(this).removeClass(xx);
          }
      });
  });


  $(window).scroll(function(){
    var wh=$(window).scrollTop();
    //console.log(wh)
    //var s=wh-$(window).scrollTop();
    if(wh > 3500){
      setTimeout(function () {
              $(".c_E_P6").hide();
              $(".c_E").show(500);
            },3000);
    }
    if(wh < 3300){
      setTimeout(function (){
              $(".c_E").hide();
              $(".c_E_P6").show("fast");
           },100);
    }
    if(wh > 4500){
      setTimeout(function (){
              $(".c_E").hide();
              $(".c_E_P6").show(500);
            },100);
    }
  });

    setTimeout(function(){
      $('.js-static-flower-wrapper-11').addClass('flowering');
    }, 3000);


})(jQuery);


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
    
    DB_1_1:{left:-50,opacity:0,speed:500,delay:100},
    DB_1_2:{top:50,opacity:0,speed:500,delay:500},
    DB_1_3:{left:100,opacity:0,speed:500,delay:800},

    DB_2_1:{left:-50,opacity:0,speed:500,delay:100},
    DB_2_2:{top:50,opacity:0,speed:500,delay:500},
    DB_2_3:{left:100,opacity:0,speed:500,delay:800},

    DB_3_1:{left:-50,opacity:0,speed:500,delay:100},
    DB_3_2:{top:50,opacity:0,speed:500,delay:500},
    DB_3_3:{left:100,opacity:0,speed:500,delay:800},

    DB_4_1:{left:-50,opacity:0,speed:500,delay:100},
    DB_4_2:{top:50,opacity:0,speed:500,delay:500},
        DB_4_3:{left:100,opacity:0,speed:500,delay:800},
        DB_4_4:{top:100,opacity:0,speed:500,delay:1000},

    end:null
  }
  
})
/*  |xGv00|efd3beae0d2934928c644b8526b9e280 */