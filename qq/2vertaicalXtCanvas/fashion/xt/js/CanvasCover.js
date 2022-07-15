/* COVER */
CanvasCover = ( function()
{
	function CanvasCover( _id )
	{
		this.isWebGL = false;
		this._id = _id;
		this.isAction = false;
		this._render;
		this._scene;
		this._root;
		this._dLight;
		this._ambLight;
		this._cam;
		this._fov = 45;
		this._far = 5000;
		this._near = 1;
		this._objList = [];
		this._text;
	}
	
	/* START */
	CanvasCover.prototype.start = function()
	{
		this.isAction = true;
		if( !CanvasDetector.canWebGL() )
		{
			this.isWebGL = false;
		}
		else
		{
			this.isWebGL = true;
			this.create3D();
		}
		this.createLogo();
	}
	
	
	
	/* CREATE LOGO */
	CanvasCover.prototype.createLogo = function()
	{
		this._logoWrapper = document.createElement( "div" );
		this._logoWrapper.id = "logoWrapper";
		this._logoWrapper.style.top = "-20px";
		this._logoWrapper.style.position = "absolute";
		this._logoWrapper.style.width = "100%";
		this._logoWrapper.style.height = "100%";
		document.getElementById( this._id ).appendChild( this._logoWrapper );
		this._logoWrapper.style.opacity = 0;
		
		
		//logo img
		this._logo = document.createElement( "div" );
		this._logo.id = "coverLogo";
		this._logo.style.position = "absolute";
		this._logo.style.width = "327px";
		this._logo.style.height = "327px";
		this._logo.style.top = "45%";
		this._logo.style.left = "50%";
		this._logo.style.marginLeft = "-163px";
		this._logo.style.marginTop = "-163px";
		this._logoWrapper.appendChild( this._logo );
		
		var _this = this;
		var _img = document.createElement( "img" );
		_img.src = "http://mat1.gtimg.com/fashion/xujinzhi/beautystar/xuqing/coverLogo.png";
		
		_img.onload = function( e )
		{
			_this.setImageLogo( e );
		}
	}
	
	
	CanvasCover.prototype.setImageLogo = function( e )
	{
		var _img = e.target;
		this._logo.appendChild( _img );
		
		this._startBtn = document.createElement( "div" );
		this._startBtn.id = "coverStart";
		this._startBtn.style.position = "absolute";
		this._startBtn.style.width = "114px";
		this._startBtn.style.height = "161px";
		this._startBtn.style.top = "100%";
		this._startBtn.style.left = "50%";
		this._startBtn.style.marginLeft = "-57px";
		this._startBtn.style.marginTop = "-181px";
		this._logoWrapper.appendChild( this._startBtn );
		
		var _this = this;
		var _img = document.createElement( "img" );
		_img.src = "http://mat1.gtimg.com/fashion/xujinzhi/beautystar/xuqing/clickStart.png";
		
		_img.onload = function( e )
		{
			_this.setImageStart( e );
		}
	}
	
	CanvasCover.prototype.setImageStart = function( e )
	{
		var _img = e.target;
		this._startBtn.appendChild( _img );
		
		//logo表示
		var _this = this;
		
		$( _this._logoWrapper ).animate({
		opacity: 1,
		top: 0,
		}, 1000, 'easieEaseOutCubic', function(){ _this.animationStart() } );
	}

	
	/* CREATE 3D */
	CanvasCover.prototype.create3D = function()
	{
		this._canvas = document.createElement( 'div' );
		this._canvas.id = "worldWrapper";
		this._canvas.style.position = "absolute";
		this._canvas.style.top = "0px";
		this._canvas.style.left = "0px";
		document.getElementById( this._id ).appendChild( this._canvas );
		
		this._width = window.innerWidth;
		this._height = window.innerHeight;


		//scene and camera
		this._cam = new THREE.PerspectiveCamera( this._fov, this._width / this._height, this._near, this._far );
		this._cam.position.z = 250;
		this._scene = new THREE.Scene();

		//root
		this._root = new THREE.Object3D();
		this._scene.add( this._root );
		
		//TEXT
		this._text = new TextBaseObj( this );
		this._objList.push( this._text );
		
		
		//render
		//this._render =  new THREE.WebGLRenderer({ antialias:true, alpha:false });
		//this._render.setClearColor( 0x000000, 1 );
		//this._render.setSize( this._width, this._height );
		//this._canvas.appendChild( this._render.domElement );
	}
	
	
	/* ANIMATION START */
	CanvasCover.prototype.animationStart = function()
	{
		var _this = this;
		
		if( _this.isWebGL )
		{
			//ENTER FRAME
			requestAnimationFrame( function(  ){ _this.onEnterFrame.apply( _this ) } );
			//RESIZE
			xAddResize( this );
			this.onResize( );
		
		}
		
		//click test
		this._logoWrapper.addEventListener( "click", function(e){
			_this.bgClick( e );
		} );
	}
	
	
	/* BG CLICK */
	CanvasCover.prototype.bgClick = function( e )
	{	
		this._logoWrapper.removeEventListener( "click", function(e){
			_this.bgClick( e );
		} );
		_main.clearCover();
	}
	

	/* ENTER FRAME */
	CanvasCover.prototype.onEnterFrame = function()
	{
		if( !this.isAction )
		{
			return;
		}
		var _this = this;
		this._anime = requestAnimationFrame( function(  ){ _this.onEnterFrame.apply( _this ) } );
		
		//this._render.render( this._scene, this._cam );
		
		var _leng = this._objList.length;
		for( var i = 0; i < _leng; i++ )
		{
			this._objList[i].enterFrame();
		}
		
	}
	
	
	
	/* CLEAR */
	CanvasCover.prototype.clearCover = function()
	{
		isAction = false;
		xRemoveResize( this );
		cancelAnimationFrame( this._anime );
		//remove mouseMove
		xCoverMouseMoveCheck( false );
	}
	
	/* RESIZE */
	CanvasCover.prototype.onResize = function( )
	{
		this._width = window.innerWidth;
		this._height = window.innerHeight;
		
		this._cam.aspect = this._width / this._height;
		this._cam.updateProjectionMatrix();
		//this._render.setSize( this._width, this._height );

	}
	
	return CanvasCover;
} )();





