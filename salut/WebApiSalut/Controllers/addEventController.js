var router = require('express').Router()
var service = require('../Services/addEventService.js');

function addNewEvent (req, res) {
    console.log("addEvent");
    eventService = new service();
    eventService.addEvent(req.body, function (response){
        console.log(response)
        res.status(response.serverStatus).send(response)
    });
}


function warmUp(req,res){
    res.send("event api works")
}

router.post('/addNewEvent', addNewEvent)
router.get('/',warmUp)

module.exports = router