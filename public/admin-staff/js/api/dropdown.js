const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      entry.target.classList.toggle("show", entry.isIntersecting);
      if (entry.isIntersecting) observer.unobserve(entry.target);
    });
  },
  { threshold: 0.6 }
);
const lastcardObserver = new IntersectionObserver(
  (entries) => {
    const lastCard = entries[0];
    if (lastCard.target.textContent == "") {
      lastCard.target.remove();
    }
    if (!lastCard.isIntersecting) return;
    // loadNewCard();

    lastcardObserver.unobserve(lastCard.target);
    // lastcardObserver.observe(document.querySelector(".card:last-child"));
  },
  { rootMargin: "50px" }
);

function pick_menu() {
  //    alert(document.getElementById('course_title').value)
  document.getElementById(
    "load_menu"
  ).innerHTML = `<option  value=''>Value</option>`;
  var menu = document.getElementById("select_dropmenu").value;
  var xhr;
  if (window.XMLHttpRequest) {
    xhr = new XMLHttpRequest();
  } else {
    xhr = new ActiveXObject("Microsoft.XMLHTTP");
  }
  xhr.open("POST", "/admin/pick_menu", true);
  xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xhr.onreadystatechange = function () {
    if (xhr.readyState == 4 && xhr.status == 200) {
      const data = JSON.parse(this.responseText);
      data.map((e) => {
        var x = document.getElementById("load_menu");
        var option = document.createElement("option");
        option.text = e.menu;
        option.value = e.menu;
        x.add(option);
      });
    }
  };
  xhr.send("menu=" + menu);
}

// add//
function add_menu() {
  var menu = document.getElementById("select_dropmenu");
  if (!menu.value) return "";
  var text = menu.options[menu.selectedIndex].innerText;

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
  var menu = document.getElementById("select_dropmenu");
  var value = document.getElementById("load_menu").value;
  if (!menu.value || !value) return "";
  var text = menu.options[menu.selectedIndex].innerText;

  var structure = ` <p>Update (${value}) current row in ${text} drop down menu</p>
    <div class="input-group col-xs-12">
    <input type="text" id="_new_value" value="${value}" placeholder='${value}' class="form-control"/>
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
  var menu = document.getElementById("select_dropmenu");
  var value = document.getElementById("load_menu").value;
  if (!menu.value) return "";
  var text = menu.options[menu.selectedIndex].innerText;

  var structure = ` <p>Delete the (${value}) current Row in ${text} drop down menu</p>
    <div class="input-group col-xs-12">
    <input type="text" id="_new_value" value='${value}' readonly class="form-control"/>
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
  var value = document.getElementById("_new_value").value;
  var menu = document.getElementById("select_dropmenu").value;
  var sub_menu = document.getElementById("load_menu").value;
  if (params != "delete") {
    if (!value || !menu) return "";
  }
  fetch("/admin/new_menu", {
    method: "POST",
    body: JSON.stringify({ params, value, menu, sub_menu }),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  })
    .then(
      (document.getElementById("wait").innerHTML = null),
      (document.getElementById("select_dropmenu").value = ""),
      (document.getElementById(
        "load_menu"
      ).innerHTML = `<option  value=''>Value</option>`)
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
    });
}
