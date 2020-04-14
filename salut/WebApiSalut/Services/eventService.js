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
    /*
    addEvent(event, callback){
        var self = this
        console.log('add Event-Service')
        console.log(event)
        var query = 'INSERT INTO Visites (Nom,Data,Ubicacio,Tipus, Tractament) VALUES (\'' + event.nom + '\' , \'' + event.data + '\' , \'' + event.ubicacio + '\' , \'' + event.tipus + '\' , \'' + event.tractament + '\');';
        console.log(query);
        this.connection.connect(function(err){
            var response;
            if (!err){
                console.log("eventService_addEvent -- connected no error")
                self.connection.query(query, function(error, fields){
                    
                    
                    if (error){
                        console.log("eventService_addEvent -- error1")
                        response = {
                            serverStatus: 400,
                            doAddEvent: false,
                            msg: 'error connection'
                        };                        
                    }else{
                        response = {
                            serverStatus: 200,
                            doAddEvent: true,
                            msg: 'OK'
                        }; 
                    }
                    callback(response);
                })
            }else{
                console.log("connected error")
                response = {
                    serverStatus: 400, 
                    doAddEvent: false,
                    msg: 'error connection'
                }; 
                callback(response);
            }
        });
    }
*/
    listEvent(id, callback)
    {
        var self = this

        
        var query = 'SELECT * FROM Visita WHERE PerfilId = \'' + 2 + '\';';
        console.log(query);
        this.connection.connect(function(err){
            console.log("Get connected")
            var response;
            if (!err)
            {
                console.log("Get connected no error")
                self.connection.query(query, function(error, rows, fields){
                    //self.connection.end()
                    console.log(rows);
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
                            data: rows[0],
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


