var contextDB = require('../dbContext.js');

class MedicamentService
{
    constructor(){
        this.connection = contextDB.getConnection();
    }

    get_all(callback)
    {
        try 
        {
            var query = `SELECT * FROM Medicament;`;

            this.connection.query(query, function(qerr, rows, fields){
                if (qerr) 
                    throw "Query error.";

                var response =  {
                    serverStatus: 200,
                    correcte: true,
                    data: rows
                };     

                callback(response);
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