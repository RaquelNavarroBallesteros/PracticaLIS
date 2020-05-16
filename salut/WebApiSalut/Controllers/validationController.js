var router = require('express').Router();
var service = require('../Services/validationService.js');

function validateEmail(req, res)
{
    var validationService = new service();
    validationService.validateEmail(req.body, function(response){
        res.status(response.serverStatus).send(response)
    });
}

function validateResetPasword(req, res)
{
    var validationService = new service();
    validationService.validateResetPassword(req.body, function(response){
        res.status(response.serverStatus).send(response)
    });
}

function sendEmailResetPassword(req, res)
{
    var validationService = new service();
    validationService.sendEmailResetPassword(req.body, function(response){
        res.status(response.serverStatus).send(response)
    });
}
function sendValidationEmail(req, res)
{
    var validationService = new service();
    validationService.sendValidationEmail(req.body, function(response){
        res.status(response.serverStatus).send(response)
    });
}

router.post('/validateEmail', validateEmail);
router.post('/validateResetPassword', validateResetPasword);
router.post('/sendEmailResetPassword', sendEmailResetPassword);
router.post('/sendValidationEmail', sendValidationEmail);


module.exports = router;