(function() {
	var calc = function() {
		var docElement = document.documentElement;
		var clientWidthValue = docElement.clientWidth > 750 ? 750 : docElement.clientWidth;
		docElement.style.fontSize = 16 * (clientWidthValue / 375) + 'px';
	};
	calc();
	window.addEventListener('resize', calc);
})();
