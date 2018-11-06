$(function() {
	$('#btn').click(function() {
		// $('.music_player .list').html(''); // 每次搜索清除杀你搜索的内容。
		var value = $('#info').val();
		$.ajax({
			type: 'get',
			url:
				'https://c.y.qq.com/soso/fcgi-bin/client_search_cp?ct=24&qqmusic_ver=1298&new_json=1&remoteplace=txt.yqq.song&searchid=55459319310000039&t=0&aggr=1&cr=1&catZhida=1&lossless=0&flag_qc=0&p=1&n=20&w=' +
				value +
				'&g_tk=5381&jsonpCallback=info&loginUin=0&hostUin=0&format=jsonp&inCharset=utf8&outCharset=utf-8&notice=0&platform=yqq&needNewCode=0',
			async: true,
			dataType: 'jsonp',
			jsonpCallback: 'info',
			success: function info(data1) {
				var songids = data1.data.song.list;
				var img = document.getElementById('img');
				// console.log(songids.length);
				console.log(data1.data.zhida.zhida_singer);
				console.log(data1.data.zhida.zhida_mv);
				console.log(data1.data.zhida.zhida_album);
				if (data1.data.zhida.zhida_singer != undefined) {
					img.src = data1.data.zhida.zhida_singer.singerPic;
				} else if ((img.src = data1.data.zhida.zhida_mv != undefined)) {
					img.src = data1.data.zhida.zhida_mv.pic;
				} else if ((img.src = data1.data.zhida.zhida_album != undefined)) {
					img.src = data1.data.zhida.zhida_album.albumPic;
				} else {
					img.src =
						'http://qukufile2.qianqian.com/data2/pic/0ce88c8cd9127e20ff576a6ad66fe870/576822355/576822355.jpg@s_1,w_90,h_90';
				}
				for (var i = 0; i < songids.length; i++) {
					var songmid = songids[i].mid;
					var artistname = songids[i].singer[0].name;
					// var ul = document.createElement("ul");
					var li = document.createElement('li');
					var span = document.createElement('span');
					var a = document.createElement('a');
					var div = document.createElement('div');
					div.innerText = artistname;
					a.href = 'javascript:;'; // a标签加上herf="javascript:;"点击时不会动，而等于#时跳到最上面
					a.src = songmid;
					// img.src = songids[i].singer[0].mid;
					var songname = songids[i].name;
					a.textContent = songname;
					li.appendChild(span);
					li.appendChild(a);
					li.appendChild(div);
					$('.music_player .list').append(li);
					a.onclick = function() {
						console.log('songmid:' + this.src);
						console.log('imgmid:' + img.src);
						var audio = document.getElementById('audio');
						audio.src = 'http://ws.stream.qqmusic.qq.com/C100' + this.src + '.m4a?fromtag=0&guid=126548448';
						// img.src =
						// 	'https://y.gtimg.cn/music/photo_new/T001R300x300M000' + img.src + '.jpg?max_age=2592000';
						audio.play();
						$('.icon a img').eq(1).attr({ src: 'img/pause.png' });
						// 点击当前a标签就加显示前面的紫色条纹，注意：不能加在ajax里面。
						$(this).prev('span').addClass('present');
						$(this).parent().siblings().children('span').removeClass('present');
						$(this)
							.parent()
							.css({ backgroundColor: '#E0DEE8' })
							.siblings()
							.css({ backgroundColor: '#fff' });
					};
				}
			}
		});
	});
	// 捕捉回车键
	$('#info').keypress(function(e) {
		if (e.which == 13) {
			$('#btn').click();
		}
	});
	// imgplayer()函数用来判断点击li播放歌曲时更换播放或者暂停的图片并播放歌曲
	function imgplayer() {
		if (audio.paused) {
			audio.play();
			$('.icon a img').eq(1).attr({ src: 'img/pause.png' });
		} else {
			audio.pause();
			$('.icon a img').eq(1).attr({ src: 'img/player.png' });
		}
	}
	// 封装一个每个歌曲信息的函数，传入参数就可。
	function info(mp3, img) {
		$('#audio').attr({ src: mp3 });
		$('.music_player #img').attr({ src: img });
		imgplayer();
	}
	// 点击手动加入的歌曲后播放和显示图片
	$('.list li').eq(0).click(function() {
		info(
			'http://music.163.com/song/media/outer/url?id=449818741.mp3',
			'http://p1.music.126.net/RDusqDuPhQz7E2SAbi5MoA==/109951162904611099.jpg?param=34y34'
		);
		$(this).children('span').addClass('present');
		$(this).siblings().children('span').removeClass('present');
		$(this).css({ backgroundColor: '#E0DEE8' }).siblings().css({ backgroundColor: '#fff' });
	});
	$('.list li').eq(1).click(function() {
		info(
			'http://music.163.com/song/media/outer/url?id=28793140.mp3',
			'http://p1.music.126.net/SKujq5vqqv4KYOVFk7SiRA==/3407386538630284.jpg?param=34y34'
		);
		$(this).children('span').addClass('present');
		$(this).siblings().children('span').removeClass('present');
		$(this).css({ backgroundColor: '#E0DEE8' }).siblings().css({ backgroundColor: '#fff' });
	});
	$('.list li').eq(2).click(function() {
		info(
			'http://music.163.com/song/media/outer/url?id=190072.mp3',
			'http://p2.music.126.net/Y91B_GXc5d9t-0X0Uu_7xw==/109951163063096750.jpg?param=130y130'
		);
		$(this).children('span').addClass('present');
		$(this).siblings().children('span').removeClass('present');
		$(this).css({ backgroundColor: '#E0DEE8' }).siblings().css({ backgroundColor: '#fff' });
	});
	$('.list li').eq(3).click(function() {
		info(
			'http://music.163.com/song/media/outer/url?id=32628933.mp3',
			'https://p3.music.126.snet/5PI5cPypdVcn8rm2YerPsg==/109951163005769076.jpg?param=90y90'
		);
		$(this).children('span').addClass('present');
		$(this).siblings().children('span').removeClass('present');
		$(this).css({ backgroundColor: '#E0DEE8' }).siblings().css({ backgroundColor: '#fff' });
	});
	$('.list li').eq(4).click(function() {
		info(
			'http://music.163.com/song/media/outer/url?id=531295576.mp3',
			'http://p2.music.126.net/mwCUI0iL3xEC2a4WVICHlA==/109951163115369030.jpg?param=34y34'
		);
		$(this).children('span').addClass('present');
		$(this).siblings().children('span').removeClass('present');
		$(this).css({ backgroundColor: '#E0DEE8' }).siblings().css({ backgroundColor: '#fff' });
	});
	$('.list li').eq(5).click(function() {
		info(
			'http://music.163.com/song/media/outer/url?id=28854182.mp3',
			'http://p1.music.126.net/WoR2LbM1IFauFpvhBWOjqA==/6642149743396577.jpg?param=34y34'
		);
		$(this).children('span').addClass('present');
		$(this).siblings().children('span').removeClass('present');
		$(this).css({ backgroundColor: '#E0DEE8' }).siblings().css({ backgroundColor: '#fff' });
	});
	$('.list li').eq(6).click(function() {
		info(
			'http://music.163.com/song/media/outer/url?id=167655.mp3',
			'http://p2.music.126.net/6TNYBV2rezZLiwsGYBgmPw==/123145302311773.jpg?param=130y130'
		);
		$(this).children('span').addClass('present');
		$(this).siblings().children('span').removeClass('present');
		$(this).css({ backgroundColor: '#E0DEE8' }).siblings().css({ backgroundColor: '#fff' });
	});
	$('.list li').eq(7).click(function() {
		info(
			'http://music.163.com/song/media/outer/url?id=461347998.mp3',
			'http://p2.music.126.net/ggnyubDdMxrhpqYvpZbhEQ==/3302932937412681.jpg?param=130y130'
		);
		$(this).children('span').addClass('present');
		$(this).siblings().children('span').removeClass('present');
		$(this).css({ backgroundColor: '#E0DEE8' }).siblings().css({ backgroundColor: '#fff' });
	});
	$('.list li').eq(8).click(function() {
		info(
			'http://music.163.com/song/media/outer/url?id=521602388.mp3',
			'http://p2.music.126.net/mJg8wJbIoM8d8xQ72eR2qw==/109951163073289601.jpg?param=34y34'
		);
		$(this).children('span').addClass('present');
		$(this).siblings().children('span').removeClass('present');
		$(this).css({ backgroundColor: '#E0DEE8' }).siblings().css({ backgroundColor: '#fff' });
	});
	$('.list li').eq(9).click(function() {
		info(
			'http://music.163.com/song/media/outer/url?id=27955652.mp3',
			'http://p1.music.126.net/WPHmBisDxnoF4DrBLKwl3Q==/109951163169021112.jpg?param=130y130'
		);
		$(this).children('span').addClass('present');
		$(this).siblings().children('span').removeClass('present');
		$(this).css({ backgroundColor: '#E0DEE8' }).siblings().css({ backgroundColor: '#fff' });
	});
	$('.list li').eq(10).click(function() {
		info(
			'http://music.163.com/song/media/outer/url?id=400162138.mp3',
			'http://p1.music.126.net/a9oLdcFPhqQyuouJzG2mAQ==/3273246124149810.jpg?param=130y130'
		);
		$(this).children('span').addClass('present');
		$(this).siblings().children('span').removeClass('present');
		$(this).css({ backgroundColor: '#E0DEE8' }).siblings().css({ backgroundColor: '#fff' });
	});
	// 点击图片控制播放和暂停
	$('.icon a img').eq(1).click(function() {
		if (audio.paused) {
			audio.play();
			$(this).attr({ src: 'img/pause.png' });
		} else {
			audio.pause();
			$(this).attr({ src: 'img/player.png' });
		}
	});
	// 点击音量变成静音并且改变图标
	$('.icon a img').eq(3).click(function() {
		if (audio.muted) {
			audio.muted = false;
			$(this).attr({ src: 'img/sound.png' });
		} else {
			audio.muted = true;
			$(this).attr({ src: 'img/sound-off.png' });
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
			audio.volume = noeleft / 40; // 利用left转化为音量。
			if (noeleft == 0) {
				$('.icon a img').eq(3).attr({ src: 'img/sound-off.png' });
			} else {
				$('.icon a img').eq(3).attr({ src: 'img/sound.png' });
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

	// 手机端音乐播放器的隐藏和显示操作
	$('.music_player .gt').click(function() {
		var gt = $('.music_player .gt').html();
		if (gt == '&gt;') {
			$('.music_player .gt').html('&lt;');
			$('.music_player').animate({ left: -5 });
		} else {
			$('.music_player .gt').html('&gt;');
			$('.music_player').animate({ left: -265 });
		}
	});
});
