$(function(){
    $('#type').editable({
        value: 1,    
        source: [
        	 {value: 1, text: 'COD'},
              {value: 2, text: 'Ứng Tiền'}
           ]
    });
    $('#good-amount').editable({
        title: 'Tổng Tiền Hàng'
    });
});