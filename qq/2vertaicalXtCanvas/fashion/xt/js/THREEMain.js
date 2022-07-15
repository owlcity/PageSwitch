/**
 * 
 * @authors wgqth (wgqth@qq.com)
 * @date    2015-04-20 22:57:57
 */

/*
MAIN
*/
var isFullScreen = false;

var isWebGL = false;

THREEMain = ( function()
{
	function THREEMain()
	{
		this._worldList = [];
	}
	/*
	INIT
	*/
	THREEMain.prototype.create = function( _id, _bmd1, _bmd2, _url )
	{
		var _op = {};
		_op._parent = this;
		_op._id = _id;
		_op._bmd1 = _bmd1;
		_op._bmd2 = _bmd2;
		_op._url = _url;
		
		var _world = new World( _op );
		this._worldList.push( _world );
	}
	/*
	START
	*/
	THREEMain.prototype.start = function()
	{
		this.onEnterFrame( );
	}

	THREEMain.prototype.modelComp = function()
	{
		_main.modelComp();
	}
	/*
	ENTER FRAME
	*/
	THREEMain.prototype.onEnterFrame = function()
	{
		var _this = this;
		requestAnimationFrame( function(  ){ _this.onEnterFrame.apply( _this ) } );
		var _len = this._worldList.length;
		for( var i = 0; i < _len; i++ )
		{
			this._worldList[i].onEnterFrame( );
		}
	}
	return THREEMain;
})();







/*
3D WORLD
*/
World = ( function()
{	
	/*
	CONST
	*/
	function World( _op )
	{
		this._objMng;
		
		this.isOver = false;
		this.isAction = false;
		
		this._parent = _op._parent;
		this._id = _op._id;
		this._bmd1 = _op._bmd1;
		this._bmd2 = _op._bmd2;
		this._url = _op._url;
		
		this._stageWidth = document.getElementById( this._id ).getBoundingClientRect().width;
		this._stageHeight = document.getElementById( this._id ).getBoundingClientRect().height;
		
		//camera
		this._fov = 45;
		this._far = 2000;
		this._near = 1;
		
		this.init( );
	}
		
		
	/*
	INIT
	*/
	World.prototype.init = function()
	{
		//if ( !Detector.webgl ) isWebGL = false;
		isWebGL = false;
		
		var _this = this;
		this._meshParentList = [];
			
			
		this.initEngine();
		this.initRender();
			
			
		//RESIZE
		if( isFullScreen )
		{
			window.onresize = function( e )
			{
				return _this.onResize( e );
			};
			
			this.onResize( );
		}
			
		//モデル生成管理
		this._objMng = new ObjectMngCV( this );
		
		//モデル生成
		this.createModel( );
		


		//マウスイベント		
		var _www = this;
		
		$( String( "#" + _www._id ) ).hover(
			function()
			{
				document.body.style.cursor = "pointer";
				_www.mOver( );
			},
			function()
			{
				document.body.style.cursor = "default";
				_www.mOut( );
			}
		);
			
		$( String( "#" + _www._id ) ).click(
			function()
			{
				pageJump( _www._url );
			}
		);
		
		
		//THREEMainへ
		this._parent.modelComp();
	}
		
		
	/*
	OVER
	*/
	World.prototype.mOver = function()
	{
		if( !this.isOver )
		{
			this.isOver = true;
			this.isAction = true;
		}
	}
	
	World.prototype.mOut = function()
	{
		if( this.isOver )
		{
			this.isOver = false;
		}
	}
	
	
	
	/*
	アニメーション終了
	*/
	World.prototype.animeEnd = function()
	{
		this.isAction = false;
	}
	
	
	/*
	ENGINE
	*/
	World.prototype.initEngine = function()
	{
		this._container = document.createElement( 'div' );
		document.getElementById( this._id ).appendChild( this._container );
		
		//camera
		this._cam = new THREE.PerspectiveCamera( this._fov, this._stageWidth / this._stageHeight, this._near, this._far );
		this._cam.position.z = 1000;
		
		if( !isWebGL )
		{
			this._cam.position.z = 998;
		}
					
		//scene
		this._scene = new THREE.Scene();
	}
		
	/*
	INIT RENDER
	*/
	World.prototype.initRender = function( )
	{
		this._render = new THREE.CanvasRenderer();
		this._render.setSize( this._stageWidth, this._stageHeight );
		this._container.appendChild( this._render.domElement );
	}
		
	/*
	モデルの生成
	*/
	World.prototype.createModel = function()
	{
		this._objMng.createPlane( );
	}
		
		
	/*
	Mesh追加
	*/
	World.prototype.addMesh = function( _mesh, _obj )
	{	
		//3d mesh表示
		this._scene.add( _mesh );
		
		if( _obj != null || _obj != undefined )
		{
			this._meshParentList.push( _obj );
		}
		
		this._render.render( this._scene, this._cam );
	}

		
		
	/*
	RENDER
	*/
	World.prototype.onEnterFrame = function( )
	{
		if( this.isAction )
		{	
			var _leng = this._meshParentList.length;
		
			for( var i = 0; i < _leng; i++ )
			{
				this._meshParentList[i].onEnterFrame( );
			}

			this._render.render( this._scene, this._cam );
			
			//console.log("EEEEEEE");
		}
	}
		
		
	/*
	RESIZE
	*/
	World.prototype.onResize = function( e )
	{
		if(typeof e === "undefined"){ e = null; }
			
		this._stageWidth = window.innerWidth;
		this._stageHeight = window.innerHeight;
			
		this._cam.aspect = this._stageWidth / this._stageHeight;
		this._cam.updateProjectionMatrix();
		this._render.setSize( this._stageWidth, this._stageHeight );
	}

	return World;
		
} )();









