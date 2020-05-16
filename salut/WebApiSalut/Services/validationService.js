var contextDB = require('../dbContext.js');
var emailService = require('../Services/emailService.js');

class ValidationService{
    constructor(){
        this.connection = contextDB.getConnection();
        this.emailService = new emailService();
    }
    validateResetPasword(validation, callback)
    {
        var query = 'SELECT * FROM Usuari WHERE correu = \'' + validation.correu + '\' and validacioContrassenya = MD5(\''+validation.codi+'\') ';
        this.connection.query(query, function(error, rows, fields){
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
                var secondQuery = 'INSERT INTO Usuari (validacioContrassenya) VALUES (null) WHERE id = \'' + rows[0].id + '\';';
                this.connection.query(secondQuery, function(error, rows, fields){});
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
        this.connection.query(query, function(error, rows, fields){
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
                var secondQuery = 'INSERT INTO Usuari (validacioCorreu) VALUES (null) WHERE id = \'' + rows[0].id + '\';';
                this.connection.query(secondQuery, function(error, rows, fields){});
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
        var Text = "Hem rebut una sol·licitud per restaurar la contrassenya a l'aplicació SeguiSalut, la clau reuqrida és: " + number;
        var query = 'INSERT INTO Usuari (validacioContrassenya) VALUES (MD5(\'' + number + '\') ) WHERE correu = \'' + email.correu + '\';';
        self.connection.query(query, function(error, rows, fields){
            if (error){
                response = {
                    serverStatus: 400,
                    resetContrassenya: false,
                    msg: 'error connection'
                };
                callback(response);
                return; 
            }
            if (fields.insertId){
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
        var number = Math.floor(10000 + Math.random() * 50000);
        var Text = "El codi per a l'activació del correu és el següent: " + number;
        var query = 'INSERT INTO Usuari (validacioCorreu) VALUES (MD5(\'' + number + '\') ) WHERE correu = \'' + email.correu + '\';';
        self.connection.query(query, function(error, rows, fields){
            if (error){
                response = {
                    serverStatus: 400,
                    validacioCorreu: false,
                    msg: 'error connection'
                };
                callback(response);
                return; 
            }
            if (fields.insertId){
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