var mysql = require('mysql');
var configuration = require('../Configuration.js');



class SignUpService{
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
    addUser(usuari, callback){
        var self = this
        console.log('signUpService_addUser -- signing up service')
        console.log(usuari)
        var query = 'SELECT * FROM Usuari WHERE Correu = \'' + usuari.correu + '\';';
        console.log(query);
        this.connection.connect(function(err){
            var response;
            if (!err){
                console.log("signUpService_addUser -- connected no error")
                self.connection.query(query, function(error,  rows, fields){
                    
                    console.log('signUpService_addUser -- estas son las filas: ', rows);
                    if (error){
                        console.log("signUpService_addUser -- error1")
                        response = {
                            serverStatus: 400,
                            doSignUp: false,
                            msg: 'error connection'
                        };                        
                    }else{
                        if (rows.length <= 0){
                            console.log('signUpService_addUser -- adding user that does not exist');
                            var query1 = 'INSERT INTO Usuari (Correu, Contrassenya) VALUES (\'' + usuari.correu + '\' , MD5(\'' + usuari.psw + '\') );';
                            console.log(query1);
                            self.connection.query(query1, function(error, fields){
                                if (error){
                                    console.log("signUpService_addUser -- error1")
                                    response = {
                                        serverStatus: 400,
                                        doSignUp: false,
                                        msg: 'error connection'
                                    };    
                                }
                            })
                            response = {
                                serverStatus: 200,
                                doSignUp: true,
                                msg: 'correct'
                            }; 
                        }else{
                            console.log('signUpService_addUser -- the selected user exists');
                            response = {
                                serverStatus: 300,
                                doSignUp: false,
                                msg: 'user exists'
                            };
                        }
                    }
                    callback(response);
                })
            }else{
                console.log("connected error")
                response = {
                    serverStatus: 400, 
                    doSignUp: false,
                    msg: 'error connection'
                }; 
                callback(response);
            }
        });
    }
}

module.exports = SignUpService


