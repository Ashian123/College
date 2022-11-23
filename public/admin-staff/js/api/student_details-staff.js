var tabs = document.querySelectorAll("[data-tab-target]");
var tabContents = document.querySelectorAll("[data-tab-content]");
tabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    const target = document.querySelector(tab.dataset.tabTarget);
    tabContents.forEach((tabContent) => {
      tabContent.classList.remove("active");
    });
    tabs.forEach((tab) => {
      tab.classList.remove("active");
    });
    tab.classList.add("active");
    target.classList.add("active");
  });
});
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
        var main_course = document.getElementById("course_title");
        var option = document.createElement("option");
        option.text = e.course_title;
        option.value = e.course_title;
        main_course.add(option);
      });
      sorted.map((e) => {
        var modal_course = document.getElementById("course_title_modal");
        var option = document.createElement("option");
        option.text = e.course_title;
        option.value = e.course_title;

        modal_course.add(option);
      });
    }
  };
  xhr.send();
};

var course_title = document.getElementById("course_title");
var course = document.getElementById("course_department");
var Student_name = document.getElementById("Student_name");
var Student_initial = document.getElementById("Studen_initial");
var Father_name = document.getElementById("Father_name");
var Mother_name = document.getElementById("Mother_name");
var Date_of_Birth = document.getElementById("Date_of_Birth");
var Gender = document.getElementById("Gender");
var Mobile_number = document.getElementById("Mobile_number");
var Email_ID = document.getElementById("Email_ID");
var Student_ID = document.getElementById("Student_ID");
var Password = document.getElementById("Password");
var image = document.getElementById("blah");
var courseInsideModal = document.getElementById("courseRow-Excel");
var imageToggle = document.getElementById("imageToggle");
var EXCEL_FILE = "";
var index_value = "";

var course_title_modal = document.getElementById("course_title_modal");
var course_modal = document.getElementById("course_department_modal");

var deleteUserBtn = document.getElementById("deleteUser");

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

function getStudents() {
  if (!course_title.value || !course.value) {
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
        table += ` <tr onclick="toggleModal('StudentModal','${
          element.cand_id
        }')">
                  <td scope="row">${res.indexOf(element) + 1}</td>
                  <td scope="row">${element.cand_name}</td>
                  <td scope="row">${course_title.value}</td>
                  <td scope="row">${course.value}</td>
                </tr>`;
      });
      document.getElementById("student-details").innerHTML = table;
      var sTable = document.querySelector(".student-table");
      var tfoot = document.createElement("tfoot");
      tfoot.id = "Student-tfoot";
      tfoot.innerHTML = `<tr><th>Total : ${res.length}</th><th colspan="3"></th></tr>`;
      sTable.append(tfoot);
    });
}

function toggleModal(params, params2 = "") {
  EXCEL_FILE = "";
  index_value = "";
  let markbtn = document.getElementById("marksbtn");
  createStudent.innerText = "Save";
  // courseInsideModal.hidden = true;
  imageToggle.hidden = false;

  if (!params2) {
    markbtn.hidden = true;
    deleteUserBtn.hidden = true;
    document.getElementById("imgfile").value =
      document.getElementById("upload_file").value =
      Student_ID.value =
      Student_name.value =
      Student_initial.value =
      Father_name.value =
      Mother_name.value =
      Date_of_Birth.value =
      Gender.value =
      Email_ID.value =
      Mobile_number.value =
      Password.value =
      image.src =
        "";
    Password.removeAttribute("readonly");
  } else {
    if (!course_title.value || !course.value) {
      displaymsg("Choose class and section");
      return;
    }
    fetch(`/${USER}/getSingleStudent`, {
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
        Student_ID.value = res.cand_id;
        Student_name.value = res.cand_name;
        Student_initial.value = res.initial;
        Father_name.value = res.father_name;
        Mother_name.value = res.mother_name;
        Date_of_Birth.value = res.dob;
        Gender.value = res.gender;
        Email_ID.value = res.email_id;
        Mobile_number.value = res.mobile_no;
        Password.value = res.password;
        Password.setAttribute("readonly", true);
        image.src = res.Filename;
        course_title_modal.value = res.course_title;
        course_from_modal();
        setTimeout(() => {
          course_modal.value = res.course;
        }, 2000);
      });
    markbtn.hidden = false;
    deleteUserBtn.hidden = USER == "admin" ? false : true;
  }
  $(`#${params}`).modal("toggle");
}

