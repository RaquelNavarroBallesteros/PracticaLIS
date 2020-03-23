var router = require('express').Router()
var service = require('../Services/signUpService.js')



function addUser (req, res) {
    // curl
    console.log("doing signup desde el controller");
    signUpService = new service();
    signUpService.addUser(req.body, function (response){
        console.log(response)
        res.status(response.serverStatus).send(response)
    });
}

function warmUp(req,res){
    res.send("Sign up from WarmUp works")
}

router.post('/addUser', addUser)
router.get('/',warmUp)

module.exports = router