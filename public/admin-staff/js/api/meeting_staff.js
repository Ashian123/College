var USER = localStorage.getItem("user");
window.onload = () => {
  get_allMeeting();
};

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
