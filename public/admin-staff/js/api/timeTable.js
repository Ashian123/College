var USER = localStorage.getItem("user");

let teacher_booked = []; let random_data = [];
let previous_teacher;
let subjects = [];
let teacher_subjects_map = [];
function btn_dis(s){
if(s==1) {
$('#create_table,#load_table').prop( "disabled", true );
} else { $('#create_table,#load_table').prop( "disabled", false ); }
}

let teacher = [];
teacher[0] = "Empty";
function booked_teacher() {
	var xhr;
	if (window.XMLHttpRequest) {
	xhr = new XMLHttpRequest();
	} else {
	xhr = new ActiveXObject("Microsoft.XMLHTTP");
	}
	xhr.open("POST", "/admin/slot_appointment", true);
	xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	xhr.onreadystatechange = function () {
	if (xhr.readyState == 4 && xhr.status == 200) {
	teacher_booked = JSON.parse(this.responseText);
	console.log(teacher_booked);
	}
	};
	xhr.send("swtch=slotcheck");
}

function get_subjects() {
	var xhr;
	if (window.XMLHttpRequest) {
	xhr = new XMLHttpRequest();
	} else {
	xhr = new ActiveXObject("Microsoft.XMLHTTP");
	}
	xhr.open("GET", "/admin/getSubject", true);
	xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	xhr.onreadystatechange = function () {
	if (xhr.readyState == 4 && xhr.status == 200) {
	subjects = JSON.parse(this.responseText);
	}
	};
	xhr.send();
}

function selected_class_teachers(class_id) {
	console.log("all booked teacher");
	btn_dis(1);
	var xhr;
	if(window.XMLHttpRequest) {
	xhr = new XMLHttpRequest();
	} else {
	xhr = new ActiveXObject("Microsoft.XMLHTTP");
	}
	xhr.open("POST", "/admin/slot_appointment", true);
	xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	xhr.onreadystatechange = function () {
	if (xhr.readyState == 4 && xhr.status == 200) {
	t_datas = JSON.parse(this.responseText);
	let all_teacher = JSON.parse(t_datas[0].all_teacher);
	all_teacher.push(t_datas[0].teacher);
	teacher_subjects(all_teacher);
	for (var j = 0; j < all_teacher.length; j++){
	teacher[j+1] = all_teacher[j];
	}
	btn_dis(0);
	}
	};
	xhr.send("swtch=get_class_teachers&class_id="+class_id);
}

function teacher_subjects(teachers_ids) {
	var xhr;
	if (window.XMLHttpRequest) {
	xhr = new XMLHttpRequest();
	} else {
	xhr = new ActiveXObject("Microsoft.XMLHTTP");
	}
	xhr.open("POST", "/admin/slot_appointment", true);
	xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	xhr.onreadystatechange = function () {
	if (xhr.readyState == 4 && xhr.status == 200) {
	teacher_subjects_map = JSON.parse(this.responseText);
	}
	};
	xhr.send("swtch=teacher_subjects&teachers_ids="+teachers_ids);
}


window.onload = () => {
  var xhr;
  if (window.XMLHttpRequest) {
    xhr = new XMLHttpRequest();
  } else {
    xhr = new ActiveXObject("Microsoft.XMLHTTP");
  }
  xhr.open("get", `/${USER}/getcourse`, true);
  xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xhr.onreadystatechange = function () {
    if (xhr.readyState == 4 && xhr.status == 200) {
      const data = JSON.parse(this.responseText);
      var sorted = data.sort(
        (a, b) => Number(a.course_title) - Number(b.course_title)
      );
      sorted.map((e) => {
        var x = document.getElementById("course_title");
        var option = document.createElement("option");
        option.text = e.course_title;
        option.value = e.course_title;
        x.add(option);
      });
    }
  };
  xhr.send();
  booked_teacher();
  get_subjects();
};

function course_() {
  //    alert(document.getElementById('course_title').value)
  document.getElementById("course_department").innerHTML = null;
  var course = document.getElementById("course_title").value;
  var xhr;
  if (window.XMLHttpRequest) {
    xhr = new XMLHttpRequest();
  } else {
    xhr = new ActiveXObject("Microsoft.XMLHTTP");
  }
  xhr.open("POST", `/${USER}/getcourse`, true);
  xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xhr.onreadystatechange = function () {
	let check = 0;
    if (xhr.readyState == 4 && xhr.status == 200) {
      const data = JSON.parse(this.responseText);	  
      data.map((e) => {
        var x = document.getElementById("course_department");
        var option = document.createElement("option");
        option.text = e.course;
        option.value = e.course;
		option.id = e.id;
        x.add(option);
		if(check ==0){selected_class_teachers(e.id); check = 1;}
      });
    }
  };
  xhr.send("course=" + course);
}