/* 3D OBJECT */


TextBaseObj = ( function()
{
	function TextBaseObj( _p )
	{
		this._parent = _p;
		this._wrapper;
		this._planeNum = 2;
		this._planeList = [];
		this._mousePos = new THREE.Vector3( 0,0,0 );
		this._lookVec = new THREE.Vector3( 0, 0, 0 );
		//MOVING
		this.isMove = false;
		this._oldX = 0;
		this._oldY = 0;
		
		//CAMERA SIN Z
		this._sinZ = 0;
		
		
		this.init();
	}
	
	
	TextBaseObj.prototype.init = function()
	{
		this._wrapper = new THREE.Object3D();
		//this._wrapper.position.x = -this._totalW * 0.6;
		//this._wrapper.position.y = this._totalH * 0.6;
		
		this._parent._root.add( this._wrapper );
		
		//projector
		this._projector = new THREE.Projector();
		
		
		/* 	BLACK */
		var _blackGeo = new THREE.PlaneGeometry( 1200, 1000, 1, 1 );
		var _blackMat = new THREE.MeshBasicMaterial( { color:0x000000, transparent: true } );
		this._black = new THREE.Mesh( _blackGeo, _blackMat );
		this._wrapper.add( this._black );
		this._black.position.z = 200;
		
		
		/* 	MATERIAL 1 */
		//var _tex1 = THREE.ImageUtils.loadTexture( 'http://mat1.gtimg.com/fashion/xujinzhi/beautystar/xuqing/textTexture.png' );
		var _tex1 = THREE.ImageUtils.loadTexture( '' );
		_tex1.wrapS = THREE.RepeatWrapping;
		_tex1.wrapT = THREE.RepeatWrapping;
		_tex1.repeat.set( 2, 1 );
		
		var _o1 = {
			//color:0xFF0000,
			//wireframe: true,
			side: THREE.DoubleSide,
			transparent:true,
			map:_tex1,
			//blending:THREE.SubtractiveBlending,
			//blending:THREE.MultiplyBlending,
			blending:THREE.AdditiveBlending,
			opacity:0.9
		};
		
		//var _material1 = new THREE.MeshLambertMaterial( _o1 );
		var _material1 = new THREE.MeshBasicMaterial( _o1 );
		//_material1.depthTest = false;
		_material1.alphaTest = 0.3;
		
		
		/* 	MATERIAL 2
		*/
		//var _tex2 = THREE.ImageUtils.loadTexture( 'http://mat1.gtimg.com/fashion/xujinzhi/beautystar/xuqing/textTexture2.png' );
		var _tex2 = THREE.ImageUtils.loadTexture( '' );
		_tex2.wrapS = THREE.RepeatWrapping;
		_tex2.wrapT = THREE.RepeatWrapping;
		_tex2.repeat.set( 2, 1 );
		
		var _o2 = {
			//color:0xFF0000,
			//wireframe: true,
			side: THREE.DoubleSide,
			transparent:true,
			map:_tex2,
			//blending:THREE.SubtractiveBlending,
			//blending:THREE.MultiplyBlending,
			blending:THREE.AdditiveBlending,
			opacity:0.7
		};
		
		//var _material2 = new THREE.MeshLambertMaterial( _o2 );
		var _material2 = new THREE.MeshBasicMaterial( _o2 );
		//_material2.depthTest = false;
		_material2.alphaTest = 0.3;
		
		
		var _plane = new TextPlane( this, _material1, 1 );
		this._planeList.push( _plane );
		
		var _plane2 = new TextPlane( this, _material2, 2 );
		this._planeList.push( _plane2 );
		_plane2._mesh.position.z = -2;
		

		//mouse test
		var _testgeo = new THREE.PlaneGeometry( 1, 1, 1, 1 );
		var _testmat = new THREE.MeshBasicMaterial( {color:0x000000,transparent:true,opacity:0.1} );
		this._test = new THREE.Mesh( _testgeo, _testmat );
		this._wrapper.add( this._test );
		


		//MOUSE CHECK
		xCoverMouseMoveCheck( true );
	}
	
	
	TextBaseObj.prototype.enterFrame = function()
	{
		//black
		if( this._black )
		{
			this._black.material.opacity -= 0.01;
			
			if( this._black.material.opacity <= 0 )
			{
				this._wrapper.remove( this._black );
				this._black.geometry.dispose();
				this._black.material.dispose();
				this._black = null;
			}
		}
		
		var _cam = this._parent._cam;

		
		
		this._planeList[ 0 ].enterFrame();
		this._planeList[ 1 ].enterFrame();
		//this._bg.enterFrame();
		
		//_cam.lookAt( this._lookVec );
		_cam.rotation.z = ( _cam.rotation.z * 0.995 ) + ( -this._mousePos.x * 0.09 * 0.005 );
		
		
		this._planeList[ 0 ]._mesh.rotation.y = ( this._planeList[ 0 ]._mesh.rotation.y * 0.998 ) + ( this._mousePos.x * 0.15 * 0.002 );
		//this._planeList[ 0 ]._mesh.rotation.z = ( this._planeList[ 0 ]._mesh.rotation.z * 0.995 ) + ( -this._mousePos.x * 0.04 * 0.005 );
		this._planeList[ 0 ]._mesh.position.x = ( this._planeList[ 0 ]._mesh.position.x * 0.998 ) + ( -this._mousePos.x * 40 * 0.002 );
		this._planeList[ 0 ]._mesh.position.y = ( this._planeList[ 0 ]._mesh.position.y * 0.998 ) + ( -this._mousePos.y * 40 * 0.002 );
		
		this._planeList[ 1 ]._mesh.rotation.y = ( this._planeList[ 1 ]._mesh.rotation.y * 0.6 ) + ( this._planeList[ 0 ]._mesh.rotation.y * 0.4 );
		this._planeList[ 1 ]._mesh.position.x = ( this._planeList[ 1 ]._mesh.position.x * 0.8 ) + ( this._planeList[ 0 ]._mesh.position.x * 0.2 );
		this._planeList[ 1 ]._mesh.position.y = ( this._planeList[ 1 ]._mesh.position.y * 0.8 ) + ( this._planeList[ 0 ]._mesh.position.y * 0.2 );
		
		/*this._planeList[ 2 ]._mesh.rotation.y = ( this._planeList[ 2 ]._mesh.rotation.y * 0.6 ) + ( this._planeList[ 1 ]._mesh.rotation.y * 0.4 );
		this._planeList[ 2 ]._mesh.position.x = ( this._planeList[ 2 ]._mesh.position.x * 0.8 ) + ( this._planeList[ 1 ]._mesh.position.x * 0.2 );
		this._planeList[ 2 ]._mesh.position.y = ( this._planeList[ 2 ]._mesh.position.y * 0.8 ) + ( this._planeList[ 1 ]._mesh.position.y * 0.2 );*/
		
		//mouse target
		//
		var _shift = Math.ceil( _cam.position.z / 4 );
		this._test.position.x = ( this._test.position.x * 0.9 ) + ( this._mousePos.x * _shift * 0.1 );
		this._test.position.y = ( this._test.position.y * 0.9 ) + ( this._mousePos.y * _shift * 0.1 );
		
		//mouse move
		//
		var _disX = this._test.position.x - this._oldX;
		var _disY = this._test.position.y - this._oldY;
		var _dis = Math.sqrt( _disX * _disX + _disY * _disY );
		
		if( _dis < 1 )
		{
			this.isMove = false;
		}
		else
		{
			this.isMove = true;
		}
		
		this._oldX = this._test.position.x;
		this._oldY = this._test.position.y;
		
		//camera z
		//
		this._sinZ += 0.4;
		
		if( this._sinZ > 360 )
		{
			this._sinZ = 0;
		}
		
		var _rad = this._sinZ * Math.PI / 180;
		var _sinZ = Math.sin( _rad ) * 10 + 10;
		
		_cam.position.z = 250 - _sinZ;
	}
	
	
	/* mouse position */
	TextBaseObj.prototype.getMousePos = function( _mx, _my )
	{
		var _cam = this._parent._cam;
		//console.log( "camera::" + _cam.position.z );
		
		var _mouseX = ( _mx / window.innerWidth ) * 2 - 1;
		var _mouseY = -( _my / window.innerHeight ) * 2 + 1;
		
		this._mousePos = new THREE.Vector3( _mouseX, _mouseY, 0.5 );
		this._projector.unprojectVector( this._mousePos, _cam );
	}
	
	
	return TextBaseObj;
		
} )();


