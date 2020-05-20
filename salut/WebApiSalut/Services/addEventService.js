var mysql = require('mysql');
const host = 'seguisalut.czcghz2fiq3g.us-east-1.rds.amazonaws.com';
const database = 'SeguiSalut';
const port = '3306';
const user = 'sa';
const password = 'lis7salut';

class AddEventService{

    constructor(){
        this.connection = mysql.createConnection({
            host     : host,
            database : database,
            port     : port,
            user     : user,
            password : password
        });
    }
    addEvent(event, callback){
        var self = this
        console.log('add Event-Service')
        console.log(event)
        var query = 'INSERT INTO Visita (PerfilId, DataVisita,Ubicacio,Descripcio, TractamentId) VALUES (\'' + 23 + '\', \'' + event.data + '\' , \'' + event.ubicacio + '\' , \'' + event.tipus + '\' , \'' + event.tractament + '\');';
        
        //afegir Nom
        //\'' + event.nom + '\' , 
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

    updateEvent(event, id, callback)
    {
        var self = this
        console.log('add Event-Service')
        console.log(event)
        var query = `UPDATE Visita SET DataVisita="${event.data}", Ubicacio="${event.ubicacio}", Descripcio="${event.tipus}", TractamentId="${event.tractament}" WHERE Id =${id};`
        //afegir Nom
        //\'' + event.nom + '\' , 

        
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

}



module.exports = AddEventService


