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
    doLogin(usuari){
        console.log('login in service')
        console.log(usuari)
        var query = 'SELECT * FROM Usuari WHERE correu = \'' + usuari.correu + '\' and contrassenya = \'' + usuari.contrassenya + '\'';
        console.log(query);
        this.connection.connect(function(err){
            console.log("connected")
            if (!err){
                console.log("connected no error")
                this.connection.query(query, function(error, rows, fields){
                    console.log(fields);
                    if (error){
                        return {
                            serverStatus: 400,
                            correcte: 'false',
                            msg: 'error connection'
                        };
                    }
                    if (rows.lenght > 0){
                        return {    
                            serverStatus: 200,
                            correcte: 'true',
                            msg: ''
                        };
                    }else{
                        return { 
                            serverStatus: 200,   
                            correcte: 'false',
                            msg: 'Invalid user or password'
                        };
                    }
        
                })
            }else{
                console.log("connected error")
                return {   
                    serverStatus: 400, 
                    correcte: 'false',
                    msg: 'error connection'
                }; 
            }
        });


    }
}

module.exports = LoginService
