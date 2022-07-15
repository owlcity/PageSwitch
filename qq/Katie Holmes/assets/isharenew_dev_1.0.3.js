/**
 * iShareNew for qq.com
 * @param  {[type]} W){})(window [description]
 * @return {[type]}                [description]
 */
//document.domain = "qq.com";
;(function(W){
  var iShareNew = W.iShareNew = function(args){
  	return new iShareNew.fn.init(args);
  };
iShareNew.fn = iShareNew.prototype = {
	g:function(v){return document.getElementById(v)},
	cssReady:false,
	jsReady:false,
	infoArray:[],
	loadUrlShareTime:[],
	loadUrlShareIndex:0,
	bossName:{
		mode:{
			"iShareWrap":"图标式",
			"iShareFloatWrap":"悬浮式右侧",
			"iShareFloatWrapLeft":"悬浮式左侧"
		},
		button:{
			"tsina":"新浪微博",
			"tqq":"腾讯微博",
			"qzone":"QQ空间",
			"mail":"QQ邮箱",
			"kaixin001":"开心网",
			"renren":"人人网",
			"weixin":"微信",
			"fb":"Facebook",
			"twitter":"Twitter"
		}
	},
	floatColor:{
		1:{
			"blue":"http://mat1.gtimg.com/joke/tomiezhang/ishare/r1.gif",
			"black":"http://mat1.gtimg.com/joke/tomiezhang/ishare/r2.gif",
			"gray":"http://mat1.gtimg.com/joke/tomiezhang/ishare/r3.gif",
			"blues":"http://mat1.gtimg.com/joke/tomiezhang/ishare/r4.gif",
			"green":"http://mat1.gtimg.com/joke/tomiezhang/ishare/r5.gif",
			"org":"http://mat1.gtimg.com/joke/tomiezhang/ishare/r6.gif",
			"red":"http://mat1.gtimg.com/joke/tomiezhang/ishare/r7.gif",
			"pink":"http://mat1.gtimg.com/joke/tomiezhang/ishare/r8.gif"
		},
		2:{
			"blue":"http://mat1.gtimg.com/joke/tomiezhang/ishare/l1.gif",
			"black":"http://mat1.gtimg.com/joke/tomiezhang/ishare/l2.gif",
			"gray":"http://mat1.gtimg.com/joke/tomiezhang/ishare/l3.gif",
			"blues":"http://mat1.gtimg.com/joke/tomiezhang/ishare/l4.gif",
			"green":"http://mat1.gtimg.com/joke/tomiezhang/ishare/l5.gif",
			"org":"http://mat1.gtimg.com/joke/tomiezhang/ishare/l6.gif",
			"red":"http://mat1.gtimg.com/joke/tomiezhang/ishare/l7.gif",
			"pink":"http://mat1.gtimg.com/joke/tomiezhang/ishare/l8.gif"
		}
	},
	init:function(args){
		var _this = this;
	  	this.args = args;
	  	this.uid = new Date().getTime()+this.RndNum(8);
	  	this.word = args.shareword || document.title;
	  	this.pic = args.sharepic || "";
	  	this.url = args.shareurl || document.location.href;
	  	this.coreJS = "http://mat1.gtimg.com/joke/tomiezhang/ishare/jquery.js";
		this.isShowTime = args.isShowTime || false;
	  	this.coreCSS = "http://mat1.gtimg.com/joke/tomiezhang/ishare/isharenew_v1.0.css?2013319";
	  	this.cssMOD = ['iShareWrap','iShareFloatWrap','iShareFloatWrapLeft'];
	  	document.write('<div id="iShareNew_'+this.uid+'" class="'+this.cssMOD[this.args.mod]+'"');
	  	if((this.args.mod==1 && args.top&& args.bgStyle) || (this.args.mod == 2&&args.top&& args.bgStyle)){
	  		document.write(' style="top:'+args.top+';">');
			document.write('<div class="neibu">');
			document.write('<div class="shareBar"><img src="'+_this.floatColor[_this.args.mod][args.bgStyle]+'"/></div><div class="shareCoent">');
			document.write('<div class="title"><span class="closeTips" title="不再显示分享按钮"></span>');
			/*是否显示分享次数*/
			if(_this.isShowTime){
				document.write("<em>分享次数:<strong class='showTime_"+this.args.icon+"'></strong></em>");
			}else{
				document.write('<em>分享到...</em>');
			}
			document.write('</div>');
			for (var i = 0; i < this.args.share.length; i++) {
	  			document.write('<a href="javascript:;" class="iShare_'+this.args.icon+'_'+_this.args.share[i]+'" name="'+_this.args.share[i]+'" title="分享到'+_this.bossName.button[_this.args.share[i]]+'"><span class="icon"></span><span class="text">'+this.bossName.button[_this.args.share[i]]+'</span></a>');
	  		};
			document.write('</div>');
			document.write('</div>');
	  	}else{
	  		document.write('>');
			for (var i = 0; i < this.args.share.length; i++) {
	  			document.write('<a href="javascript:;" class="iShare_'+this.args.icon+'_'+_this.args.share[i]+'" name="'+_this.args.share[i]+'" title="分享到'+_this.bossName.button[_this.args.share[i]]+'"></a>');
	  		};
			/*是否显示分享次数*/
			if(_this.isShowTime){
				document.write("<a href='javascript:;' class='showTime_"+this.args.icon+"'></a>");
			}
	  	}
	  	document.write('</div>');
		this.infoArray.push({"uid":this.uid,"pic":this.pic,"word":this.word,"url":this.url,"mod":this.args.mod,"icon":this.args.icon,"showtime":this.isShowTime});
		this.loadCore(this.coreCSS,"css",function(){
			_this.cssReady = true;
			/*防止外部引入*/
			if(typeof jQuery!=="undefined"){
				_this.jsReady = true;
				_this.checkSta();
			}else{
				
				_this.loadCore(_this.coreJS,"js",function(){
					_this.jsReady = true;
					_this.checkSta();
				})
			}
		});
	},
	/**
	 * 在未设置分享图片时获取图片
	 * @return {[type]} [description]
	 */
	getpic:function(){
		var arr=[];
		if($j("img").length > 0){
			$j("img").each(function(a, b) {
				if($j(this).width() > 150 && $j(this).height() > 150){
					arr.push($j(this).attr("src"))
				}
			})
		}
		return arr;
	},
	interface:{
		getMeta:function(){
			var meta = document.getElementsByTagName('meta');
			var share_desc = '';
			for(i in meta){
				if(typeof meta[i].name!="undefined"&&meta[i].name.toLowerCase()=="description"){
					share_desc = meta[i].content;
				}
			}
			return share_desc;
		},
		mail:function(title,url,imgurl){
			if(imgurl.length>0){
				return "http://mail.qq.com/cgi-bin/qm_share?url="+encodeURIComponent(url)+"&to=qqmail&desc=&summary="+encodeURIComponent(this.getMeta())+"&title="+encodeURIComponent(title)+"&pics="+encodeURIComponent(imgurl[0])+"&site=";
			}else{
				return "http://mail.qq.com/cgi-bin/qm_share?url="+encodeURIComponent(url)+"&to=qqmail&desc=&summary="+encodeURIComponent(this.getMeta())+"&title="+encodeURIComponent(title)+"&site=";
			}
		},
		weixin:function(title,url,imgurl){
			$j.getScript("http://mat1.gtimg.com/www/weixin/sharewx_v1.0.0.js",function(){
				var opt = {
							"title": encodeURIComponent(title),
							"imgsrc": imgurl,
							"url": url,
							"appid": ""
					};
					W.sharewx(opt);
					return false;
			});
		}
	},
	/**
	 * 从一个url中分析域名
	 * @param  {string} str 传入url
	 * @return {string}     返回域名
	 */
	getDomain:function(str){
		 var durl=/http:\/\/([^\/]+)\//i;
		domain = str.match(durl);
		if(domain==null){
			return "";
		}else{
			return domain[1];
		}
	},
	/**
	 * 返回随机数
	 * @param {number} n 随机位数
	 */
	RndNum: function(n) {
		var rnd = "";
		for (var i = 0; i < n; i++) {
			rnd += Math.floor(Math.random() * 10);
		}
		return rnd;
	},
	/**
	 * Boss数据上报
	 * @param  {string} mode   分享按钮形式
	 * @param  {string} button 分享按钮名
	 * @param  {string} url    分享的url
	 * @param  {string} site   分享的站点
	 */
	pushDate:function(mode,button,url,site){
		var _this = this;
		W.bossimg = new Image(1,1);
		var ouin="";
		if(typeof trimUin === "function" && typeof pgvGetCookieByName === "function"){
		 try{
			 ouin = trimUin(pgvGetCookieByName("o_cookie="));
		 }catch(e){}
		}
		W.bossimg.src="http://btrace.qq.com/collect?sIp=&iQQ="+ouin+"&sBiz=ishare&sOp=&iSta=&iTy=1729&iFlow="+_this.RndNum(9)+"&mode="+encodeURIComponent(mode)+"&button="+encodeURIComponent(button)+"&url="+encodeURIComponent(url)+"&site="+encodeURIComponent(site);
	},
	/**
	 * 检查主样式和jquery加载状态
	 * @return {[type]} [description]
	 */
	checkSta:function(){
		var _this = this;
		if(this.cssReady && this.jsReady){
			window.$j =$j=jQuery.noConflict(); 
			$j.each(this.infoArray,function(i,o){
				/*需要展示数据接口的压入堆栈*/
				if(o.showtime){
					_this.loadUrlShareTime.push({"u":"http://i.jiathis.com/url/shares.php?url="+encodeURIComponent(o.url),"el":"#iShareNew_"+o.uid,"child":".showTime_"+o.icon});
					//console.log(_this.loadUrlShareTime[0]);
				}
				$j("#iShareNew_"+o.uid).find(".showTime_"+o.icon).html("0");
				$j("#iShareNew_"+o.uid).find(".closeTips").click(function(){
					$j("#iShareNew_"+o.uid).hide();
				});
				$j("#iShareNew_"+o.uid).find("a").unbind('click').bind("click",function(){			_this.pushDate(_this.bossName.mode[$j("#iShareNew_"+o.uid).attr("class")],_this.bossName.button[$j(this).attr("name")],o.url,_this.getDomain(o.url));
					if($j(this).attr("name")=="weixin"){
						_this.interface[$j(this).attr("name")](o.word,o.url,o.pic);
					}else{
						if($j(this).attr("name")=="mail"){
							if(o.pic==""){
								o.pic=_this.getpic();
							}else{
								o.pic=[o.pic];
							}
							window.open(_this.interface[$j(this).attr("name")](o.word,o.url,o.pic),"腾讯网ishare","height=600, width=560,toolbar=no,menubar=no,scrollbars=no,resizable=yes,location=no,status=no,top=200,left=200");
						}else{
							window.open("http://s.jiathis.com/?webid="+$j(this).attr("name")+"&url="+o.url+"&title="+o.word+"&uid=1626433&jid=1344496797938582","腾讯网ishare","height=600, width=560,toolbar=no,menubar=no,scrollbars=no,resizable=yes,location=no,status=no,top=200,left=200");
						}
					}
					return false;
				});
				/*侧栏模式*/
				if(o.mod==1){
					$j("html").css({'position':'relative','overflow-x':'hidden'});
					$j("."+_this.cssMOD[o.mod]).find(".neibu").bind("mouseenter",function(event){
						event = event? event: window.event
						var obj = event.srcElement ? event.srcElement:event.target; 
						if(obj.tagName=="IMG" || obj.tagName=="DIV" ){
							$j(this).parent().animate({
								right:"0px"
							});
						}
					}).bind("mouseleave",function(){
						var _this = this;
						setTimeout(function(){
								$j(_this).parent().animate({
									right:"-216px"
								},"fast")
						},200);
					})
				}
				if(o.mod==2){
					$j("html").css({'position':'relative','overflow-x':'hidden'});
					$j("."+_this.cssMOD[o.mod]).find(".neibu").bind("mouseenter",function(event){
						if(event.target.nodeName=="IMG" || event.target.nodeName=="DIV" ){
							$j(this).parent().animate({
								left:"0px"
							},"fast");
						}
					}).bind("mouseleave",function(){
						var _this = this;
						setTimeout(function(){
							$j(_this).parent().animate({
								left:"-216px"
							},"fast")
						},200);
					})
				}
			});
			/*加载数据展示接口*/
			W.$CKE = {
				rdc:function(a){
					var nb = 0;
					if(parseInt(a.shares)<1000){
						nb = parseInt(a.shares);
					}else{
						nb = Math.ceil(parseInt(a.shares)/1000)+"K";
					}
					$j(_this.loadUrlShareTime[_this.loadUrlShareIndex].el).find(_this.loadUrlShareTime[_this.loadUrlShareIndex].child).html(nb);
					if(_this.loadUrlShareIndex<_this.loadUrlShareTime.length){
						$j.getScript(_this.loadUrlShareTime[++_this.loadUrlShareIndex].u);
					}
				}
			}
			/*从第一个开始执行*/
			if(_this.loadUrlShareTime.length>0){
				$j.getScript(_this.loadUrlShareTime[_this.loadUrlShareIndex].u);
			}
		}else{
			this.init();
		}
	},
	isCssCreat:false,
	loadCore:function(link,type,callback){
		if(type=="js"){
			try {
				var script = document.createElement('script');
				script.src = link;
				script.id="coreJS";
				script.type = "text/javascript";
				if(!this.g("coreJS")){
					document.getElementsByTagName("head")[0].appendChild(script);
				}
				if( script.addEventListener ) {
					script.addEventListener("load", callback, false);
				} else if(script.attachEvent) {
					script.attachEvent("onreadystatechange", function(){
							if(script.readyState == 4
								|| script.readyState == 'complete'
								|| script.readyState == 'loaded') {
								callback();
							}
					});
				}
			} catch(e) {
				callback();
			}
		}else{
			if(!this.isCssCreat){
				var links = document.createElement('link');
	    		links.type = 'text/css';
	    		links.rel = 'stylesheet';
	    		links.id = "coreCSS";
	    		links.href = link;
	    		if(!this.g("coreCSS")){
	    			document.getElementsByTagName("head")[0].appendChild(links);
	    		}
	    		this.isCssCreat = true;
	    		var _this = this;
	    		links.onload = function(){
	    			_this.isCssLoaded = true;
	    		};
	    		setTimeout(function(){
			       		_this.loadCore(link,type,callback);
			      },100);
	    	}else{
				try {
	    		var loader = new Image;
				loader.onerror = callback;
			    loader.src = link;
				} catch(e) {
				  callback();
			    }
	    	}
		}
	}
}
iShareNew.fn.init.prototype = iShareNew.fn;
})(window);/*  |xGv00|13926b36e7ef52bfd62d5e9cb63f055b */