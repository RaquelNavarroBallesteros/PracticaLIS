var mysql = require('mysql');
var configuration = require('../Configuration.js');

class MedicamentService
{
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

module.exports = MedicamentService