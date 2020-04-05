import { Component, OnInit, ChangeDetectorRef} from '@angular/core';
import {Platform, ToastController} from '@ionic/angular';
import {FotoService} from 'src/app/services/foto.service';
import { File } from '@ionic-native/file/ngx';
import {Storage} from '@ionic/storage';


const STORAGE_KEY = 'receptes';

@Component({
  selector: "app-recepta",
  templateUrl: "./recepta.page.html",
  styleUrls: ["./recepta.page.scss"]
})
export class ReceptaPage implements OnInit {
  public images = [];

  public fotoReceptaPath;
  public fotoRecepta: boolean
  constructor(private fotoService: FotoService, private ref: ChangeDetectorRef, private platform: Platform,
              private toastController: ToastController, private storage: Storage, private file: File) {}
  
  ngOnInit() {
    this.platform.ready().then(()=>{
      this.loadStoredImages();
    });
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

  ferFoto() {
    this.fotoService.ferFoto("recepta").then(res =>{
      if (this.images.length !== 0){
        this.deleteImage(0).then(_=>{
          this.copyFileToLocalDir(res[1], res[0], this.createFileName());
        })
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

      this.images = [newEntry, ...this.images];
      this.ref.detectChanges();
    })
  }

  async deleteImage(position: number){
    var image = this.images[position]
    this.images.splice(position, 1);

    return new Promise((resolve, reject)=>{
      this.storage.get(STORAGE_KEY).then(images => {
        let arr = JSON.parse(images);
        let filtred = arr.filter(name=> name != image.name);
        this.storage.set(STORAGE_KEY, JSON.stringify(filtred));

        var correctPath = image.filePath.substr(0, image.filePath.lastIndexOf('/') + 1);
        this.file.removeFile(correctPath, image.name).then(res =>{
          this.presentToast('Recepte modificada');
          resolve(true);
        })
      })
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

