var router = require('express').Router()
var service = require('../Services/perfilService.js')

function warmUp(req,res){
    res.send("Perfil api works");
}

function getall(req, res)
{
    console.log("getall call");
    perfilService = new service()
    perfilService.get_all(req.body, function(response){
        // console.log(response);
        res.status(response.serverStatus).send(response);
    });
}

function add (req, res) {
    perfilService = new service()
    console.log("Perfil add call")
    perfilService.add(req.body, function(response){
        console.log(response);
        res.status(response.serverStatus).send(response);
    });
}

function update (req, res) {
    perfilService = new service()
    console.log("Perfil add call")
    perfilService.update(req.body, function(response){
        console.log(response);
        res.status(response.serverStatus).send(response);
    });
}

function get (req, res) 
{
    console.log("get call");
    perfilService = new service()
    perfilService.get_by_id(req.body, function(response){
        // console.log(response);
        res.status(response.serverStatus).send(response);
    });
}


router.get('/', warmUp)
router.post('/add', add)
router.post('/update', update)
router.post('/get', get)

module.exports = router