var fs = require('fs')
class FileService{
    recomenacionsFilePDF(name, callback){
        var file = './Recursos/Recomanacions/'+name+'.pdf'
        try {
            if (fs.existsSync(file)) {
                var response = {
                    serverStatus: 200,
                    fileEnviat: true,
                    msg: 'file senda'
                }
                callback (response, file);
            }
        } catch(err) {
            var response = {
                serverStatus: 400,
                fileEnviat: false,
                msg: 'Fitxer no trobat'
            }
            callback (response, file);
        }
        
        
    }
    getNameFilesDir(dir, callback){
        console.log('hola1')
        try {
            var folder = './Recursos/' + dir + '/'
            fs.readdir(folder, (err, files) => {
                var filesName = []
                files.forEach(file => {
                    filesName.push(file)
                });
                var response = {
                    serverStatus: 200,
                    filesObtinguts: true,
                    fileName: filesName,
                    msg: 'Nom dels fitxers trobats'
                }
                callback (response);
            });
        
        } catch(err) {
            var response = {
                serverStatus: 400,
                filesObtinguts: false,
                fileName:[],
                msg: 'Directori no trobat'
            }
            callback (response);
        }
    }
}

module.exports = FileService