var mysql = require('mysql');
var configuration = require('../Configuration.js');


class PerfilService{

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
    
    get_by_id(id, callback)
    {
        var self = this

        // Get perfil from 
        var query = 'SELECT * FROM Perfil WHERE Id = \'' + id.id + '\';';
        this.connection.connect(function(err){
            console.log("Get connected")
            var response;
            if (!err)
            {
                console.log("Get connected no error")
                self.connection.query(query, function(error, rows, fields){
                    //self.connection.end()
                    if (error)
                    {
                        response = {
                            serverStatus: 400,
                            correcte: false,
                            data: null,
                            msg: 'error query'
                        };     
                        connection.end()
                        callback(response);                   
                    }
                    else if (rows == 0)
                    {
                        response = {
                            serverStatus: 400,
                            correcte: false,
                            data: null,
                            msg: 'There is no perfil with id = ' + String(id.id)
                        };     
                        callback(response);  
                    }
                    else
                    {
                        response = {
                            serverStatus: 200,
                            correcte: true,
                            data: rows[0],
                            msg: ''
                        };     
                        callback(response);  
                    }
                })
            }
            else
            {
                response = {
                    serverStatus: 400,
                    correcte: false,
                    data: null,
                    msg: 'error connection'
                };     
                callback(response);         
            }
        })
    }

    update(perfil, callback){
        var self = this

        // console.log('Edit perfil service')
        // Get perfil from 
        var query = 'SELECT * FROM Perfil WHERE Id = \'' + perfil.id + '\';';
        this.connection.connect(function(err){
            var response;
            if (!err)
            {
                self.connection.query(query, function(error, rows, fields){
                    if (error)
                    {
                        response = {
                            serverStatus: 400,
                            correct: false,
                            msg: 'error connection'
                        };     
                        callback(response);                   
                    }
                    if (rows.length > 0)
                    {
                        // Perfil existent, editar registre
                        var i_query = `UPDATE Perfil
                        SET Nom = "${perfil.nom}", Cognoms = "${perfil.cognoms}", DataNaixement = "${perfil.data_n}", 
                        Pes = ${perfil.pes}, Alcada = ${perfil.alcada}, Genere = "${perfil.genere}"
                        WHERE Id = ${perfil.id};`

                        response = { 
                            serverStatus: 200,
                            correct: true,
                            msg: ''
                        };
                        callback(response);
                    }else
                    {
                        if (perfil.usuari_id == 0)
                        {
                            response = {
                                serverStatus: 400,
                                correct: false,
                                msg: 'La id del usuari no pot ser 0.'
                            };

                            callback(response); 
                        }
                        else
                        {
                            // Nou perfil, inserir registre
                            var i_query = `INSERT INTO Perfil (UsuariId, Nom, Cognoms, DataNaixement, Pes, Alcada, Genere)`
                            i_query += `VALUES (${perfil.usuari_id}, "${perfil.nom}", "${perfil.cognoms}", "${perfil.data_n}", ${perfil.pes}, ${perfil.alcada}, "${perfil.genere}");`
                            self.connection.query(i_query, function(error, fields){
                                if (error)
                                {
                                    response = {
                                        serverStatus: 400,
                                        correct: false,
                                        msg: 'error connection'
                                    };     
                                    callback(response);                   
                                }
                                else{
                                    response = { 
                                        serverStatus: 200,
                                        correct: true,
                                        msg: ''
                                    };
                                    callback(response);
                                }
                            })
                        }
                    }
                })
            }else
            {
                response = {
                        serverStatus: 400, 
                        correct: false,
                        msg: 'error connection'
                }; 
                callback(response);
            }
        });
    }
}
module.exports = PerfilService