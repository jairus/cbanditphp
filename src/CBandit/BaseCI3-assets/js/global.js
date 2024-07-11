Global = {};
Global.log = function(str){
	try{
		console.log(str);
	}
	catch(e){
	}
}
Global.loading = function(){
	$(".sk-fading-circle").show();
	$(".loadingoverlay").show();
}
Global.hideLoading = function(){
	$(".sk-fading-circle").hide();
	$(".loadingoverlay").hide();
}
Global.getUrlParameter = function getUrlParameter(sParam) {
	var sPageURL = decodeURIComponent(window.location.search.substring(1)),
	sURLVariables = sPageURL.split('&'),
	sParameterName,
	i;
	for(i = 0; i < sURLVariables.length; i++) {
		sParameterName = sURLVariables[i].split('=');
		if (sParameterName[0] === sParam) {
			return sParameterName[1] === undefined ? true : sParameterName[1];
		}
	}
}

Global.isset = function(v, strict){
	//not strict
	if(typeof strict == "undefined" || strict==""){
		if(typeof v == "undefined"){
			return false;
		}
		else if(Global.toString(v) == ""){
			return false;
		}
		else if(v == false && typeof v != "string"){
			return false;
		}
		else if(v == 0 && typeof v != "string"){
			return false;
		}
		else if(v == null && typeof v != "string"){
			return false;
		}
		else if(!v && typeof v != "string"){
			return false;
		}
		else{
			return true;
		}
	}
	//strict
	else{
		if(typeof v == "undefined"){
			return false;
		}
		else{
			return true;
		}
	}
}

Global.log = function(param){
	console.log(param);
}

Global.numbersOnly = function(elem){
	$(elem).keydown(function (e) {
        // Allow: backspace, delete, tab, escape, enter and .
        if ($.inArray(e.keyCode, [8, 9, 27, 13, 110, 190]) !== -1 ||
             // Allow: Ctrl+A, Command+A
            (e.keyCode === 65 && (e.ctrlKey === true || e.metaKey === true)) || 
             // Allow: home, end, left, right, down, up
            (e.keyCode >= 35 && e.keyCode <= 40) ||
			(e.keyCode === 46) ) {
                 // let it happen, don't do anything
                 return;
        }
        // Ensure that it is a number and stop the keypress
        if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
            e.preventDefault();
        }
    });
}


Global.entityMap = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#39;',
  '/': '&#x2F;',
  '`': '&#x60;',
  '=': '&#x3D;'
};

Global.escapeHtml = function  (string) {
  return String(string).replace(/[&<>"'`=\/]/g, function (s) {
    return Global.entityMap[s];
  });
}
Global.removeAnchorClickEvent = function(elem){
	var preventClick = false;
	var clicked = false;
	
	$(elem).click(function(e) {
		
		if(!$(this).hasClass('clicked')){	
		
			$(this)
			.css('cursor', 'default')
			.css('text-decoration', 'none')
			
		if (!preventClick) {
			$(this).html($(this).html());
		}

		preventClick = true;

		return false;
		}
		
	});
}

