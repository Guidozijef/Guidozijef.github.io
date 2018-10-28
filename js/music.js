$(function() {
	$('#btn').click(function() {
		$('.music_player .list').html(''); // 每次搜索清除杀你搜索的内容。
		var value = $('#info').val();
		$.ajax({
			type: 'get',
			url: 'http://tingapi.ting.baidu.com/v1/restserver/ting?method=baidu.ting.search.catalogSug&query=' + value,
			async: true,
			dataType: 'jsonp',
			success: function(data1) {
				var songids = data1.song;
				// console.log(songids.length);
				for (var i = 0; i < songids.length; i++) {
					var songid = songids[i].songid;
					var artistname = songids[i].artistname;
					var li = document.createElement('li');
					var span = document.createElement('span');
					var a = document.createElement('a');
					var div = document.createElement('div');
					div.innerText = artistname;
					a.href = 'javascript:;'; // a标签加上herf="javascript:;"点击时不会动，而等于#时跳到最上面
					a.src = songid;
					var songname = songids[i].songname;
					a.textContent = songname;
					// var ul = document.getElementsByClassName("list")[0];
					li.appendChild(span);
					li.appendChild(a);
					li.appendChild(div);
					// $("list")[0].style.display = "block";
					$('.music_player .list').append(li);
					a.onclick = function() {
						// console.log("a.src:" + this.src);
						$.ajax({
							type: 'get',
							url:
								'http://tingapi.ting.baidu.com/v1/restserver/ting?method=baidu.ting.song.play&songid=' +
								this.src,
							async: true,
							dataType: 'jsonp',
							success: function(data2) {
								console.log();
								var audio = document.getElementById('audio');
								var img = document.getElementById('img');
								audio.src = data2.bitrate.file_link;
								img.src = data2.songinfo.pic_small;
								audio.play();
								$('.icon a img').eq(1).attr({ src: '/img/music_img/pause.png' });
							}
						});
						// 点击当前a标签就加显示前面的紫色条纹，注意：不能加在ajax里面。
						$(this).prev('span').addClass('present');
						$(this).parent().siblings().children('span').removeClass('present');
					};
				}
			}
		});
	});
	// imgplayer()函数用来判断点击li播放歌曲时更换播放或者暂停的图片并播放歌曲
	function imgplayer() {
		if (audio.paused) {
			audio.play();
			$('.icon a img').eq(1).attr({ src: '/img/music_img/pause.png' });
		} else {
			audio.pause();
			$('.icon a img').eq(1).attr({ src: '/img/music_img/player.png' });
		}
	}
	// 点击手动加入的歌曲后播放和显示图片
	$('.list li').eq(0).click(function() {
		$('#audio').attr({ src: 'http://music.163.com/song/media/outer/url?id=449818741.mp3' });
		$('.music_player #img').attr({
			src: 'http://p1.music.126.net/RDusqDuPhQz7E2SAbi5MoA==/109951162904611099.jpg?param=34y34'
		});
		imgplayer();
		$(this).children('span').addClass('present');
		$(this).siblings().children('span').removeClass('present');
	});
	$('.list li').eq(1).click(function() {
		$('#audio').attr({ src: 'http://music.163.com/song/media/outer/url?id=28793140.mp3' });
		$('.music_player #img').attr({
			src: 'http://p1.music.126.net/SKujq5vqqv4KYOVFk7SiRA==/3407386538630284.jpg?param=34y34'
		});
		imgplayer();
		$(this).children('span').addClass('present');
		$(this).siblings().children('span').removeClass('present');
	});
	// 点击图片控制播放和暂停
	$('.icon a img').eq(1).click(function() {
		if (audio.paused) {
			audio.play();
			$(this).attr({ src: '/img/music_img/pause.png' });
		} else {
			audio.pause();
			$(this).attr({ src: '/img/music_img/player.png' });
		}
	});
	// 点击音量变成静音并且改变图标
	$('.icon a img').eq(3).click(function() {
		if (audio.muted) {
			audio.muted = false;
			$(this).attr({ src: '/img/music_img/sound.png' });
		} else {
			audio.muted = true;
			$(this).attr({ src: '/img/music_img/sound-off.png' });
		}
	});
	// 点击上一歌曲
	$('.icon a img').eq(0).click(function() {
		$('.list .present').parent().prev('li').children('span').addClass('present');
		$('.list .present').parent().prev('li').children('a').click();
	});
	// 点击下一歌曲
	$('.icon a img').eq(2).click(function() {
		$('.list .present').parent().next('li:first').children('span').addClass('present');
		$('.list .present').parent().next('li:first').children('a').click();
	});
	// 控制音量
	$('.icon .circle span').draggable({
		axis: 'X',
		containment: 'parent',
		drag: function(ev, ui) {
			// console.log(ui.position.left)
			var noeleft = ui.position.left;
			$('.icon .bar').css({ width: noeleft + 2 });
			audio.volume = noeleft / 36; // 利用left转化为音量。
			if (noeleft == 0) {
				$('.icon a img').eq(3).attr({ src: '/img/music_img/sound-off.png' });
			} else {
				$('.icon a img').eq(3).attr({ src: '/img/music_img/sound.png' });
			}
		}
	});
	// 自动播放下一首
	if (audio) {
		audio.loop = false;
		audio.addEventListener(
			'ended',
			function() {
				$('.icon a img').eq(2).click();
				//在这个方法里写相应的逻辑就可以了
			},
			false
		);
	}
});
