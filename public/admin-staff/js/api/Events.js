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

var save = document.getElementById("save_general_events");
save.addEventListener("click", () => {
  var form = document.getElementById("get_general_event");
  var data = new FormData(form);

  var events = {};
  var event_name = {};
  var event_date = {};
  var f_event_date = {};
  var event_details = {};
  var event_no = 0;
  for (var pair of data.entries()) {
    if (pair[0].match("E_name")) {
      event_no++;
      event_name = { ...event_name, ...{ [pair[0]]: pair[1] } };
    }
    if (pair[0].match("E_date")) {
      event_date = { ...event_date, ...{ [pair[0]]: pair[1] } };
      f_event_date = {
        ...f_event_date,
        ...{ [pair[0]]: reformatDate(pair[1]) },
      };
    }
    if (pair[0].match("E_details")) {
      event_details = { ...event_details, ...{ [pair[0]]: pair[1] } };
    }
  }
  events = {
    ...events,
    ...{ event_no },
    ...{ event_name, event_date, f_event_date, event_details },
  };
  fetch(`/${USER}/save_general_events`, {
    method: "POST",
    body: JSON.stringify(events),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  })
    .then((response) => response.text())
    .then((response) => displaymsg(response, "displaymsg"));
});

$(".calendar").evoCalendar({
  theme: "Midnight blue",
  calendarEvents: [],
});

var prvent = document.querySelectorAll(".icon-button");
prvent.forEach(
  (btn) =>
    (btn.onclick = (e) => {
      e.preventDefault();
    })
);

var add_event = document.getElementById("add_event");
add_event.onclick = (e) => {
  e.preventDefault();

  let day = active_day();
  let month = active_month();
  let year = active_year();
  let course_title = document.getElementById("course_title").value;
  let course = document.getElementById("course_department").value;
  let id = `${month}/${day}/${year}`;
  let name = document.getElementById("event_name").value;
  let date = `${month}/${day}/${year}`;
  let description = document.getElementById("event_desc").value;
  document.getElementById("course_title").value = "MDMS";
  if (!course_title || !course || !name) {
    displaymsg("Fill required fields", "displaymsg_cal");
    return;
  }
  let event = { id, name, date, type: "holiday", description };

  fetch(`/${USER}/add_calendar_event`, {
    method: "post",
    body: JSON.stringify({ course_title, course, month, year, id, event }),
    headers: { "Content-type": "application/json; charset=UTF-8" },
  })
    .then((res) => res.text())
    .then((res) => {
      // alert(res);
      $(".calendar").evoCalendar("addCalendarEvent", event);
      displaymsg(res, "displaymsg_cal");
    });
};

var remove_event = document.getElementById("remove_event");
remove_event.onclick = (e) => {
  e.preventDefault();
  let day = active_day();
  let month = active_month();
  let year = active_year();
  let course_title = document.getElementById("course_title").value;
  let course = document.getElementById("course_department").value;
  let id = `${month}/${day}/${year}`;
  if (!course_title || !course) {
    displaymsg("Fill required fields", "displaymsg_cal");
    return;
  }

  fetch(`/${USER}/remove_calendar_event`, {
    method: "post",
    body: JSON.stringify({ course_title, course, id }),
    headers: { "Content-type": "application/json; charset=UTF-8" },
  })
    .then((res) => res.text())
    .then((res) => {
      $(".calendar").evoCalendar("removeCalendarEvent", id);
      displaymsg(res, "displaymsg_cal");
    });
};

active_day = () => {
  var day = document.querySelector(".calendar-active").innerText;
  return day;
};
active_year = () => {
  var year = document.querySelector(".calendar-year p").innerText;
  return year;
};
active_month = () => {
  var month = document.querySelector(".active-month").innerText;
  return month;
};

function displaymsg(response, id) {
  i = 0;
  var data = "";
  var time = setInterval(() => {
    document.getElementById(`${id}`).innerText = data += response[i++];

    data.length == response.length ? clearInterval(time) : "";
  }, 20);
  setTimeout(function () {
    document.getElementById(`${id}`).innerHTML = null;
  }, 4000);
}
function reformatDate(dateStr) {
  if (!dateStr) return "";
  dArr = dateStr.split("-");
  return dateStr && dArr[2] + "-" + dArr[1] + "-" + dArr[0];
}
