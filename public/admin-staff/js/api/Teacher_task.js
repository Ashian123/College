var USER = localStorage.getItem("user");

function getAdditionaltask() {
		fetch(`/${USER}/Teacher_additional_task`, {
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
$('#task_id').val($(this).data('id'));
$('#action').val('update_teacher_task');
});	

$('#table_datas').on( 'click','.task_delete', function () {
$('.modal-title').html('');	
$('#DeleteModal').modal('show');
$('#task_id').val($(this).data('id'));
$('#action').val('delete_teacher_task');
});	

$('#add_task').on( 'click', function () {
$('#teacher_task_form')[0].reset();		
$('.modal-title').html('ADD TASK DATA');
$('#action').val('add_teacher_task');
$('#TeacherModal').modal('show');
});

$('.task_submit_data,.confirm_delete').on( 'click', function () {
$.post(`/${USER}/Teacher_additional_task`, { task : $("input[name='t_task_name']").val(), swtch : $("#action").val(), task_id : $("#task_id").val()  }, function(data, status){
$('#teacher_task_form')[0].reset();
getAdditionaltask();
});	
});


});
