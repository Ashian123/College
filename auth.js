const { User } = require("./models/index")
const authId = (res,req,user) => {
return new Promise((resolve, reject) => {	
  User.findOne({ where: {user_id:user.user_id} })
    .then(async (response) => {  
    if (!response) { 
     resolve("NotResister");
    } else { 
      if (!response.dataValues.password || 
       !await response.validPassword(user.password, 
        response.dataValues.password)) {
         resolve("WrongPass");
      } else if(!response.dataValues.active || response.dataValues.del) {
		resolve("Access Denined");
	  } else {
	   session = req.session;
	   session.role = response.dataValues.role;
	   session.mainrole = response.dataValues.mainrole;
	   session.user_id = response.dataValues.user_id;
	   session.user_name = response.dataValues.name;
	   session.branch = response.dataValues.branch;
	   session._id = response.dataValues._id;
				
       resolve(response.dataValues)
      }
     }
    })
    .catch(err => {
		resolve(err); 
    });
})	
}


module.exports =authId;