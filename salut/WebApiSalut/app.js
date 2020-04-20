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
var filesController = require("./Controllers/filesController")
var tractamentController = require("./Controllers/tractamentController")
var medicamentController = require("./Controllers/medicamentController")

app.use("/api/Login",loginController)
app.use("/api/Perfil",perfilController)
app.use("/api/Emergencies",emergenciesController)
app.use("/api/SingUp", singUpController)
app.use("/api/Files", filesController)
app.use("/api/Tractament", tractamentController)
app.use("/api/Medicament", medicamentController)

const port = 3000

app.listen(port,'0.0.0.0', ()=> console.log('app start listening on port ' + port))
