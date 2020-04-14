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
var addEventController = require("./Controllers/addEventController")
var eventController = require("./Controllers/eventController")

app.use("/api/Login",loginController)
app.use("/api/Perfil",perfilController)
app.use("/api/Emergencies",emergenciesController)
app.use("/api/SingUp", singUpController)
app.use("/api/Event", addEventController)
app.use("/api/Event", eventController)

const port = 3000

app.listen(port,'localhost', ()=> console.log('app start listening on port ' + port))
