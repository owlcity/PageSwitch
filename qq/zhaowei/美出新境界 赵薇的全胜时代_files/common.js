/*
common
*/
var _device = "PC";
(function()
{
	var ua = navigator.userAgent;

	if((ua.indexOf('Android') > 0 && ua.indexOf('Mobile') == -1) || ua.indexOf('iPad') > 0)
	{
		_device = "TB";
	}
	else if((ua.indexOf('iPhone') > 0 && ua.indexOf('iPad') == -1) || ua.indexOf('iPod') > 0 || (ua.indexOf('Android') > 0 && ua.indexOf('Mobile') > 0))
	{
		_device = "SP";
	}
}());


/*------------------------------------------------------------------------
RESIZE
*/
var _resizeList = [];

function xAddResize( _trg )
{
	_resizeList.push( _trg );
}

function xRemoveResize( _trg )
{
	var i;
	var _new = [];
	
	for( i = 0; i < _resizeList.length; i++ )
	{
		if( _resizeList[i] != _trg )
		{
			_new.push( _resizeList[i] );
		}
	}
	
	_resizeList = [];
	
	for( i = 0; i < _new.length; i++ )
	{
		_resizeList.push( _new[i] );
	}
}


function onResize()
{	
	for( var i = 0; i < _resizeList.length; i++ )
	{
		_resizeList[i].onResize();
	}
}

function setScrroll()
{
	_scrLength = 200;//180;//200;
	_scrSpeed = 480;//500;
	_scrEasing = 'easieEaseOutCubic';

	var mousewheelevent = 'onwheel' in document ? 'wheel' : 'onmousewheel' in document ? 'mousewheel' : 'DOMMouseScroll';
	
	$(document).on(mousewheelevent,function(e)
	{
		e.preventDefault();
		var _delta = e.originalEvent.deltaY ? -(e.originalEvent.deltaY) : e.originalEvent.wheelDelta ? e.originalEvent.wheelDelta : -(e.originalEvent.detail);
		
		if( _delta < 0 )
		{
			_scrSet =  $( document ).scrollTop() + _scrLength;
		}
		else
		{
			_scrSet =  $( document ).scrollTop() - _scrLength;
		}
		
		$( 'html,body' )
		.stop()
		.animate({ scrollTop:_scrSet }, _scrSpeed, _scrEasing );
		return false;
	});
}

function setPageTop()
{
	$('#pageTop').hide();
	
	$(window).scroll(function()
	{
		if($(this).scrollTop() > 100)
		{
			$('#pageTop').fadeIn();
        }
        else
		{
			$('#pageTop').fadeOut();
		}
	});
 
    $('#pageTop').click(function()
	{
        $('html,body').animate({
            scrollTop: 0
        }, "easieEaseOutQuart" );
        return false;
    });
}


var isJumpClick = false;
function pageJump( _url )
{
	//if( isJumpClick )
	//{
	//	return;
	//}
	//isJumpClick = true;
	//_main._canvasBg.pageEnd();
	
	$( '#container' ).animate({
		//top:'0px',
		opacity:1
	},10, function(){
		location.href = _url;
	});
	
	//return false;
}

function pageStart( )
{
	document.getElementById( "container" ).style.visibility = "visible";
	
	$( '#container' ).animate({
		//top:'120px',
		opacity: 1
	}, 500, 'easieEaseOutCubic', function(){addedPage()});
	
	return false;
}

function addedPage()
{
	if( this[ "_detail" ] != undefined )
	{
		this[ "_detail" ].createImg();
	}
}




/*
common
*/

var _main;

