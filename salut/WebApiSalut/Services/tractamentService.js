var mysql = require('mysql');
const host = 'seguisalut.czcghz2fiq3g.us-east-1.rds.amazonaws.com';
const database = 'SeguiSalut';
const port = '3306';
const user = 'sa';
const password = 'lis7salut';

// TODO: return a tot arreu

class TractamentService
{
    constructor(){
        this.connection = mysql.createConnection({
            host     : host,
            database : database,
            port     : port,
            user     : user,
            password : password,
            multipleStatements: true
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
    get(id, callback)
    {
        var self = this;
        this.connection.connect(function(err){
            if (err) 
            {
                callback(self.error("Connection error."));
                return;
            }
            
            var query = `SELECT * FROM Tractament WHERE Id = ${id.id};
            SELECT * FROM Periodicitat 
            WHERE TractamentId = ${id.id};`

            self.connection.query(query, function(qerr, rows, fields){
                if (qerr) 
                {
                    callback(self.error("Query error."));
                    return;
                }
                if (rows.length == 0)
                {
                    callback(self.error("There is no Tractament with the Id specified"));
                    return;
                }
    
                var response =  {
                    serverStatus: 200,
                    correcte: true,
                    data: rows[0][0]
                };     
                response.data['Medicaments'] = rows[1];
                callback(response);
            });
        });
    }

    get_all(p_id, callback)
    {
        var self = this;
        this.connection.connect(function(err){
            if (err) 
            {
                callback(self.error("Connection error."));
                return;
            }
                
            var query = `SELECT * FROM Tractament WHERE PerfilId = ${p_id.id};`;

            self.connection.query(query, function(qerr, rows, fields){
                if (qerr) 
                    callback(self.error("Query error."));

                var response =  {
                    serverStatus: 200,
                    correcte: true,
                    data: rows
                };     
                callback(response);
            });
        });
    }

    add(t, callback)
    {
        var self = this;
        this.connection.connect(function(err){
            if (err) 
            {
                callback(self.error("Connection error."));
                return;
            }
                
                
            var query = `SELECT * FROM Tractament WHERE 
            PerfilId=${t.perfil_id} AND Nom="${t.nom}";`

            self.connection.query(query, function(qerr, rows){
                if (qerr)
                {
                    callback(self.error("Query error."));
                    return;
                }
                if (rows.length > 0)
                {
                    callback(self.error("Ja existeix un tractament amb el nom especificat."));
                    return;
                }

                query = `INSERT INTO Tractament VALUES
                (${0},${t.perfil_id},"${t.data_i}","${t.data_f}","${t.nom}");`
                
                console.log(query);
                self.connection.query(query, function(qerr, r){
                    if (qerr) 
                    {
                        callback(self.error("Query error."));
                        return;
                    };
                    query = `INSERT INTO Periodicitat VALUES`
                    var i;
                    for (i = 0; i < t.medicaments.length; i++) 
                    {
                        query += `(0, ${r.insertId}, ${t.medicaments[i].idM},
                        ${t.medicaments[i].periode}),`;
                    }
                    query = query.substring(0, query.length-1) + ';'

                    self.connection.query(query, function(qerr, r){
                        if (qerr) 
                        {
                            callback(self.error("Query error."));
                            return;
                        }
                            
                        var response =  {
                            serverStatus: 200,
                            correcte: true,
                        };     
                        callback(response);
                    });
                });
            });
        });
    }

    update(t, callback)
    {
        var self = this;
        this.connection.connect(function(err){
            if (err) 
            {
                callback(self.error("Connection error."));
                return;
            }
                
            var query = `SELECT * FROM Tractament WHERE 
            PerfilId=${t.perfil_id} AND Nom="${t.nom}" AND Id!=${t.id};`

            self.connection.query(query, function(qerr, rows){
                if (qerr)
                {
                    callback(self.error("Query error."));
                    return;
                }
                if (rows.length > 0)
                {
                    callback(self.error("Ja existeix un tractament amb el nom especificat."));
                    return;
                }
                query = `UPDATE Tractament SET 
                DataInici="${t.data_i}", DataFinal="${t.data_f}", Nom="${t.nom}"
                WHERE Id=${t.id};`
                self.connection.query(query, function(qerr, r){
                    if (qerr) 
                    {
                        callback(self.error("Query error."));
                        return;
                    }
                        
                    query = `DELETE FROM Periodicitat WHERE 
                    TractamentId=${t.id};`

                    self.connection.query(query, function(qerr, r){
                        
                        if (qerr)
                        {
                            callback(self.error("Query error."));
                            return;
                        }
                            
                        query = `INSERT INTO Periodicitat VALUES`
                        var i;
                        for (i = 0; i < t.medicaments.length; i++) 
                        {
                            query += `(0, ${t.id}, ${t.medicaments[i].idM},
                            ${t.medicaments[i].periode}),`;
                        }
                        query = query.substring(0, query.length-1) + ';'

                        self.connection.query(query, function(qerr, r){
                            if (qerr) 
                            {
                                callback(self.error("Query error."));
                                return;
                            }
                                
                            var response =  {
                                serverStatus: 200,
                                correcte: true,
                            };
                            console.log(response);
                            callback(response);
                        });
                    });
                });
            });
        });
    }
}

module.exports = TractamentService