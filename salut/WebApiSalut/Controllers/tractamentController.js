var router = require('express').Router()
var service = require('../Services/tractamentService.js')

function warmUp(req,res){
    res.send("Tractament api works");
}

function add (req, res) {
    tractamentService = new service()
    console.log("Tractament add call")
    tractamentService.add(req.body, function(response){
        console.log(response);
        res.status(response.serverStatus).send(response);
    });
}

function update (req, res) {
    tractamentService = new service()
    console.log("Tractament update call")
    tractamentService.update(req.body, function(response){
        console.log(response);
        res.status(response.serverStatus).send(response);
    });
}

function get (req, res) 
{
    tractamentService = new service()
    console.log("Tractament get call")
    tractamentService.get(req.body, function(response){
        console.log(response);
        res.status(response.serverStatus).send(response);
    });
}


router.get('/', warmUp)
router.post('/add', add)
router.post('/update', update)
router.post('/get', get)

module.exports = router