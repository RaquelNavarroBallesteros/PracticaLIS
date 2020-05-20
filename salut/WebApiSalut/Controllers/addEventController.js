var router = require('express').Router()
var service = require('../Services/addEventService.js');

function addNewEvent (req, res) {
    console.log("addEvent");
    eventService = new service();
    eventService.addEvent(req.body.infoEvent, req.body.id, function (response){
        console.log(response)
        res.status(response.serverStatus).send(response)
    });
}

function updateEvent (req, res) {
    console.log("updateEvent");
    eventService = new service();
    eventService.updateEvent(req.body.infoEvent, req.body.id, function (response){
        console.log(response)
        res.status(response.serverStatus).send(response)
    });
}

function warmUp(req,res){
    res.send("event api works")
}

router.post('/addNewEvent', addNewEvent)
router.post('/updateEvent', updateEvent)
router.get('/',warmUp)

module.exports = router