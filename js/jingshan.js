$(function() {
	$.ajax({
		type: 'get',
		url: 'http://open.iciba.com/dsapi/',
		async: true,
		dataType: 'jsonp',
		jsonpCallback: 'info',
		success: function info(response) {
			// console.log(response);
			// document.getElementById('jingshan-img').src = response.picture2; // 原生js
			$('.jingshan .jingshan-img img').attr({ src: response.picture2 }); // jquery
			$('.jingshan-content p').html(response.content + '<img src="/img/music_img/sound.png">');
			$('.jingshan-content span').html(response.note);
		}
	});
	$('.jingshan-content p img').click(function() {
		$('.jingshan .voice').attr({ src: response.tts });
		// console.log('成功');
		audio.play();
	});
});
