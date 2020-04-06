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
                            msg: 'Perfil query error'
                        };     
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
                        var i_query = `SELECT * FROM Alergia WHERE PerfilId = ${id.id};`;
                        self.connection.query(i_query, function(i_error, i_rows, i_fields){
                            if (i_error)
                            {
                                response = {
                                    serverStatus: 400,
                                    correcte: false,
                                    data: null,
                                    msg: 'Allergies query error'
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
                                
                                response.data['Allergies'] = i_rows;                            
                                callback(response); 
                            }
                        }); 
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

                        var ad_query = `DELETE FROM Perfil WHERE Id = ${perfil.id};`
                        var ai_query = `INSERT INTO Alergia (
                            Id,
                            Nom,
                            Descripcio,
                            PerfilId
                            )
                            VALUES`;

                            var i;
                            for (i = 0; i < cars.length; i++) {
                                ai_query += `(0, ${perfil.allergies[i].nom}, ${perfil.allergies[i].desc},
                                ${perfil.usuari_id}),`;
                            }
                        
                        // EDITAR REGISTRE I ELIMINAR I INSERIR ALERGIES

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
                                    // TODO: Testeig insert alergies
                                    var a_query
                                    `INSERT INTO Alergia (
                                    Id,
                                    Nom,
                                    Descripcio,
                                    PerfilId
                                    )
                                    VALUES`;

                                    var i;
                                    for (i = 0; i < cars.length; i++) {
                                        a_query += `(0, ${perfil.allergies[i].nom}, ${perfil.allergies[i].desc},
                                        ${perfil.usuari_id}),`;
                                    }

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