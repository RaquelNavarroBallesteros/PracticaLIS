import { Injectable } from '@angular/core';
import {  Plugins,  CameraResultType,  Capacitor,  FilesystemDirectory,  CameraPhoto,  CameraSource} from "@capacitor/core";

const { Camera, Filesystem, Storage } = Plugins;
@Injectable({
  providedIn: "root"
})
export class FotoService {
  constructor() {}

  public galeria = new GaleriaFotos();

  public async takePicture(tipusImg: string) {
    const capturedPhoto = await Camera.getPhoto({
      resultType: CameraResultType.Uri,
      source: CameraSource.Camera,
      quality: 100
    });

    const fitxerFoto = await this.savePicture(capturedPhoto, tipusImg);
    this.galeria.fotos.unshift(fitxerFoto);

    console.log(this.galeria);
  }

  private async savePicture(cameraFoto: CameraPhoto, tipusImg: string) {
    // Convert photo to base64 format, required by Filesystem API to save
    const base64Data = await this.readAsBase64(cameraFoto);

    // Write the file to the data directory
    const fileName = new Date().getTime() + ".jpg";
    await Filesystem.writeFile({
      path: fileName,
      data: base64Data,
      directory: FilesystemDirectory.Data
      
    });
    console.log(FilesystemDirectory);
    
    // Get platform-specific photo filepaths
    return{
      filepath: fileName,
      webviewPath: cameraFoto.webPath,
      tipus: tipusImg
      };
  }

  private async readAsBase64(cameraFoto: CameraPhoto) {
    // Fetch the photo, read as a blob, then convert to base64 format
    const response = await fetch(cameraFoto.webPath!);
    const blob = await response.blob();

    return (await this.convertBlobToBase64(blob)) as string;
  }

  convertBlobToBase64 = (blob: Blob) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onerror = reject;
      reader.onload = () => {
        resolve(reader.result);
      };
      reader.readAsDataURL(blob);
    });
}


interface Foto {
  filepath: string;
  webviewPath: string;
  base64?: string;
  tipus: string;
}
export class GaleriaFotos {
  constructor(){

  }
  public fotos: Foto[] = [];


}

