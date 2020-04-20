class Configuration{
    constructor(){}
    getDBConnection(){
        return{
            host : 'seguisalut.cckgyqwr0zch.us-east-2.rds.amazonaws.com',
            database : 'SeguiSalut',
            port : '3306',
            user : 'sa',
            password : 'lis7salut'
        }
    }
    getGmail(){
        return{
            user: 'seguisalut@gmail.com',
            pass: 'lis7salut'
        }
    }
}
module.exports = Configuration