function displaymsg(response) {
  i = 0;
  var data = "";
  var time = setInterval(() => {
    document.getElementById("displaymsg").innerText = data += response[i++];

    data.length == response.length ? clearInterval(time) : "";
  }, 20);
  setTimeout(function () {
    document.getElementById("displaymsg").innerHTML = null;
  }, 4000);
}

create_table_str = () => {
  var course = document.getElementById("course_title").value;
  var dept = document.getElementById("course_department").value;
  //   var year = document.getElementById("no-of-year").value;
  //   var semester = document.getElementById("no-of-semester").value;
  var days = document.getElementById("no-of-days").value;
  var periods = document.getElementById("no-of-periods").value;
  var mrng = document.getElementById("morning_break").value;
  var lunch = document.getElementById("lunch_break").value;
  var after = document.getElementById("afternoon_break").value;
  //   var start_time = document.getElementById("start_time").value;
  //   var end_time = document.getElementById("end_time").value;

  if (!course || !dept || !days || !periods) {
    displaymsg("Please fill all fields..!");
    return;
  }
  if (days >= 7 || periods >= 10) {
    displaymsg("Values are too high..!");
    return;
  }

  if (
    Number(mrng) > Number(periods) ||
    Number(lunch) > Number(periods) ||
    Number(after) > Number(periods)
  ) {
    displaymsg("Break Time Should be lesser than period..!");
    return;
  }
  var day = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  var table = ` <div class="card"><div class="card-body"><h4 class="card-title">Time Table</h4>
                    <p class="card-description">Fill Details</p><div class="table-responsive pt-3">
                    <form id ='t-table'><table><thead><tr><td><p>Time</p></td>`;
  for (i = 1; i <= periods; i++) {
    table += `<td  ><input class='form-control th${i}' name='th${i}' placeholder='Period: ${i} Time'/></td>`;
    if (mrng == i || lunch == i || after == i) {
      table += `<td style="transform:rotate(-90deg);"><p>Break</p></td>`;
    }
  }
  table += `<tbody>`;
  for (i = 0; i < days; i++) {
    table += `<tr><td><p>${day[i]}</p></td>`;
    for (j = 1; j <= periods; j++) {
      table += `<td><input class='form-control popoption td${i}${j}' data-placement="bottom" onclick = "select_teacher('td${i}${j}')" readonly name='td${i}${j}'></td>`;
      if (i == 0) {
        if (mrng == j || lunch == j || after == j) {
          table += `<td class='break' rowspan='${days}' style="">
                <textarea name="break${j}" id="break${j}" class="form-control" cols="" rows="${
            Number(days) + 1
          }" style="width:10px;overflow:hidden"></textarea>
                </td>`;
        }
      }
    }
    table += `</tr>`;
  }
  table += `</tbody></table></form>`;
  table += `<div class="form-group mt-3" style="float:right">   
                            <button type="button" class="btn btn-success btn-icon-text" onclick="save_table()">
                              <i class="mdi mdi-table-edit btn-icon-prepend" ></i>
                               Save Table
                            </button>
                          </div> </div> </div> </div> </div> </div>`;
  // $('.break').attr('rowspan',`'${days}'`)

  document.getElementById("wait").innerHTML = table;
  random_table();
};

