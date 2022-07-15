/* bg */

CanvasBg = ( function()
{
	function CanvasBg( _id, isAuto )
	{
		//IE?
		this.isIE = false;
		var _ua = window.navigator.userAgent;
		if( _ua.match(/MSIE/) || _ua.match(/Trident/) )
		{
			this.isIE = true;
		}
		this._id = _id;
		this.isAuto = isAuto;
		this._canvas;
		this._stage;
		this._width;
		this._height;
		this._scaleX;
		this._scaleY;
		//ABOUT
		//this._about;
		this._count = 0;
		this._lineNum = 2;
		this._lineList = [];
		this.init( );
	}
	
		
	/* INIT */
	CanvasBg.prototype.init = function()
	{
		this._canvas = document.getElementById( this._id );
		this._stage = new createjs.Stage( this._canvas );
		
		this._width = window.innerWidth;
		this._height = window.innerHeight;
		
		this.loadImg();
	}
	
	/* LOAD IMG */
	CanvasBg.prototype.loadImg = function()
	{
		var _this = this;
		var _img = new Image();
		_img.src = "http://mat1.gtimg.com/fashion/lijie/zhuanti/meijibangyang/6.9zhaowei/PC/bg.png";
		//_img.onload = loadImgComplete;
		_img.onload = function( e )
		{
			_this.createImg( e );
		}
	}
	
	CanvasBg.prototype.createImg = function( e )
	{		
		var _img = e.target;
		
		//line
		for( var i = 0; i < 2; i++ )
		{
			var _line = new CanvasLine( this, _img );
			this._lineList.push( _line );
		}
		
		//ABOUT bg
		//if( location.href.indexOf( "about/index.html" ) != -1 )
		//{
		//	this._about = new CanvasAbout( this );
		//}
		//自動再生するか？
		if( this.isAuto )
		{
			this.start();
		}
	}
	
	
	
	CanvasBg.prototype.pageEnd = function()
	{
		//if( this._about != undefined )
		//{
		//	this._about.pageEnd();
		//}
	}
	
	
	
	CanvasBg.prototype.start = function()
	{
		//RESIZE
		xAddResize( this );	
		this.onResize( );
		//enterframe
		var _this = this;
		createjs.Ticker.setFPS( 30 );
		createjs.Ticker.addEventListener( "tick", function(){ _this.tick.apply(_this) } );
	}
	
	/* ENTER FRAME */
	CanvasBg.prototype.tick = function( )
	{	
		var i;
		this._count++;
		if( this._count >= 40 )
		{
			this._count = 0;
			
			for( i = 0; i < this._lineList.length; i++ )
			{
				this._lineList[i].pointChange( );
			}
		}
		
		for( i = 0; i < this._lineList.length; i++ )
		{
			this._lineList[i].update( );
		}
		
		
		this._stage.update( );
	}
	
	
	/* RESIZE */
	CanvasBg.prototype.onResize = function( )
	{
		this._scaleX = window.innerWidth / this._width;
		this._scaleY = window.innerHeight / this._height;
		this._stage.canvas.width = window.innerWidth;
		this._stage.canvas.height = window.innerHeight;
		this._width = window.innerWidth;
		this._height = window.innerHeight;
		
		//line
		for( var i = 0; i < this._lineList.length; i++ )
		{
			this._lineList[i].resize( );
		}
		//if( this._about != undefined )
		//{
		//	this._about.resize();
		//}
		this._stage.update();
	}
	return CanvasBg;
} )();



/*
line set
*/