//mouse move
var _mouseX = 0;
var _mouseY = 0;

function xCoverMouseMoveCheck( bool )
{
	document.removeEventListener( 'mousemove', xMouseMove );
	if( bool )
	{
		document.addEventListener( 'mousemove', xMouseMove );
	}
	else
	{
		document.removeEventListener( 'mousemove', xMouseMove );
	}
}

function xMouseMove( e )
{
	_mouseX = e.clientX;
	_mouseY = e.clientY;
	if( _main._cover._text != 'undefined' )
	{
		_main._cover._text.getMousePos( _mouseX, _mouseY );
	}
}







/* PLANE */
TextPlane = ( function()
{
	function TextPlane( _p, _mat, _type )
	{
		this._type = _type;
		this._parent = _p;
		//this.init( _geo );
		this._geo;
		this._mesh;
		
		this._vList = [];
		this._vLeng;
		this._speedX = 0;
		
		this.init( _mat );
	}
	
	TextPlane.prototype.init = function( _mat )
	{
		this._geo = new THREE.PlaneGeometry( 1300 * 0.5, 650 * 0.5, 40, 20 );
		this._geo.verticesNeedUpdate = true;
		this._geo.dynamic = true;
		
		this._mesh = new THREE.Mesh( this._geo, _mat );
		
		this._vLeng = this._geo.vertices.length;
		
		for( var i = 0; i < this._vLeng; i++ )
		{
			this._vList.push( new TextVertex( this, this._geo.vertices[i] ) );
		}
		
		this._parent._wrapper.add( this._mesh );
	}
	
	//1
	TextPlane.prototype.enterFrame = function()
	{
		for( var i = 0; i < this._vLeng; i++ )
		{
			this._vList[i].enterFrame();
		}
		
		this._geo.verticesNeedUpdate = true;
	}
	
	//2
	TextPlane.prototype.enterFrame2 = function()
	{	
		for( var i = 0; i < this._vLeng; i++ )
		{
			this._vList[i].enterFrame2();
		}
		
		this._geo.verticesNeedUpdate = true;
	}
	
	
	return TextPlane;
		
} )();










