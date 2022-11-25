const express = require("express");
const seeding = express.Router();

const per = require("../../config/user_permission");


Role = require("../../models/role.js")
Users = require("../../models/user.js")

seeding.get("/create", function (req, res) {
  sequelize.sync({ force: true }).then(function () {
    Role.create({
      name: "itadmin",
      mainroles: "itadmin",
      active: true,
      del: false,
    });
    Role.create({
      name: "sadmin",
      mainroles: "sadmin",
      active: true,
      del: false,
    });
    Role.create({
      name: "admin",
      mainroles: "admin",
      rules: per.admin,
      active: true,
      del: false,
    });
    Role.create({
      name: "staff",
      mainroles: "staff",
      rules: per.staff,
      active: true,
      del: false,
    });
    Role.create({
      name: "doctor",
      mainroles: "staff",
      rules: per.doctor,
      active: true,
      del: false,
    });

    // Seeding base users
    Users.create({
      name: "IT ADMIN",
      role: "itadmin",
      mainrole: "itadmin",
      branch: "main",
      password: "itadmin123",
      user_id: "itadmin",
      active: true,
      del: false,
    });
    Users.create({
      name: "Super Admin",
      role: "sadmin",
      mainrole: "sadmin",
      branch: "main",
      password: "sadmin123",
      user_id: "sadmin",
      active: true,
      del: false,
    });
    Users.create({
      name: "Admin",
      role: "admin",
      branch: "main",
      mainrole: "admin",
      password: "admin123",
      user_id: "admin",
      active: true,
      del: false,
    });
    Users.create({
      name: "Doctor",
      role: "doctor",
      branch: "main",
      mainrole: "staff",
      password: "doctor123",
      user_id: "doctor",
      active: true,
      del: false,
    });
    Users.create({
      name: "STAFF",
      role: "staff",
      branch: "main",
      mainrole: "staff",
      password: "staff123",
      user_id: "staff",
      active: true,
      del: false,
    });

    res.status(200).send("Users Rooms BillType created ");
  });
});

seeding.get("/fcreate", function (req, res) {
  sequelize.sync({ force: true }).then(function () {
    // seeding base datas
    Role.create({
      name: "itadmin",
      mainroles: "itadmin",
      active: true,
      del: false,
    });
    Role.create({
      name: "sadmin",
      mainroles: "sadmin",
      active: true,
      del: false,
    });
    Role.create({
      name: "admin",
      mainroles: "admin",
      rules: per.admin,
      active: true,
      del: false,
    });
    Role.create({
      name: "staff",
      mainroles: "staff",
      rules: per.staff,
      active: true,
      del: false,
    });
    Role.create({
      name: "doctor",
      mainroles: "staff",
      rules: per.doctor,
      active: true,
      del: false,
    });

    // Seeding base users
    Users.create({
      name: "IT ADMIN",
      role: "itadmin",
      mainrole: "itadmin",
      branch: "main",
      password: "itadmin123",
      user_id: "itadmin",
      active: true,
      del: false,
    });
    Users.create({
      name: "Super Admin",
      role: "sadmin",
      mainrole: "sadmin",
      branch: "main",
      password: "sadmin123",
      user_id: "sadmin",
      active: true,
      del: false,
    });
    Users.create({
      name: "Admin",
      role: "admin",
      branch: "main",
      mainrole: "admin",
      password: "admin123",
      user_id: "admin",
      active: true,
      del: false,
    });
    Users.create({
      name: "STAFF",
      role: "staff",
      branch: "main",
      mainrole: "staff",
      password: "staff123",
      user_id: "staff",
      active: true,
      del: false,
    });
    Users.create({
      name: "Doctor",
      role: "doctor",
      branch: "main",
      mainrole: "staff",
      password: "doctor123",
      user_id: "doctor",
      active: true,
      del: false,
    });

    res.status(200).send("Users created ");
  });
});
module.exports = seeding;
