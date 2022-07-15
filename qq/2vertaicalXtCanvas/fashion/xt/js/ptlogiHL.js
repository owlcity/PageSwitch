try {
    document.domain = "qq.com";
  } catch (e) {}
  
  // jsonp
  var count = 0;
  function noop() {}
  function jsonp(url, opts, fn) {
    if ('function' == typeof opts) {
      fn = opts;
      opts = {};
    }
    if (!opts) opts = {};
  
    var prefix = opts.prefix || '__jp';
  
    // use the callback name that was passed if one was provided.
    // otherwise generate a unique name by incrementing our counter.
    var id = opts.name || (prefix + (count++));
  
    var param = opts.param || 'callback';
    var timeout = null != opts.timeout ? opts.timeout : 60000;
    var enc = encodeURIComponent;
    var target = document.getElementsByTagName('script')[0] || document.head;
    var script;
    var timer;
  
    if (timeout) {
      timer = setTimeout(function () {
        cleanup();
        if (fn) fn(new Error('Timeout'));
      }, timeout);
    }
  
    function cleanup() {
      if (script.parentNode) script.parentNode.removeChild(script);
      window[id] = noop;
      if (timer) clearTimeout(timer);
    }
  
    function cancel() {
      if (window[id]) {
        cleanup();
      }
    }
  
    window[id] = function (data) {
      cleanup();
      if (fn) fn(null, data);
    };
  
    // add qs component
    url += (~url.indexOf('?') ? '&' : '?') + param + '=' + enc(id);
    url = url.replace('?&', '?');
  
    // create script
    script = document.createElement('script');
    script.src = url;
    target.parentNode.insertBefore(script, target);
  
    return cancel;
  }
  
  // Cookies
  var Cookies = {
    setItem: function (name, value, expires, path, domain) {
      if (arguments.length == 1) {
        var arr = document.cookie.match(new RegExp("(^| )" + name + "=([^;]*)(;|$)"));
        if (arr !== null) {
          return decodeURIComponent(arr[2]);
        }
        return null;
      } else {
        if (!arguments[1]) {
          document.cookie = name + "=11" + ((path) ? "; path=" + path : "; path=/") + ((domain) ? "; domain=" + domain : "") + "; expires=Fri, 02-Jan-1970 00:00:00 GMT";
        } else {
          e = "";
          e = new Date();
          if (!expires) {
            e.setTime(e.getTime() + 24 * 60 * 60 * 1E3);
  
          } else {
            e.setTime(e.getTime() + expires * 24 * 60 * 60 * 1E3);
          }
          e = "; expires=" + e.toGMTString();
          document.cookie = name + "=" + value + e + ((path) ? "; path=" + path : "; path=/") + ((domain) ? ";domain=" + domain : "");
        }
      }
    },
    getItem: function (key) {
      if (key) {
        var arr = document.cookie.match(new RegExp("(^| )" + key + "=([^;]*)(;|$)"));
        if (arr !== null) {
          return unescape(arr[2]);
        }
      }
    },
    removeItem: function (key, domain) {
      this.setItem(key, "", -1, '/', domain);
    }
  }
  
  // LoginUI
  var loginUI = {
    loginIn: function () {
      var htmlString = '<div id="mailIcon" class="fr" bosszone="qmailinfor"><a href="http://mail.qq.com" class="mail" id="mailNum" style="padding:0 15px;" target="_blank"></a></div><div id="qzoneIcon" class="fr" bosszone="qzoneinfor"><a href="http://qzone.qq.com" class="qzone" id="qzoneNum" style="padding:0 16px;" target="_blank"></a></div><div class="qqNameLayout fr"><span class="qqName">您好，<span id="userName">' + window.userInfo.nick + '</span> <span>[</span><a href="javascript:void(0);" onclick="login.loginOut()" target="_self" bosszone="logquit">退出</a><span>]</span></span>|</div>';
      document.querySelector('#loginWrap').innerHTML = htmlString;
    },
    loginOut: function () {
      var htmlString = '<a href="http://mail.qq.com" class="mailLogin" id="qmail" target="_blank" bosszone="qmail"></a><a href="http://qzone.qq.com" class="qzoneLogin" id="qzone" target="_blank" bosszone="qzone"></a><a href="javascript:void(0);" class="login" onclick="userLogin();" target="_self" id="onekey"></a>';
      document.querySelector('#loginWrap').innerHTML = htmlString;
    }
  }
  window.loginUI = loginUI;
  
  // login Obj
  window.login = login = {
    isLogin: function (callback) {
      var access_token = Cookies.getItem("qq_access_token")
      var appid = Cookies.getItem("qq_client_id")
      var openid = Cookies.getItem("qq_openid")
      var logintype = 'qq_connect'
      var isLogin = !!access_token && !!appid && !!openid && !!logintype
      isLogin && callback && callback({
        access_token: access_token,
        appid: appid,
        openid: openid,
        logintype: logintype
      })
      return isLogin
    },
    getLoginUrl: function () {
      var surl = window.location.href;
      var state = '5b481c68e379d'
      var redirect_uri = encodeURIComponent('https://pacaio.match.qq.com/qq/loginBack?surl=' + encodeURIComponent(surl))
      return 'https://graph.qq.com/oauth2.0/show?which=Login&display=pc&response_type=code&client_id=101487368&redirect_uri='+ redirect_uri +'&state=' + state;
    },
    getInfo: function () {
      login.isLogin(function (info) {
        window.userInfo = info;
      })
      jsonp('https://pacaio.match.qq.com/qq/userInfo', function (err, data) {
        if (data) {
          if (data.ret === 0) {
            window.userInfo.nick = data.nickname;
            window.userInfo.head = (data.figureurl_qq_2 || data.figureurl_1).replace('http:', '') || "//mat1.gtimg.com/news/dc/temp/c1.jpg"
            window.loginUI && window.loginUI.loginIn();
          } else {
            window.userInfo = '';
            console.log(data.msg)
          }
        }
      })
    },
    loginIn: function () {
      login.getInfo();
    },
    loginOut: function () {
      var domain = 'qq.com';
      Cookies.removeItem('qq_access_token', domain)
      Cookies.removeItem('qq_client_id', domain)
      Cookies.removeItem('qq_openid', domain);
      window.loginUI && window.loginUI.loginOut();
    },
    userLogin: function () {
      window.location.href = login.getLoginUrl();
    }
  }
  
  login.isLogin() && login.loginIn();
  var userLogin = window.userLogin = login.userLogin;/*  |xGv00|b5cd224044d4a4b10a8437b6870c10fa */