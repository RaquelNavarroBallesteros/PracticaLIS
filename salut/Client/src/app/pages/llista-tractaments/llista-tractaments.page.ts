import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { async } from '@angular/core/testing';
import { TractamentService } from 'src/app/services/tractament.service';
import {Router} from '@angular/router';
import {Storage} from '@ionic/storage';
import { NotificacionsService } from 'src/app/services/notificacions.service';
import { ToastController } from "@ionic/angular";

const STORAGE_KEY_P = 'perfil';
@Component({
  selector: 'app-llista-tractaments',
  templateUrl: './llista-tractaments.page.html',
  styleUrls: ['./llista-tractaments.page.scss'],
})
export class LlistaTractamentsPage implements OnInit {

  perfil_id = 0;
  llistaTractaments = [];

  constructor(private storage: Storage, private router: Router, public tractamentService: TractamentService, public alertCtrl: AlertController,
            private notificationService: NotificacionsService, private toastController: ToastController) 
  { 
  }

  ngOnInit() {
    this.storage.get(STORAGE_KEY_P).then(information => {
      if (information != null){
        this.perfil_id = information.id;
      }

    });
  }

  ionViewWillEnter()
  {
    this.llistaTractaments = [];
    this.tractamentService.getall_request(this.perfil_id).subscribe((res: TractamentGetAllResponse)=>{
      for(var i=0; i<res.data.length; i++)
      {
        this.llistaTractaments.push({
          id: res.data[i]["Id"],
          nom: res.data[i]["Nom"],
          data_i: res.data[i]["DataInici"],
          data_f: res.data[i]["DataFinal"]
        });
      }
      console.log(this.llistaTractaments);
    });
  }

  async presentToast(text: string) {
    const toast = await this.toastController.create({
      message: text,
      position: "bottom",
      duration: 3000,
    });
    toast.present();
  }

  deleteTractament(index)
  {
    this.tractamentService.del_request(this.llistaTractaments[index].id)
    .subscribe((res: TractamentGetAllResponse)=>{
      if (res.correcte)
      {
        var idTractament = this.llistaTractaments[index].id;
        this.llistaTractaments.splice(index, 1);
        this.notificationService.eliminarNotificacioTractament(idTractament);
        this.presentToast("El tractament s'ha eliminat");
      }
      else
      this.presentToast("Error: " + res.msg);
    });
  }

   updateTractament(index) 
   {
     // TODO:  Nav to detail
     console.log("Goto tractament update");
      var id = this.llistaTractaments[index].id;
      this.router.navigate(['/tractament', id]);
   }

   creaTractament()
   {
    console.log("Goto tractament add");
      var id = 0;
      this.router.navigate(['/tractament', id]);
   }

}

export class TractamentGetAllResponse {
  constructor(
      public serverStatus: number,
      public correcte: boolean,
      public msg: string,
      public data: Array<object>
  ) {}
}

export class TractamentDelResponse{
  constructor(
    public serverStatus: number,
    public correcte: boolean
  ){}
}
