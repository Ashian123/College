const express = require("express");
const Modulerouter = express.Router();

Modulerouter.use("/seed", require("./seeding"));


module.exports = Modulerouter;
