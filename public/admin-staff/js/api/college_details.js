function submitted(id) {
  let data = new FormData();
  var doc = document.getElementById(id);

  data.append("name", doc.files[0]);
  data.append("college_name", document.getElementById("college_name").value);
  data.append("college_place", document.getElementById("college_place").value);
  data.append(
    "college_district",
    document.getElementById("college_district").value
  );
  data.append("college_state", document.getElementById("college_state").value);
  data.append("college_pin", document.getElementById("college_pin").value);
  data.append("college_phone", document.getElementById("college_phone").value);
  data.append("college_mail", document.getElementById("college_mail").value);

  var xhr;
  if (window.XMLHttpRequest) {
    xhr = new XMLHttpRequest();
  } else {
    xhr = new ActiveXObject("Microsoft.XMLHTTP");
  }
  xhr.open("POST", "/admin/college_details_generate", true);

  xhr.onreadystatechange = function () {
    if (xhr.readyState == 4 && xhr.status == 200) {
      const data = this.responseText;
      var table = "";
      displaymsg(data);
      document.getElementById(id).value = "";
    }
  };

  xhr.send(data);
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
