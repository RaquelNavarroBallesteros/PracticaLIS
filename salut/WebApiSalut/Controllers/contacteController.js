var router = require('express').Router()
var service = require('../Services/contacteService.js')

function warmUp(req,res){
    res.send("Contacte api works");
}

function add (req, res) {
    contacteService = new service()
    console.log("Contacte add call")
    contacteService.add(req.body, function(response){
        console.log("Contacte add resp")
        console.log(response);
        res.status(response.serverStatus).send(response);
    });
}

function del (req, res) {
    contacteService = new service()
    console.log("Contacte delete call")
    contacteService.del(req.body, function(response){
        console.log("Contacte update resp")
        console.log(response);
        res.status(response.serverStatus).send(response);
    });
}

function getall (req, res) 
{
    contacteService = new service()
    console.log("Contacte getall call")
    contacteService.get_all(req.body, function(response){
        console.log("Contacte get all resp");
        console.log(response);
        res.status(response.serverStatus).send(response);
    });
}

router.get('/', warmUp)
router.post('/add', add)
router.post('/del', del)
router.post('/getall', getall)

module.exports = router