var router = require('express').Router()


function helloWorld (req, res) {
    res.send("doing loging")
}

function warmUp(req,res){
    res.send("Login api works")
}

router.get('/doLogin', helloWorld)
router.get('/',warmUp)

module.exports = router