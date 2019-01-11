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
			$('.jingshan-content p').html(
				response.content + '<a herf="javascript:;"><img src="/img/music_img/sound.png"></a>'
			);
			$('.jingshan-content span').html(response.note);
			$('.jingshan #voice').attr({ src: response.tts });
		}
	});
	var voice = document.getElementById('voice');
	$('.jingshan-content p img').click(function() {
		voice.play(); // 用jquery没有play()这个写法，所以用原生JS
		// console.log('成功');
	});
});
