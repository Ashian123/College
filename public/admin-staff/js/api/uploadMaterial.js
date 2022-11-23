var USER = localStorage.getItem("user");
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
  getSubjects();
  getAllTeacherName();
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
    if (xhr.readyState == 4 && xhr.status == 200) {
      const data = JSON.parse(this.responseText);
      data.map((e) => {
        var x = document.getElementById("course_department");
        var option = document.createElement("option");
        option.text = e.course;
        option.value = e.course;
        x.add(option);
      });
    }
  };
  xhr.send("course=" + course);
}
var Subject_name = document.getElementById("subject_name");
function getSubjects() {
  fetch(`/${USER}/getSubject`)
    .then((res) => res.json())
    .then((res) => {
      res.forEach((e) => {
        var option = document.createElement("option");
        option.text = e.subject;
        option.value = e.subject;
        Subject_name.add(option);
      });
    });
}

function getAllTeacherName() {
  var teacher = document.getElementById("uploader_name");
  fetch(`/${USER}/getAllTeacherName`)
    .then((res) => res.json())
    .then((res) => {
      res.forEach((e) => {
        var option = document.createElement("option");
        option.value = e.teacher;
        option.innerText = e.teacher;
        teacher.append(option);
      });
    });
}
function proceed() {
  var whatApp = document.getElementById("whatsApp");
  var eMail = document.getElementById("eMail");
  var course_title = document.getElementById("course_title");
  var course_department = document.getElementById("course_department");
  var uploader_name = document.getElementById("uploader_name");
  var subject_name = document.getElementById("subject_name");
  var file_name = document.getElementById("file_name");
  var sub_file = document.getElementById("sub_file");
  var file_desc = document.getElementById("file_desc");
  if (
    !course_title.value ||
    !course_department.value ||
    !uploader_name.value ||
    !file_name.value ||
    !subject_name.value ||
    !sub_file.files[0]
  ) {
    displaymsg("Fill the required fields..!");
    return;
  }

  var formData = new FormData();
  formData.append("sub_file", sub_file.files[0]);
  formData.append("course_title", course_title.value);
  formData.append("course_department", course_department.value);
  formData.append("uploader_name", uploader_name.value);
  formData.append("file_desc", file_desc.value);
  formData.append("file_name", file_name.value);
  formData.append("subject_name", subject_name.value);
  formData.append("WhatsApp", whatApp.checked);
  formData.append("Email", eMail.checked);
  var xhr;
  if (window.XMLHttpRequest) {
    xhr = new XMLHttpRequest();
  } else {
    xhr = new ActiveXObject("Microsoft.XMLHTTP");
  }
  xhr.open("POST", `/${USER}/upload_material`, true);

  xhr.onreadystatechange = function () {
    if (xhr.readyState == 4 && xhr.status == 200) {
      const data_ = this.responseText;
      displaymsg(data_);
      course_title.value =
        course_department.value =
        uploader_name.value =
        file_name.value =
        subject_name.value =
        file_desc.value =
        sub_file.value =
          "";
    }
  };
  xhr.send(formData);
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
