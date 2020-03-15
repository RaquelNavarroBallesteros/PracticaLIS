var cors = require("cors")
var express = require("express")

var app = express()
app.use(cors())

var loginController = require("./Controllers/loginController")
var perfilController = require("./Controllers/perfilController")



app.use("/api/Login",loginController)
app.use("/perfil",perfilController)

const port = 3000

app.listen(port,'localhost', ()=> console.log('app strat listening on port ' + port))
