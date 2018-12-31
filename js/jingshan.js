$(function() {
	$.ajax({
		type: 'get',
		url: 'http://open.iciba.com/dsapi/',
		data: 'data',
		dataType: 'dataType',
		success: function(response) {
			console(response);
			// $('.jingshan .jingshan-img img').src = response.picture2;
			$('.jingshan .jingshan-img img').attr({ src: response.picture2 });
			$('.jingshan-content p').html(response.content);
			$('.jingshan-content span').html(response.note);
		}
	});
});
