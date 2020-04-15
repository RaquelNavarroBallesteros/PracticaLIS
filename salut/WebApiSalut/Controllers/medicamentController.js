var router = require('express').Router()
var service = require('../Services/medicamentService.js')

function warmUp(req,res){
    res.send("Medicament api works");
}

function getall (req, res) 
{
    medicamentService = new service()
    console.log("Medicament getall call")
    medicamentService.get_all(function(response){
        console.log("Medicament getall resp")
        console.log(response);
        res.status(response.serverStatus).send(response);
    });
}

router.get('/', warmUp)
router.post('/getall', getall)

module.exports = router