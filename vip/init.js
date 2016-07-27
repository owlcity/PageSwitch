        pageHeight();
		switchClass();
		var act={};
		act.i=1;//滚动计数
		act.f=0;
		act._switching=false;//动画状态
		act._first=true;
		act._firstTxt=true;
		$(window).scrollTop(0);
		
		//设置page高度
		function pageHeight () {
			$('.page').height($(window).height());
			$('.page_right').css('left',($(window).width()-960)/2+600);
			
		}
		//resize
		function fResize(){
			pageHeight (); 
			switchClass();
			//IE.ie6 && $(".ieFix-w").height($(window).height());
		}
		
		$(window).bind('resize',function(){
			fResize();
			
		});
		
		
		
		function switchClass(){
			
				if($(window).height()>768){
					$('.page_in').removeClass('page_xs ').removeClass('page_sm').addClass('page_lg');
					$('.page_right').css('left',($(window).width()-960)/2+600);
					/*if(IE.ie6){
						var t=$('.page_in').offset().top+70+document.documentElement.scrollTop;
					}else{
						var t=$('.page_in').offset().top+70;
			           
					}*/
					var t=$('.page_in').offset().top+70;
					 $('.page_right').css('top',t);
				}else if($(window).height()<472){
					$('.page_in').removeClass('page_lg').removeClass('page_sm').addClass('page_xs');
					$('.page_right').css('left',($(window).width()-960)/2+500);
					/*if(IE.ie6){
						var t=$('.page_in').offset().top+50+document.documentElement.scrollTop;
					}else{
						var t=$('.page_in').offset().top+50;
					}*/
					var t=$('.page_in').offset().top+50;
					$('.page_right').css('top',t);
				}else{
					$('.page_in').removeClass('page_xs').removeClass('page_lg').addClass('page_sm');
					$('.page_right').css('left',($(window).width()-960)/2+500);
					/*if(IE.ie6){
						var t=$('.page_in').offset().top+70+document.documentElement.scrollTop;
					}else{
						var t=$('.page_in').offset().top+70;
					}*/
					var t=$('.page_in').offset().top+70;
				    $('.page_right').css('top',t);
				}
			
		}
		$(function(){
			//初始化第一个圆点执行click事件
			// $('#nav_1').trigger('click');
			$('.text01').css('opacity',1);
			$('.light').css('opacity',1);
			var lightT=getDefaultStyle($('.light')[0],'top')
			TweenLite.fromTo( $('.light'),0.8, {top:"-100px",autoAlpha:0},{top:lightT,autoAlpha:1,delay:0.5,ease:Power1.easeIn,onComplete:function(){
				    		
				    	}});
		})
		//滚轮事件
		$('body').bind('mousewheel',function(event,delta){
			if(!act._switching){	//delta>0向上，delta<0 向下
				if(delta>0){
					act.i--;
					act.down=0
					if(act.i<1){
						act.i=1;
						
						return false;
					} 
			    }else{
					 act.i++;
					 act.down=1
					 if(act.i>4){
						act.i=4;
						
						return false;
					}
					
			    }
				$('#nav_'+act.i).trigger('click');
			}
				 
		});
		//圆点click事件
		 $("#j_switch_nav").undelegate('click').delegate("a", "click", function(){
		 	act._switching=true;
		 	
			if($(this).hasClass('active')){
				return false;
			}
			
	 		$("#j_switch_nav a").removeClass('active');
		    $(this).addClass('active');
		   
		    var id=$(this).attr('href'),
			    prevObj=$('#page_'+act.i),
				prevObj2=$('#page_'+(act.down?act.i-1:act.i+1)),
			    animateObj=$(id),
				actPrev=act.down?act.i-1:act.i+1,
			    top= animateObj.offset().top,
			    prevT=getDefaultStyle(prevObj.find('.animate')[0],'top'),
		        endT=getDefaultStyle(animateObj.find('.animate')[0],'top'),
				endL=getDefaultStyle(animateObj.find('.animate')[0],'left');
			    $(".animate").removeAttr("style");
		      	act.i=id.split('_')[1];
				if(act.i==4){
					$('#next_arrow').hide();
				 }else{
					$('#next_arrow').show();
				 }
				
				 //文字出去
				 if(act._first){
				 	act._first=false;
				 	$('.text01').css('opacity',1);
				 }else{
				 	TweenLite.fromTo( $('.step_text'),1, {autoAlpha:1,ease:Power1.easeOut},{autoAlpha:0,onComplete:function(){
						$('.step_text').removeAttr("style");
					}});
				 }
				
		  		//第一，二个动画
				if(act.i==1||act.i==2){
					
					TweenLite.fromTo( prevObj2.find('.animate'),.5, {top:endT,autoAlpha:1,ease:Power1.easeOut},{top:"-100px",autoAlpha:0,onComplete:function(){
						$(".animate").removeAttr("style");
					}});
					
					$('html,body').animate({'scrollTop':top},act.f?800:500,function(){
						$('.step_text').removeClass('text01').removeClass('text02').removeClass('text03').removeClass('text04').addClass('text0'+act.i);
						
						TweenLite.fromTo( $('.step_text'),0.5, {autoAlpha:0},{autoAlpha:1,delay:0.2,ease:Power1.easeIn});
						
				    	TweenLite.fromTo( animateObj.find('.animate'),0.8, {top:"-100px",autoAlpha:0},{top:endT,autoAlpha:1,delay:0.5,ease:Power1.easeIn,onComplete:function(){
				    		act._switching=false;
							act.f=1;
							
				    	}});
				    	
				    });
				}
					
				//第三个动画
				if(act.i==3){
					act.f=1;
					
					TweenLite.fromTo( prevObj2.find('.animate'),.5, {top:endT,autoAlpha:1,ease:Power1.easeOut},{top:"-200px",autoAlpha:0,onComplete:function(){
						$(".animate").removeAttr("style");
					}})
					$('html,body').animate({'scrollTop':top},800,function(){
						$('.step_text').removeClass('text01').removeClass('text02').removeClass('text03').removeClass('text04').addClass('text0'+act.i);
						TweenLite.fromTo( $('.step_text'),0.5, {autoAlpha:0},{autoAlpha:1,delay:0.2,ease:Power1.easeIn});//文字出来
				    	TweenLite.fromTo( animateObj.find('.animate'),0.6, {left:"120px",top:'50px',autoAlpha:0},{left:endL,top:endT,autoAlpha:1,delay:.5,ease:Power0.easeOut,onComplete:function(){
				    		act._switching=false;
							
				    	}});
				    	
				    });
				}
				//第四个动画
				if(act.i==4){
					act.f=1;
					TweenLite.fromTo( prevObj2.find('.animate'),.5, {top:endT,autoAlpha:1,ease:Power1.easeOut},{top:"-200px",autoAlpha:0,onComplete:function(){
						$(".animate").removeAttr("style");
						}})
					
					$('html,body').animate({'scrollTop':top},800,function(){
						$('.step_text').removeClass('text01').removeClass('text02').removeClass('text03').removeClass('text04').addClass('text0'+act.i);
						TweenLite.fromTo( $('.step_text'),0.5, {autoAlpha:0},{autoAlpha:1,delay:0.2,ease:Power1.easeIn});
				    	TweenLite.fromTo( animateObj.find('.animate'),0.7, {left:"350px",top:'70px',autoAlpha:0},{left:endL,top:endT,autoAlpha:1,delay:.5,ease:Power0.easeOut,onComplete:function(){
				    		act._switching=false;
							
				    	}});
				    	
				    });
				}
		   
		 });


		 //arrow next click事件
		 $('#next_arrow').unbind('click').bind('click',function(){
		 	act.i++;
		 	$('#nav_'+act.i).trigger('click');
		 });
		 //keydown
		 $(document).on("keydown",function(event){
		 	//判断当event.keyCode 为40,34时（即下方面键,PageUp），执行函数;
           //判断当event.keyCode 为38,33时（即上方面键,PageDn），执行函数;
           if(event.keyCode==40||event.keyCode==34){
           		$('#next_arrow').trigger('click');
           }
           if(event.keyCode==38){
           		act.i--;
		 		$('#nav_'+act.i).trigger('click');
           }
		 });
		 //获取样式
		 function getDefaultStyle(obj,attribute){ // 返回最终样式函数，兼容IE和DOM，设置参数：元素对象、样式特性   
			 return obj.currentStyle?obj.currentStyle[attribute]:document.defaultView.getComputedStyle(obj,false)[attribute];   
		}
		/*//弹窗鼠标经过
		$('#j_mobile_select a').hover(function(){
			$(this).addClass('hover').siblings('a').removeClass('hover');
			var left=$(this).data('move');
			var index=$(this).index();
			$('#j_move_img').animate({'left':left},200);
			$('#j_select_con').find('.fix-box').animate({'left':-599*index},200);
			
		},function(){
		
		});
		//关闭弹窗
		$('.w-close').click(function(){
			$(this).parent().hide();
			$('.ieFix-w').fadeOut();
		});
		//弹窗出现
		$('.menu_list a ,.download_btn').click(function(){
			var i=$(this).index();
			$('.ieFix-w').fadeIn();
			IE.ie6 && $(".ieFix-w").height($(window).height())
			$('.w-info2 ').show();
			$('#j_mobile_select').find('a:eq('+i+')').addClass('hover').siblings('a').removeClass('hover');
			var left=$('#j_mobile_select').find('a:eq('+i+')').data('move');
			$('#j_move_img').animate({'left':left},200);
			$('#j_select_con').find('.fix-box').animate({'left':-599*i},200);
		})*/