var router = require('express').Router()
var service = require('../Services/perfilService.js')

perfilService = new service()

function add (req, res) {
    /*
    perfilService.update(req.body, function(response){
        console.log(response);
        res.status(response.serverStatus).send(response);
    });
    */
   res.send("Perfil add works");
}

function warmUp(req,res){
    res.send("Perfil api works");
}

router.post('/add', add)
router.get('/', warmUp)

module.exports = router