function save_table() {
  var cs_id = $('#course_department option:selected').attr('id'); 
  //alert(cs_id); return false;
  var course_title = document.getElementById("course_title").value;
  var course = document.getElementById("course_department").value;
  var year = "";
  var semester = "";
  var days = document.getElementById("no-of-days").value;
  var periods = document.getElementById("no-of-periods").value;
  var mrng = document.getElementById("morning_break").value;
  var lunch = document.getElementById("lunch_break").value;
  var after = document.getElementById("afternoon_break").value;
  var start_time = "";
  var end_time = "";
  let t_design = $("#wait").clone();
   

  var form = document.getElementById("t-table");
  var data = new FormData(form);
  var table = {};
  var th = {};
  var td = {};
  var breaks = {};
  var table_values = {};
  for (var pair of data.entries()) {
    if (pair[0].match("th")) {
      th = { ...th, ...{ [pair[0]]: pair[1] } };
    }
    if (pair[0].match("td")) {
      td = { ...td, ...{ [pair[0]]: pair[1] } };
    }
    if (pair[0].match("break")) {
      breaks = { ...breaks, ...{ [pair[0]]: pair[1] } };
    }
  }
  table = {
    ...table,
    ...{
      course_title,
      course,
      year,
      semester,
      table_struct: { days, periods, mrng, lunch, after, start_time, end_time },
    },
  };
  table_values = { ...table_values, ...{ th, td, breaks } };
  table = { ...table, ...{ table_values } };
  fetch(`/${USER}/save_timetable`, {
    method: "POST",
    body: JSON.stringify(table),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  })
    .then((response) => response.text())
    .then((response) => {
      document.getElementById("wait").innerHTML = null;
      displaymsg(response);
    });

update_in_db(random_data,cs_id); 	
}

load_table = () => {
// alert("pending");	 // 1234

  var course = document.getElementById("course_title").value;
  var dept = document.getElementById("course_department").value;

  if (!course || !dept ) {
    displaymsg("Please fill all fields..!");
    return false;
  }
  
	btn_dis(1);
	var cs_id = $('#course_department option:selected').attr('id');
	var xhr;
	if (window.XMLHttpRequest) {
	xhr = new XMLHttpRequest();
	} else {
	xhr = new ActiveXObject("Microsoft.XMLHTTP");
	}
	xhr.open("POST", "/admin/slot_appointment", true);
	xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	xhr.onreadystatechange = function () {
	if (xhr.readyState == 4 && xhr.status == 200) {
	const data = JSON.parse(this.responseText);
	var table_datas = JSON.parse(data[0].t_data);
	if(!table_datas || table_datas == ""){ $('#wait').html("<span class = 'text-warning'>Empty !</span>"); return false;}
	$('#wait').html(data[0].t_design);
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
  
  
	let k = 0;
	for (var j = 0; j < teacher_booked.length; j++){
	if(teacher_booked[j].class_id == cs_id){
	random_data[k++] = 	teacher_booked[j];
	let temp_data = ref_teacher_name(teacher_booked[j].teacher_id);
	let temp_subject = ref_subject_name(teacher_booked[j].subject_id);
	$("."+teacher_booked[j].period+"").val(temp_data.cand_name+'/'+temp_subject);
	}
	}
	btn_dis(0);
	
	
	}
	};
	xhr.send("swtch=load_table&class_id="+cs_id);
}



function not_booked_teachers(node){
let a_data = []; var k=0; let all_tech = teacher;
for (var j = 0; j < teacher_booked.length; j++){
if(teacher_booked[j].node == node){ // Not availabe teacher list
a_data[k++] =  teacher_booked[j].teacher_id;
}
}
a_data[k++] =  previous_teacher;
a_data = all_tech.filter( function( el ) { // remove not availabe teacher from teacher
  return a_data.indexOf( el ) < 0;
});
return a_data;
}

function rand(node){
let available_teachers = not_booked_teachers(node);
let x = Math.floor((Math.random() * (available_teachers.length-1)) + 1);
return available_teachers[x];
}

random_table = () => {
  var course = document.getElementById("course_title").value;
  var dept = document.getElementById("course_department").value;
  var days = parseInt(document.getElementById("no-of-days").value);
  var periods = parseInt(document.getElementById("no-of-periods").value);
  if (!course || !dept || !days || !periods) {
    displaymsg("Please fill all fields..!");
    return;
  }
  var k=0; random_data = [];
  for(var i=0;i<days;i++){
	for(var j=0;j<periods;j++){
	let teacher_id = rand("td"+i+""+(j+1)+""); let data = {};
	
	let temp_data = ref_teacher_name(teacher_id);
	let sub_id = JSON.parse(temp_data.subject); 
	let temp_subject = ref_subject_name(sub_id[0]);
	$(".td"+i+""+(j+1)+"").val(temp_data.cand_name+'/'+temp_subject);
	data.teacher_id = teacher_id; 
	data.subject_id = sub_id[0]; 
	previous_teacher = teacher_id;
	data.period = "td"+i+""+(j+1)+"";
	random_data[k++] = data;
	}
  }

}