Global.urlencode = function(str) {
	//       discuss at: http://locutus.io/php/urlencode/
	//      original by: Philip Peterson
	//      improved by: Kevin van Zonneveld (http://kvz.io)
	//      improved by: Kevin van Zonneveld (http://kvz.io)
	//      improved by: Brett Zamir (http://brett-zamir.me)
	//      improved by: Lars Fischer
	//         input by: AJ
	//         input by: travc
	//         input by: Brett Zamir (http://brett-zamir.me)
	//         input by: Ratheous
	//      bugfixed by: Kevin van Zonneveld (http://kvz.io)
	//      bugfixed by: Kevin van Zonneveld (http://kvz.io)
	//      bugfixed by: Joris
	// reimplemented by: Brett Zamir (http://brett-zamir.me)
	// reimplemented by: Brett Zamir (http://brett-zamir.me)
	//           note 1: This reflects PHP 5.3/6.0+ behavior
	//           note 1: Please be aware that this function
	//           note 1: expects to encode into UTF-8 encoded strings, as found on
	//           note 1: pages served as UTF-8
	//        example 1: urlencode('Kevin van Zonneveld!')
	//        returns 1: 'Kevin+van+Zonneveld%21'
	//        example 2: urlencode('http://kvz.io/')
	//        returns 2: 'http%3A%2F%2Fkvz.io%2F'
	//        example 3: urlencode('http://www.google.nl/search?q=Locutus&ie=utf-8')
	//        returns 3: 'http%3A%2F%2Fwww.google.nl%2Fsearch%3Fq%3DLocutus%26ie%3Dutf-8'

	str = (str + '')

	// Tilde should be allowed unescaped in future versions of PHP (as reflected below),
	// but if you want to reflect current
	// PHP behavior, you would need to add ".replace(/~/g, '%7E');" to the following.
	return encodeURIComponent(str)
	.replace(/!/g, '%21')
	.replace(/'/g, '%27')
	.replace(/\(/g, '%28')
	.replace(/\)/g, '%29')
	.replace(/\*/g, '%2A')
	.replace(/%20/g, '+')
}


Global.number_format = function(num, dec){
	if(typeof dec == "undefined"){ 
		dec = 2; //decimal places
	}
	if(isNaN(num)){
		num = 0;
	}
	num = parseFloat(num).toFixed(dec)
	var n = num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
	return n;
}

Global.getFormData = function(obj){
	var formdata = obj.serializeArray();
	var data = {};					
	for(key in formdata){
		var name  = formdata[key]['name'];
		var value = formdata[key]['value'];
		data[name] = value;
	}
	return data;
	
}

Global.confirmOld = function(msg, callback){
	Swal.fire({
		title: msg,
		html: "",
		icon: 'warning',
		showCancelButton: true,
		customClass: {
			confirmButton: 'btn btn-primary mr-4 flex-1',
			cancelButton: 'btn btn-secondary flex-1'
		},
		//confirmButtonColor: '#3085d6',
		//cancelButtonColor: '#d33',
		confirmButtonText: 'Confirm'
	}).then((result) => {
		callback(result.value)
	});
}

Global.confirm = function(msg, callback, confirmtext, canceltxt){
	if(!Global.isset(confirmtext)){
		confirmtext = "Confirm";
	}
	if(!Global.isset(canceltxt)){
		canceltxt = "Cancel";
	}
	Swal.fire({
		title: "",
		html: msg,
		icon: 'warning',
		showCancelButton: true,
		customClass: {
			confirmButton: 'btn btn-primary mr-4 flex-1',
			cancelButton: 'btn btn-secondary flex-1'
		},
		//confirmButtonColor: '#3085d6',
		//cancelButtonColor: '#d33',
		confirmButtonText: confirmtext,
		cancelButtonText: canceltxt
	}).then((result) => {
		callback(result.value)
	});
}

Global.confirm2 = function(title, msg, callback){
	Swal.fire({
		title: title,
		html: msg,
		icon: 'warning',
		showCancelButton: true,
		customClass: {
			confirmButton: 'btn btn-primary mr-4 flex-1',
			cancelButton: 'btn btn-secondary flex-1'
		},
		//confirmButtonColor: '#3085d6',
		//cancelButtonColor: '#d33',
		confirmButtonText: 'Confirm'
	}).then((result) => {
		callback(result.value)
	});
}


Global.error = function(message, customClass){
	var options = {
		html: message,
		icon: 'error'
	};
	if(customClass){
		options['customClass'] = customClass;
	}
	Swal.fire(options);
}
Global.warning = function(title, message){
	Swal.fire({
		title: title,
		icon: 'warning',
		html: message
	})
}

Global.errorfixed = function(message){
	Swal.fire({
		icon: 'error',
		html: message,
		showConfirmButton: false,
		allowOutsideClick: false
	})
}

Global.success = function(message){
	Swal.fire({
		icon: 'success',
		html: message
	})
}

Global.alert = function(message){
	Swal.fire({
		icon: 'warning',
		html: message
	})
}

Global.parse = function(json){
	var obj = {};
	try{
		json = json.replace(/&/g, '\\u0026');
		obj = JSON.parse(json);
	}
	catch(e){
		obj = {};
	}
	return obj;
}

Global.stringify = function(obj){
	var json = "";
	try{
		json = JSON.stringify(obj);
	}
	catch(e){
		json = "";
	}
	return json;
}

Global.get = function(field, rawlocation){
	var url_string = window.location;
	if(Global.isset(rawlocation)){
		var url_string = rawlocation;
	}
	
	var url = new URL(url_string);
	var c = url.searchParams.getAll(field);
	//if not expecting an array
	if(field.indexOf("[]")<0){
		c = Global.toString(c[0]);
	}
	if(typeof c == "undefined" || c==null){
		return "";
	}
	else{
		return c;
	}
}

/*
//usage
Global.asyncEach(items, function(key, item){
	
})
*/
Global.asyncEach = function(collection, callback, interval, delay, finalcallback){
	if(typeof collection != "object" || collection==null){
		return false;
	}
	if(!Global.isset(interval)){
		interval = 10;
	}
	if(!Global.isset(delay)){
		delay = 10;
	}
	if(!Global.isset(finalcallback)){
		finalcallback = function(){};
	}
	var keys = [];
	for(key in collection){
		keys.push(key);
	}
	var processcb = function(keyindex){
		var collection = this.collection;
		var keys = this.keys;
		var callback = this.callback;
		var interval = this.interval;
		if(keys.length && typeof keys[keyindex] != "undefined"){
			var key = keys[keyindex];
			var item = collection[key];
			callback(key, item);
			setTimeout(function(){
				var keyindex = this.keyindex;
				keyindex++;
				processcb(keyindex);
			}.bind({keyindex:keyindex}), interval)
		}
		else{
			finalcallback();
		}
		
	}.bind({collection:collection, keys:keys,callback:callback, interval:interval, finalcallback:finalcallback});
	setTimeout(function(){
		processcb(0);
	}, delay)
}

Global.toString = function(str){
	if(typeof str != "undefined" && str != null){
		return str+"";
	}
	else{
		return "";
	}
}

Global.toInt = function(n){
	if(typeof n != "undefined" && n != null && !isNaN(n)){
		return parseInt(n);
	}
	else{
		return 0;
	}
}

Global.toFloat = function(n){
	if(n !="" && typeof n != "undefined" && n != null && !isNaN(n)){
		return parseFloat(n);
	}
	else{
		return 0;
	}
}

Global.unique = function(){
	var randomNumber = Math.random().toString(36).substr(2, 9);
	return randomNumber;
}

/*base64, md5, escapeRegExp*/
var Base64={_keyStr:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",encode:function(e){var t="";var n,r,i,s,o,u,a;var f=0;e=Base64._utf8_encode(e);while(f<e.length){n=e.charCodeAt(f++);r=e.charCodeAt(f++);i=e.charCodeAt(f++);s=n>>2;o=(n&3)<<4|r>>4;u=(r&15)<<2|i>>6;a=i&63;if(isNaN(r)){u=a=64}else if(isNaN(i)){a=64}t=t+this._keyStr.charAt(s)+this._keyStr.charAt(o)+this._keyStr.charAt(u)+this._keyStr.charAt(a)}return t},decode:function(e){var t="";var n,r,i;var s,o,u,a;var f=0;e=e.replace(/[^A-Za-z0-9\+\/\=]/g,"");while(f<e.length){s=this._keyStr.indexOf(e.charAt(f++));o=this._keyStr.indexOf(e.charAt(f++));u=this._keyStr.indexOf(e.charAt(f++));a=this._keyStr.indexOf(e.charAt(f++));n=s<<2|o>>4;r=(o&15)<<4|u>>2;i=(u&3)<<6|a;t=t+String.fromCharCode(n);if(u!=64){t=t+String.fromCharCode(r)}if(a!=64){t=t+String.fromCharCode(i)}}t=Base64._utf8_decode(t);return t},_utf8_encode:function(e){e=e.replace(/\r\n/g,"\n");var t="";for(var n=0;n<e.length;n++){var r=e.charCodeAt(n);if(r<128){t+=String.fromCharCode(r)}else if(r>127&&r<2048){t+=String.fromCharCode(r>>6|192);t+=String.fromCharCode(r&63|128)}else{t+=String.fromCharCode(r>>12|224);t+=String.fromCharCode(r>>6&63|128);t+=String.fromCharCode(r&63|128)}}return t},_utf8_decode:function(e){var t="";var n=0;var r=c1=c2=0;while(n<e.length){r=e.charCodeAt(n);if(r<128){t+=String.fromCharCode(r);n++}else if(r>191&&r<224){c2=e.charCodeAt(n+1);t+=String.fromCharCode((r&31)<<6|c2&63);n+=2}else{c2=e.charCodeAt(n+1);c3=e.charCodeAt(n+2);t+=String.fromCharCode((r&15)<<12|(c2&63)<<6|c3&63);n+=3}}return t}}
var md5=(function(){function e(e,t){var o=e[0],u=e[1],a=e[2],f=e[3];o=n(o,u,a,f,t[0],7,-680876936);f=n(f,o,u,a,t[1],
12,-389564586);a=n(a,f,o,u,t[2],17,606105819);u=n(u,a,f,o,t[3],22,-1044525330);o=n(o,u,a,f,t[4],7,-176418897);f=n(f,o,u,a,t[5],
12,1200080426);a=n(a,f,o,u,t[6],17,-1473231341);u=n(u,a,f,o,t[7],22,-45705983);o=n(o,u,a,f,t[8],7,1770035416);f=n(f,o,u,a,t[9],
12,-1958414417);a=n(a,f,o,u,t[10],17,-42063);u=n(u,a,f,o,t[11],22,-1990404162);o=n(o,u,a,f,t[12],7,1804603682);f=n(f,o,u,a,t[13],
12,-40341101);a=n(a,f,o,u,t[14],17,-1502002290);u=n(u,a,f,o,t[15],22,1236535329);o=r(o,u,a,f,t[1],5,-165796510);f=r(f,o,u,a,t[6],
9,-1069501632);a=r(a,f,o,u,t[11],14,643717713);u=r(u,a,f,o,t[0],20,-373897302);o=r(o,u,a,f,t[5],5,-701558691);f=r(f,o,u,a,t[10],
9,38016083);a=r(a,f,o,u,t[15],14,-660478335);u=r(u,a,f,o,t[4],20,-405537848);o=r(o,u,a,f,t[9],5,568446438);f=r(f,o,u,a,t[14],
9,-1019803690);a=r(a,f,o,u,t[3],14,-187363961);u=r(u,a,f,o,t[8],20,1163531501);o=r(o,u,a,f,t[13],5,-1444681467);f=r(f,o,u,a,t[2],
9,-51403784);a=r(a,f,o,u,t[7],14,1735328473);u=r(u,a,f,o,t[12],20,-1926607734);o=i(o,u,a,f,t[5],4,-378558);f=i(f,o,u,a,t[8],
11,-2022574463);a=i(a,f,o,u,t[11],16,1839030562);u=i(u,a,f,o,t[14],23,-35309556);o=i(o,u,a,f,t[1],4,-1530992060);f=i(f,o,u,a,t[4],
11,1272893353);a=i(a,f,o,u,t[7],16,-155497632);u=i(u,a,f,o,t[10],23,-1094730640);o=i(o,u,a,f,t[13],4,681279174);f=i(f,o,u,a,t[0],
11,-358537222);a=i(a,f,o,u,t[3],16,-722521979);u=i(u,a,f,o,t[6],23,76029189);o=i(o,u,a,f,t[9],4,-640364487);f=i(f,o,u,a,t[12],
11,-421815835);a=i(a,f,o,u,t[15],16,530742520);u=i(u,a,f,o,t[2],23,-995338651);o=s(o,u,a,f,t[0],6,-198630844);f=s(f,o,u,a,t[7],
10,1126891415);a=s(a,f,o,u,t[14],15,-1416354905);u=s(u,a,f,o,t[5],21,-57434055);o=s(o,u,a,f,t[12],6,1700485571);f=s(f,o,u,a,t[3],
10,-1894986606);a=s(a,f,o,u,t[10],15,-1051523);u=s(u,a,f,o,t[1],21,-2054922799);o=s(o,u,a,f,t[8],6,1873313359);f=s(f,o,u,a,t[15],
10,-30611744);a=s(a,f,o,u,t[6],15,-1560198380);u=s(u,a,f,o,t[13],21,1309151649);o=s(o,u,a,f,t[4],6,-145523070);f=s(f,o,u,a,t[11],
10,-1120210379);a=s(a,f,o,u,t[2],15,718787259);u=s(u,a,f,o,t[9],21,-343485551);e[0]=m(o,e[0]);e[1]=m(u,e[1]);e[2]=m(a,e[2]);e[3]=m(f,e[3])}
function t(e,t,n,r,i,s){t=m(m(t,e),m(r,s));return m(t<<i|t>>>32-i,n)}function n(e,n,r,i,s,o,u){return t(n&r|~n&i,e,n,s,o,u)}
function r(e,n,r,i,s,o,u){return t(n&i|r&~i,e,n,s,o,u)}function i(e,n,r,i,s,o,u){return t(n^r^i,e,n,s,o,u)}
function s(e,n,r,i,s,o,u){return t(r^(n|~i),e,n,s,o,u)}function o(t){var n=t.length,r=[1732584193,-271733879,-1732584194,271733878],i;
for(i=64;i<=t.length;i+=64){e(r,u(t.substring(i-64,i)))}t=t.substring(i-64);var s=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
for(i=0;i<t.length;i++)s[i>>2]|=t.charCodeAt(i)<<(i%4<<3);s[i>>2]|=128<<(i%4<<3);if(i>55){e(r,s);for(i=0;i<16;i++)s[i]=0}s[14]=n*8;e(r,s);return r}
function u(e){var t=[],n;for(n=0;n<64;n+=4){t[n>>2]=e.charCodeAt(n)+(e.charCodeAt(n+1)<<8)+(e.charCodeAt(n+2)<<16)+(e.charCodeAt(n+3)<<24)}return t}
function c(e){var t="",n=0;for(;n<4;n++)t+=a[e>>n*8+4&15]+a[e>>n*8&15];return t}
function h(e){for(var t=0;t<e.length;t++)e[t]=c(e[t]);return e.join("")}
function d(e){return h(o(unescape(encodeURIComponent(e))))}
function m(e,t){return e+t&4294967295}var a="0123456789abcdef".split("");return d})();
var escapeRegExp = function(strToEscape) {
    // Escape special characters for use in a regular expression
    return strToEscape.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
};


String.prototype.replaceAt=function(index, replacement) {
    return this.substr(0, index) + replacement+ this.substr(index + replacement.length);
}