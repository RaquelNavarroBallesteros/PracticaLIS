import { Component, OnInit } from '@angular/core';
import { FileService } from '../../services/file.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-informacio',
  templateUrl: './informacio.page.html',
  styleUrls: ['./informacio.page.scss'],
})

export class InformacioPage implements OnInit {
  public files=[];
  constructor(private fileservice: FileService, private toastController: ToastController) { }
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

  async presentToast(text: string) {
    const toast = await this.toastController.create({
      message: text,
      position: 'bottom',
      duration: 3000
    });
    toast.present();
  }
}


export class nameFilesResponse {
  constructor(
    public serverStatus: number,
    public filesObtinguts: boolean,
    public fileName: [],
    public msg: string,
  ) { }
}
