require("dotenv").config();

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