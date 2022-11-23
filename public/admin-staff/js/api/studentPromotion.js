var USER = localStorage.getItem("user");
var course_title = document.getElementById("course_title");
var course = document.getElementById("course_department");
var course_title_next = document.getElementById("course_title_modal");
var course_next = document.getElementById("course_department_modal");
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
        var main_course = course_title;
        var option = document.createElement("option");
        option.text = e.course_title;
        option.value = e.course_title;
        main_course.add(option);
      });
      sorted.map((e) => {
        var modal_course = course_title_next;
        var option = document.createElement("option");
        option.text = e.course_title;
        option.value = e.course_title;

        modal_course.add(option);
      });
    }
  };
  xhr.send();
};
function prev_course() {
  course.innerHTML = null;
  courseApi(course_title.value, "course_department");
}
function next_course() {
  course_next.innerHTML = null;
  courseApi(course_title_next.value, "course_department_modal");
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

function getStudents() {
  if (
    !course_title.value ||
    !course.value ||
    !course_title_next.value ||
    !course_next.value
  ) {
    displaymsg("Choose class and section");
    return;
  }

  var foot = document.getElementById("Student-tfoot");
  foot != null ? foot.remove() : null;
  fetch(`/${USER}/StudentDetails`, {
    method: "post",
    body: JSON.stringify({
      course_title: course_title.value,
      course: course.value,
    }),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  })
    .then((res) => res.json())
    .then((res) => {
      var table = "";
      res.map((element) => {
        table += ` <tr>
         <td scope ="row"><div class="form-check form-check-primary">
      <label class="form-check-label"><input type="checkbox" class="form-check-input"checked="" name="check" value="${
        element.cand_id
      }"/><i class="input-helper"></i></label></div></td>
                  <td scope="row">${res.indexOf(element) + 1}</td>
                  <td scope="row">${element.cand_name}</td>
                  <td scope="row">${course_title.value} - ${course.value}</td>
                  <td scope="row"><i class="mdi mdi-arrow-right"></i></td>
                  <td scope="row">${course_title_next.value} - ${
          course_next.value
        }</td></tr>`;
      });
      document.getElementById("student-details").innerHTML = table;
      var sTable = document.querySelector(".student-table");
      var tfoot = document.createElement("tfoot");
      tfoot.id = "Student-tfoot";
      tfoot.innerHTML = `<tr><th></th><th>Total : ${res.length}</th><th colspan="3"></th><th>
      <a style="cursor:pointer;" onclick="toggleModal(${res.length})"> <i class="mdi mdi-content-save-all mr-2"></i>Proceed</a></th></tr>`;
      sTable.append(tfoot);
    });
}
function toggleModal(res) {
  if (!res) {
    displaymsg("Can't proceed. No students available");
    return;
  }
  $("#promoteAllStudentsModal").modal("toggle");
}
var promote = document.getElementById("promoteAllStudents");
promote.onclick = () => {
  var Student_ID = [
    ...document.querySelectorAll("input[name='check']:checked"),
  ].map((e) => e.value);
  if (!Student_ID.length) {
    $("#promoteAllStudentsModal").modal("toggle");
    displaymsg("Can't proceed without students..!");
    return;
  }
  var payload = {
    prev_class: course_title.value,
    prev_section: course.value,
    next_class: course_title_next.value,
    next_section: course_next.value,
    Student_ID,
  };

  fetch(`/${USER}/Promotion`, {
    method: "POST",

    body: JSON.stringify(payload),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  })
    .then((res) => res.text())
    .then((res) => {
      $("#promoteAllStudentsModal").modal("toggle");
      getStudents();
      displaymsg(res);
    });
};
$("#checkAll").click(function () {
  $("input[name='check']").prop("checked", $(this).prop("checked"));
});
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
