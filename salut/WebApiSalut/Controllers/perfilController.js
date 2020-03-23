var router = require('express').Router()
var service = require('../Services/perfilService.js')

perfilService = new service()

function warmUp(req,res){
    res.send("Perfil api works");
}

function add (req, res) 
{

    console.log("Perfil add call")
    perfilService.update(req.body, function(response){
        console.log(response);
        res.status(response.serverStatus).send(response);
    });
    
   
   //res.send("Perfil add works");
}

function get (req, res) 
{
    perfilService.get_by_id(req.body, function(response){
        console.log(response);
        res.status(response.serverStatus).send(response);
    });
    
   
   //res.send("Perfil add works");
}

router.get('/', warmUp)
router.post('/add', add)
router.post('/get', get)

module.exports = router