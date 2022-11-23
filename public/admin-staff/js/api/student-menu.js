function displaymsg(response) {
  i = 0;
  var data = "";
  var time = setInterval(() => {
    document.getElementById("wait").innerHTML = `<div class="form-group row ">
<div class="col-md-12 mb-5" style="text-align: center;">
<p> ${(data += response[i++])}</p>
</div>`;

    data.length == response.length ? clearInterval(time) : "";
  }, 20);
  setTimeout(function () {
    document.getElementById("wait").innerHTML = null;
  }, 4000);
}

setstudent_menu = () => {
  var menu = document.getElementById("select_student_menu").value;
  fetch("/admin/get_status", {
    method: "POST",
    body: JSON.stringify({ menu }),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  })
    .then((response) => response.text())
    .then(
      (response) => (document.getElementById("menu_status").value = response)
    );
};
update_status = () => {
  var menu_ = document.getElementById("select_student_menu");
  var text = menu_.options[menu_.selectedIndex].text;
  var menu = menu_.value;
  var status = document.getElementById("menu_status").value;
  if (!menu || !status) {
    displaymsg("Please Select a value..!");
    return;
  }
  fetch("/admin/set_status", {
    method: "POST",
    body: JSON.stringify({ menu, status }),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  })
    .then((response) => response.text())
    .then((response) => displaymsg(text + " " + response));
};
