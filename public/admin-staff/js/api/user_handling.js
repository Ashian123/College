var USER = localStorage.getItem("user");
function getAdditionaltask() {
		fetch(`/itadmin/user_handling`, {
		method: "post",
		body: JSON.stringify({
		swtch: "viewall",
		}),
		headers: {
		"Content-type": "application/json; charset=UTF-8",
		},
		})
    .then((res) => res.json())
    .then((res) => {
		let html = "";
		for (var j = 0; j < res.length; j++){
			html += ' <tr>';
			html += '<td>'+(j+1)+'</td>';
			html += '<td>'+res[j].name+'</td>';
			html += '<td>'+res[j].user_id+'</td>';
			html += '<td>'+res[j].user_type+'</td>';
			html += '<td><button data-id = '+res[j].id+' data-task = "'+res[j].name+'" class = "btn btn-sm btn-outline-dark task_edit ml-2"><i class="text-primary mdi mdi-tooltip-edit"></i></button>'; 
			html += '<button data-id = '+res[j].id+' class = "btn btn-sm btn-outline-dark task_delete ml-2"><i class="text-danger mdi mdi-delete"></i></button></td>';
			html += '</tr>';
		}$('#table_datas').html(html);
		
    });
}


$(document).ready(function(){
getAdditionaltask();
$('#table_datas').on( 'click','.task_edit', function () {
$("input[name='t_task_name']").val($(this).data('task'));
$('.modal-title').html('EDIT TASK DATA');
$('#TeacherModal').modal('show');
$('#d_data_id').val($(this).data('id'));
$('#action').val('update_d_data');
});	

$('#table_datas').on( 'click','.task_delete', function () {
$('.modal-title').html('');	
$('#DeleteModal').modal('show');
$('#d_data_id').val($(this).data('id'));
$('#action').val('delete_d_data');
});	

$('#add_data').on( 'click', function () {
$('#data_form')[0].reset();		
$('.modal-title').html('CREATE USERS DATA');
$('#action').val('add_d_data');
$('#TeacherModal').modal('show');
});

$('.task_submit_data,.confirm_delete').on( 'click', function () {

$.post(`/itadmin/user_handling`, { 
user_id : $("input[name='admin_user_id']").val(), 
user_name : $("input[name='admin_user_name']").val(), 
user_type : $("select[name='admin_user_type']").val(), 
user_pass : $("input[name='admin_user_pass']").val(), 
swtch : $("#action").val(), 
d_data_id : $("#d_data_id").val()  
}, function(data, status){
$('#data_form')[0].reset();
getAdditionaltask();
});	
});


});
