var router = require('express').Router()
var service = require('../Services/loginService.js');


function doLogin (req, res) {
    console.log("doing login");
    var loginService = new service();
    loginService.doLogin(req.body, function (response){
        console.log(response)
        res.status(response.serverStatus).send(response)
    });
}

function warmUp(req,res){
    console.log("login");
    res.send("Login api works")
}

router.post('/doLogin', doLogin)
router.get('/',warmUp)

module.exports = router