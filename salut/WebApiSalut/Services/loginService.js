var mysql = require('mysql');
var configuration = require('../Configuration.js');


class LoginService{

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
    }
    doLogin(usuari, callback){
        var self = this
        console.log('login in service')
        console.log(usuari)
        var query = 'SELECT * FROM Usuari WHERE correu = \'' + usuari.correu + '\' and contrasenya =  MD5(\''+usuari.contrassenya+'\') ';
        console.log(query);
        this.connection.connect(function(err){
            var response;
            console.log("connected")
            if (!err){
                console.log("connected no error")
                self.connection.query(query, function(error, rows, fields){
                    if (error){
                            console.log("error1")
                            response = {
                                serverStatus: 400,
                                doLogin: false,
                                msg: 'error connection'
                            };                        
                    }else if(rows.length > 0){
                        console.log("correcte")
                            response = { 
                                serverStatus: 200,
                                doLogin: true,
                                idUsuari: rows[0].Id,
                                msg: ''
                            };
                    }else{
                        console.log("user invalid")
                            response = {
                                serverStatus: 200,   
                                doLogin: false,
                                idUsuari: -1,
                                msg: 'Invalid user or password'
                            };
                    }
                    callback(response);
                })
            }else{
                console.log("connected error")
                response = {
                        serverStatus: 400, 
                        doLogin: false,
                        idUsuari: -1,
                        msg: 'error connection'
                }; 
                callback(response);
            }
        });
    }
}

module.exports = LoginService
