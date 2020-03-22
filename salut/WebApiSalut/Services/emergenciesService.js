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
    sendAvis(coordenades, callback){
        console.log(coordenades);

        var Text = "Shan enviat la teva ubicació (latitud: " + coordenades.latitud + " longitut: " + coordenades.longitut + ") correctament.\n";
        var Text = Text + "Google Maps: https://www.google.com/maps/@" + coordenades.latitud + "," + coordenades.longitut + ",17z"
        this.emailService.sendEmail('seguisalut@protonmail.com',"Avis rebut", Text,callback)
        
        var response = {
            serverStatus: 200,
            msg: 'correu enviat'
        };
        callback(response)              
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