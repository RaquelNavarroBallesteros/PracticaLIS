var router = require('express').Router()

function hello (req, res) {
    console.log("PerfilController says hello!")
    let respuesta = {
        correcte: 'true',
        msg: 'Pagina de perfil'
    };
    res.send(respuesta)
}

function warmUp(req,res){
    res.send("Profile controller is working")
}

router.get('/hello', hello)
router.get('/',warmUp)

module.exports = router