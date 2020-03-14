var cors = require("cors")
var express = require("express")

var app = express()
app.use(cors())

var loginController = require("./Controllers/loginController")



app.use("/api/Login",loginController)
const port = 3000

app.listen(port,'localhost', ()=> console.log('app strat listening on port ' + port))
