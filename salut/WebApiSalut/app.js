var cors = require("cors")
var express = require("express")
const bodyParser = require('body-parser');

var app = express()
app.use(cors())
app.use(bodyParser());

var loginController = require("./Controllers/loginController")
var perfilController = require("./Controllers/perfilController")
var signupController = require ("./Controllers/signupController")


app.use("/api/Login",loginController)
app.use("/perfil",perfilController)
app.use("/api/signUp", signupController)

const port = 3000

app.listen(port,'localhost', ()=> console.log('app start listening on port ' + port))
