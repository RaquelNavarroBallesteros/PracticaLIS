class Configuration{
    constructor(){}
    getDBConnection(){
        return{
            host : 'seguisalut.czcghz2fiq3g.us-east-1.rds.amazonaws.com',
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