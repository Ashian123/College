var USER = localStorage.getItem("user");

// var course_title = document.getElementById("course_title");
// var course = document.getElementById("course_department");
var Teacher_name = document.getElementById("Teacher_name");
var Teacher_initial = document.getElementById("Teacher_initial");
var Subject_name = document.getElementById("Subject_name");
var Subject_name_modal = document.getElementById("Subject_name_modalss");
var primary_name_modal = document.getElementById("primary_name_modal");
var Qualification = document.getElementById("Qualification");
var Mobile_number = document.getElementById("Mobile_number");
var Email_ID = document.getElementById("Email_ID");
var Teacher_ID = document.getElementById("Teacher_ID");
var Password = document.getElementById("Password");
var Teacher_address = document.getElementById("Teacher_address");
var image = document.getElementById("blah");
var courseInsideModal = document.getElementById("courseRow-Excel");
var imageToggle = document.getElementById("imageToggle");

var deleteUserBtn = document.getElementById("deleteUser");
// var course_title_modal = document.getElementById("course_title_modal");
// var course_modal = document.getElementById("course_department_modal");
let All_subjects= [];

window.onload = () => {
  getSubjects();
};
function getSubjects() {
  fetch(`/${USER}/getSubject`)
    .then((res) => res.json())
    .then((res) => {
		All_subjects = res; 
      res.forEach((e) => {
        var option = document.createElement("option");
        option.text = e.subject;
        option.value = e.id;
		Subject_name.add(option);
      });		

	  $(document).ready(function(){
			$('.js-example-basic-multiple').select2({
			tags: true,
			placeholder: "*subjects"
			});
      res.forEach((e) => {
        var option = document.createElement("option");
        option.text = e.subject;
        option.value = e.id;

		primary_name_modal.add(option);
		var newOption = new Option(e.subject, e.id, false, false);
		$('.js-example-basic-multiple').append(newOption).trigger('change');
      });

	  }); 
		
	  
	  
    });
}


function course_() {
  course.innerHTML = null;
  courseApi(course_title.value, "course_department");
}
function course_from_modal() {
  course_modal.innerHTML = null;
  courseApi(course_title_modal.value, "course_department_modal");
}
function courseApi(course, value) {
  var xhr;
  if (window.XMLHttpRequest) {
    xhr = new XMLHttpRequest();
  } else {
    xhr = new ActiveXObject("Microsoft.XMLHTTP");
  }
  xhr.open("POST", `/${USER}/getcourse`, true);
  xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xhr.onreadystatechange = function () {
    if (xhr.readyState == 4 && xhr.status == 200) {
      const data = JSON.parse(this.responseText);
      var x = document.getElementById(value);
      data.map((e) => {
        var option = document.createElement("option");
        option.text = e.course;
        option.value = e.course;
        x.add(option);
      });
    }
  };
  xhr.send("course=" + course);
}

function replace(data){ 
let data_array = JSON.parse(data); console.log(data_array);
let display = "";
All_subjects.forEach((ele) => { console.log(ele.id); console.log(ele.subject);
for(let i=0;i<data_array.length;i++){
	display += ele.id == data_array[i]?ele.subject+",":"";

}
});
return display;
}