/*
OBJECTS CANVAS
*/
ObjectMngCV = ( function()
{
	function ObjectMngCV( _world )
	{
		this._world = _world;
		
		//(静止時)
		this._geoCov;
		this._meshCov;
		
		//(変形)
		this._geo;
		this._mesh;
			
		//Text用
		this._geoText;
		this._meshText;
			
		//Raycast用
		this._geoRay;
		this._meshRay;

		//数
		this._segW = 6;//8;
		this._segH = 4;
			
		this._count = 0;
		this._rz = 0;
			
		this._vList = [];
	}
	/* PLANE生成 */
	ObjectMngCV.prototype.createPlane = function()
	{
		var _this = this;
		var textureLoader = new THREE.TextureLoader();
		textureLoader.load( this._world._bmd1, function(e){ _this.loadCompPlane(e) } );
	}
	/* PLANE TEXTURE LOADED */
	ObjectMngCV.prototype.loadCompPlane = function( e )
	{
		var map = e;
		map.wrapS = map.wrapT = THREE.RepeatWrapping;
		var _op = {
			ambient: 0xFFFFFF,
			color:0xffffff,
			side:THREE.DoubleSide,
			map: map,
			transparent:true,
			opacity:1,
			overdraw:0.5
		};
		var _material = new THREE.MeshPhongMaterial( _op );
		this._geo = new THREE.PlaneGeometry( this._world._stageWidth, this._world._stageHeight, this._segW, this._segH );
		this._geo.dymanic = true;
		
		this._mesh = new THREE.Mesh( this._geo, _material );
		
		//頂点テスト
		for( var i = 0; i < this._geo.vertices.length; i++ )
		{	 
			 var _v = new PointMngCV( this._geo.vertices[i], i, this );
			 this._vList.push( _v );
		}
		//worldに追加
		this._world.addMesh( this._mesh, this );//Meshと自身の追加
		this.createTextPlane();
	}
		
	
	
	/* TEXT FRAME */
	ObjectMngCV.prototype.createTextPlane = function()
	{
		var map = THREE.ImageUtils.loadTexture( this._world._bmd2 );
		map.wrapS = map.wrapT = THREE.RepeatWrapping;
		
		var _op = {
			color: 0xFFFFFF,
			map:map,
			wireframe: false,
			transparent:true,
			opacity:0
		};
		
		
		var _material = new THREE.MeshBasicMaterial( _op );
		this._geoText = new THREE.PlaneGeometry( this._world._stageWidth, this._world._stageHeight, 1, 1 );
		this._meshText = new THREE.Mesh( this._geoText, _material );
		//worldに追加
		this._world.addMesh( this._meshText, null );//Meshと自身の追加
		this._meshText.position.z = -100;
	}
		
		
	/* ENTER FRAME */
	ObjectMngCV.prototype.onEnterFrame = function( )
	{
		if( _device != "PC" )
		{
			return;
		}
		
		var i;
		var leng = this._geo.vertices.length;
		
		if( this._world.isOver )
		{	
			this._rz += 0.5;
				
			if( this._rz >= 360 )
			{
				this._rz = 0;
			}
			
			this._mesh.rotation.z = this._rz * Math.PI / 180;
			this._mesh.position.z = ( this._mesh.position.z * 0.85 ) + ( 10 * 0.15 );
			this._mesh.material.opacity = ( this._mesh.material.opacity * 0.85 ) + ( 0.5 * 0.15 );
			
			for( i = 0; i < leng; i++ )
			{
				var _nv = this._vList[i].getPoint( true );
				this._geo.vertices[i].x = _nv.x;
				this._geo.vertices[i].y = _nv.y;
				this._geo.vertices[i].z = _nv.z;
			}
			
			this._meshText.material.opacity += 0.05;
			if( this._meshText.material.opacity >= 1 )
			{
				this._meshText.material.opacity = 1;
			}
			
			this._meshText.position.z = ( this._meshText.position.z * 0.85 ) + ( 0 * 0.15 );
		}
		else
		{	
			this._rz = 0;
			this._mesh.rotation.z = ( this._mesh.rotation.z * 0.85 ) + ( 0 * 0.15 );
			this._mesh.position.z = ( this._mesh.position.z * 0.85 ) + ( 0 * 0.15 );
			this._mesh.material.opacity = ( this._mesh.material.opacity * 0.85 ) + ( 1 * 0.15 );
			
			for( i = 0; i < leng; i++ )
			{
				var _nv = this._vList[i].getPoint( false );
				this._geo.vertices[i].x = _nv.x;
				this._geo.vertices[i].y = _nv.y;
				this._geo.vertices[i].z = _nv.z;
			}
			
			this._meshText.material.opacity -= 0.05;
			if( this._meshText.material.opacity <= 0 )
			{
				this._meshText.material.opacity = 0;
			}
			this._meshText.position.z = ( this._meshText.position.z * 0.92 ) + ( -100 * 0.08 );
			if( Math.abs( this._meshText.position.z - ( -100 ) ) < 1 )
			{
				this._world.animeEnd();
			}
		}
		this._geo.verticesNeedUpdate = true;
	}
	return ObjectMngCV;
} )();






