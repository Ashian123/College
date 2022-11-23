const express = require("express");
const Modulerouter = express.Router();

Modulerouter.use("/seed", require("./seeding"));
Modulerouter.use("/users", require("./users"));
Modulerouter.use("/patient", require("./patient"));
Modulerouter.use("/bill_type", require("./bill_type"));
Modulerouter.use("/bill", require("./bill"));
Modulerouter.use("/payment", require("./payment"));
Modulerouter.use("/prescription", require("./prescription"));
Modulerouter.use("/rooms", require("./rooms"));
Modulerouter.use("/beds", require("./beds"));
Modulerouter.use("/medicine", require("./medicine"));
Modulerouter.use("/supplier", require("./supplier"));
Modulerouter.use("/purchase", require("./purchase"));

module.exports = Modulerouter;
