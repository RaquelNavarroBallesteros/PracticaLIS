var contextDB = require('../dbContext.js');
var emailService = require('../Services/emailService.js');

class ValidationService{
    constructor(){
        this.connection = contextDB.getConnection();
        this.emailService = new emailService();
    }
    validateResetPassword(validation, callback)
    {
        var self = this;
        var query = 'SELECT * FROM Usuari WHERE correu = \'' + validation.correu + '\' and validacioContrassenya = MD5(\''+validation.codi+'\') ';
        console.log(query);
        var validationInfo = validation;
        this.connection.query(query, function(error, rows, fields){
            console.log(rows);
            var response = null;
            if (error){
                response = {
                    serverStatus: 400,
                    doValidation: false,
                    msg: 'error connection'
                };
            }else if(rows.length > 0){
                response = { 
                    serverStatus: 200,
                    doValidation: true,
                    msg: ''
                };
                var secondQuery = 'UPDATE Usuari set Contrasenya = MD5(\'' + validationInfo.psw + '\'), validacioContrassenya = null WHERE id =' + rows[0].Id + ';';
                console.log(secondQuery);
                self.connection.query(secondQuery, function(error, rows, fields){});
            }else{
                response = { 
                    serverStatus: 200,
                    doValidation: false,
                    msg: 'Clau incorrecte'
                };
            }
            callback(response);
        });
    }
    validateEmail(validation, callback)
    {
        var query = 'SELECT * FROM Usuari WHERE correu = \'' + validation.correu + '\' and validacioCorreu = MD5(\''+validation.codi+'\') ';
        var self = this;
        console.log(query);
        this.connection.query(query, function(error, rows, fields){
            var response = null;
            console.log(rows);
            if (error){
                response = {
                    serverStatus: 400,
                    doValidation: false,
                    msg: 'error connection'
                };
            }else if(rows.length > 0){
                response = { 
                    serverStatus: 200,
                    doValidation: true,
                    msg: ''
                };
                var secondQuery = 'UPDATE Usuari set validacioCorreu = null WHERE id = \'' + rows[0].Id + '\';';
                self.connection.query(secondQuery, function(error, rows, fields){});
            }else{
                response = { 
                    serverStatus: 200,
                    doValidation: false,
                    msg: 'Clau incorrecte'
                };
            }
            callback(response);
        });
    }
    sendEmailResetPassword(email, callback)
    {
        var number = Math.floor(10000 + Math.random() * 50000);
        var response = null;
        var self = this;
        var Text = "Hem rebut una sol·licitud per restaurar la contrassenya a l'aplicació SeguiSalut, la clau reuqrida és: " + number;
        var query = 'UPDATE Usuari set validacioContrassenya = MD5(\'' + number + '\') WHERE correu = \'' + email.correu + '\';';
        this.connection.query(query, function(error, rows, fields){
            if (error){
                response = {
                    serverStatus: 400,
                    resetContrassenya: false,
                    msg: 'error connection'
                };
                callback(response);
                return; 
            }

            if (rows.affectedRows > 0){
                response = {
                    serverStatus: 200,   
                    resetContrassenya: true,
                    msg: ''
                };
                self.emailService.sendEmail(email.correu,"Restaurar contrassenya", Text,callback)
            }else{
                response = {
                    serverStatus: 200,   
                    resetContrassenya: false,
                    msg: 'Correu invalid'
                };
                callback(response);
            }
        });  
    }
    sendValidationEmail(email, callback)
    {
        console.log("sendValidationEmail");
        var self = this;
        var response = null;
        var number = Math.floor(10000 + Math.random() * 50000);
        var Text = "El codi per a l'activació del correu és el següent: " + number;
        var query = 'UPDATE Usuari set validacioCorreu =  MD5(\'' + number + '\') WHERE correu = \'' + email.correu + '\';';
        console.log(query);
        this.connection.query(query, function(error, rows, fields){
            if (error){
                response = {
                    serverStatus: 400,
                    validacioCorreu: false,
                    msg: 'error connection'
                };
                callback(response);
                return; 
            }
            if (rows.affectedRows > 0){
                response = {
                    serverStatus: 200,   
                    validacioCorreu: true,
                    msg: ''
                };
                self.emailService.sendEmail(email.correu,"Validació correu", Text,callback)
            }else{
                response = {
                    serverStatus: 200,   
                    validacioCorreu: false,
                    msg: 'Correu invalid'
                };
                callback(response);
            }
        });  
    }
}


module.exports = ValidationService