var mysql = require('mysql');
var emailService = require('../Services/emailService.js');

const host = 'seguisalut.cckgyqwr0zch.us-east-2.rds.amazonaws.com';
const database = 'SeguiSalut';
const port = '3306';
const user = 'sa';
const password = 'lis7salut';

class EmergenciesService{
    constructor(){
        this.connection = mysql.createConnection({
            host     : host,
            database : database,
            port     : port,
            user     : user,
            password : password
        });
        this.emailService = new emailService();
    }
    sendAvis(req, callback){
        var self = this;
        var response = null;
        console.log(req);

        var Text = "Shan enviat la teva ubicació (latitud: " + req.coordenades.latitud + " longitut: " + req.coordenades.longitut + ") correctament.\n";
        var Text = Text + "Google Maps: https://www.google.com/maps/@" + req.coordenades.latitud + "," + req.coordenades.longitut + ",17z"

        var query = 'SELECT Correu FROM Usuari WHERE Id =' + req.UsuariId;

        this.connection.connect(function(err){
            var response;
            console.log("connected")
            if (!err){
                console.log("connected no error")
                self.connection.query(query, function(error, rows, fields){
                    if (error){
                        response = {
                            serverStatus: 400,
                            correuEnviat: false,
                            msg: 'error connection'
                        };
                        callback(response);
                        return; 
                    }
                    if (rows.length === 1){
                        self.emailService.sendEmail(rows[0].Correu,"Avis rebut", Text,callback)
                    }else{
                        response = {
                            serverStatus: 400,   
                            correuEnviat: false,
                            msg: 'User invalid'
                        };
                        callback(response);
                    }
                });
            }else{
                response = {
                        serverStatus: 400, 
                        correuEnviat: false,
                        msg: 'error connection'
                }; 
                callback(response);
            }
        });          
    }
    sendEmergencia(coordenades, callback){
        console.log(coordenades);
        var response = {
            serverStatus: 200,
            msg: 'correu enviat'
        };
        callback(response)              
    }

}

module.exports = EmergenciesService