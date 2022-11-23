onload = () => {
  getProfileDetails();
};

var staff_id = document.getElementById("staff_id");
var staff_name = document.getElementById("staff_name");
var staff_subject = document.getElementById("staff_subject");
var staff_qual = document.getElementById("staff_qual");
var staff_ph_no = document.getElementById("staff_ph_no");
var staff_mail = document.getElementById("staff_mail");
var staff_address = document.getElementById("staff_address");

async function getProfileDetails() {
  try {
    var profileDetails = await fetch("/staff/staffProfileDetails");
    var {
      cand_id,
      initial,
      cand_name,
      subject,
      qualification,
      mobile,
      email_id,
      address,
    } = await profileDetails.json();
    staff_id.value = cand_id;
    staff_name.value = `${initial}.${cand_name}`;
    staff_subject.value = subject;
    staff_qual.value = qualification;
    staff_ph_no.value = mobile;
    staff_mail.value = email_id;
    staff_address.value = address;
  } catch (error) {
    console.error(error);
  }
}
var old_pass = document.getElementById("old_password");
var new_pass = document.getElementById("new_password");
var confirm_pass = document.getElementById("confirm_password");
var changePassword = document.getElementById("changePassword");
changePassword.onclick = async () => {
  if (!old_pass.value || !new_pass.value || !confirm_pass.value) {
    displaymsg("Enter Password");
    return;
  }
  if (new_pass.value != confirm_pass.value) {
    displaymsg("Password Mismatching");
    return;
  }
  let response = await fetch("/staff/changePassword", {
    method: "Post",
    body: JSON.stringify({
      old_pass: old_pass.value,
      new_pass: new_pass.value,
    }),
    headers: {
      "content-type": "application/json;charset=UTF-8",
    },
  });
  var res = await response.text();
  displaymsg(res);
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
