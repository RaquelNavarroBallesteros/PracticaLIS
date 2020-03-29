import { Injectable } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { File } from "@ionic-native/file/ngx";

@Injectable({
  providedIn: 'root'
})
export class FotoService {
  capturedSnapURL: string;
  
  cameraOptions: CameraOptions = {
    quality: 20,
    destinationType: this.camera.DestinationType.DATA_URL,
    encodingType: this.camera.EncodingType.JPEG,
    mediaType: this.camera.MediaType.PICTURE,
    saveToPhotoAlbum: true
  };
  constructor(private camera: Camera) { }
  ferFoto() {
    this.camera.getPicture(this.cameraOptions).then(
      imageData => {
        // this.camera.DestinationType.FILE_URI gives file URI saved in local
        // this.camera.DestinationType.DATA_URL gives base64 URI

        let base64Image = "data:image/jpeg;base64," + imageData;
        this.capturedSnapURL = base64Image;
      },
      err => {
        console.log(err);
        // Handle error
      }
    );
  }

}
