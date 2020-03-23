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

    get_by_id(id, callback)
    {
        console.log(id)
        console.log(id.id)
        var self = this

        // Get perfil from 
        var query = 'SELECT * FROM Perfil WHERE Id = \'' + id.id + '\';';
        this.connection.connect(function(err){
            var response;
            if (!err)
            {
                self.connection.query(query, function(error, rows, fields){
                    console.log(rows)
                    if (error)
                    {
                        response = {
                            serverStatus: 400,
                            correcte: 'false',
                            data: null,
                            msg: 'error query'
                        };     
                        callback(response);                   
                    }
                    else if (rows == 0)
                    {
                        response = {
                            serverStatus: 400,
                            correcte: 'false',
                            data: null,
                            msg: 'There is no perfil with id = ' + String(id.id)
                        };     
                        callback(response);  
                    }
                    else
                    {
                        response = {
                            serverStatus: 200,
                            correcte: 'true',
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
                    correcte: 'false',
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
                            correcte: 'false',
                            msg: 'error connection'
                        };     
                        callback(response);                   
                    }
                    if (rows.length > 0)
                    {
                        // Perfil existent, editar registre
                        var query = 'SELECT * FROM Perfil WHERE Id = \'' + perfil.id + '\';';

                        
                        response = { 
                            serverStatus: 200,
                            correcte: 'true',
                            msg: ''
                        };
                        callback(response);
                    }else
                    {
                        // Nou perfil, inserir registre
                        var i_query = `INSERT INTO Perfil (UsuariId, Nom, Cognoms, DataNaixement, Pes, Alcada, Genere)`
                        i_query += `VALUES (${perfil.usuari_id}, "${perfil.nom}", "${perfil.cognoms}", "${perfil.data_n}", ${perfil.pes}, ${perfil.alcada}, "${perfil.genere}");`
                        self.connection.query(i_query, function(error, fields){
                            if (error)
                            {
                                response = {
                                    serverStatus: 400,
                                    correcte: 'false',
                                    msg: 'error connection'
                                };     
                                callback(response);                   
                            }
                            else{
                                response = { 
                                    serverStatus: 200,
                                    correcte: 'true',
                                    msg: ''
                                };
                                callback(response);
                            }
                        })
                    }
                })
            }else
            {
                response = {
                        serverStatus: 400, 
                        correcte: 'false',
                        msg: 'error connection'
                }; 
                callback(response);
            }
        });
    }
}

module.exports = PerfilService