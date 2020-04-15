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

    get_all(callback)
    {
        var self = this;
        try 
        {
            this.connection.connect(function(err){
                if (err) 
                    throw "Connection error."
                
                var query = `SELECT * FROM Medicament;`;

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
}

module.exports = TractamentService