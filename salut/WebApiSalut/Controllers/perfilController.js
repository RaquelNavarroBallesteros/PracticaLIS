var router = require('express').Router()
var service = require('../Services/perfilService.js')

perfilService = new service()

function warmUp(req,res){
    res.send("Perfil api works");
}

function add (req, res) 
{

    console.log("Perfil add call")
    perfilService.update(req.body, 1, function(response){
        console.log(response);
        res.status(response.serverStatus).send(response);
    });
    
   
   //res.send("Perfil add works");
}

router.get('/', warmUp)
router.post('/add', add)

module.exports = router