var Main = ( function()
{
	function Main()
	{
		this._threeMain;
		this._canvasBg;
		this._cover;
		
		this.isCover = true;


		this._worksList = [
			["box4", "http://mat1.gtimg.com/fashion/lijie/zhuanti/meijibangyang/6.9zhaowei/PC/c_A_m1.jpg", 	"http://mat1.gtimg.com/fashion/lijie/zhuanti/meijibangyang/6.9zhaowei/PC/c_A_m1a.png", 	"javascript:;" ]
		];
		
		this._modelCount = 0;
		
		
		window.onload = function()
		{
			_main.onLoad();
		}
	}


	Main.prototype.onLoad = function()
	{
		//var _ref = document.referrer;
		//console.log( "_ref:" + _ref );
		document.body.style.overflow = "auto";
		document.body.style.position = "fixed";
		window.scrollTo(0, 0);
		document.getElementById( "container" ).style.visibility = "hidden";
		document.getElementById( "container" ).style.top = "0px";
		document.getElementById( "container" ).style.opacity = "0";
	
		//document.getElementById( "header" ).style.visibility = "hidden";
		//document.getElementById( "copyright" ).style.visibility = "hidden";
		
		
		if( document.referrer.indexOf( "http://fashion.qq.com" ) != -1)
		{
			this.isCover = false;
		}
		else
		{
			this.isCover = true;
			this._cover = new CanvasCover( "cover" );
			//this.isCover = false;
		}
		//bg
		this._canvasBg = new CanvasBg( "bg", false );
	
		//tjree.js
		this._threeMain = new THREEMain( );
	
		//カセット生成
		for( var i = 0; i < this._worksList.length; i++ )
		{
			this._threeMain.create( this._worksList[i][0],this._worksList[i][1],this._worksList[i][2],this._worksList[i][3] );
		}
	
	
		if( navigator.userAgent.indexOf("Mac") == -1 )
		{
			setScrroll( );
		}
	
		setPageTop();
	
		window.onresize = function(e)
		{
			onResize( );
		}
	
		if( !this.isCover )
		{
			var _child = document.getElementById( "cover" );
			document.body.removeChild( _child );
			
			document.body.style.overflow = "auto";
			document.body.style.position = "static";
			window.scrollTo(0, 0);
			//document.getElementById( "header" ).style.visibility = "visible";
			//document.getElementById( "copyright" ).style.visibility = "visible";
		}
		
		//LOADING ADD
		this.addLoadind();
		
		window.onunload = function()
		{
		}
	}
	
	/*
	COVER CLEAR
	*/
	Main.prototype.clearCover = function()
	{
		this.xAllReady();
		
		var _this = this;
		
		$( '#cover' ).animate({
			top: ( window.innerHeight* -1 - 100 ),
		}, 650, 'easieEaseOutCubic', _this.clearCoverComp );
	}
	
	Main.prototype.clearCoverComp = function()
	{
		_main._cover.clearCover();
		var _child = document.getElementById( "cover" );
		document.body.removeChild( _child );
		_main.xAllStart();
	}


	/*------------------------------------------------------------------------
	START
	*/
	Main.prototype.xAllReady = function()
	{
		document.body.style.overflow = "auto";
		document.body.style.position = "static";
		document.getElementById( "container" ).style.visibility = "visible";
		//document.getElementById( "header" ).style.visibility = "visible";
		//document.getElementById( "copyright" ).style.visibility = "visible";
	
		//
		$( '#container' ).animate({
			//top:'120px',
			opacity: 1
		}, 600, 'easieEaseOutCubic' );
		
		window.scrollTo(0, 0);
	}



	Main.prototype.xAllStart = function()
	{
		this._threeMain.start();
		this._canvasBg.start();
	}
	
	
	
	/*
	works
	*/
	Main.prototype.modelComp = function()
	{	
		this._modelCount++;
		
		if( this._modelCount >= this._worksList.length )
		{	
			this._timer = setTimeout( _main.modelCompTimer, 1000 );
		}
	}
	
	Main.prototype.modelCompTimer = function()
	{	
		clearTimeout( _main._timer );
		
		if( _main.isCover )
		{
			_main._cover.start();
		}
		else
		{
			_main.xAllReady();
			_main.xAllStart();
		}
		
		_main.removeLoading();
	}



	Main.prototype.addLoadind = function()
	{
		var _elm = document.createElement('div');
		_elm.id = "loading";
		_elm.innerHTML = "<img src='http://mat1.gtimg.com/fashion/lijie/zhuanti/meijibangyang/6.9zhaowei/PC/loading.gif'>"
		document.body.appendChild( _elm );
	}

	Main.prototype.removeLoading = function()
	{
		if( document.getElementById( "loading" ) != null );
		{
			$( '#loading' ).animate({
				opacity: 0
			}, 300, 'easieEaseOutCubic', _main.removeLoadingComp );
		}
	}
	
	Main.prototype.removeLoadingComp = function()
	{
		var _child = document.getElementById( "loading" );
		document.body.removeChild( _child );
	}

	return Main;
})();

_main = new Main();



/*  |xGv00|7305aeed12265c81829c6b05e01c5a53 */