var createStudent = document.getElementById("Create_Student");
createStudent.onclick = (e) => {
  e.preventDefault();
  if (EXCEL_FILE.length) {
    saveSingleStudentThroughExcel();
    return;
  }

  if (!course_title_modal.value || !course_modal.value) {
    displaymsg("Choose class and section");
    return;
  }
  fetch(`/${USER}/CreateStudent`, {
    method: "POST",
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
    body: JSON.stringify({
      course_title: course_title_modal.value,
      course: course_modal.value,
      Student_name: Student_name.value,
      Student_initial: Student_initial.value,
      Father_name: Father_name.value,
      Mother_name: Mother_name.value,
      Date_of_Birth: Date_of_Birth.value,
      Gender: Gender.value,
      Mobile_number: Mobile_number.value,
      Email_ID: Email_ID.value,
      Student_ID: Student_ID.value,
      Password: Password.value,
      img: image.src,
    }),
  })
    .then((res) => res.text())
    .then((res) => {
      toggleModal("StudentModal");
      displaymsg(res);
    });
};

var sub_one = document.getElementById("sub-one");
var sub_two = document.getElementById("sub-two");
var sub_three = document.getElementById("sub-three");
var sub_four = document.getElementById("sub-four");
var sub_five = document.getElementById("sub-five");
var sub_six = document.getElementById("sub-six");
var mark_one = document.getElementById("mark-one");
var mark_two = document.getElementById("mark-two");
var mark_three = document.getElementById("mark-three");
var mark_four = document.getElementById("mark-four");
var mark_five = document.getElementById("mark-five");
var mark_six = document.getElementById("mark-six");
var saveMarks = document.getElementById("saveMarks");
saveMarks.onclick = () => {
  let Student_ID = document.getElementById("Student_ID").value;
  var data = {
    cand_id: Student_ID,
    marks: {
      [sub_one.value]: mark_one.value,
      [sub_two.value]: mark_two.value,
      [sub_three.value]: mark_three.value,
      [sub_four.value]: mark_four.value,
      [sub_five.value]: mark_five.value,
      [sub_six.value]: mark_six.value,
    },
  };

  fetch(`/${USER}/saveMarks`, {
    method: "post",
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
    body: JSON.stringify(data),
  })
    .then((res) => res.text())
    .then((res) => {
      $(`#myModal`).modal("toggle");
      displaymsg(res);
    });
};