function getTeachers() {
  if (!Subject_name.value) {
    displaymsg("Choose a subject");
    return;
  }

  var foot = document.getElementById("teacher-tfoot");
  foot != null ? foot.remove() : null;
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
      var table = "";
      res.map((element) => {
        table += ` <tr onclick="toggleModal('TeacherModal','${
          element.cand_id
        }')">
                  <td scope="row">${res.indexOf(element) + 1}</td>
                  <td scope="row">${element.cand_id}</td>
                  <td scope="row">${element.cand_name}</td>
                  <td scope="row">${replace(element.subject)}</td>
                </tr>`;
      });
      document.getElementById("teacher-details").innerHTML = table;
      var sTable = document.querySelector(".teacher-table");
      var tfoot = document.createElement("tfoot");
      tfoot.id = "teacher-tfoot";
      tfoot.innerHTML = `<tr><th>Total : ${res.length}</th><th colspan="4"></th></tr>`;
      sTable.append(tfoot);
    });
}
function toggleModal(params, params2 = "") {
  if (!params2) {
    document.getElementById("imgfile").value =
      Teacher_ID.value =
      Teacher_name.value =
      Teacher_initial.value =
      Subject_name.value =
      Qualification.value =
      Email_ID.value =
      Mobile_number.value =
      Password.value =
      Teacher_address.value =
      image.src =
        "";
    // course_title_modal.value =
    // course_modal.value =
    Password.removeAttribute("readonly");
    deleteUserBtn.hidden = true;
  } else {
    // if (!Subject_name.value) {
    //   displaymsg("Choose class and section");
    //   return;
    // }
    fetch(`/${USER}/getSingleTeacher`, {
      method: "post",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
      body: JSON.stringify({
        cand_id: params2,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        Teacher_ID.value = res.cand_id;
        Teacher_name.value = res.cand_name;
        Teacher_initial.value = res.initial;
        Subject_name_modalss.value = res.subject;
        Qualification.value = res.qualification;
        Email_ID.value = res.email_id;
        Mobile_number.value = res.mobile;
        Password.value = res.password;
        Teacher_address.value = res.address;
        image.src = Password.setAttribute("readonly", true);
        image.src = res.photo;
        deleteUserBtn.hidden = false;
        // course_title_modal.value = res.course_title;
        // course_from_modal();
        // setTimeout(() => {
        //   course_modal.value = res.course;
        // }, 2000);
      });
  }
  $(`#${params}`).modal("toggle");
}
var createTeacher = document.getElementById("Create_Teacher");
createTeacher.onclick = (e) => {
  e.preventDefault();
var subjects = []; 

  $(document).ready(function(){
	  console.log($('#Subject_name_modalss').val());
	  var sub_array = $('#Subject_name_modalss').val();
	  const all_subject_array = [$('#primary_name_modal').val()].concat(sub_array)
	  subjects = JSON.stringify(all_subject_array);
	  //subjects = $('#Subject_name_modal').val();
	  add();

  
  
function add(){
  console.log(subjects);
  if (!Subject_name_modal.value ) {
    displaymsg("Choose a subject");
    return;
  }
  fetch(`/${USER}/CreateTeacher`, {
    method: "POST",
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
    body: JSON.stringify({
      Teacher_name: Teacher_name.value,
      Teacher_initial: Teacher_initial.value,
      Subject_name: subjects,
      Qualification: Qualification.value,
      Mobile_number: Mobile_number.value,
      Email_ID: Email_ID.value,
      Teacher_ID: Teacher_ID.value,
      Password: Password.value,
      Teacher_address: Teacher_address.value,
      img: image.src,
    }),
  })
    .then((res) => res.text())
    .then((res) => {
      toggleModal("TeacherModal");
      displaymsg(res);
	  $('#Subject_name_modal').val("");
    });
} // add funcion end	
}); // jquery end

};
function readURL(input) {
  if (input.files && input.files[0]) {
    var reader = new FileReader();
    reader.onload = function (element) {
      $("#blah").attr("src", element.target.result);
    };
    reader.readAsDataURL(input.files[0]);
    // console.log(reader.readAsDataURL(input.files[0]));
  }
}
deleteUserBtn.onclick = () => {
  $("#Delete_User").modal("toggle");
};
var confirmToDelete = document.getElementById("confirmToDelete");
confirmToDelete.onclick = () => {
  fetch(`/${USER}/DeleteTeacher`, {
    method: "DELETE",
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
    body: JSON.stringify({
      Teacher_ID: Teacher_ID.value,
    }),
  })
    .then((res) => res.text())
    .then((res) => {
      $("#Delete_User").modal("toggle");
      displaymsg(res);
      getTeachers();
    });
};
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


