var Subject_name = document.getElementById("select_dropmenu");
var Subject_tbody = document.getElementById("subjects_tbody");
onload = () => getSubjects();
function getSubjects() {
  Subject_name.innerHTML = null;
  fetch(`/admin/getSubject`)
    .then((res) => res.json())
    .then((res) => {
      var option = document.createElement("option");
      option.text = "*Select Subject";
      Subject_name.add(option);
      //
      var tr = "";
      res.forEach((e) => {
        var option = document.createElement("option");
        option.text = e.subject;
        option.value = e.subject;
        Subject_name.add(option);

        tr += `<tr><td>${res.indexOf(e) + 1}</td><td>${e.subject}</td></tr>`;
      });
      Subject_tbody.innerHTML = tr;
    });
}
// add//
function add_menu() {
  //   var menu = document.getElementById("select_dropmenu");
  //   if (!menu.value) return "";
  var text = "";

  var structure = ` <p> Add New Row to the ${text} drop down menu</p>
    <div class="input-group col-xs-12">
    <input type="text" id="_new_value" class="form-control"placeholder=""/>
    <span class="input-group-append">
    <button class="btn btn-primary btn-icon-text" type="button" onclick="_new_menu('add')">
        <i class="typcn typcn-plus btn-icon-prepend"></i>
        Add
    </button>
    </span>
</div>`;

  document.getElementById("wait").innerHTML = structure;
}
// update//
function update_menu() {
  if (!Subject_name.value) return "";
  var text = Subject_name.value;

  var structure = ` <p>Update (${text}) current row in Subject Table</p>
    <div class="input-group col-xs-12">
    <input type="text" id="_new_value" value="${text}" placeholder='${text}' class="form-control"/>
    <span class="input-group-append">
    <button class="btn btn-success btn-icon-text" type="button" onclick="_new_menu('update')">
        <i class="typcn typcn-document btn-icon-prepend"></i>
        Update
    </button>
    </span>
</div>`;

  document.getElementById("wait").innerHTML = structure;
}
// delete//
function delete_menu() {
  if (!Subject_name.value) return "";
  var text = Subject_name.value;

  var structure = ` <p>Delete the (${text}) current row from Subject Table</p>
    <div class="input-group col-xs-12">
    <input type="text" id="_new_value" value='${text}' readonly class="form-control"/>
    <span class="input-group-append">
    <button class="btn btn-danger btn-icon-text" type="button" onclick="_new_menu('delete')">
        <i class="typcn typcn-delete btn-icon-prepend"></i>
        Delete
    </button>
    </span>
</div>`;

  document.getElementById("wait").innerHTML = structure;
}
//-----add,update,delete-----//
function _new_menu(params) {
  var subject = Subject_name.value;
  var new_subject = document.getElementById("_new_value").value;
  //   if (params != "delete") {
  //     if (!value || !menu) return "";
  //   }
  fetch("/admin/new_subject", {
    method: "POST",
    body: JSON.stringify({ params, subject, new_subject }),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  })
    .then(
      (document.getElementById("wait").innerHTML = null),
      (Subject_name.value = "")
    )
    .then((response) => response.text())
    .then((response) => {
      i = 0;
      var data = "";
      var time = setInterval(() => {
        document.getElementById(
          "wait"
        ).innerHTML = `<div class="form-group row ">
<div class="col-md-12 mb-5" style="text-align: center;">
<p> ${(data += response[i++])}</p>
</div>`;

        data.length == response.length ? clearInterval(time) : "";
      }, 20);
      setTimeout(function () {
        document.getElementById("wait").innerHTML = null;
      }, 4000);
      getSubjects();
    });
}
