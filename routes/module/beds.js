const express = require("express");
const beds = express.Router();
const {
  Sequelize,
  sequelize,
  DataTypes,
  QueryTypes,
} = require("../../models/dbconnect");
Beds = require("../../models/beds.model.js")(sequelize, Sequelize, DataTypes);
Visit = require("../../models/Visit.model.js")(sequelize, Sequelize, DataTypes);
beds.get("/getdata", function (req, res) {
  console.log("Listing Beds data");
  Beds.findAll({ where: { del: false, available: true } })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials.",
      });
    });
});

beds.post("/ssr", (req, res, next) => {
  console.log(" beds table server side rendering...");
  $table = "beds";
  $join = $table;

  $draw = req.body.draw;
  $row = req.body.start;
  $rowperpage = req.body.length;
  $columnIndex = req.body.order[0].column;
  $columnName = req.body.columns[$columnIndex].data;
  $columnSortOrder = req.body.order[0].dir;
  $searchValue = req.body.search.value;
  $searchQuery = "";
  $limit = $rowperpage != "-1" ? `LIMIT ${$row},${$rowperpage}` : ` `;
  //console.log($limit);
  /*
	if($cus_search){
	$searchQuery += ` and ( gender like '${'%'+crud.apos($cus_search)+'%'}' ) `;
	}
	*/
  if ($searchValue) {
    $searchQuery = ` AND ( name LIKE '${"%" + $searchValue + "%"}'  ) `;
  }

  const data = async function () {
    let $value = [];
    let sql = $searchQuery
      ? `SELECT count(${$table}._id) as total FROM ${$join} WHERE ${$table}.del = 0 ${$searchQuery} `
      : `SELECT count(_id) as total FROM ${$join} WHERE ${$table}.del = 0  `;

    $datas = sequelize.query(
      `SELECT * FROM ${$join} WHERE ${$table}.del = 0  ${$searchQuery} ORDER BY ${$columnName} ${$columnSortOrder} ${$limit} `,
      { type: QueryTypes.SELECT }
    );
    $total = sequelize.query(sql, { type: QueryTypes.SELECT });
    $value[0] = await $datas;
    $value[1] = await $total;
    return $value;
  };
  data().then((data) => {
    console.log(data[1][0].total);
    data[1] = data[1] ? parseInt(data[1][0].total) : 0;
    res.status(200).send({
      draw: parseInt($draw),
      iTotalRecords: data[1],
      iTotalDisplayRecords: data[1],
      aaData: data[0],
    });
  });
});

beds.post("/handler", async (req, res) => {
  if (req.body.swtch == "addData") {
    delete req.body.swtch, req.body.data_id;
    Beds.create(req.body)
      .then((data) => {
        res.status(200).send("added");
      })
      .catch((err) => {
        res.send(err);
      });
  }
  if (req.body.swtch == "updateData") {
    let uid = req.body.data_id;
    Beds.findByPk(uid, (err, formsdata) => {
      if (err) {
        console.log(err);
      }
      formsdata.title = req.body.title;
      formsdata.description = req.body.description;
      console.log(formsdata);
      formsdata.save().then(() => {
        return res.status(200).json("Updated").end();
      });
    });
  }
  if (req.body.swtch == "change_status_bed_update") {
    if (!req.body.avl_beds) {
      res.send("Id missing");
    }

    //res.send(data);
    Beds.update(
      { p_id: req.body.p_id, available: false },
      {
        where: { _id: req.body.avl_beds },
      }
    );
    Patient.update(
      { admit: true },
      {
        where: { _id: req.body.p_id },
      }
    ).then((num) => {
      if (num == 1) {
        res.status(200).send("Update successfully.");
      } else {
        res.status(404).send({
          message: `Cannot update Tutorial with id=${req.body.uid}. Maybe Tutorial was not found or req.body is empty!`,
        });
      }
    });
    Visit.update(
      { type: "in" },
      { where: { p_id: req.body.p_id, status: "checking" } }
    ).catch((err) => {
      res.status(500).send({
        message: "Error retrieving Tutorial with id=" + id,
      });
    });
  }
  if (req.body.swtch == "dis_charge_bed") {
    if (!req.body.p_id) {
      res.send("Id missing");
    }

    //res.send(data);
    Beds.update(
      { p_id: "", available: true },
      {
        where: { p_id: req.body.p_id },
      }
    );
    Patient.update(
      { admit: false },
      {
        where: { _id: req.body.p_id },
      }
    ).then((num) => {
      if (num == 1) {
        res.status(200).send("Update successfully.");
      } else {
        res.status(404).send({
          message: `Cannot update Tutorial with id=${req.body.uid}. Maybe Tutorial was not found or req.body is empty!`,
        });
      }
    });
    Visit.update(
      { status: "done" },
      { where: { p_id: req.body.p_id, status: "checking" } }
    ).catch((err) => {
      res.status(500).send({
        message: "Error retrieving Tutorial with id=" + id,
      });
    });
  }
  if (req.body.swtch == "del_formsdata") {
    Beds.remove({ _id: req.body.data_id }, (err, formsdata) => {
      if (err) {
        return res.status(404).json({ error: "cannot perform delete" + err });
      }
      return res.status(200).json("Deleted ").end();
    });
  }

  if (req.body.swtch == "view_bed_data") {
    let r_id = req.body.r_id;
    Beds.findAll({ where: { room_id: r_id, del: false } })
      .then((data) => {
        res.status(200).send(data);
      })
      .catch((err) => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving tutorials.",
        });
      });
  }
});

module.exports = beds;
