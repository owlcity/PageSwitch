var CanvasDetector = {
	canCanvas: function()
	{
		return !!window.CanvasRenderingContext2D
	},
	canWebGL: function()
	{
		try
		{
			return !!window.WebGLRenderingContext && !!document.createElement( 'canvas' ).getContext( 'experimental-webgl' );
		}
		catch( e )
		{
			return false;
		}
	}
};/*  |xGv00|53a04b26cc7f2a1dc9c0bb61326c5141 */