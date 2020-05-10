var mysql = require('mysql');
const host = 'seguisalut.czcghz2fiq3g.us-east-1.rds.amazonaws.com';
const database = 'SeguiSalut';
const port = '3306';
const user = 'sa';
const password = 'lis7salut';

class EventService{

    constructor(){
        this.connection = mysql.createConnection({
            host     : host,
            database : database,
            port     : port,
            user     : user,
            password : password
        });
    }
    
    listEvent(id, callback)
    {
        var self = this

        
        var query = 'SELECT * FROM Visita WHERE PerfilId = \'' + 2 + '\' ORDER BY DataVisita;';
        this.connection.connect(function(err){
            console.log("Get connected")
            var response;
            if (!err)
            {
                self.connection.query(query, function(error, rows, fields){
                    //self.connection.end()
                    if (error)
                    {
                        response = {
                            serverStatus: 400,
                            correcte: false,
                            data: null,
                            msg: 'error query'
                        };     
                        connection.end()
                        callback(response);                   
                    }
                    else if (rows == 0)
                    {
                        response = {
                            serverStatus: 400,
                            correcte: false,
                            data: null,
                            msg: 'There is no event with id associated = ' + String(id)
                        };     
                        callback(response);  
                    }
                    else
                    {
                        response = {
                            serverStatus: 200,
                            correcte: true,
                            data: rows,
                            msg: ''
                        };     
                        callback(response);  
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

    
    deleteEvent(id, callback)
    {
        var self = this        
        var query = 'DELETE FROM Visita where Id = \'' + id.id + '\';';
        console.log("query: ", query);
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
                            msg: 'error query'
                        };     
                        connection.end()
                        callback(response);                   
                    }
                    else
                    {
                        response = {
                            serverStatus: 200,
                            correcte: true,
                            data: rows,
                            msg: ''
                        };     
                        callback(response);  
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
}



module.exports = EventService


