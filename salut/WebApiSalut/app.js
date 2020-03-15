var cors = require("cors")
var express = require("express")
const bodyParser = require('body-parser');

var app = express()
app.use(cors())
app.use(bodyParser());

var loginController = require("./Controllers/loginController")



app.use("/api/Login",loginController)
const port = 3000

app.listen(port,'localhost', ()=> console.log('app start listening on port ' + port))
