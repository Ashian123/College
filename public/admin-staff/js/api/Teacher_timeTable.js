var USER = localStorage.getItem("user");
let teacher_booked = []; let tasks = []; let booked_tasks = []; var st = 0;
let all_subjects = []
// Ajax bitton controls 
function btn_dis(s){
if(s==1) {
$('#create_table,#load_table').prop( "disabled", true );
} else { $('#create_table,#load_table').prop( "disabled", false ); }
}	

function teacher_slots(name) {
	var xhr;
	if (window.XMLHttpRequest) {
	xhr = new XMLHttpRequest();
	} else {
	xhr = new ActiveXObject("Microsoft.XMLHTTP");
	}
	xhr.open("POST",`/${USER}/Teacher_timetable`, true);
	
	xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	xhr.onreadystatechange = function () {
	if (xhr.readyState == 4 && xhr.status == 200) {
	teacher_booked = JSON.parse(this.responseText);
	if(!teacher_booked){ $('#wait').html("<span class = 'text-warning'>Empty !</span>"); return false;}
	load_table(teacher_booked[0].class_id,teacher_booked[0].teacher_id);
	}
	};
	xhr.send("swtch=teacher_datas&t_name="+name);
}

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
	tasks = res; 
		let html="";
		for(var j=0;j<tasks.length;j++){
		html += '<button data-name = "'+tasks[j].name+'" class = "btn btn-sm btn-outline-success mt-2 change_teacher">'+tasks[j].name+'</button>';
		}
	$('#teacher_area').html(html);
    });
}

function getTeachertask(name) {
		fetch(`/${USER}/Teacher_additional_task`, {
		method: "post",
		body: JSON.stringify({
		swtch: "getTeachertask",
		t_name: name,
		}),
		headers: {
		"Content-type": "application/json; charset=UTF-8",
		},
		})
    .then((res) => res.json())
    .then((res) => { 
		for(var j=0;j<res.length;j++){
		console.log(res[j]);
		$("."+res[j].node+"").val(res[j].task);
		}
    });
}


ref_subject_name = (s_id) => {
for(var j=0;j<all_subjects.length;j++){
	if(all_subjects[j].id == s_id ){  return all_subjects[j].subject; }
}	
}


function getSubjects() {
  fetch(`/${USER}/getSubject`)
    .then((res) => res.json())
    .then((res) => {
	all_subjects = 	res;
      res.forEach((e) => {
        var option = document.createElement("option");
        option.text = e.subject;
        option.value = e.id;

        Subject_name.add(option);
      });
      res.forEach((e) => {
        var option = document.createElement("option");
        option.text = e.subject;
        option.value = e.id;
      });
    });
}

function getTeachers() {
btn_dis(1);	
var $mySelect = $('#teacher_list');
  $mySelect.html("");
  var $option = $("<option/>", {
    value: "",
    text: "Select Teacher"
  });
  $mySelect.append($option);
  fetch(`/${USER}/TeacherDetails`, {
    method: "post",
    body: JSON.stringify({
      subject: Subject_name.value,
    }),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  })
    .then((res) => res.json())
    .then((res) => {
			console.log(res);
			$.each(res, function(key, value) {
			$option = $("<option/>", {
			value: value.id,
			text: value.cand_name
			});
			$mySelect.append($option);	
			btn_dis(0);
			});
			
	
    });
}


function load_table(cs_id,te_name){
	btn_dis(1);
	var xhr;
	if (window.XMLHttpRequest) {
	xhr = new XMLHttpRequest();
	} else {
	xhr = new ActiveXObject("Microsoft.XMLHTTP");
	}
	xhr.open("POST",`/${USER}/Teacher_timetable`, true);
	xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	xhr.onreadystatechange = function () {
	if (xhr.readyState == 4 && xhr.status == 200) {
		
	
	const data = JSON.parse(this.responseText);
	$('#wait').html(data[0].t_design);
	var table_datas = JSON.parse(data[0].t_data);
	if(!table_datas){ $('#wait').html("<span class = 'text-warning'>Empty !</span>"); return false;}
	leng = table_datas.length; leng--;
  var after = table_datas[leng]; leng--;
  $("#afternoon_break").val(after);
  var lunch = table_datas[leng]; leng--;
  $("#lunch_break").val(lunch);
  var morning = table_datas[leng]; leng--;
  $("#morning_break").val(morning);
  
  $("#break"+after+"").val(table_datas[leng--]);
  $("#break"+lunch+"").val(table_datas[leng--]);
  $("#break"+morning+"").val(table_datas[leng--]);
  $("#no-of-periods").val(table_datas[leng--]);
  $("#no-of-days").val(table_datas[leng--]);
  
  for (var j=0;j<=leng+1;j++){
  $("input[name='th"+(j+1)+"']").val(table_datas[j]);
  }
	for (var j = 0; j < teacher_booked.length; j++){
	$("."+teacher_booked[j].period+"").val(teacher_booked[j].c_name+"("+teacher_booked[j].c_section+") / "+ ref_subject_name(teacher_booked[j].subject_id) );
	}
	btn_dis(0); getTeachertask(te_name);
	}
	};
	xhr.send("swtch=load_table&class_id="+cs_id);
}


function save_table(){
console.log($('#teacher_name').val());
console.log(booked_tasks);
$.post(`/${USER}/Teacher_additional_task`, { 
task : JSON.stringify(booked_tasks), 
swtch : "store_task", 
t_name : $('#teacher_name').val()  }, 
function(data, status){
getAdditionaltask();
});

}



function getTimeTable() {
btn_dis(1);	
var $mySelect = $('#teacher_list');
  $mySelect.html("");
  var $option = $("<option/>", {
    value: "",
    text: "Select Teacher"
  });
  $mySelect.append($option);
  fetch(`/${USER}/TeacherDetails`, {
    method: "post",
    body: JSON.stringify({
      subject: Subject_name.value,
    }),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  })
    .then((res) => res.json())
    .then((res) => {
		console.log(res);
			$.each(res, function(key, value) {
			$option = $("<option/>", {
			value: value.cand_name,
			text: value.cand_name
			});
			$mySelect.append($option);	
			btn_dis(0);
			});
			
	
    });
}

function select_teacher(node) {
var value = $("."+node+"").val();
if(value){  return false; }
$("#selected_node").val(node);
$('#TeacherModal').modal('show');
}


$(document).ready(function(){	
btn_dis(1);		
getSubjects(); getAdditionaltask();
$('#Subject_name').on('change', function() {
booked_tasks = []; st = 0;		
getTeachers();
});	

$('#teacher_list').on('change', function() {
booked_tasks = []; st = 0;	
teacher_slots($(this).val());
$('#teacher_name').val($(this).val());
});	

$('#teacher_area').on( 'click','.change_teacher', function () {
	var name = $(this).data('name');
	var node = $("#selected_node").val();
	$("."+node+"").val(name);
	$('#TeacherModal').modal('hide');
	let data = {};
	data.task = name;
	data.period = node;
	booked_tasks[st++] = data;
});

});
