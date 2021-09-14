"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
//import 'semantic-ui-css/semantic.min.css';
var app = (0, express_1.default)();
var router = express_1.default.Router();
var port = 3000;
app.use(express_1.default.static('dist'));
router.get('/', function (req, res) {
    res.send('./index.html');
});
app.use('/', router);
app.listen(port, function () {
    /* if (err) {
      return console.error(err);
    } */
    return console.log("server is listening on " + port);
});