/* VERTICES */

TextVertex = ( function()
{
	function TextVertex( _p, _v )
	{
		this._parent = _p;
		this._startV = new THREE.Vector3( _v.x, _v.y, _v.z );
		this._trgV = new THREE.Vector3( _v.x, _v.y, _v.z );
		this._v = _v;
		
		this._sinCount = 0;
		this._sinRad = 0;
		this._haba = 0;
		
		this.setPos();
	}
	
	
	TextVertex.prototype.setPos = function()
	{
		this._trgV.x = this._startV.x + Math.random() * 4 - 2;
		this._trgV.y = this._startV.y + Math.random() * 4 - 2;
		//this._trgV.z = this._startV.z + Math.random() * 4 - 2;
	}
	
	
	TextVertex.prototype.enterFrame = function()
	{
		//pos
		var _test = this._parent._parent._test;
		
		//return;
		var _dx = ( _test.position.x - this._parent._mesh.position.x ) - this._startV.x;
		var _dy = ( _test.position.y - this._parent._mesh.position.y ) - this._startV.y;
		var _dis = Math.sqrt( _dx * _dx + _dy * _dy );
		
		////
		
		this._sinCount += 2;
		
		if( this._sinCount >= 360 )
		{
			this._sinCount = 0;
		}
		this._sinRad = this._sinCount * Math.PI / 180;
		
		var _sin = Math.sin( this._sinRad ) * this._haba;
		
		
		
		var _limit = 140;
		var _shift = 0.006;
		
		if( _dis < _limit + 50 && this._parent._parent.isMove )
		{	
			this._haba = ( _limit - _dis ) * ( _limit - _dis ) * _shift;
		}
		else
		{
			this._haba *= 0.995;	
		}
		
		
		this._v.z = ( this._v.z * 0.9 ) + ( _sin * 0.1 );
		
		
		////
		
		this._v.x = ( this._v.x * 0.92 ) + ( this._trgV.x * 0.08 );
		this._v.y = ( this._v.y * 0.92 ) + ( this._trgV.y * 0.08 );
		//this._v.z = ( this._v.z * 0.92 ) + ( this._trgV.z * 0.08 );
		
		
		
		if( Math.abs( this._v.x - this._trgV.x ) < 0.1 )
		{
			this.setPos();
		}
	}
	
	
	TextVertex.prototype.enterFrame2 = function()
	{
		this._v.x = ( this._v.x * 0.92 ) + ( this._trgV.x * 0.08 );
		this._v.y = ( this._v.y * 0.92 ) + ( this._trgV.y * 0.08 );
		this._v.z = ( this._v.z * 0.92 ) + ( this._trgV.z * 0.08 );
		
		
		if( Math.abs( this._v.x - this._trgV.x ) < 0.1 )
		{
			this.setPos();
		}
	}
	
	
	return TextVertex;
		
} )();











