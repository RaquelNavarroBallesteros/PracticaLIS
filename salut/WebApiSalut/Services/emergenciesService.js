var mysql = require('mysql');
var emailService = require('../Services/emailService.js');
var configuration = require('../Configuration.js');


class EmergenciesService{
    constructor(){
        this.config = new configuration();
        var configBD =this.config.getDBConnection();
        this.connection = mysql.createConnection({
            host     : configBD.host,
            database : configBD.database,
            port     : configBD.port,
            user     : configBD.user,
            password : configBD.password
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
    sendEmergencia(req, callback){
        var self = this;
        var perfilInformation = JSON.stringify(req.perfil)

        console.log(req);

        var Text = "Shan enviat la teva ubicació (latitud: " + req.coordenades.latitud + " longitut: " + req.coordenades.longitut + ") correctament.\n";
        Text = Text + "Google Maps: https://www.google.com/maps/@" + req.coordenades.latitud + "," + req.coordenades.longitut + ",17z"
        Text = Text + "Junatment amb les següents dades: " + perfilInformation

        var query = 'SELECT Correu FROM Usuari WHERE Id =' + req.perfil.UsuariId;

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
                        self.emailService.sendEmail(rows[0].Correu,"Emergencia rebuda", Text,callback)
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

}

module.exports = EmergenciesService