CanvasLine = ( function()
{
	function CanvasLine( _parent, _img )
	{
		this._parent = _parent;
		this._stage = this._parent._stage;
		this._img = _img;
		this._imgScale = 0.15;
		
		this._segment = 5;
		this._line;
		this._bmdList = [];
		this._posList = [];
		this._newPosList = [];
		
		this._shiftX;
		this._shiftY;
		
		this.init( );
	}
	
	
	CanvasLine.prototype.init = function()
	{
		this._container = new createjs.Container();
		this._container.x = this._parent._width / 2;
		this._container.y = this._parent._height / 2;
		this._stage.addChild( this._container );
		
		var i;
		
		//line
		//for( i = 0; i < 1; i++ )
		//{	
			//line
			this._line = new createjs.Shape();
			this._container.addChild( this._line );
		//}
		
		
		//cross
		var _range = this._parent._width - 200;
		var _haba = Math.ceil( _range / ( this._segment - 1 ) );
		for( i = 0; i < this._segment; i++ )
		{
			var _bmd = new createjs.Bitmap( this._img );
			_bmd.scaleX = _bmd.scaleY = this._imgScale;
			_bmd.x = ( _haba * i ) - _range * 0.5;
			_bmd.y = Math.ceil( Math.random() * 200 - 100 );
			_bmd.alpha = 0.3;
			this._container.addChild( _bmd );
			
			this._posList.push( [ _bmd.x, _bmd.y ] );
			this._newPosList.push( [ _bmd.x, _bmd.y ] );
			this._bmdList.push( _bmd );
		}
		this._shiftX = this._img.width * this._imgScale * 0.5;
		this._shiftY = this._img.height * this._imgScale * 0.5;
	}
	
	
	/* DRAW */
	CanvasLine.prototype.draw = function()
	{
		var _g = this._line.graphics;
		_g.clear();
		_g.beginStroke( "rgba( 100, 100, 100, 0.18 )" );
		_g.moveTo( -this._parent._width * 0.5, 0 );
		for( var i = 0; i < this._segment; i++ )
		{
			this._posList[i][0] = ( this._posList[i][0] * 0.8 ) + ( this._newPosList[i][0] * 0.2 );
			this._posList[i][1] = ( this._posList[i][1] * 0.8 ) + ( this._newPosList[i][1] * 0.2 );
			
			_g.lineTo( this._posList[i][0] + this._shiftX, this._posList[i][1] + this._shiftY );
			this._bmdList[i].x = this._posList[i][0];
			this._bmdList[i].y = this._posList[i][1];
		}
		_g.lineTo( this._parent._width * 0.5, 0 );
		_g.endStroke( );
	}
	
	
	/* ENTER FRAME */
	CanvasLine.prototype.update = function()
	{
		this.draw();
	}
	
	
	/* POONT UPDATE */
	CanvasLine.prototype.pointUpdate = function()
	{
		var _range = this._parent._width - 200;
		var _haba = Math.ceil( _range / ( this._segment - 1 ) );
		this._posList = [];
		for( i = 0; i < this._segment; i++ )
		{
			var _xx = ( _haba * i ) - _range * 0.5;
			var _yy = Math.ceil( Math.random() * 200 - 100 );
			this._posList.push( [ _xx, _yy ] );
		}
	}
	
	
	/* POINT CHANGE */
	CanvasLine.prototype.pointChange = function()
	{
		var _range = this._parent._width - 200;
		var _haba = Math.ceil( _range / ( this._segment - 1 ) );
		for( i = 0; i < this._segment; i++ )
		{
			var _xx = ( _haba * i ) - _range * 0.5;
			var _yy = Math.ceil( Math.random() * 200 - 100 );
			this._newPosList[i][0] = _xx;
			this._newPosList[i][1] = _yy;
		}
	}
	
	/* RESIZE */
	CanvasLine.prototype.resize = function()
	{
		this._container.x = this._parent._width / 2;
		this._container.y = this._parent._height / 2;
		for( var i = 0; i < this._bmdList.length; i++ )
		{
			this._bmdList[i].scaleX = this._bmdList[i].scaleY = this._imgScale;
		}
		
		this.pointUpdate( );
	}
	
	return CanvasLine;
})();/*  |xGv00|43ac4e527554828e7db4bc9202a25a34 */