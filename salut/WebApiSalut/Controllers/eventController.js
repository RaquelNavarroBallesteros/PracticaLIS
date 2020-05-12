var router = require('express').Router()
var service = require('../Services/eventService.js');

/*function addEvent (req, res) {
    console.log("addEvent");
    eventService = new service();
    eventService.addEvent(req.body, function (response){
        console.log(response)
        res.status(response.serverStatus).send(response)
    });
}*/
function deleteEvent(req, res){
    console.log("deleteEVENT EN CONTROLLER");
    console.log(req.body);
    eventService = new service();
    eventService.deleteEvent(req.body, function (response){
        console.log(response)
        res.status(response.serverStatus).send(response)
    });
}

function listEvents (req, res) {
    console.log("esto es el req", req.body.id);
    eventService = new service();
    eventService.listEvent(req.body.id, req.body.date, function (response){
        //req.body en vez de 2
        console.log(response)
        res.status(response.serverStatus).send(response)
    });
}

function warmUp(req,res){
    res.send("event api works")
}

//router.post('/addEvent', addEvent)
router.post('/listEvents', listEvents)
router.post('/deleteEvent', deleteEvent)
router.get('/',warmUp)

module.exports = router