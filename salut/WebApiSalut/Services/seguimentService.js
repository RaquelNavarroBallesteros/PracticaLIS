var mysql = require('mysql');
var contextDB = require('../dbContext.js');

class SeguimentService
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

    get_all_pes(p_id, callback)
    {
        var self = this;
        var query = `SELECT * FROM SeguimentPes WHERE PerfilId = ${p_id.id};`;
        this.connection.query(query, function(qerr, rows, fields){
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

    get_all_alcada(p_id, callback)
    {
        var self = this; 
        var query = `SELECT * FROM SeguimentAlcada WHERE PerfilId = ${p_id.id};`;

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

    add_pes(p, callback)
    {
        var self = this;
        console.log(p.data)
        var query = `INSERT INTO SeguimentPes VALUES
        (${0}, "${p.data}","${p.valor}",${p.perfil_id});`

        console.log(query);

        this.connection.query(query, function(qerr, r){
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

    add_alcada(a, callback)
    {
        var self = this;
        var query = `INSERT INTO SeguimentAlcada VALUES
        (${0}, "${a.data}","${a.valor}",${a.perfil_id});`
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
                id: r.insertId,
            }; 

            callback(response);
        });
    }
}

module.exports = SeguimentService