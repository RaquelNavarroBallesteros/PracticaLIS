var mysql = require('mysql');
const host = 'seguisalut.cckgyqwr0zch.us-east-2.rds.amazonaws.com';
const database = 'SeguiSalut';
const port = '3306';
const user = 'sa';
const password = 'lis7salut';

class PerfilService{

    constructor(){
        this.connection = mysql.createConnection({
            host     : host,
            database : database,
            port     : port,
            user     : user,
            password : password
        });
    }
    update(perfil, user_id, callback){
        var self = this
        // console.log('login in service')
        // console.log(usuari)

        // console.log('Edit perfil service')
        // Get perfil from 
        var query = 'SELECT * FROM Perfil WHERE Id = \'' + perfil.id + '\';';
        // console.log(query);
        this.connection.connect(function(err){
            var response;
            console.log("connected")
            if (!err)
            {
                console.log("connected no error")
                self.connection.query(query, function(error, rows, fields){
                    // console.log(rows.length);
                    if (error)
                    {
                            console.log("error1")
                            response = {
                                serverStatus: 400,
                                correcte: 'false',
                                msg: 'error connection'
                            };                        
                    }
                    if (rows.length > 0)
                    {
                        // Perfil existent, editar registre
                        var query = 'SELECT * FROM Perfil WHERE Id = \'' + perfil.id + '\';';

                        
                        console.log("Editar registre perfil")
                        response = { 
                            serverStatus: 200,
                            correcte: 'true',
                            msg: ''
                        };
                    }else
                    {
                        // Nou perfil, inserir registre
                        var query = 'INSERT INTO Perfil VALUES Id = \'' + perfil.id + '\';';


                        console.log("Inserir registre perfil")
                        response = { 
                            serverStatus: 200,
                            correcte: 'true',
                            msg: ''
                        };
                    }
                })
            }else
            {
                console.log("Connection error")
                response = {
                        serverStatus: 400, 
                        correcte: 'false',
                        msg: 'error connection'
                }; 
            }
            callback(response);
        });
    }
}

module.exports = PerfilService