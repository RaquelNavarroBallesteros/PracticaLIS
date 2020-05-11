var mysql = require('mysql');
var contextDB = require('../dbContext.js');

class ContacteService
{
    constructor()
    {
        this.connection = contextDB.getConnection();
    }
    error(msg)
    {
        return {
            serverStatus: 400,
            correcte: false,
            msg: msg
        };     
    }

    get_all(p_id, callback)
    {
        var self = this;
        var query = `SELECT * FROM Contacte WHERE PerfilId = ${p_id.id};`;
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
    }

    add(c, callback)
    {
        var self = this;
        var query = `INSERT INTO Contacte VALUES
        ("${c.nom}","${c.numero}",${c.perfil_id}, ${0});`
        console.log(query);
        self.connection.query(query, function(qerr, r){
            if (qerr) 
            {
                console.log(qerr);
                callback(self.error("Query error."));
                return;
            }

            var response =  {
                serverStatus: 200,
                correcte: true,
                id: r.insertId
            }; 

            callback(response);
        });
    }

    del(c_id, callback)
    {
        var self = this;       
        var query = `DELETE FROM Contacte WHERE Id=${c_id.id};`;
        self.connection.query(query, function(qerr, rows, fields){
            if (qerr) 
                callback(self.error("Query error."));

            var response =  {
                serverStatus: 200,
                correcte: true,
            };     
            callback(response);
        });
    }
    
}

module.exports = ContacteService