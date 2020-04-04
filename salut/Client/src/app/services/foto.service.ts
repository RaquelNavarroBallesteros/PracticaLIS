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
    destinationType: this.camera.DestinationType.FILE_URI,
    encodingType: this.camera.EncodingType.JPEG,
    mediaType: this.camera.MediaType.PICTURE,
    saveToPhotoAlbum: false,
    sourceType: this.camera.PictureSourceType.CAMERA
  };
  constructor(private camera: Camera,
              private file: File,
              private webView: WebView) { }

  async ferFoto(tipus: string) {

    return new Promise((resolve, reject)=>{
      this.camera.getPicture(this.cameraOptions).then((imageData)=>{
        this.guardarFoto(tipus, imageData).then((res)=>{
          if(res){
            resolve(true);
          }else{
            resolve(false);
          }
        });
      });
    })

  }

  guardarFoto(tipus: string, temporalPath: string){
    var dataDirectory = this.file.dataDirectory;
    var tempFotoFileName = temporalPath.substr(temporalPath.lastIndexOf('/') + 1);
    var tempBaseDirectory = temporalPath.substr(0,temporalPath.lastIndexOf('/') + 1);

    return new Promise((resolve, reject)=>{
      if (tipus === "recepta"){
        this.file.resolveLocalFilesystemUrl(dataDirectory + "recepta.jpg").then((res)=>{
          if(res.isFile){
            let fileToRemove = dataDirectory + "recepta.jpg";
            let pathToRemove = fileToRemove.substr(0,fileToRemove.lastIndexOf('/')+1);
            this.file.removeFile(pathToRemove, "recepta.jpg");
            this.file.removeFile(this.file.cacheDirectory,"recepta.jpg");
          }
          var newFileName = "recepta.jpg"
          this.file.copyFile(tempBaseDirectory, tempFotoFileName, dataDirectory, newFileName);
          resolve(true)
        }).catch((err) =>{
          console.log("files not found");
          var newFileName = "recepta.jpg"
          this.file.copyFile(tempBaseDirectory, tempFotoFileName, dataDirectory, newFileName);
          resolve(true);
        });
      }else{
        resolve(true);
      }
    });
  }
  
  llegirFoto(tipus: string){
    var dataDirectory = this.file.dataDirectory;
    var displayImage = null;
    return new Promise((resolve, reject)=>{
      if (tipus === "recepta"){
        this.file.resolveLocalFilesystemUrl(dataDirectory + "recepta.jpg").then((res)=>{
          if(res.isFile){
            console.log("files found");
            this.file.removeFile(this.file.cacheDirectory,"recepta.jpg");
            displayImage = this.webView.convertFileSrc(dataDirectory + "recepta.jpg");
            resolve(displayImage);
          }
        }).catch((err)=>{
          console.log("files not found");
          resolve(displayImage);
        });
      }else{
        resolve(displayImage);
      }
    })
  }

}
