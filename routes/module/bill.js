const express = require("express"); 
const Bill_rounte = express.Router();
const { Sequelize, sequelize ,DataTypes, QueryTypes  } = require("../../models/dbconnect");
Bill = require("../../models/Bill.model.js")(sequelize, Sequelize, DataTypes);
Pay = require("../../models/payment.model.js")(sequelize, Sequelize, DataTypes);

Bill_rounte.get('/getdata', function(req, res) { console.log("Listing patient data");
    Bill.findAll({where:{del:false}})
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


Bill_rounte.post('/ssr', (req, res, next) => {
	console.log(' bill type table server side rendering...');
	$table = "payments";
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
		$searchQuery = ` AND ( name LIKE '${'%'+$searchValue+'%'}'  ) `;
		}
	
		
		const data = async function() {
		let $value = [];
		let sql = $searchQuery?`SELECT count(${$table}._id) as total FROM ${$join} WHERE ${$table}.del = 0 ${$searchQuery} `:`SELECT count(_id) as total FROM ${$table} WHERE ${$table}.del = 0  `;
		
		$datas =  sequelize.query(`SELECT *, DATE_FORMAT(createdAt,'%d/%m/%Y') as createdAt FROM ${$join} WHERE ${$table}.del = 0  ${$searchQuery} ORDER BY ${$columnName} ${$columnSortOrder} ${$limit} `, { type: QueryTypes.SELECT } );
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


Bill_rounte.post('/adddata', function(req, res) {
Patient.create(req.body.data).then(data => { res.send("added") }).catch(err => { res.send(err) })
});


Bill_rounte.post('/handler', async (req, res)=>{
	if(req.body.swtch == 'addData'){ 
	delete req.body.swtch,req.body.data_id; 
	Bill.create(req.body).then(data => { res.status(200).send("added") }).catch(err => { res.send(err) })
	}

	if(req.body.swtch == 'get_pat_data'){
		let p_id = req.body.p_id;
    Bill.findAll({where:{p_id:p_id,del:false}})
    .then(data => {
      res.status(200).send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials."
      });
    });				
	}

	if(req.body.swtch == 'get_total_data'){
		let p_id = req.body.p_id;
    let Bill_data = await Bill.findAll({where:{p_id:p_id,del:false}})
	let pay_data = await Pay.findAll({where:{p_id:p_id,del:false}})
	res.status(200).send({Bill_data:Bill_data,Pay_data:pay_data});
	}


	if(req.body.swtch == 'updateData'){
		let uid = req.body.data_id;
		Bill.findByPk(uid, (err, formsdata)=>{
        if(err){console.log(err);}
        formsdata.title=req.body.title;
		formsdata.description=req.body.description; console.log(formsdata);
        formsdata.save().then(()=> {return res.status(200).json("Updated").end()})
    });
	}
	
	
	
	if(req.body.swtch == 'change_status'){  
	if(!req.body.uid){ res.send("Id missing") }
	Bill.findByPk(req.body.uid)
    .then(data => {
      if (data) {
        //res.send(data);
					Bill.update({del:true}, {
					where: { _id: req.body.uid }
					})
					.then(num => {
					if (num == 1) {
					res.status(200).send("Deleted successfully.");
					} else {
					res.status(404).send({
					  message: `Cannot update Tutorial with id=${req.body.uid}. Maybe Tutorial was not found or req.body is empty!`
					});
					}
					})		
      } else {
        res.status(404).send({
          message: `Cannot find Tutorial with id=${id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Tutorial with id=" + id
      });
    });
		
	}		
	if(req.body.swtch == 'del_formsdata'){
	    Bill.remove({_id: req.body.data_id}, (err, formsdata)=>{
		if(err){return res.status(404).json({ error: 'cannot perform delete'+err })}
        return res.status(200).json("Deleted ").end();
		});
	}	
});



module.exports = Bill_rounte;