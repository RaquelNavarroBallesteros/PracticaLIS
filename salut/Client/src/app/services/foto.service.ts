import { Injectable, ResolvedReflectiveFactory } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { File } from "@ionic-native/file/ngx";
import { WebView } from '@ionic-native/ionic-webview/ngx';
//import {IonicStorageModule} from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class FotoService {
  capturedSnapURL: string;
  
  cameraOptions: CameraOptions = {
    quality: 100,
    //destinationType: this.camera.DestinationType.FILE_URI,
    //encodingType: this.camera.EncodingType.JPEG,
    //mediaType: this.camera.MediaType.PICTURE,
    saveToPhotoAlbum: false,
    sourceType: this.camera.PictureSourceType.CAMERA,
    correctOrientation: true
  };
  constructor(private camera: Camera,
              private file: File,
              private webView: WebView) { }




  async ferFoto(tipus: string) {

    return new Promise((resolve, reject)=>{
      this.camera.getPicture(this.cameraOptions).then(imagePath =>{
        var currentName = imagePath.substr(imagePath.lastIndexOf('/') + 1);
        var correctPath = imagePath.substr(0, imagePath.lastIndexOf('/') + 1);
        //let response = {currentName: currentName, correctPath: correctPath};
        resolve([currentName, correctPath]);
      });
    });
  }

  async copyFileToLocalDir(namePath: string, currentName: string, newFileName: string){
    this.file.copyFile(namePath, currentName, this.file.dataDirectory, newFileName).then(res =>{
      return res;
    }, error =>{
      return error;
    });
  }

  pathForImage(imgPath){
    if (imgPath === null){
      return '';
    }else{
      let converted = this.webView.convertFileSrc(imgPath);
      return converted;
    }
  }
}
