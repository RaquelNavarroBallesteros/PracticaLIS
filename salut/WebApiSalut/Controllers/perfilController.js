var router = require('express').Router()
var service = require('../Services/perfilService.js')

perfilService = new service()

function warmUp(req,res){
    res.send("Perfil api works");
}

function add (req, res) {
    /*
    perfilService.update(req.body, function(response){
        console.log(response);
        res.status(response.serverStatus).send(response);
    });
    */
   res.send("Perfil add works");
}

function getPerfilById (req, res){
    console.log("getPerfil");
    perfilService.getPerfilById(req.params.perfilId, function (response){
        console.log(response)
        res.status(response.serverStatus).send(response)
    });
}

router.get('/', warmUp)
router.post('/add', add)
router.get('/getPerfilById/:perfilId',getPerfilById)

module.exports = router