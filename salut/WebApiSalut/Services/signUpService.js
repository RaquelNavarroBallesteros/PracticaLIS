var contextDB = require('../dbContext.js');



class SignUpService{
    constructor(){
        this.connection = contextDB.getConnection();
    }
    addUser(usuari, callback){
        var self = this
        console.log('signUpService_addUser -- signing up service')
        console.log(usuari)
        var query = 'SELECT * FROM Usuari WHERE Correu = \'' + usuari.correu + '\';';
        console.log(query);
        var response;
        console.log("signUpService_addUser -- connected no error");

        this.connection.query(query, function(error,  rows, fields){
            
            console.log('signUpService_addUser -- estas son las filas: ', rows);
            if (error){
                console.log("signUpService_addUser -- error1")
                response = {
                    serverStatus: 400,
                    doSignUp: false,
                    userId: -1,
                    msg: 'error connection'
                };
                callback(response);                        
            }else{
                if (rows.length <= 0){
                    console.log('signUpService_addUser -- adding user that does not exist');
                    var query1 = 'INSERT INTO Usuari (Correu, Contrasenya) VALUES (\'' + usuari.correu + '\' , MD5(\'' + usuari.psw + '\') );';
                    console.log(query1);
                    self.connection.query(query1, function(error, fields){
                        if (error){
                            console.log("signUpService_addUser -- error1")
                            response = {
                                serverStatus: 400,
                                doSignUp: false,
                                userId: -1,
                                msg: 'error connection'
                            };    
                        }else{
                            response = {
                                serverStatus: 200,
                                doSignUp: true,
                                userId: fields.insertId,
                                msg: 'correct'
                            }; 
                        }
                        callback(response);
                    })
                }else{
                    console.log('signUpService_addUser -- the selected user exists');
                    response = {
                        serverStatus: 300,
                        doSignUp: false,
                        userId: -1,
                        msg: 'user exists'
                    };
                    callback(response);
                }
            }
            
        })
    }
}

module.exports = SignUpService