/* LOGO */

LogoObj = ( function()
{
	function LogoObj( _p )
	{
		this._parent = _p;
		this.init();
	}
	
	LogoObj.prototype.init = function()
	{
		var _geo = new THREE.PlaneGeometry( 110, 110, 1, 1 );
		var _tex = THREE.ImageUtils.loadTexture( '' );
		var _o = {
			color:0xFF0000,
			map:_tex,
			transparent:true//,
			//opacity:0.9
		};
		
		var _material = new THREE.MeshBasicMaterial( _o );
		_material.alphaTest = 0.5;
		_material.depthTest = false;
		this._mesh = new THREE.Mesh( _geo, _material );
		this._parent._root.add( this._mesh );
	}
	
	
	LogoObj.prototype.enterFrame = function()
	{
	}
	
	return LogoObj;
} )();






/* BG */

BgBoard = ( function()
{
	function BgBoard( _p )
	{
		this._parent = _p;
		this.init();
	}
	
	
	BgBoard.prototype.init = function()
	{
		//var _tex = THREE.ImageUtils.loadTexture( 'http://mat1.gtimg.com/fashion/xujinzhi/beautystar/xuqing/member.jpg' );
		this._oldMesh;
		this._newMesh;
		
		this._count = 0;
		this._meshNum = 1;
		
		this._colorList = [
			0x000000, //blask
			0x902d86, //0xad28a0, //purple
			//0xffa200, //orange
			0x3a9054, //0x6fb316, //green
			0xd53864, //0xe62b64, //red
			0x3277ad//0x1b8cc7 //blue
		];
		
		//this._color = Math.floor( Math.random() * this._colorList.length );
		this._color = 0;
		
		this._bgGeo = new THREE.PlaneGeometry( 2000, 2000, 1, 1 );
		
		var _bgMat = new THREE.MeshBasicMaterial( { color:this._colorList[ this._color ] } );
		this._newMesh = new THREE.Mesh( this._bgGeo, _bgMat );
		this._newMesh.position.z = -500;
		this._parent._wrapper.add( this._newMesh);
	}
	
	
	
	BgBoard.prototype.changeColor = function()
	{
		this._color++;
		
		if( this._color >= this._colorList.length )
		{
			this._color = 0;
		}
		
		
		this._oldMesh = this._newMesh;
		this._oldMesh.position.z = -510;
		
		var _bgMat = new THREE.MeshBasicMaterial( { color:this._colorList[ this._color ],transparent:true,opacity:0 } );
		this._newMesh = new THREE.Mesh( this._bgGeo, _bgMat );
		this._newMesh.position.z = -500;
		this._parent._wrapper.add( this._newMesh);
	}
	
	
	
	BgBoard.prototype.enterFrame = function()
	{
		this._count++;
		if( this._count >= 400 )
		{
			this._count = 0;
			this.changeColor();
		}
		if( this._newMesh != undefined )
		{
			this._newMesh.material.opacity += 0.01;
			if( this._newMesh.material.opacity >= 1 )
			{
				this._newMesh.material.opacity = 1;
				if( this._oldMesh != undefined )
				{
					this._oldMesh.material.dispose();
					this._parent._wrapper.remove( this._oldMesh );
					this._oldMesh = null;
				}
			}
		}
	}
	
	
	return BgBoard;
} )();
/*  |xGv00|77703fdc696bb2b35283af894fcc0e47 */