getStudentMarks = () => {
  var cand_id = document.getElementById("Student_ID").value;

  fetch(`/${USER}/getStudentMarks`, {
    method: "POST",
    headers: { "Content-type": "application/json; charset=UTF-8" },
    body: JSON.stringify({ cand_id }),
  })
    .then((res) => res.json())
    .then((res) => {
      let marks = JSON.parse(res[0].marks);
      if (!marks) {
        sub_one.value =
          sub_two.value =
          sub_three.value =
          sub_four.value =
          sub_five.value =
          sub_six.value =
          mark_one.value =
          mark_two.value =
          mark_three.value =
          mark_four.value =
          mark_five.value =
          mark_six.value =
            "";
      } else {
        let subject = Object.keys(marks);
        let mark = Object.values(marks);
        sub_one.value = subject[0];
        sub_two.value = subject[1];
        sub_three.value = subject[2];
        sub_four.value = subject[3];
        sub_five.value = subject[4];
        sub_six.value = subject[5];
        mark_one.value = mark[0];
        mark_two.value = mark[1];
        mark_three.value = mark[2];
        mark_four.value = mark[3];
        mark_five.value = mark[4];
        mark_six.value = mark[5];
      }
    });
  $(`#myModal`).modal("toggle");
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

var ExcelToJSON = function () {
  var foot = document.getElementById("Student-tfoot");
  foot != null ? foot.remove() : null;
  this.parseExcel = function (file) {
    var reader = new FileReader();

    reader.onload = async function (e) {
      var data = e.target.result;
      var workbook = XLSX.read(data, {
        type: "binary",
      });
      workbook.SheetNames.forEach(function (sheetName) {
        // Here is your object
        var XL_row_object = XLSX.utils.sheet_to_row_object_array(
          workbook.Sheets[sheetName]
        );
        var json_object = JSON.stringify(XL_row_object);

        EXCEL_FILE = JSON.parse(json_object);
      });
      createListFromExcel();
    };

    reader.onerror = function (ex) {
      console.log(ex);
    };

    reader.readAsBinaryString(file);
  };
};

function handleFileSelect(evt) {
  var files = evt.target.files; // FileList object
  var xl2json = new ExcelToJSON();
  xl2json.parseExcel(files[0]);
}
document
  .getElementById("upload_file")
  .addEventListener("change", handleFileSelect, false);

function createListFromExcel() {
  var table = "";

  for (element of EXCEL_FILE) {
    table += ` <tr onclick="toggleModal_Excel('${EXCEL_FILE.indexOf(
      element
    )}')">
            <td scope="row">${EXCEL_FILE.indexOf(element) + 1}</td>
            <td scope="row">${element["Student Name"]}</td> 
            <td scope="row">${element["Class"]}</td>
            <td scope="row">${element["Section"]}</td>
            </tr>`;
  }
  document.getElementById("student-details").innerHTML = table;
  var sTable = document.querySelector(".student-table");
  var tfoot = document.createElement("tfoot");
  tfoot.id = "Student-tfoot";
  tfoot.innerHTML = `<tr><th>Total : ${EXCEL_FILE.length}</th><th colspan="2"></th><th>
      <a style="cursor:pointer;" onclick="save_All()"> <i class="mdi mdi-content-save-all mr-2"></i>Save All</a></th></tr>`;
  sTable.append(tfoot);
}

function toggleModal_Excel(index) {
  createStudent.innerText = "Edit";
  // courseInsideModal.hidden = false;
  imageToggle.hidden = true;
  index_value = index;
  var ExcelValue = EXCEL_FILE[index_value];
  let markbtn = document.getElementById("marksbtn");

  Student_name.value = ExcelValue["Student Name"];
  Student_initial.value = ExcelValue["Initial"];
  Father_name.value = ExcelValue["Father Name"];
  Mother_name.value = ExcelValue["Mother Name"];
  Date_of_Birth.value = reformatDate(ExcelValue["Date Of Birth"]);
  Gender.value = ExcelValue["Gender"];
  Mobile_number.value = ExcelValue["Mobile Number"];
  Email_ID.value = ExcelValue["Email ID"];
  Password.value = ExcelValue["Password"];
  Password.removeAttribute("readonly");
  course_title_modal.value = ExcelValue["Class"];
  course_from_modal();
  setTimeout(() => {
    course_modal.value = ExcelValue["Section"];
  }, 2000);

  markbtn.hidden = true;
     deleteUserBtn.hidden = true;
  $(`#StudentModal`).modal("toggle");
}
function saveSingleStudentThroughExcel() {
  var ExcelValue = EXCEL_FILE[index_value];

  ExcelValue["Student Name"] = Student_name.value;
  ExcelValue["Initial"] = Student_initial.value;
  ExcelValue["Father Name"] = Father_name.value;
  ExcelValue["Mother Name"] = Mother_name.value;
  ExcelValue["Date Of Birth"] = reformatDate_to(Date_of_Birth.value);
  ExcelValue["Gender"] = Gender.value;
  ExcelValue["Mobile Number"] = Mobile_number.value;
  ExcelValue["Email ID"] = Email_ID.value;
  ExcelValue["Password"] = Password.value;
  ExcelValue["Class"] = course_title_modal.value;
  ExcelValue["Section"] = course_modal.value;
  createListFromExcel();
  $(`#StudentModal`).modal("toggle");
}

save_All = () => {
  $(`#saveAllStudentsModal`).modal("toggle");
};

var saveAllStudents = document.getElementById("saveAllStudents");
saveAllStudents.onclick = () => {
  fetch(`/${USER}/saveThroughExcel`, {
    method: "Post",
    headers: { "Content-type": "application/json; charset=UTF-8" },
    body: JSON.stringify(EXCEL_FILE),
  })
    .then((res) => res.text())
    .then((res) => {
      save_All();
      document.getElementById("student-details").innerHTML = null;
      document.getElementById("upload_file").value = "";
      EXCEL_FILE = "";
      index_value = "";
      var foot = document.getElementById("Student-tfoot");
      foot.remove();
      displaymsg(res);
    });
};

function reformatDate(dateStr) {
  if (!dateStr) return "";
  dArr = dateStr.split(".");
  return dateStr && dArr[2] + "-" + dArr[1] + "-" + dArr[0];
}
function reformatDate_to(date) {
  if (!date) return "";
  dArr = date.split("-");
  return date && dArr[2] + "." + dArr[1] + "." + dArr[0];
}
deleteUserBtn.onclick = () => {
  $("#Delete_User").modal("toggle");
};
var confirmToDelete = document.getElementById("confirmToDelete");
confirmToDelete.onclick = () => {
  fetch(`/${USER}/DeleteStudent`, {
    method: "DELETE",
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
    body: JSON.stringify({
      Student_ID: Student_ID.value,
    }),
  })
    .then((res) => res.text())
    .then((res) => {
      $("#Delete_User").modal("toggle");
      displaymsg(res);
      getStudents();
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
