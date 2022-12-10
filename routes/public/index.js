const express = require("express");
const Publicrouter = express.Router();
Publicrouter.use(express.static("./public"));
let v_path = "public/";

Publicrouter.get("/", function (req, res) {
  return res.redirect("index");
});

Publicrouter.get("/index", async (req, res) => {
  res.render(v_path + "home_page.ejs");
});

Publicrouter.get("/home", async (req, res) => {
  res.render(v_path + "home_page.ejs");
});

Publicrouter.get("/users", async (req, res) => {
  res.render(v_path + "users.ejs");
});

Publicrouter.get("/patients", async (req, res) => {
  res.render(v_path + "patients.ejs");
});

Publicrouter.get("/addpatient", async (req, res) => {
  res.render(v_path + "addpatient.ejs");
});

Publicrouter.get("/viewpatient:id", async (req, res) => {
  Patient.findAll({ where: { _id: req.params.id, del: false } }).then(
    (data) => {
      res.render(v_path + "view_paitent.ejs", {
        data: data,
        p_id: req.params.id,
      });
    }
  );
});

Publicrouter.get("/addprescription:id", async (req, res) => {
  Patient.findAll({ where: { _id: req.params.id, del: false } }).then(
    (data) => {
      res.render(v_path + "add_pres.ejs", { data: data, p_id: req.params.id });
    }
  );
});

Publicrouter.get("/payment", async (req, res) => {
  res.render(v_path + "payment.ejs");
});

Publicrouter.get("/bill_type", async (req, res) => {
  res.render(v_path + "bill_type.ejs");
});

Publicrouter.get("/rooms", async (req, res) => {
  res.render(v_path + "rooms.ejs");
});

Publicrouter.get("/appointment", async (req, res) => {
  res.render(v_path + "appointment.ejs");
});

Publicrouter.get("/medicine", async (req, res) => {
  res.render(v_path + "medicine.ejs");
});
Publicrouter.get("/supplier", async (req, res) => {
  res.render(v_path + "supplier.ejs");
});
Publicrouter.get("/purchase", async (req, res) => {
  res.render(v_path + "purchase.ejs");
});

module.exports = Publicrouter;