/* VERTICES POINT */
	PointMngCV = ( function()
	{
		/*
		CONST
		*/
		function PointMngCV( _v, _id, _obj )
		{
			this._obj = _obj;
			
			this._count = 0;
			this._v = new THREE.Vector3( _v.x, _v.y, _v.z );
			this._trgV = new THREE.Vector3();
			this._currentV = new THREE.Vector3();
			
			//動かす頂点
			this.isAction = false;
			
			//半径
			this._rad = 0;
			
			this._baseRad = 66;//64;//66;
			
			//半径加算分
			this._adRad = 0;//20;
			this._adMax = Math.ceil( Math.random() * 30 );
			this._adSpeed = Math.random() * 2 + 1;
			
			this._adCount = 0;
			
			//変形なし
			this._rad = this._baseRad;
			
			var _deg = _id * 19;//15;//8;
			var _tx = Math.cos( _deg * Math.PI / 180 ) * this._rad;
			var _ty = Math.sin( _deg * Math.PI / 180 ) * this._rad;
			
			this._trgV.x = _tx;
			this._trgV.y = _ty;
			this._trgV.z = _id * 0.1;		
			
			this._currentV.x = this._v.x;
			this._currentV.y = this._v.y;
			this._currentV.z = this._v.z;
			
			this._speedA = Math.random() * 18 * 0.01 + 0.08;
			this._speedB = 1 - this._speedA;
			
			this._speedC = Math.random() * 20 * 0.01 + 0.15;
			this._speedD = 1 - this._speedC;
		}
		
		PointMngCV.prototype.getPoint = function( isOver )
		{
			if( isOver )
			{
				this._currentV.x = ( this._currentV.x * this._speedB ) + ( this._trgV.x * this._speedA );
				this._currentV.y = ( this._currentV.y * this._speedB ) + ( this._trgV.y * this._speedA );
				this._currentV.z = ( this._currentV.z * this._speedB ) + ( this._trgV.z * this._speedA );
			}
			else
			{
				this._currentV.x = ( this._currentV.x * this._speedD ) + ( this._v.x * this._speedC );
				this._currentV.y = ( this._currentV.y * this._speedD ) + ( this._v.y * this._speedC );
				this._currentV.z = ( this._currentV.z * this._speedD ) + ( this._v.z * this._speedC );
			}
			return this._currentV;
		}
		return PointMngCV;
	} )();



/*  |xGv00|00dcee0110e0101542eb6eef20027601 */