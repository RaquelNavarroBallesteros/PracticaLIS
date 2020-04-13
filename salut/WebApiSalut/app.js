var cors = require("cors")
var express = require("express")
const bodyParser = require('body-parser');

var app = express()
app.use(cors())
app.use(bodyParser());

var loginController = require("./Controllers/loginController")
var perfilController = require("./Controllers/perfilController")
var emergenciesController = require("./Controllers/emergenciesController")
var singUpController = require("./Controllers/signupController")


app.use("/api/Login",loginController)
app.use("/api/Perfil",perfilController)
app.use("/api/Emergencies",emergenciesController)
app.use("/api/SingUp", singUpController)

const port = 3000

app.listen(port,'0.0.0.0', ()=> console.log('app start listening on port ' + port))
