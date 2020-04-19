import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {FileTransfer, FileTransferObject} from '@ionic-native/file-transfer';
import {File} from '@ionic-native/file/ngx';
import {Platform} from '@ionic/angular';
import {AndroidPermissions} from '@ionic-native/android-permissions';


@Injectable({
  providedIn: 'root'
})
export class FileService {
  public _aplicationURL = 'http://192.168.1.198:3000/api/Files'
    _recomenacionsFiles = '/recomenacionsPDF'
    _getNameFiles = '/getNameFiles'

  constructor(private http: HttpClient,
              private file: File,
              private platform: Platform
              ) { }

  getNameFiles(directory){
    let params = new HttpParams().set('dir', directory);
    return this.http.get(this._aplicationURL + this._getNameFiles, {params: params})
  }
  async getRecomenacionsPDFFile(fileName){
    const transfer : FileTransferObject = FileTransfer.create();
    let uri = encodeURI(this._aplicationURL+this._recomenacionsFiles+'?name='+fileName)
    let path = await this.getDownloadPath();
    return transfer.download(uri, path+fileName,true).then(
      result =>{
        return {serverStatus: 200,
                fileEnviat: true,
                msg: 'file send'};
      }
    );
  }
  
  public async getDownloadPath(){
    if (this.platform.is('ios')){
      return this.file.documentsDirectory;
    }
    await AndroidPermissions.checkPermission(AndroidPermissions.PERMISSION.WRITE_EXTERNAL_STORAGE).then(
      result => {
          if (!result.hasPermission) {
              return AndroidPermissions.requestPermission(AndroidPermissions.PERMISSION.WRITE_EXTERNAL_STORAGE);
          }
      }
    );
    return this.file.externalRootDirectory + "/Download/";
    }
}
