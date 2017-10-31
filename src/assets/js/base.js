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
  win.addEventListener("popstate", function(e) {
		if(WeixinJSBridge && confirm('是否返回微信')){
			WeixinJSBridge.call('closeWindow');
		}
  }, false);
})(window, document);