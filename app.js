// Setup basic express server
const express = require('express');
const sessions = require('express-session');
const bodyParser = require('body-parser');
const cookieParser = require("cookie-parser");
const fs = require('fs');
const authId= require('./auth'); 

const app = express();
const path = require('path');
global.appRoot = path.resolve(__dirname);
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const port = process.env.PORT || 3000;

app.set('trust proxy', 1);
const oneDay = 1000 * 60 * 60 * 24;
app.use(sessions({
    secret: "thisismysecrctekeyfhrgfgrfrty84fwir767",
    saveUninitialized:true,
    cookie: { maxAge: oneDay },
    resave: false
}));


app.use(cookieParser());
app.set("views", "./views");
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
app.use(express.static("./public"));

app.use(function (req, res, next) {
	   /*
	   session = req.session;
	   session.role = "admin";
	   session.mainrole = "admin";
	   session.user_id = "testing";
	   session.user_name = "Developer";
	   session.branch = "main";
	   session._id = "admin";	
	   */
	
   res.locals = {
     APP_NAME: "Ashian Care",
	 HOSPITAL_NAME: "Ashian Care Example",
     VERSION: "The Home Page",
     author: "Cory Gross",
     description: "My app's description",
	 user_picture:"",
	 user_name:"dev"
   }
   next();
});

isAdmin = (req, res, next) => {
  req.session.mainrole == "admin" ? next() : res.redirect('/login');
}

app.use("/admin",isAdmin, require('./routes/admin')); 
app.use("/", require('./routes/public')); 
 
app.use("/module",require('./routes/module'));

app.get('/', (req, res) => { 
//if(!req.session.mainrole){ res.redirect('/login'); return false; }	// Force login as home screen
res.redirect('/home'); return false;
switch(req.session.mainrole) { 

  case 'admin':
    res.redirect('/admin');
    break;
  case 'staff':
    console.log("login to staff processing");
	res.redirect('/staff');
    break;	
  case 'client':
    res.redirect('/client');
    break;	
  default:
    res.redirect('/');
	break;
}
});

app.get('/logout', (req, res) => {	
	req.session.destroy();
	res.redirect('/');
	return false;
});


app.get('/login', (req, res) => {
  if(req.session.role){ res.redirect('/'); return false; }	
  res.render("public/login");
});
 
app.post('/login', async (req, res) => { 
  let auth = await authId(res,req,req.body); 
	if(auth._id){
	res.send("Done")
	} else { res.send(auth) }
});

app.get('/register', (req, res) => {
  if(req.user){ res.redirect('/'); return false; }	
  res.render("public/register");
});

let numUsers = 0;
show = () => {
const count = io.engine.clientsCount;
const count2 = io.of("/").sockets.size;
console.log("count = "+count);
console.log("count = "+count2);
}

io.on('connection', (socket) => {
  show();
  let addedUser = false;
  socket.on('new message', (data) => {
    socket.broadcast.emit('new message', console.log("new message"),{
      username: socket.username,
      message: data
    });
  });
  socket.on('add user', (username) => {
    if (addedUser) return;
    socket.username = username;
    ++numUsers;
    addedUser = true;
    socket.emit('login', {
      numUsers: numUsers
    });
    socket.broadcast.emit('user joined', {
      username: socket.username,
      numUsers: numUsers
    });
  });
  socket.on('typing', () => {
    socket.broadcast.emit('typing', {
      username: socket.username
    });
  });
  socket.on('stop typing', () => {
    socket.broadcast.emit('stop typing', {
      username: socket.username
    });
  });
  socket.on('disconnect', () => { show();
    if (addedUser) {
      --numUsers;
      socket.broadcast.emit('user left', {
        username: socket.username,
        numUsers: numUsers
      });
    }
  });
});




server.listen(port, () => {
  console.log('Server listening at port %d', port);
});

