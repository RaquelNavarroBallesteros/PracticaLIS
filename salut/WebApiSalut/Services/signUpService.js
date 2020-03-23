var mysql = require('mysql');
const host = 'seguisalut.cckgyqwr0zch.us-east-2.rds.amazonaws.com';
const database = 'SeguiSalut';
const port = '3306';
const user = 'sa';
const password = 'lis7salut';

class SignUpService{

    constructor(){
        this.connection = mysql.createConnection({
            host     : host,
            database : database,
            port     : port,
            user     : user,
            password : password
        });
    }
    addUser(usuari, callback){
        var self = this
        console.log('signing up service')
        console.log(usuari)
        var query = 'INSERT INTO Usuari (Correu, Contrassenya) VALUES (\'' + usuari.correu + '\' , \'' + usuari.psw + '\' );';
        console.log(query);
        this.connection.connect(function(err){
            var response;
            console.log("connected")
            if (!err){
                console.log("connected no error")
                self.connection.query(query, function(error, fields){
                    if (error){
                        console.log("error1")
                        response = {
                            serverStatus: 400,
                            doSignUp: false,
                            msg: 'error connection'
                            };                        
                    }else{
                        response = {
                            serverStatus: 200,
                            doSignUp: true,
                            msg: 'correct'
                            }; 

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


