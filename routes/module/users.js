const express = require("express"); 
const users = express.Router();
const { Sequelize, sequelize ,DataTypes, QueryTypes  } = require("../../models/dbconnect");
Users = require("../../models/users.model.js")(sequelize, Sequelize, DataTypes);
Beds = require("../../models/beds.model.js")(sequelize, Sequelize, DataTypes);




users.get('/getdata', function(req, res) { console.log("Listing patient data");
    Users.findAll({where:{del:false}})
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

users.post('/ssr', (req, res, next) => {
	console.log(' users table server side rendering...');
	$table = "users";
	$join = $table;
	
	$custom_where = `${$table}.del = 0 AND ${$table}.mainrole != 'itadmin' `; 
	
	if(req.session.mainrole == "sadmin"){
	$custom_where += ` AND ${$table}.mainrole != 'sadmin' `;	
	} else if(req.session.mainrole != "itadmin" || req.session.mainrole == "sadmin"){
	$custom_where += ` AND ${$table}.mainrole != 'sadmin' AND ${$table}.mainrole != 'admin' AND ${$table}.branch = '${req.session.branch}' `;
	}
	
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
		let sql = $searchQuery?`SELECT count(${$table}._id) as total FROM ${$join} WHERE ${$custom_where}  ${$searchQuery} `:`SELECT count(_id) as total FROM ${$table} WHERE ${$custom_where} `;
		
		$datas =  sequelize.query(`SELECT *,DATE_FORMAT(createdAt,'%d-%m-%Y') as createdAt FROM ${$join} WHERE ${$custom_where} ${$searchQuery} ORDER BY ${$columnName} ${$columnSortOrder} ${$limit} `, { type: QueryTypes.SELECT } );
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



users.post('/adddata', function(req, res) {
Patient.create(req.body.data).then(data => { res.send("added") }).catch(err => { res.send(err) })
});


users.post('/handler', async (req, res)=>{
	if(req.body.swtch == 'addData'){ 
	delete req.body.swtch,req.body.data_id;
	Users.create(req.body).then(data => { 
	let count  = parseInt(req.body.bed_count);
	for(let i=1;i<=count;i++){
	let bed = { name: data.dataValues.name+i,bed_id:data.dataValues.name,room_id:data.dataValues._id }
	Beds.create(bed).then(data => { console.log(data) }).catch(err => { console.log(err) })
	}
	
	res.status(200).send("added") }).catch(err => { res.send(err) })
	}
	if(req.body.swtch == 'updateData'){
		let uid = req.body.data_id;
		Users.findByPk(uid, (err, formsdata)=>{
        if(err){console.log(err);}
        formsdata.title=req.body.title;
		formsdata.description=req.body.description; console.log(formsdata);
        formsdata.save().then(()=> {return res.status(200).json("Updated").end()})
    });
	}
	if(req.body.swtch == 'delete_user'){  
	if(!req.body.uid){ res.send("Id missing") }console.log("deleted")
	Users.findByPk(req.body.uid)
    .then(data => {
      if (data) {
        //res.send(data);
					Users.update({del:true}, {
					where: { _id: req.body.uid }
					})
					.then(num => {
					if (num == 1) {
						Beds.update({del:true}, {
						where: { room_id: req.body.uid }
						})	
					
					res.status(200).send("Deleted successfully.");
					} else {
					res.status(404).send({
					  message: `Cannot update Users with id=${req.body.uid}. Maybe Tutorial was not found or req.body is empty!`
					});
					}
					})		
      } else {
        res.status(404).send({
          message: `Cannot find Users with id=${id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Tutorial with id=" + id
      });
    });
	}
	if(req.body.swtch == 'change_status'){  
	if(!req.body.uid){ res.send("Id missing") }console.log("Satus updated")
	Users.findByPk(req.body.uid)
    .then(data => {
      if (data) {
        //res.send(data);
					Users.update({active:!data.dataValues.active}, {
					where: { _id: req.body.uid }
					})
					.then(num => {
					if (num == 1) {
						Beds.update({del:true}, {
						where: { room_id: req.body.uid }
						})	
					
					res.status(200).send("Updated successfully.");
					} else {
					res.status(404).send({
					  message: `Cannot update Users with id=${req.body.uid}. Maybe Tutorial was not found or req.body is empty!`
					});
					}
					})		
      } else {
        res.status(404).send({
          message: `Cannot find Users with id=${id}.`
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
	    Users.remove({_id: req.body.data_id}, (err, formsdata)=>{
		if(err){return res.status(404).json({ error: 'cannot perform delete'+err })}
        return res.status(200).json("Deleted ").end();
		});
	}	
});



module.exports = users;