var router = require('express').Router()
var service = require('../Services/emergenciesService.js');

function sendAvis (req, res) {
    console.log("sendAvis");
    emergenciaService = new service();
    emergenciaService.sendAvis(req.body, function (response){
        console.log(response)
        res.status(response.serverStatus).send(response)
    });
}

function sendEmergencia (req, res) {
    console.log("sendEmergencia");
    emergenciaService = new service();
    emergenciaService.sendEmergencia(req.body, function (response){
        console.log(response)
        res.status(response.serverStatus).send(response)
    });
}

function warmUp(req,res){
    res.send("emergencies api works")
}

router.post('/emergencia', sendEmergencia)
router.post('/avis', sendAvis)
router.get('/',warmUp)

module.exports = router