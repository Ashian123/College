const express = require("express");
const purchase = express.Router();
const {
  Sequelize,
  sequelize,
  DataTypes,
  QueryTypes,
} = require("../../models/dbconnect");
Purchase = require("../../models/purchase.model.js")(
  sequelize,
  Sequelize,
  DataTypes
);

purchase.get("/getdata", function (req, res) {
  console.log("Listing purchase data");

  Purchase.findAll({ where: { del: false } })
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

purchase.post("/ssr", (req, res, next) => {
  console.log(" pay type table server side rendering...");
  $table = "purchases";
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
    $searchQuery = ` AND ( p_id LIKE '${"%" + $searchValue + "%"}'  ) `;
  }

  const data = async function () {
    let $value = [];
    let sql = $searchQuery
      ? `SELECT count(${$table}._id) as total FROM ${$join} WHERE ${$table}.del = 0 ${$searchQuery} `
      : `SELECT count(_id) as total FROM ${$table} WHERE ${$table}.del = 0  `;

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

purchase.post("/adddata", function (req, res) {
  Patient.create(req.body.data)
    .then((data) => {
      res.send("added");
    })
    .catch((err) => {
      res.send(err);
    });
});

purchase.post("/handler", async (req, res) => {
  if (req.body.swtch == "addData") {
    delete req.body.swtch, req.body.data_id;
    console.log(req.body);
    Purchase.create(req.body)
      .then((data) => {
        res.status(200).send("added");
      })
      .catch((err) => {
        res.send(err);
      });
  }
  if (req.body.swtch == "get_medi_data") {
    console.log(req.body);
    Purchase.findOne({ where: { _id: req.body.m_id } })
      .then((data) => {
        res.status(200).send(data);
      })
      .catch((err) => {
        res.send(err);
      });
  }

  if (req.body.swtch == "updateData") {
    let uid = req.body.uid;
    delete req.body.swtch, req.body.data_id, req.body.uid;
    Purchase.update(req.body, { where: { _id: req.body.uid } })
      .then((num) => {
        if (num == 1) {
          res.status(200).send("Update successfully.");
        } else {
          res.status(404).send({
            message: `Cannot update Purchase with id=${req.body.uid}. Maybe Tutorial was not found or req.body is empty!`,
          });
        }
      })
      .catch((err) => {
        res.status(500).send({
          message: "Error retrieving Tutorial with id=" + id,
        });
      });
  }

  if (req.body.swtch == "change_status") {
    if (!req.body.uid) {
      res.send("Id missing");
    }
    Purchase.findByPk(req.body.uid)
      .then((data) => {
        if (data) {
          //res.send(data);
          Purchase.update(
            { del: true },
            {
              where: { _id: req.body.uid },
            }
          ).then((num) => {
            if (num == 1) {
              res.status(200).send("Deleted successfully.");
            } else {
              res.status(404).send({
                message: `Cannot update Tutorial with id=${req.body.uid}. Maybe Tutorial was not found or req.body is empty!`,
              });
            }
          });
        } else {
          res.status(404).send({
            message: `Cannot find Tutorial with id=${uid}.`,
          });
        }
      })
      .catch((err) => {
        res.status(500).send({
          message: "Error retrieving Tutorial with id=" + uid,
        });
      });
  }
  if (req.body.swtch == "del_formsdata") {
    Purchase.remove({ _id: req.body.data_id }, (err, formsdata) => {
      if (err) {
        return res.status(404).json({ error: "cannot perform delete" + err });
      }
      return res.status(200).json("Deleted ").end();
    });
  }
});

module.exports = purchase;
