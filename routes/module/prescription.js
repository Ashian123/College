const express = require("express"); 
const Prescriptionment = express.Router();
const { Sequelize, sequelize ,DataTypes, QueryTypes  } = require("../../models/dbconnect");
Prescription = require("../../models/Prescription.model.js")(sequelize, Sequelize, DataTypes);
Visit = require("../../models/Visit.model.js")(sequelize, Sequelize, DataTypes);

Prescriptionment.get('/getdata', function(req, res) { console.log("Listing patient data");
    Prescription.findAll({where:{del:false}})
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



Prescriptionment.post('/adddata', function(req, res) {
Patient.create(req.body.data).then(data => { res.send("added") }).catch(err => { res.send(err) })
});


Prescriptionment.post('/handler', async (req, res)=>{
	if(req.body.swtch == 'add_Prescription'){ 
	 Visit.findOne({ where: {p_id:req.body.p_id, status:"checking"} 
	 }).then(async (response) => {  
	 if(!response){ res.status(201).send("No Data") }
	 Prescription.create({
	 visit_id:response.dataValues._id,
	 p_id:req.body.p_id,
	 user_id:req.body.user_id,
	 data:req.body.pres
	 }).then(data => { 
	 res.status(200).send("added") }).catch(err => { res.send(err) })
	 response.dataValues._id
			
	}) 
	
	}

	if(req.body.swtch == 'get_pat_data'){
		let p_id = req.body.p_id;	
    Prescription.findAll({where:{p_id:p_id,del:false}})
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


	if(req.body.swtch == 'updateData'){
		let uid = req.body.data_id;
		Prescription.findByPk(uid, (err, formsdata)=>{
        if(err){console.log(err);}
        formsdata.title=req.body.title;
		formsdata.description=req.body.description; console.log(formsdata);
        formsdata.save().then(()=> {return res.status(200).json("Updated").end()})
    });
	}
	
	
	
	if(req.body.swtch == 'change_status'){  
	if(!req.body.uid){ res.send("Id missing") }
	Prescription.findByPk(req.body.uid)
    .then(data => {
      if (data) {
        //res.send(data);
					Prescription.update({del:true}, {
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
	    Prescription.remove({_id: req.body.data_id}, (err, formsdata)=>{
		if(err){return res.status(404).json({ error: 'cannot perform delete'+err })}
        return res.status(200).json("Deleted ").end();
		});
	}	
});



module.exports = Prescriptionment;