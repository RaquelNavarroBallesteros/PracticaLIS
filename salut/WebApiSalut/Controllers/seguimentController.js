var router = require('express').Router()
var service = require('../Services/seguimentService.js')

function warmUp(req,res){
    res.send("Seguiment api works");
}

function addpes (req, res) {
    seguimentService = new service()
    console.log("Add pes call");
    seguimentService.add_pes(req.body, function(response){
        console.log("Pes add resp")
        console.log(response);
        res.status(response.serverStatus).send(response);
    });
}

function addalcada (req, res) {
    seguimentService = new service()
    console.log("Add alcada call");
    seguimentService.add_alcada(req.body, function(response){
        console.log("Alcada add resp")
        console.log(response);
        res.status(response.serverStatus).send(response);
    });
}

function getallpes (req, res) 
{
    seguimentService = new service()
    console.log("Pes getall call")
    seguimentService.get_all_pes(req.body, function(response){
        console.log("Pes get all resp");
        console.log(response);
        res.status(response.serverStatus).send(response);
    });
}

function getallalcada (req, res) 
{
    seguimentService = new service()
    console.log("Alcada getall call")
    seguimentService.get_all_alcada(req.body, function(response){
        console.log("Alcada get all resp");
        console.log(response);
        res.status(response.serverStatus).send(response);
    });
}

router.get('/', warmUp)
router.post('/addpes', addpes)
router.post('/addalcada', addalcada)
router.post('/getallpes', getallpes)
router.post('/getallalcada', getallalcada)

module.exports = router