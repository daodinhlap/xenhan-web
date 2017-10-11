 $('#user .editable').editable('toggleDisabled');
 
$('#enable').click(function() {
       $('#user .editable').editable('toggleDisabled');
}); 

$(function() {
		$('#name').editable({
			title: 'Họ Tên', 
	        validate: function(value) {
	            if(value == '') return 'Xin Hãy Nhập Tên!'; 
	        },
	        error: function(response, newValue) {
	        	if(response.status === 500) {
	                return 'Service unavailable. Please try later.';
	            } else {
	               alert(response.responseText);
	            }
			},
			success: function(response, newValue) {
				alert(reponse + ' : ' + newValue);
			}
		});
		
		$('#phone').editable({
			validate:function(value){
				if((!value || 0 === value.length)) return 'Xin hãy nhập số điện thoại';
			},
			title: 'Số Điện Thoại Giao Hàng'
		});

});
