$(function() {
	$('.input-box #btn').click(function() {
		// $('.result-box span').html('');
		// $('.result-box .result').html('');
		var $Txt = $('#txt').val();
		var appid = '20181020000221992';
		var key = '9EkibaYlvrEQCvjRRLwV';
		var salt = new Date().getTime();
		var query = $Txt;
		// 多个query可以用\n连接  如 query='apple\norange\nbanana\npear'
		var from = 'auto';
		var to = 'auto';
		var str1 = appid + query + salt + key;
		var sign = MD5(str1);
		$.ajax({
			url: 'http://api.fanyi.baidu.com/api/trans/vip/translate',
			type: 'get',
			dataType: 'jsonp',
			data: {
				q: query,
				appid: appid,
				salt: salt,
				from: from,
				to: to,
				sign: sign
			},
			success: function(data) {
				// console.log(data.trans_result[0].dst);
				$('.result-box .result').html(data.trans_result[0].dst);
				var en = data.to;
				if (en == 'en') {
					$('.result-box .en').html('【英】');
				}
				if (en == 'zh') {
					$('.result-box .en').html('【中】');
				}
			}
		});
		if ($Txt != '') {
			$('.result-box').slideDown(300);
		}

		$('.input-box').blur(function() {
			$('.result-box').slideUp(300);
		});
	});
});
