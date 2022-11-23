onload = () => {
  getAllClassSection();
  getAllTeacherName();
};
var course_title = document.getElementById("class_name");
var course = document.getElementById("section_name");
var teacher = document.getElementById("teacher");
var all_teacher = document.getElementById("all_teacher");
function getAllTeacherName() {
  var teacher = document.getElementById("teacher");
  fetch("/admin/getAllTeacherName")
    .then((res) => res.json())
    .then((res) => {
      res.forEach((e) => {
        var option = document.createElement("option");
        option.value = e.id;
        option.innerText = e.teacher;
        teacher.append(option);
      });
      res.forEach((e) => {
        var option = document.createElement("option");
        option.value = e.id;
        option.innerText = e.teacher;
        all_teacher.append(option);
      });
    });
}
function add_class() {
  if (!course_title.value || !course.value) {
    displaymsg("Enter class and section");
    return;
  }
  var allTeacher = $("select#all_teacher").val();

  var xhr;
  if (window.XMLHttpRequest) {
    xhr = new XMLHttpRequest();
  } else {
    xhr = new ActiveXObject("Microsoft.XMLHTTP");
  }
  xhr.open("put", "/admin/getcourse", true);
  xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xhr.onreadystatechange = function () {
    if (xhr.readyState == 4 && xhr.status == 200) {
      const data = this.responseText;

      displaymsg(data);
      getAllClassSection();
      course_title.value = "";
      course.value = "";
      teacher.value = "";
      $("select#all_teacher").val([]);
      $(".js-example-basic-multiple").select2();
    }
  };
  var data = {
    course_title: course_title.value,
    course: course.value,
    teacher: teacher.value,
    allTeacher,
  };
  xhr.send("data=" + JSON.stringify(data));
}
function delete_class() {
  if (!course_title.value || !course.value) {
    displaymsg("Enter class and section");
    return;
  }

  var xhr;
  if (window.XMLHttpRequest) {
    xhr = new XMLHttpRequest();
  } else {
    xhr = new ActiveXObject("Microsoft.XMLHTTP");
  }
  xhr.open("delete", "/admin/getcourse", true);
  xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xhr.onreadystatechange = function () {
    if (xhr.readyState == 4 && xhr.status == 200) {
      const data = this.responseText;

      displaymsg(data);
      getAllClassSection();
      course_title.value = "";
      course.value = "";
      teacher.value = "";
      $("select#all_teacher").val([]);
      $(".js-example-basic-multiple").select2();
    }
  };
  var data = {
    course_title: course_title.value,
    course: course.value,
    teacher: teacher.value,
  };
  xhr.send("data=" + JSON.stringify(data));
}

function getAllClassSection() {
  fetch("/admin/getAllClassSection")
    .then((res) => res.json())
    .then((res) => {
      var sorted = res.sort(
        (a, b) => Number(a.course_title) - Number(b.course_title)
      );

      var tr = "";
      var i = 1;
      sorted.forEach((e) => {
        let aT = JSON.parse(e.all_teacher);
        tr += ` <tr onclick='revert(${JSON.stringify(e)})'><td>${i}</td><td>${
          e.course_title
        }</td><td>${e.course}</td>
        <td>${e.teacher}</td><td>${aT.join()}</td></tr>`;
        i++;
      });
      document.getElementById("class-section").innerHTML = tr;
    });
}
function revert(params) {
  let { course_title, course, teacher, all_teacher } = JSON.parse(
    JSON.stringify(params)
  );
  let aT = JSON.parse(all_teacher);

  $("#class_name").val(course_title);
  $("#section_name").val(course);
  $("#teacher").val(teacher);
  $("select#all_teacher").val(aT);
  $(".js-example-basic-multiple").select2();
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
