var router = require('express').Router()


function helloWorld (req, res) {
    console.log("hello")
    let respuesta = {
        correcte: 'true',
        msg: 'loging'
    };
    res.send(respuesta)
}

function warmUp(req,res){
    res.send("Login api works")
}

router.get('/doLogin', helloWorld)
router.get('/',warmUp)

module.exports = router