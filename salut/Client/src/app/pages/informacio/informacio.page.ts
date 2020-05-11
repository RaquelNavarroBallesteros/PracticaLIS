import { Component, OnInit } from '@angular/core';
import { FileService } from '../../services/file.service';
import { ToastController } from '@ionic/angular';
import {FileOpener} from '@ionic-native/file-opener/ngx';
import {File} from '@ionic-native/file/ngx';
import {Platform} from '@ionic/angular';


@Component({
  selector: 'app-informacio',
  templateUrl: './informacio.page.html',
  styleUrls: ['./informacio.page.scss'],
})

export class InformacioPage implements OnInit {
  public files=[];
  constructor(private fileservice: FileService, private toastController: ToastController,
              private file: File, private platform: Platform,
              private fileOpener: FileOpener) { }

  ngOnInit() {
    this.getLlistaFitxers('Recomanacions');
  }
   
  getLlistaFitxers(directory) {
    var self= this;
    this.fileservice.getNameFiles(directory).subscribe((res: nameFilesResponse) => {
      if(res.filesObtinguts){
        this.files = res.fileName;
      }else{
        self.presentToast("No hi ha documents a mostrar");
      }      
    });
  }
  downloadFile(filename){
    var self=this;
    self.presentToast("Descarregant fitxer");
    this.fileservice.getRecomenacionsPDFFile(filename).then((res:fitxerResponse)=>{
      if(res.fileEnviat){
        self.presentToast("Fitxer desat");
        let pathFile = ''
        if (this.platform.is('ios')){
          pathFile = this.file.documentsDirectory;
        }else{
          pathFile = this.file.externalRootDirectory + "/Download/"
        }
        this.fileOpener.open(pathFile+'/'+filename, 'application/pdf')
      } else {
        self.presentToast("Quelcom no ha sorgit com s'esperava.");
      } 
    });
  }

  async presentToast(text: string) {
    const toast = await this.toastController.create({
      message: text,
      position: 'bottom',
      duration: 3000
    });
    toast.present();
  }
}
export class fitxerResponse {
  constructor(
    public serverStatus: number,
    public fileEnviat: boolean,
    public msg: string,
  ) { }
}

export class nameFilesResponse {
  constructor(
    public serverStatus: number,
    public filesObtinguts: boolean,
    public fileName: [],
    public msg: string,
  ) { }
}
