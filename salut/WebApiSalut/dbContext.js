var mysql = require('mysql');
var configuration = require('../WebApiSalut/Configuration.js');

class DBContext{
    constructor()
    {   
        if (!this.instance){
            console.log("creating instance DBContext " + Date.now().toString())
            this.config = new configuration();
            var configBD =this.config.getDBConnection();
            this.connection = mysql.createConnection({
                host     : configBD.host,
                database : configBD.database,
                port     : configBD.port,
                user     : configBD.user,
                password : configBD.password
            });
            this.instance = this;
        }
        return this.instance;
    }

    doConnect(){
        this.connection.connect(function (err){
            if(err){
                conseole.log("error connect");
            }
            return err;
        });
    }
    getConnection(){
        return this.connection;
    }
}
const instance = new DBContext();
module.exports = instance;