const express = require("express"); 
const PatientRouter = express.Router();
const { Sequelize, sequelize ,DataTypes, QueryTypes  } = require("../../models/dbconnect");
Patient = require("../../models/patient.model.js")(sequelize, Sequelize, DataTypes);
Visit = require("../../models/Visit.model.js")(sequelize, Sequelize, DataTypes);

PatientRouter.get('/getdata', function(req, res) { console.log("Listing patient data");
    Patient.findAll()
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials."
      });
    });
});


PatientRouter.post('/ssr', (req, res, next) => {
	console.log(' patients table server side rendering...');
	$table = "patients";
	$join = $table;
	
	$draw = req.body.draw; 
	$row = req.body.start;
	$rowperpage = req.body.length;
	$columnIndex = req.body.order[0].column;
	$columnName = req.body.columns[$columnIndex].data; 
	$columnSortOrder = req.body.order[0].dir;
	$searchValue = req.body.search.value;
	$searchQuery = "";
	$limit = $rowperpage != '-1'?`LIMIT ${$row},${$rowperpage}`:` `;
	//console.log($limit);
	/*
	if($cus_search){
	$searchQuery += ` and ( gender like '${'%'+crud.apos($cus_search)+'%'}' ) `;
	}
	*/
		if($searchValue){
		$searchQuery = ` AND ( fname LIKE '${'%'+$searchValue+'%'}'  ) `;
		}
		
		
		const data = async function() {
		let $value = [];
		let sql = $searchQuery?`SELECT count(${$table}._id) as total FROM ${$join} WHERE ${$table}.del = 0 ${$searchQuery} `:`SELECT count(_id) as total FROM ${$table} `;
		
		$datas =  sequelize.query(`SELECT *, DATE_FORMAT(createdAt,'%d/%m/%Y') as createdAt FROM ${$join} WHERE ${$table}.del = 0 ${$searchQuery} ORDER BY ${$columnName} ${$columnSortOrder} ${$limit} `, { type: QueryTypes.SELECT } );
		$total =  sequelize.query(sql, { type: QueryTypes.SELECT } );
		$value[0] = await $datas;
		$value[1] = await $total;
		return $value;
		};
		data().then(data => {
		console.log(data[1][0].total);
		data[1] = data[1]?parseInt(data[1][0].total):0;	
		res.status(200).send({
		draw: parseInt($draw),
		iTotalRecords: data[1],
		iTotalDisplayRecords: data[1],		
		aaData: data[0]
		});
		});
});



PatientRouter.post('/adddata', function(req, res) {
Patient.create(req.body.data).then(data => { 
Visit.create({ p_id:data.dataValues._id,user_id:session.user_id,type:"out",amount:0,status:'checking'})
console.log(data.dataValues._id+" patient and visitor created ");
 res.send("added") }).catch(err => { res.send(err) })
});


module.exports = PatientRouter;