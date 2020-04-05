import { Injectable, ResolvedReflectiveFactory } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { File } from "@ionic-native/file/ngx";
import { WebView } from '@ionic-native/ionic-webview/ngx';

@Injectable({
  providedIn: 'root'
})
export class FotoService {
  capturedSnapURL: string;
  
  cameraOptions: CameraOptions = {
    quality: 20,
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
        resolve([currentName, correctPath]);
      });
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
