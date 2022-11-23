var USER = localStorage.getItem("user");
var ajax_url = `/${USER}/lesson_handling`;
$(document).ready(function(){
var Subject_name = document.getElementById("select_dropmenu");
var Subject_tbody = document.getElementById("subjects_tbody");
$('.lesson_name,#add_lessons').hide();

function getSubjects() {
  Subject_name.innerHTML = null;
  fetch(`/admin/getSubject`)
    .then((res) => res.json())
    .then((res) => {
      var option = document.createElement("option");
      option.text = "*Select Subject";
      Subject_name.add(option);
      //
      res.forEach((e) => {
        var option = document.createElement("option");
        option.text = e.subject;
        option.value = e.id;
        Subject_name.add(option);	
      });

			
					let gselect = tail.select('#select_dropmenu', {
					search:true,
					deselect:true,
					placeholder: 'Subjects...',
					//multiSelectAll: true,
					//classNames: 'btn btn-sm btn-outline-dark',
					});
			
    });
}

getSubjects();

function loadlessons(){
$("#action").val("getLessons")	
$('.l_total').html(0);
$.post(ajax_url, { 
swtch : $("#action").val(), 
s_id : $("#select_dropmenu").val()  }, function(data, status){
let html = "<div class = 'row'>";
for(let i=0;i<data.length;i++){
html += '<div class = "col-md-4 card-body row"><btn data-id = '+data[i].id+'  data-name = "'+data[i].name+'" class = "col-md-10 btn btn-sm btn-outline-dark lesson_edit">'+data[i].name+'</btn> <btn  data-id = '+data[i].id+' class = "col-md-2 btn btn-sm btn-outline-danger lesson_delete" ><i class="mdi mdi-delete"></i></btn></div>';
$('.l_total').html(i+1);
}
html += "</div>";

$('.lesson-area').html(html);
});
		
}


$('#select_dropmenu').on( 'change', function () {
	$(".lesson_name").val("");
$("#action").val("getLessons");	
$('.lesson-area').html('Loading');
if($(this).val() == "*Select Subject"){
$('.lesson_name,#add_lessons').hide();
} else { $('.lesson_name,#add_lessons').show(); }
loadlessons();
});

$('#add_lessons').on( 'click', function () {
$('#lesson_form')[0].reset();	
//$('.lesson-area').html('Loading');
$('.modal-title').html('ADD LESSON DATA');
$('#action').val('addLessons');
$('#LessonsModal').modal('show');

});


$('.lesson-area').on( 'click','.lesson_edit', function () {
$("input[name='lesson_name']").val($(this).data('name'));
$('.modal-title').html('EDIT LESSON');
$('#LessonsModal').modal('show');
$("#lesson_id").val($(this).data('id'));
$('#action').val('update_lesson');
});

$('.lesson-area').on( 'click','.lesson_delete', function () {

$('#action').val('delete_lesson');	
$('.modal-title').html('DELETE LESSON');
$('#DeleteModal').modal('show');
$("#lesson_id").val($(this).data('id'));
});



$('.lesson_submit_data,.confirm_delete').on( 'click', function () {
$.post(ajax_url, 
{ 
l_name : $("input[name='lesson_name']").val(), 
swtch : $("#action").val(), 
lesson_id : $("#lesson_id").val(),
s_id : $("#select_dropmenu").val()
}, function(data, status){
$('#lesson_form')[0].reset();
loadlessons(); 
});	
});



});	
