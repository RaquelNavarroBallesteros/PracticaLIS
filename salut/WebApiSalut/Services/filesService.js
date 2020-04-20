var fs = require('fs')
class FileService{
    recomenacionsFilePDF(name, callback){
        console.log('recomanacions:',name);
        var file = './Recursos/Recomanacions/'+name
        try {
            if (fs.existsSync(file)) {
                console.log('if: ',name);
                var response = {
                    serverStatus: 200,
                    fileEnviat: true,
                    msg: 'file send'
                }
                callback (response, file);
            }
        } catch(err) {
            console.log('error: ',name);
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
                    var stat = fs.statSync(folder + file)
                    var filePDF = {
                        name : file,
                        size : stat.size
                    }
                    filesName.push(filePDF)
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