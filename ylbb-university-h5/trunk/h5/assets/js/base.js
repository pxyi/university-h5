;(function(win, doc){
  var docEl = doc.documentElement,
	resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
	recalc = function () {
		var clientWidth = docEl.clientWidth;
		if (!clientWidth) return;
		docEl.style.fontSize = 100 * (clientWidth / 750) + 'px';
	};
  if (!doc.addEventListener) return;
  win.addEventListener(resizeEvt, recalc, false);
	doc.addEventListener('DOMContentLoaded', recalc, false);
	
	/**
	 * 监听返回按钮, 如是微信 则出现返回 confirm
	 */
	history.pushState(null, null, document.URL);
	window.addEventListener('popstate', function () {
			history.pushState(null, null, document.URL);
	});
  // win.addEventListener("popstate", function(e) {
	// 	console.log(111)
	// 	window.history.forward(1);
	// 	if(WeixinJSBridge && confirm('是否返回微信')){
	// 		WeixinJSBridge.call('closeWindow');
	// 	}else{
	// 		window.history.forward(1);
	// 	}
  // }, false);
})(window, document);