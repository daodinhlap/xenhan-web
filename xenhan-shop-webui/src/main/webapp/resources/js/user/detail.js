 $('#user .editable').editable('toggleDisabled');
 
$('#enable').click(function() {
       $('#user .editable').editable('toggleDisabled');
}); 

$(function() {
		$('#name').editable({
			title: 'Họ Tên'
		});
		
		$('#phone').editable({
			validate:function(value){
				if((!value || 0 === value.length)) return 'Xin hãy nhập số điện thoại';
			},
			title: 'Số Điện Thoại Giao Hàng'
		});

});
