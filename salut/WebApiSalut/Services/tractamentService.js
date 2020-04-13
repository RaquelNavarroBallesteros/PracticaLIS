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

                    return response;
                });
            });
        }
        catch(msg) 
        {
            return {
                serverStatus: 400,
                correcte: false,
                msg: msg
            };     
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
                
                var query = `INSERT INTO Tractament VALUES
                (${0},${t.perfil_id},${t.data_i},${t.data_f},"${t.nom}");`
                
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
                        console.log(response);
                        return response
                    });
                });
            });
        }
        catch(msg) 
        {
            return {
                serverStatus: 400,
                correcte: false,
                msg: msg
            };     
        }
    }
}

module.exports = TractamentService