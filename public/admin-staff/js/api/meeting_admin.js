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
      get_allMeeting();
      getAllTeacherName();
    }
  };
  xhr.send();
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

var button = document.querySelector("#start_meeting");
button.addEventListener("click", () => {
  var username = document.getElementById("teacher").value;
  var time = document.getElementById("time").value;
  var course_title = document.getElementById("course_title").value;
  var course = document.getElementById("course_department").value;
  if (!username || !time || !course || !course_title) {
    displaymsg("Enter required fields");
    return;
  }
  const data = {
    username,
    time,
    course_title,
    course,
  };
  displaymsg("please wait meeting is creating");
  var _class = course_title + "-" + course;
  // console.log(username);
  axios
    .post(`/${USER}/meeting`, data)
    .then((response) => {
      let URL = response.data.join_url;
      let meeting_number = response.data.meeting_number;
      scheduleMeeting(username, time, _class, URL, meeting_number);
      // window.location.replace(URL);
    })
    .catch((err) => console.error(err));
});

function scheduleMeeting(param1, param2, param3, URL, meeting_number) {
  var lists = document.querySelector("#scheduled_meeting");
  var list = document.createElement("div");
  list.classList = "col-12 grid-margin";
  list.id = `${meeting_number}`;
  list.innerHTML = `<div class="card">
                  <div class="card-body">
                    <h4 class="card-title">Scheduled Meeting</h4>
                    <p class="card-description">${param3}</p>
                    <form class="form-sample">
                      <div class="row">
                        <div class="col-md-6">
                          <div class="form-group row">
                            <label class="col-sm-3 col-form-label">Host Name</label>
                            <div class="col-sm-9">
                              <input
                                type="text"
                                class="form-control"
                                value="${param1}"
                                readonly
                              />
                            </div>
                          </div>
                        </div>
                        <div class="col-md-6">
                          <div class="form-group row">
                            <label class="col-sm-3 col-form-label">Date</label>
                            <div class="col-sm-9">
                              <input
                              readonly
                                type="datetime-local"
                                class="form-control"
                               value="${param2}"
                              />
                            </div>
                          </div>
                        </div>
                      </div>

                      <div class="row">
                        <div class="col-md-6">
                          <p id="displaymsg"></p>
                        </div>
                        <div class="col-md-6">
                          <div class="form-group" style="float:right;">
                            <button
                              type="button"
                              class="btn btn-danger btn-icon-text"
                              onclick="deleteMeeting('${meeting_number}')"
                            >
                              <i
                                class="mdi mdi-delete-forever btn-icon-prepend"
                              ></i>
                              Delete Meeting
                            </button>
                            <a href=${URL}>
                            <button
                              type="button"
                              class="btn btn-success btn-icon-text"
                            >
                              <i
                                class="mdi mdi-camcorder-box btn-icon-prepend"
                              ></i>
                              Join Meeting
                            </button>
                            </a>
                          </div>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>`;
  lists.append(list);
}
function deleteMeeting(params) {
  fetch(`/${USER}/deleteMeeting`, {
    method: "DELETE",
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
    body: JSON.stringify({
      meeting_number: params,
    }),
  })
    .then((res) => res.text())
    .then((res) => {
      document.getElementById(params).remove();
      displaymsg(res);
    });
}
function get_allMeeting() {
  axios.get(`/${USER}/get_all_meeting`).then((res) => {
    let data = res.data;
    data.forEach((element) => {
      var { url, username, time } = JSON.parse(element.meeting_link);
      let URL =
        url.replace("https://us05web.zoom.us/j/", `/${USER}/meeting/?&mn=`) +
        `&role=1&name=${username}`;
      var _class = element.student_id + "-" + element.cand_id;
      scheduleMeeting(username, time, _class, URL, element.meeting_number);
    });
  });
}
function getAllTeacherName() {
  var teacher = document.getElementById("teacher");
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
