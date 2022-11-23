var USER = localStorage.getItem("user");
var ajax_url = `/${USER}/scheduler`;
let sections = [];
$(document).ready(function(){
var Subject_name = document.getElementById("select_dropmenu");
var class_dropmenu = document.getElementById("class_dropmenu");
var Subject_tbody = document.getElementById("subjects_tbody");
$('.lesson_name,#add_lessons').hide();

s_options = { search:true, deselect:true };

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
        option.value = e.subject;
        Subject_name.add(option);	
      });

					let gselect = tail.select('#select_dropmenu', {
					s_options
					//multiSelectAll: true,
					});	
    });
}getSubjects();



function class_dropmenus(){
	var option = document.createElement("option");
	option.text = "*Select Class";
	option.id = "";
	class_dropmenu.add(option);
$.post(ajax_url, { 
swtch : "LoadClass"  }, function(data, status){
	sections = data;
      data.forEach((e) => {
        var option = document.createElement("option");
        option.text = e.course_title;
        option.value = e.course_title;
        class_dropmenu.add(option);	
      });
			let cselect = tail.select('#class_dropmenu', { s_options });
});
}class_dropmenus();

$('#class_dropmenu').on( 'change', function () {
loadscheduler();
});



function loadscheduler(){
$("#action").val("getLessons"); 

console.log($("#select_dropmenu").val());
console.log($("#class_dropmenu").val());

if($("#select_dropmenu").val() == "*Select Subject" || $("#class_dropmenu").val() == "*Select Class"){ $('.lesson-area').html("Choose Both Values"); return false; }
$.post(ajax_url, { 
swtch : $("#action").val(), 
s_name : $("#select_dropmenu").val(),
cls_name : $("#class_dropmenu").val()
}, function(data, status){
let html = "<div class = 'row'>";
for(let i=0;i<data.length;i++){
html += '<div class = "col-md-4 card-body row"><btn data-id = '+data[i].id+'  data-name = "'+data[i].name+'" class = "col-md-10 btn btn-sm btn-outline-dark lesson_edit">'+data[i].name+'</btn> <btn  data-id = '+data[i].id+' class = "col-md-2 btn btn-sm btn-outline-danger lesson_delete" ><i class="mdi mdi-delete"></i></btn></div>';

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
loadscheduler();
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
loadscheduler(); 
});	
});


//const Calendar = tui.Calendar;

   
var today = new Date();
    var picker = tui.DatePicker.createRangePicker({
        startpicker: {
            date: today,
            input: '#startpicker-input',
            container: '#startpicker-container'
        },
        endpicker: {
            date: today,
            input: '#endpicker-input',
            container: '#endpicker-container'
        },
        selectableRanges: [
            [today, new Date(today.getFullYear() + 1, today.getMonth(), today.getDate())]
        ]
    });



var Calendar = window.tui.Calendar;

      var cal = new Calendar('#app', {
        defaultView: 'month',
        //calendars: MOCK_CALENDARS,
        useFormPopup: true,
        useDetailPopup: true,
        template: {
          popupIsAllday: function () {
            return 'All day?';
          },
          popupStateFree: function () {
            return '🏝️ Free';
          },
          popupStateBusy: function () {
            return '🔥 Busy';
          },
          titlePlaceholder: function () {
            return 'Enter title';
          },
          locationPlaceholder: function () {
            return 'Enter location';
          },
          startDatePlaceholder: function () {
            return 'Start date';
          },
          endDatePlaceholder: function () {
            return 'End date';
          },
          popupSave: function () {
            return 'Add Event';
          },
          popupUpdate: function () {
            return 'Update Event';
          },
          popupEdit: function () {
            return 'Modify';
          },
          popupDelete: function () {
            return 'Remove';
          },
          popupDetailTitle: function (data) {
            return 'Detail of ' + data.title;
          },
        },
      });
    




});	
