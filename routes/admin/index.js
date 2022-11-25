const express = require("express");
const Adminrouter = express.Router();
Adminrouter.use(express.static("./public"));
let v_path = "admin/";

Adminrouter.use(function (req, res, next) {
  Role.findOne({ where: { name: req.session.role, del: false } })
    .then((data) => {
      res.locals.permisson = JSON.parse(data.dataValues.rules);
      next();
    })
    .catch((err) => {
      res.locals.permisson = per[session.role];
      next();
    });
});

Adminrouter.get("/", function (req, res) {
  return res.redirect("index");
});

Adminrouter.get("/index", async (req, res) => {
  res.render(v_path + "home.ejs");
});

Adminrouter.get("/users", async (req, res) => {
  res.render(v_path + "users.ejs");
});

Adminrouter.get("/patients", async (req, res) => {
  res.render(v_path + "patients.ejs");
});

Adminrouter.get("/addpatient", async (req, res) => {
  res.render(v_path + "addpatient.ejs");
});

Adminrouter.get("/viewpatient:id", async (req, res) => {
  Patient.findAll({ where: { _id: req.params.id, del: false } }).then(
    (data) => {
      res.render(v_path + "view_paitent.ejs", {
        data: data,
        p_id: req.params.id,
      });
    }
  );
});

Adminrouter.get("/addprescription:id", async (req, res) => {
  Patient.findAll({ where: { _id: req.params.id, del: false } }).then(
    (data) => {
      res.render(v_path + "add_pres.ejs", { data: data, p_id: req.params.id });
    }
  );
});

Adminrouter.get("/payment", async (req, res) => {
  res.render(v_path + "payment.ejs");
});

Adminrouter.get("/bill_type", async (req, res) => {
  res.render(v_path + "bill_type.ejs");
});

Adminrouter.get("/rooms", async (req, res) => {
  res.render(v_path + "rooms.ejs");
});

Adminrouter.get("/appointment", async (req, res) => {
  res.render(v_path + "appointment.ejs");
});

Adminrouter.get("/medicine", async (req, res) => {
  res.render(v_path + "medicine.ejs");
});
Adminrouter.get("/supplier", async (req, res) => {
  res.render(v_path + "supplier.ejs");
});
Adminrouter.get("/purchase", async (req, res) => {
  res.render(v_path + "purchase.ejs");
});

module.exports = Adminrouter;
