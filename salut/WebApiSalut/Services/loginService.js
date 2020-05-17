var contextDB = require('../dbContext.js');


class LoginService{

    constructor(){
        this.connection = contextDB.getConnection();
    }
    doLogin(usuari, callback){
        var self = this
        console.log('login in service')
        console.log(usuari)
        var query = 'SELECT * FROM Usuari WHERE correu = \'' + usuari.correu + '\' and contrasenya =  MD5(\''+usuari.contrassenya+'\') ';
        console.log(query);
        this.connection.query(query, function(error, rows, fields){
            var response = null;
            if (error){
                    console.log("error1")
                    response = {
                        serverStatus: 400,
                        doLogin: false,
                        idUsuari: -1,
                        activat: false,
                        msg: 'error connection'
                    };                        
            }else if(rows.length > 0){
                console.log(rows[0].validacioCorreu);
                console.log("correcte")
                    response = { 
                        serverStatus: 200,
                        doLogin: true,
                        idUsuari: rows[0].Id,
                        activat: rows[0].validacioCorreu == null ? true : false,
                        msg: ''
                    };
            }else{
                console.log("user invalid")
                    response = {
                        serverStatus: 200,   
                        doLogin: false,
                        idUsuari: -1,
                        activat: false,
                        msg: 'Invalid user or password'
                    };
            }
            callback(response);
        })
    }
}

module.exports = LoginService
