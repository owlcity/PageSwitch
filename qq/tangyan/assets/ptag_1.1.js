/*!
 * Tencent Video Source Tracing
 *
 * deploy exclude v.qq.com
 * - This script will set a cookie named "qtag" on current subdomain,
 * - and a global string variable "TEN_VIDEO_PTAG".
 *
 * @date    2015-05-22
 * @author  jamieyan
 */
!function(t,e,r){var n={getUrlParam:function(e,r){if(!e)return"";r=r||t.location.href;var n,i=RegExp("[?&#]"+e+"=([^&#]+)","gi"),o=r.match(i);return o&&o.length>0?(n=o[o.length-1].split("="),n&&n.length>1?n[1]:""):""},getHostnameFromUrl:function(e){e=e||t.location.href;var r=RegExp("^(?:f|ht)tp(?:s)?://([^/]+)","im"),n=e.match(r);return n&&2===n.length?n[1]:""},contains:function(t,e){for(var r=t.length;r--;)if(t[r]===e)return!0;return!1},__author__:"jamieyan"};n.cookie=function(){var t=function(){return t.get.apply(t,arguments)},n=t.utils={isArray:Array.isArray||function(t){return"[object Array]"===Object.prototype.toString.call(t)},isPlainObject:function(t){return!!t&&"[object Object]"===Object.prototype.toString.call(t)},toArray:function(t){return Array.prototype.slice.call(t)},getKeys:Object.keys||function(t){var e=[],r="";for(r in t)t.hasOwnProperty(r)&&e.push(r);return e},escape:function(t){return(t+"").replace(/[,;"\\=\s%]/g,function(t){return encodeURIComponent(t)})},retrieve:function(t,e){return null===t?e:t}};return t.defaults={},t.expiresMultiplier=86400,t.set=function(t,i,o){if(n.isPlainObject(t))for(var a in t)t.hasOwnProperty(a)&&this.set(a,t[a],i);else{o=n.isPlainObject(o)?o:{expires:o};var s=o.expires!==r?o.expires:this.defaults.expires||"",l=typeof s;"string"===l&&""!==s?s=new Date(s):"number"===l&&(s=new Date(+new Date+1e3*this.expiresMultiplier*s)),""!==s&&"toGMTString"in s&&(s=";expires="+s.toGMTString());var c=o.path||this.defaults.path;c=c?";path="+c:"";var u=o.domain||this.defaults.domain;u=u?";domain="+u:"";var g=o.secure||this.defaults.secure?";secure":"";e.cookie=n.escape(t)+"="+n.escape(i)+s+c+u+g}return this},t.remove=function(t){t=n.isArray(t)?t:n.toArray(arguments);for(var e=0,r=t.length;r>e;e++)this.set(t[e],"",-1);return this},t.empty=function(){return this.remove(n.getKeys(this.all()))},t.get=function(t,e){e=e||r;var i=this.all();if(n.isArray(t)){for(var o={},a=0,s=t.length;s>a;a++){var l=t[a];o[l]=n.retrieve(i[l],e)}return o}return n.retrieve(i[t],e)},t.all=function(){if(""===e.cookie)return{};for(var t=e.cookie.split("; "),r={},n=0,i=t.length;i>n;n++){var o=t[n].split("=");r[decodeURIComponent(o[0])]=decodeURIComponent(o[1])}return r},t.enabled=function(){if(navigator.cookieEnabled)return!0;var e="_"===t.set("_","_").get("_");return t.remove("_"),e},t}();var i={_config:{key:"ptag",dm:location.hostname,path:"/"},_res:{ptag:null,qtag:null},getWhole:function(){return n.cookie.get(this._config.key)||""},get:function(){var t=n.cookie.get(this._config.key);if(t&&"string"==typeof t){var e=t.split("|");this._res.ptag=e[0]||null,this._res.qtag=e[1]||null}return this._res},set:function(t,e){if(t){var r="string"==typeof t.ptag?t.ptag:this.get().ptag||"",i="string"==typeof t.qtag?t.qtag:this.get().qtag||"",o=r+"|"+i;return n.cookie.set(this._config.key,o,{expires:"",domain:e||this._config.dm,path:this._config.path})}}},o={all:["/"],"sports.qq.com":["/","/nba/","/nbavideo/","/kbsweb/game.htm","/photo/"],"fashion.qq.com":["/vogue/vogue_list.htm","/lifestyle/lifestyle_list.htm"]},a=function(){for(var r="",a=t.location.href.toLowerCase(),s=e.referrer,l=""!==s?n.getHostnameFromUrl(s):null,c=l&&l!==location.hostname,u=["ptag","adtag","pgv_ref"],g=0,f=u.length;f>g&&!(r=n.getUrlParam(u[g],a));g++);!r&&c&&(r=l.replace(/\./g,"_")),r&&i.set({ptag:r,qtag:""}),(n.contains(o.all,location.pathname)||o[location.hostname]&&n.contains(o[location.hostname],location.pathname))&&i.set({qtag:location.pathname})};t.TEN_VIDEO_PTAG=function(){return a(),i.getWhole()}()}(window,document);
/*  |xGv00|96fa645d1d4c9f5e31981170df25a56d */