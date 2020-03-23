var mysql = require('mysql');
const host = 'seguisalut.cckgyqwr0zch.us-east-2.rds.amazonaws.com';
const database = 'SeguiSalut';
const port = '3306';
const user = 'sa';
const password = 'lis7salut';

class LoginService{

    constructor(){
        this.connection = mysql.createConnection({
            host     : host,
            database : database,
            port     : port,
            user     : user,
            password : password
        });
    }
    doLogin(usuari, callback){
        var self = this
        console.log('login in service')
        console.log(usuari)
        var query = 'SELECT * FROM Usuari WHERE correu = \'' + usuari.correu + '\' and contrassenya = \'' + usuari.contrassenya + '\'';
        console.log(query);
        this.connection.connect(function(err){
            var response;
            console.log("connected")
            if (!err){
                console.log("connected no error")
                self.connection.query(query, function(error, rows, fields){
                    console.log(rows.length);
                    if (error){
                            console.log("error1")
                            response = {
                                serverStatus: 400,
                                doLogin: false,
                                msg: 'error connection'
                            };                        
                    }
                    if (rows.length > 0){
                        console.log("correcte")
                            response = { 
                                serverStatus: 200,
                                doLogin: true,
                                msg: ''
                            };
                    }else{
                        console.log("user invalid")
                            response = {
                                serverStatus: 200,   
                                doLogin: false,
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
                        msg: 'error connection'
                }; 
                callback(response);
            }
        });
    }
}

module.exports = LoginService