function update_in_db(random_data,cs_id){

var t_design = $('#wait').html(); 
  var days = document.getElementById("no-of-days").value;
  var periods = document.getElementById("no-of-periods").value;
  var mrng = document.getElementById("morning_break").value;
  var lunch = document.getElementById("lunch_break").value;
  var after = document.getElementById("afternoon_break").value;
  var table_datas = [];
  var z=0;
  for(;z<parseInt(periods);z++){
  table_datas[z] = $("input[name='th"+(z+1)+"']").val();
  }
  table_datas[z++] = days;
  table_datas[z++] = periods;  
  table_datas[z++] = $("#break"+mrng+"").val();
  table_datas[z++] = $("#break"+lunch+"").val();
  table_datas[z++] = $("#break"+after+"").val();
  table_datas[z++] = mrng;
  table_datas[z++] = lunch;
  table_datas[z++] = after;

  var xhr;
  if (window.XMLHttpRequest) {
    xhr = new XMLHttpRequest();
  } else {
    xhr = new ActiveXObject("Microsoft.XMLHTTP");
  }
    xhr.open("POST", "/admin/slot_appointment", true);
  xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xhr.onreadystatechange = function () {
    if (xhr.readyState == 4 && xhr.status == 200) {
	booked_teacher();
	location.reload();
    }
  };
	var json = Object.assign({}, random_data);

	xhr.send("data="+JSON.stringify(json)+"&swtch=store"+"&cs_id="+cs_id+"&t_design="+t_design+"&t_data="+JSON.stringify(table_datas));
}


ref_teacher_name = (t_id) => {
for(var j=0;j<teacher_subjects_map.length;j++){
	if(teacher_subjects_map[j].id == t_id ){  return teacher_subjects_map[j];  }
}
}

ref_subject_name = (s_id) => {
for(var j=0;j<subjects.length;j++){
	if(subjects[j].id == s_id ){  return subjects[j].subject; }
}	
}


function select_teacher(node){
	let available_teachers = not_booked_teachers(node);
	$("#selected_node").val(node);
	$('#teacher_subjects_area').html("");
	let html="";
		for(var j=1;j<available_teachers.length;j++){
				let temp_data = ref_teacher_name(available_teachers[j]);
				let sub_ids = JSON.parse(temp_data.subject); 
		html += '<button data-subjects = '+sub_ids+' data-name = "'+available_teachers[j]+'" class = "btn btn-sm btn-success mt-2 change_teacher">'+temp_data.cand_name+'</button>';
		}
		
	$('#teacher_area').html(html);
	$('#TeacherModal').modal('show');
}

// Jquery 
$(document).ready(function(){
	
$('#course_department').on('change', function() {
	var cs_id = $('#course_department option:selected').attr('id');
	selected_class_teachers(cs_id);
});	

$('#teacher_area').on( 'click','.change_teacher', function () {
	var name = $(this).data('name');
	var subjects = $(this).data('subjects');
	var subjects = subjects.split(',');
	console.log(subjects);
	var node = $("#selected_node").val();
	$('#teacher_subjects_area').html("");
	let html="<div class = 'row'>";
	for(var j=0;j<subjects.length;j++){
    let temp_subject = ref_subject_name(subjects[j]);			
	html += '<button data-node = "'+node+'" data-sid = "'+subjects[j]+'"  data-tid = "'+name+'" class = "col-md-4 btn btn-sm btn-info mt-2 change_subject">'+temp_subject+'</button>';
	}	
	html+="</div>";
	$('#teacher_subjects_area').html(html);
	//$("."+node+"").val(name);
	//$('#TeacherModal').modal('hide');

});



$('#teacher_subjects_area').on( 'click','.change_subject', function () {
	var subjects_id = $(this).data('sid');
	var teacher_id = $(this).data('tid');
	var node = $(this).data('node');
	
	
	let temp_data = ref_teacher_name(teacher_id);
	let temp_subject = ref_subject_name(subjects_id);
	$("."+node+"").val(temp_data.cand_name+'/'+temp_subject);
 	for(var j=0;j<random_data.length;j++){
	if(random_data[j].period == node) { 
	random_data[j].teacher_id = teacher_id;   random_data[j].subject_id = subjects_id;  }
	}
	 $('#TeacherModal').modal('hide');	
});




});
