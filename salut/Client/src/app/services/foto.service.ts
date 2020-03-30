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
    destinationType: this.camera.DestinationType.FILE_URI,
    encodingType: this.camera.EncodingType.JPEG,
    mediaType: this.camera.MediaType.PICTURE,
    saveToPhotoAlbum: false
  };
  constructor(private camera: Camera,
              private file: File,
              private webView: WebView) { }

  async ferFoto(tipus: string) {
    var tempFoto = await this.camera.getPicture(this.cameraOptions);
    await this.guardarFoto(tipus, tempFoto);
  }
  async guardarFoto(tipus: string, temporalPath: string){
    var dataDirectory = this.file.dataDirectory;
    var tempFotoFileName = temporalPath.substr(temporalPath.lastIndexOf('/') + 1);
    var tempBaseDirectory = temporalPath.substr(0,temporalPath.lastIndexOf('/') + 1);

    if (tipus === "recepta"){
      this.file.resolveLocalFilesystemUrl(dataDirectory + "recepta.jpg").then((res)=>{
        if(res.isFile){
          this.file.removeFile(dataDirectory, "recepta.jpg");
          this.file.removeFile(this.file.cacheDirectory,"recepta.jpg");
        }
        var newFileName = "recepta.jpg"
        this.file.copyFile(tempBaseDirectory, tempFotoFileName, dataDirectory, newFileName);
      }).catch((err) =>{
        console.log("files not found");
        var newFileName = "recepta.jpg"
        this.file.copyFile(tempBaseDirectory, tempFotoFileName, dataDirectory, newFileName);
      });
    }
  }
  
  llegirFoto(tipus: string){
    var dataDirectory = this.file.dataDirectory;
    var displayImage = null;
    return new Promise((resolve, reject)=>{
      if (tipus === "recepta"){
        this.file.resolveLocalFilesystemUrl(dataDirectory + "recepta.jpg").then((res)=>{
          if(res.isFile){
            console.log("files found");
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
