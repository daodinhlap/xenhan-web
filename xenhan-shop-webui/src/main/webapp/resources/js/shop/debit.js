//================================================================
//ON LOADED
$(document).ready(function($) {
    //Date picker
    configDatePicker(['fromDate', 'toDate']);
    var today = new Date();
    var firstDay = new Date(today.getFullYear(), today.getMonth(), 1);
    $('#fromDate').val(ddMMyyyy(firstDay.getTime()));
    $('#toDate').val(ddMMyyyy(today.getTime()));
});

function getDebit() {
    alert("hhihi");
}

function configDatePicker(ids){
    for(i=0; i<ids.length; i++){
        $('#'+ids[i]).datetimepicker({
            locale:'vi',
            showClear:true,
            ignoreReadonly:true,
            useCurrent: false,
            maxDate: new Date(),
            format: 'DD/MM/YYYY'
        });
    }
}