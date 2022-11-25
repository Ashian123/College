require("dotenv").config();
// Setup basic express server
const express = require('express');
const sessions = require('express-session');
const bodyParser = require('body-parser');
const cookieParser = require("cookie-parser");
const fs = require('fs');

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
	   session = req.session;
	   session.role = "admin";
	   session.mainrole = "admin";
	   session.user_id = "testing";
	   session.user_name = "Developer";
	   session.branch = "main";
	   session._id = "admin";	
	
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

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = __importDefault(require("http"));
const db_1 = __importDefault(require("./db"));
const models_1 = require("./models");
const { User } = require("./models");
async function run() {
    (0, models_1.initModels)(db_1.default);
    const hostname = process.env.HOSTNAME || '127.0.0.1';
    const port = parseInt(process.env.PORT || '3000');
    const server = http_1.default.createServer((req, res) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/plain');
        res.end('Hello World');
    });
    server.listen(port, hostname, () => {
        console.log(`Server running at http://${hostname}:${port}/`);
    });
}
run();
/*
User.create({
	"firstName":"Vimal",
	"middleName":"Vimal",
	"lastName":"Vimal",
	"mobile":"Vimal",
	"email":"Vimal",
	"passwordHash":"Vimal",
	"registeredAt":"now()",
	"lastLogin":"now()",
	"intro":"Vimal",
	"profile":"Vimal"
	});

	User.findAll({})
    .then(data => {
      console.log(data);
    })
*/	

isAdmin = (req, res, next) => {
  req.session.mainrole == "admin" ? next() : res.redirect('/login');
}

app.use("/admin",isAdmin, require('./routes/admin')); 

app.use("/public", require('./routes/public')); 