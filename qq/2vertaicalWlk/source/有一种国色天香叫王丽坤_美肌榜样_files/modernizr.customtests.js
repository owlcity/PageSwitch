//include pointer events
Modernizr.addTest('finger', function() {
  return ('ontouchstart' in window) || (navigator.maxTouchPoints > 0) || (navigator.msMaxTouchPoints > 0);
});

//retrieve the device pixel ratio
Modernizr.addTest('devicepixelratio', function() {

  var devicePixelRatio = 1;
  var ratiosArr = [ 1.499, 1.499, 1.499, 2.99/2 ];
  var mqs = [
      'only screen and (min-device-pixel-ratio:1.499)',
      'only screen and (-webkit-min-device-pixel-ratio:1.499)',
      'only screen and (min--moz-device-pixel-ratio:1.499)',
      'only screen and (-o-min-device-pixel-ratio:2.99/2)'
  ];

  for (var i=0, l=mqs.length; i < l; i++) {
      if( Modernizr.mq( mqs[i] ) ){
        return ratiosArr[i];
      }
  }

  return devicePixelRatio;

});

//check if we are o,n a mobile device
Modernizr.addTest('mobile', function() {
  var devicePixelRatio = Modernizr.devicepixelratio;
  var maxMobileScreenSize = 640; //galaxy note 2 screen width
  return (Modernizr.finger && (screen.width < maxMobileScreenSize || screen.height < maxMobileScreenSize ) );
});/*  |xGv00|efbef1ca3958066251e2e44f160e50aa */