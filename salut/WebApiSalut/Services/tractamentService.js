var mysql = require('mysql');
const host = 'seguisalut.cckgyqwr0zch.us-east-2.rds.amazonaws.com';
const database = 'SeguiSalut';
const port = '3306';
const user = 'sa';
const password = 'lis7salut';

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

    get(id, callback)
    {
        var self = this;
        try 
        {
            this.connection.connect(function(err){
                if (err) 
                    throw "Connection error."
                
                var query = `SELECT * FROM Tractament WHERE Id = ${id.id};
                SELECT * FROM Periodicitat 
                JOIN Medicament ON Periodicitat.MedicamentId = Medicament.Id
                WHERE Periodicitat.TractamentId = ${id.id};`

                self.connection.query(query, function(qerr, rows, fields){
                    if (qerr) 
                        throw "Query error.";
                    if (rows.length == 0)
                        throw "There is no Tractament with the Id specified";

                    var response =  {
                        serverStatus: 200,
                        correcte: true,
                        data: rows[0][0]
                    };     
                    response.data['Medicaments'] = rows[1]

                    callback(response);
                });
            });
        }
        catch(msg) 
        {
            callback({
                serverStatus: 400,
                correcte: false,
                msg: msg
            });     
        }
    }

    get_all(p_id, callback)
    {
        var self = this;
        try 
        {
            this.connection.connect(function(err){
                if (err) 
                    throw "Connection error."
                
                var query = `SELECT * FROM Tractament WHERE PerfilId = ${p_id.id};`;

                self.connection.query(query, function(qerr, rows, fields){
                    if (qerr) 
                        throw "Query error.";

                    var response =  {
                        serverStatus: 200,
                        correcte: true,
                        data: rows
                    };     

                    callback(response);
                });
            });
        }
        catch(msg) 
        {
            callback({
                serverStatus: 400,
                correcte: false,
                msg: msg
            });     
        }
    }

    add(t, callback)
    {
        var self = this;
        try 
        {
            this.connection.connect(function(err){
                if (err) 
                    throw "Connection error."
                    
                var query = `SELECT * FROM Tractament WHERE 
                PerfilId=${t.perfil_id} AND Nom="${t.nom}";`

                self.connection.query(query, function(qerr, rows){
                    if (qerr)
                        throw "Querry error."
                    if (rows.length > 0)
                        throw "Ja existeix un tractament amb el nom especificat."

                    query = `INSERT INTO Tractament VALUES
                    (${0},${t.perfil_id},"${t.data_i}","${t.data_f}","${t.nom}");`
                    
                    self.connection.query(query, function(qerr, r){
                        if (qerr) 
                            throw "Query error.";
                    
                        query = `INSERT INTO Periodicitat VALUES`
                        var i;
                        for (i = 0; i < t.medicaments.length; i++) 
                        {
                            query += `(0, ${r.insertId}, ${t.medicaments[i].medicament_id},
                            ${t.medicaments[i].periode}),`;
                        }
                        query = query.substring(0, query.length-1) + ';'

                        self.connection.query(query, function(qerr, r){
                            if (qerr) 
                                throw "Query error.";
                            
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
        catch(msg) 
        {
            callback({
                serverStatus: 400,
                correcte: false,
                msg: msg
            });     
        }
    }

    update(t, callback)
    {
        var self = this;
        try 
        {
            this.connection.connect(function(err){
                if (err) 
                    throw "Connection error."
                    
                var query = `SELECT * FROM Tractament WHERE 
                PerfilId=${t.perfil_id} AND Nom="${t.nom}";`

                self.connection.query(query, function(qerr, rows){
                    if (qerr)
                        throw "Querry error."
                    if (rows.length > 0)
                        throw "Ja existeix un tractament amb el nom especificat."
                        
                    query = `UPDATE Tractament SET 
                    DataInici="${t.data_i}", DataFinal="${t.data_f}", Nom="${t.nom}")
                    WHERE Id=${t.id};`
                    
                    self.connection.query(query, function(qerr, r){
                        if (qerr) 
                            throw "Query error.";
                        
                        query = `DELETE FROM Periodicitat WHERE 
                        TractamentId=${t.id};`

                        self.connection.query(query, function(qerr, r){
                            
                            if (qerr)
                                throw "Query error."

                            query = `INSERT INTO Periodicitat VALUES`
                            var i;
                            for (i = 0; i < t.medicaments.length; i++) 
                            {
                                query += `(0, ${t.id}, ${t.medicaments[i].medicament_id},
                                ${t.medicaments[i].periode}),`;
                            }
                            query = query.substring(0, query.length-1) + ';'

                            self.connection.query(query, function(qerr, r){
                                if (qerr) 
                                    throw "Query error.";
                                
                                var response =  {
                                    serverStatus: 200,
                                    correcte: true,
                                };

                                callback(response);
                            });
                        });
                    });
                });
            });
        }
        catch(msg) 
        {
            callback({
                serverStatus: 400,
                correcte: false,
                msg: msg
            });     
        }
    }
}

module.exports = TractamentService