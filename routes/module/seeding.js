const express = require("express");
const seeding = express.Router();

const per = require("../../config/user_permission");
const {
  Sequelize,
  sequelize,
  DataTypes,
  QueryTypes,
} = require("../../models/dbconnect");
Rooms = require("../../models/rooms.model.js")(sequelize, Sequelize, DataTypes);
Beds = require("../../models/beds.model.js")(sequelize, Sequelize, DataTypes);
Role = require("../../models/role.model.js")(sequelize, Sequelize, DataTypes);
Patient = require("../../models/patient.model.js")(
  sequelize,
  Sequelize,
  DataTypes
);
Users = require("../../models/users.model.js")(sequelize, Sequelize);
BillType = require("../../models/Bill_type.model.js")(sequelize, Sequelize);
Medicine = require("../../models/medicine.model.js")(sequelize, Sequelize);
Supplier = require("../../models/supplier.model.js")(sequelize, Sequelize);
Purchase = require("../../models/purchase.model.js")(sequelize, Sequelize);

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
    }).then((data) => {
      for (let i = 0; i <= 25; i++) {
        let gen = i % 2 == 0 ? "Male" : "Female";
        let pati = {
          fname: "Patient" + i,
          lname: "Last" + i,
          dob: 1974 + i + "-03-02",
          age: 20 + i,
          contact: "234234234" + i,
          gender: gen,
          address: "afsdfasdf" + i,
          city: "Tirunelveli" + i,
          taluk: "Vannarpettai" + i,
          state: "Tamilnadu" + i,
          country: "India" + i,
          pincode: "62700" + i,
          adhar: "12342134234234" + i,
          email: "Psvimalraj333@gmail.com" + i,
          language: "Tamil" + i,
          nationality: "Indian" + i,
          address2: "asdfasfasdf" + i,
          status: "Single",
          advance: i + "00",
          emergency_contact_name: "asdfsdafsadf" + i,
          emergency_contact_number: "242323434" + i,
          reference: "Ravi",
          others_details: "asdf asdfasd asdfsa dsadfas dfasdfasdf" + i,
          staff_id: data.dataValues._id,
        };
        Patient.create(pati).then((data) => {
          console.log(i + "Patient created");
        });
      }
    });

    BillType.create({ name: "Consultant Fees", amount: 500 });
    BillType.create({ name: "Blood Test", amount: 100 });
    BillType.create({ name: "Sugar Test", amount: 100 });
    BillType.create({ name: "Medicine", amount: 250 });
    BillType.create({ name: "Injection", amount: 100 });
    BillType.create({ name: "Daily Medicine", amount: 1020 });

    function create_room(room) {
      Rooms.create(room).then((data) => {
        for (let i = 1; i <= parseInt(data.dataValues.bed_count); i++) {
          let bed = {
            name: data.dataValues.name + i,
            bed_id: data.dataValues.name,
            room_id: data.dataValues._id,
          };
          Beds.create(bed)
            .then((data) => {
              console.log("Bed Created");
            })
            .catch((err) => {
              console.log(err);
            });
        }
      });
    }

    create_room({
      name: "Icu",
      amount: 20000,
      bed_count: 5,
      active: true,
      del: false,
    });
    create_room({
      name: "Single Room",
      amount: 3000,
      bed_count: 2,
      active: true,
      del: false,
    });
    create_room({
      name: "General",
      amount: 500,
      bed_count: 5,
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
