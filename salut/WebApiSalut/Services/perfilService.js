var mysql = require('mysql');
const host = 'seguisalut.czcghz2fiq3g.us-east-1.rds.amazonaws.com';
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

    error(msg)
    {
        return {
            serverStatus: 400,
            correcte: false,
            msg: msg
        };     
    }
    
    get_by_id(id, callback)
    {
        var self = this

        // Get perfil from 
        var query = 'SELECT * FROM Perfil WHERE Id = \'' + id.id + '\';';
        this.connection.connect(function(err){
            var response;
            if (err)
            {
                callback(self.error("Connection error."));
                return;
            }

            self.connection.query(query, function(error, rows, fields){
                //self.connection.end()
                if (error)
                {
                    callback(self.error("Query error."));
                    return;
                }
                if (rows == 0)
                {
                    callback(self.error("No register found."));
                    return;
                }
               
                var i_query = `SELECT * FROM Alergia WHERE PerfilId = ${id.id};`;
                self.connection.query(i_query, function(i_error, i_rows, i_fields){
                    if (i_error)
                    {
                        callback(self.error("Query error."));
                        return;
                    }
                    
                    response = {
                        serverStatus: 200,
                        correcte: true,
                        data: rows[0],
                        msg: ''
                    };    
                    
                    response.data['Allergies'] = i_rows;                            
                    callback(response); 
                }); 
            });
        });
    }

    add(perfil, callback)
    {
        var self = this;

        this.connection.connect(function(err)
        {
            if (err)
            {
                callback(self.error("Connection error."));
                return;
            }
            if (perfil.usuari_id == 0)
            {
                callback(self.error("L'Id de l'usuari no pot ser 0."));
                return;
            }
            
            var i_query = `INSERT INTO Perfil (UsuariId, Nom, Cognoms, DataNaixement, Pes, Alcada, Genere)`
            i_query += `VALUES (${perfil.usuari_id}, "${perfil.nom}", "${perfil.cognoms}", "${perfil.data_n}", ${perfil.pes}, ${perfil.alcada}, "${perfil.genere}");`
            console.log(i_query);
            self.connection.query(i_query, function(error, r)
            {
                if (error)
                {
                    callback(self.error("Query error."));
                    return;
                }
                
                if (perfil.allergies.length > 0)
                {
                    var a_query =
                    `INSERT INTO Alergia (
                    Id,
                    Nom,
                    Descripcio,
                    PerfilId
                    )
                    VALUES`;

                    var i;
                    for (i = 0; i < perfil.allergies.length; i++) {
                        a_query += `(0, "${perfil.allergies[i].nom}", "${perfil.allergies[i].descripcio}",
                        ${r.insertId}),`;
                    }
                    a_query = a_query.substring(0, a_query.length-1) + ';'
                    console.log(a_query);
                    self.connection.query(a_query, function(error, fields)
                    {
                        console.log("here");
                        if (error)
                        {
                            callback(self.error("Query error."));
                            return;
                        }

                        var response = { 
                            serverStatus: 200,
                            correct: true,
                        };
                        callback(response);
                    });
                }
                else
                {
                    var response = { 
                        serverStatus: 200,
                        correct: true,
                    };
                    callback(response);
                }
            });
        });
    }

    update(perfil, callback)
    {
        var self = this;

        // console.log('Edit perfil service')
        // Get perfil from 
        var query = 'SELECT * FROM Perfil WHERE Id = \'' + perfil.id + '\';';
        this.connection.connect(function(err)
        {
            if (err)
            {
                callback(self.error("Connection error."));
                return;
            }
            if (perfil.usuari_id == 0)
            {
                callback(self.error("L'Id de l'usuari no pot ser 0."));
                return;
            }

            self.connection.query(query, function(error, rows, fields)
            {
                if (error)
                {
                    callback(self.error("Query error."));
                    return;
                }
                if (rows.length != 1)
                {
                    callback(self.error("El perfil modificat no existeix."));
                    return;
                }
            
                var i_query = `UPDATE Perfil SET Nom="${perfil.nom}", Cognoms="${perfil.cognoms}", 
                DataNaixement="${perfil.data_n}", Pes=${perfil.pes}, Alcada=${perfil.alcada}, Genere="${perfil.genere}"
                WHERE Id=${perfil.id}`
                
                self.connection.query(i_query, function(error, r)
                {
                    if (error)
                    {
                        callback(self.error("Query error."));
                        return;
                    }
                    
                    var ad_query = `DELETE FROM Alergia WHERE PerfilId = ${perfil.id};`
                    self.connection.query(ad_query, function(error, dr)
                    {
                        if (error)
                        {
                            callback(self.error("Query error."));
                            return;
                        }

                        if (perfil.allergies.length > 0)
                        {
                            var a_query =
                            `INSERT INTO Alergia (
                            Id,
                            Nom,
                            Descripcio,
                            PerfilId
                            )
                            VALUES`;

                            var i;
                            for (i = 0; i < perfil.allergies.length; i++) {
                                a_query += `(0, "${perfil.allergies[i].nom}", "${perfil.allergies[i].descripcio}",
                                ${perfil.id}),`;
                            }
                            a_query = a_query.substring(0, a_query.length-1) + ';'
                            console.log(a_query);
                            self.connection.query(a_query, function(error, fields)
                            {
                                console.log("here");
                                if (error)
                                {
                                    callback(self.error("Query error."));
                                    return;
                                }

                                var response = { 
                                    serverStatus: 200,
                                    correct: true,
                                };
                                callback(response);
                            });
                        }
                        else
                        {
                            var response = { 
                                serverStatus: 200,
                                correct: true,
                            };
                            callback(response);
                        }
                    });
                });
            });
        });
    }
}
module.exports = PerfilService