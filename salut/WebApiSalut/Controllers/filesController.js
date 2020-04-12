var router = require('express').Router()
var fs = require('fs')
var service = require('../Services/filesService.js');

function recomenacionsFilePDF (req, res) {
    console.log("recomenacionsPDF");
    fileService = new service();
    var name = req.query.name
    fileService.recomenacionsFilePDF(name, function (response, path){
        if (response.fileEnviat){
            var file = fs.createReadStream(path)
            var stat = fs.statSync(path)
            res.status(response.serverStatus)
            res.setHeader('Content-Length', stat.size);
            res.setHeader('Content-Type', 'application/pdf');
            res.setHeader('Content-Disposition', 'attachment; filename='+name+'.pdf');
            file.pipe(res);
        }else{
            res.status(response.serverStatus).send(response)
        }
    });
}

function fileName (req, res){
    console.log("fileNameRecomenacions");
    fileService = new service();
    var dir = req.query.dir
    fileService.getNameFilesDir(dir, function(response){
        res.status(response.serverStatus).send(response);
    });
}


function warmUp(req,res){
    res.send("file service works")
}

router.get('/recomenacionsPDF', recomenacionsFilePDF)
router.get('/getNameFiles', fileName)
router.get('/',warmUp)

module.exports = router