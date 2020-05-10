import { Component, OnInit, ChangeDetectorRef} from '@angular/core';
import {Platform, ToastController} from '@ionic/angular';
import {FotoService} from 'src/app/services/foto.service';
import { File } from '@ionic-native/file/ngx';
import {Storage} from '@ionic/storage';
import { NotificacionsService } from 'src/app/services/notificacions.service';
import { FileService } from '../../services/file.service'; 
//import pdfMake from 'pdfmake/build/pdfmake';
import * as jsPDF from 'jspdf';
import {FileOpener} from '@ionic-native/file-opener/ngx';


const STORAGE_KEY = 'receptes';

@Component({
  selector: "app-recepta",
  templateUrl: "./recepta.page.html",
  styleUrls: ["./recepta.page.scss"]
})
export class ReceptaPage implements OnInit {
  public images = [];

  pdfObject = null;
  public fotoReceptaPath;
  public fotoRecepta: boolean
  constructor(private fotoService: FotoService, private ref: ChangeDetectorRef, private platform: Platform,
              private toastController: ToastController, private storage: Storage, private file: File, private notificationService:NotificacionsService,
              private fileOpener: FileOpener, private fileService : FileService) {}
  
  ngOnInit() {
    this.platform.ready().then(()=>{
      this.loadStoredImages();
    });
  }
  async descarregarPDF(){
    var fileName = 'recepta_' + this.images[0].name + '.pdf';
    var pathFile = await this.fileService.getDownloadPath();
    this.crearPDF().then((_) =>{
      var pdfOutput = this.pdfObject.output();
      var buffer = new ArrayBuffer(pdfOutput.length);
      let array = new Uint8Array(buffer);

      for (var i = 0; i < pdfOutput.length; i++) {
        array[i] = pdfOutput.charCodeAt(i);
      }
      this.file.writeFile(pathFile, fileName, buffer, {replace: true}).then(fileEntry => {
        this.fileOpener.open(pathFile + fileName, 'application/pdf');
      })
    });
  }

  crearPDF(){
   return new Promise((resolve) =>{
    this.pdfObject = new jsPDF('p', 'pt', 'a4');
    var width = this.pdfObject.internal.pageSize.width;    
    var height = this.pdfObject.internal.pageSize.height;
    var h1=50;
    var aspectwidth1= (height-h1)*(9/16);
    var iteration = 0
    this.images.forEach((img, index)=>{
      this.loadImgPdf(img.path).then((img) =>{
        if (iteration !== 0){
          this.pdfObject.addPage();
        }
        iteration += 1;
        this.pdfObject.addImage(img, 'JPEG', 10, h1, aspectwidth1,(height - h1));
        if (iteration == this.images.length){
          return resolve(true);
        }
      });
    });
   })
  }
  loadImgPdf(path){
    return new Promise((resolve) => {
      let img = new Image();
      img.onload = () => resolve(img);
      img.src = path;
    })
  }
  loadStoredImages(){
    this.storage.get(STORAGE_KEY).then(images => {
      if(images){
        let arr = JSON.parse(images);
        this.images = [];
        for (let img of arr){
          let filePath = this.file.dataDirectory + img;
          let resPath = this.fotoService.pathForImage(filePath);
          this.images.push({name: img, path: resPath, filePath: filePath});
        }
      }
    });
  }

  ferFoto(novaRecepta) {

    this.fotoService.ferFoto("recepta").then(res =>{
      if(novaRecepta){
        if (this.images.length > 0){
          this.deleteImage().then((_) => {
            this.images = [];
            this.copyFileToLocalDir(res[1], res[0], this.createFileName());
            this.notificationService.eliminarNotificacioRecepta();
          });
        }else{
          this.copyFileToLocalDir(res[1], res[0], this.createFileName());
        }
      }else{
        this.copyFileToLocalDir(res[1], res[0], this.createFileName());
      } 
    });
  }
  
  copyFileToLocalDir(namePath: string, currentName: string, newFileName: string){
    this.file.copyFile(namePath, currentName, this.file.dataDirectory, newFileName).then(res =>{
      this.updeteStoredImages(newFileName);
    }, error =>{
      return error;
    });
  }

  createFileName(){
    var d = new Date(),
        n = d.getTime();
    return n + "recepta"+".jpg";
  }

  updeteStoredImages(name){
    this.storage.get(STORAGE_KEY).then(images => {
      let arr = JSON.parse(images);
      if(!arr){
        let newImages = [name];
        this.storage.set(STORAGE_KEY, JSON.stringify(newImages))
      }else{
        arr .push(name);
        this.storage.set(STORAGE_KEY, JSON.stringify(arr));
      }
      let filePath = this.file.dataDirectory + name;
      let resPath = this.fotoService.pathForImage(filePath);
      
      let newEntry = {
        name: name,
        path: resPath,
        filePath: filePath
      };

      this.images = [...this.images, newEntry];
      this.ref.detectChanges();
    })
  }

  async deleteImage(){
    return new Promise((resolve, reject)=>{
      this.storage.set(STORAGE_KEY, JSON.stringify([]));
      this.images.forEach((image) =>{
        var correctPath = image.filePath.substr(0, image.filePath.lastIndexOf('/') + 1);
        this.file.removeFile(correctPath, image.name).then(res =>{
          return true;
        })
      });
      this.presentToast('Recepta actualitzada');
      resolve(true);
    });
  }

  async presentToast(text: string){
    const toast = await this.toastController.create({
      message: text,
      position: 'bottom',
      duration: 3000
    });
    toast.present();
  }
}

