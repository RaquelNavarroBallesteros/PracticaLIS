import { Component, OnInit, ViewChild } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { async } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { SeguimentService } from 'src/app/services/seguiment.service';
import {Storage} from '@ionic/storage';
import { Chart } from 'chart.js';
import { ModalController } from '@ionic/angular';
import { GrafiquesPage } from '../grafiques/grafiques.page'
//import { SeguimentPage } from '../seguiment/seguiment.page';
import { ToastController } from "@ionic/angular";


const STORAGE_KEY_P = 'perfil';
@Component({
  selector: 'app-seguiment',
  templateUrl: './seguiment.page.html',
  styleUrls: ['./seguiment.page.scss'],
})
export class SeguimentPage implements OnInit {

  
  public nouPes = {
    id: 0,
    data: null,
    valor: null,
  }

  public novaAlcada = {
    id: 0,
    data: null,
    valor: null,
  }
  
  perfil_id = 0;
  //public mostrarGrafica = false;
  
  constructor(public seguimentService: SeguimentService, public alertCtrl: AlertController, public seguimentController: ModalController, private storage: Storage, 
    private toastController: ToastController) { }


  ngOnInit() {
    this.storage.get(STORAGE_KEY_P).then(information => {
      if (information != null){
        this.perfil_id = information.id;
        this.seguimentService.getallpes_request(this.perfil_id).subscribe((res: SeguimentGetResponse)=>{
          for(var i=0; i<res.data.length; i++)
          {
            this.pess.push({
              id: res.data[i]['Id'],
              data: res.data[i]['Data'],
              valor: res.data[i]['Pes']});
          }
        });
        this.seguimentService.getallalcada_request(this.perfil_id).subscribe((res: SeguimentGetResponse)=>{
          for(var i=0; i<res.data.length; i++)
          {
            this.alcadaa.push({
              id: res.data[i]['Id'],
              data: res.data[i]['Data'],
              valor: res.data[i]['Alcada']});
          }
        });
      }
    });
  }

  pess = [];
  alcadaa = [];

  async presentToast(text: string) {
    const toast = await this.toastController.create({
      message: text,
      position: "top",
      duration: 3000,
    });
    toast.present();
  }

  afegirPes()
  {
    var d = new Date(Date.now());
    var pes_db = {id: this.nouPes.id, 
    data: d, 
    valor: this.nouPes.valor, 
    perfil_id: this.perfil_id};

    let pes = this.nouPes;
    console.log(pes.valor)

    if(pes.valor == null)
    this.presentToast("Introdueix el teu pes actual.")
    else if (pes.valor > 300 || pes.valor < 0)
    {
      this.presentToast("Introdueix un pes vàlid.")
    }
    else
    {
      console.log(pes_db.data);
      this.seguimentService.addpes_request(pes_db).subscribe((res: SeguimentSetResponse)=>{
        if (res.correcte)
        {
          pes.id = res.id;
          this.pess.push(pes);
          this.nouPes = {id: 0, data: null, valor: null};
          this.presentToast("El nou pes s'ha guardat correctament.");
        }
        else
        this.presentToast("Error: " + res.msg);
      });
    }
  }

  afegirAlcada()
  {
    var d = new Date(Date.now());
    var alcada_db = {id: this.novaAlcada.id, 
    data: d, 
    valor: this.novaAlcada.valor, 
    perfil_id: this.perfil_id};

    let alcada = this.novaAlcada;
    
    if(alcada.valor == null)
    this.presentToast("Insereix la teva alçada actual.");
    else if (alcada.valor > 300 || alcada.valor < 0)
    {
      this.presentToast("Introdueix una alçada vàlida.")
    }
    else
    {
      this.seguimentService.addalcada_request(alcada_db).subscribe((res: SeguimentSetResponse)=>{
        if (res.correcte)
        {
          alcada.id = res.id;
          this.alcadaa.push(alcada);
          this.novaAlcada = {id: 0, data: null, valor: null};
          this.presentToast("La nova alçada s'ha guardat correctament.");
        }
        else
        this.presentToast("Error: " + res.msg);
      });
    }
  }
  
  /*deletePes(index)
  {
    this.pess.splice(index, 1);
  }*/

  /*async updatePes(index) {
    const alert = await this.alertCtrl.create({
        message: 'Editar Contacte',
        inputs: [{ name: 'editAlcada', value: this.pess[index]["pes"], placeholder: 'Pes' }], 
        buttons: [{ text: 'Cancel', role: 'cancel' },
                  { text: 'Update', handler: data => {
                      this.pess[index]["pes"] = data.editPes; 
                      }
                  }
                 ]
    });
  await alert.present();
  }
  */

  /*deleteAlcada(index)
  {
    this.pess.splice(index, 1);
  }*/

  /*async updateAlcada(index) {
    const alert = await this.alertCtrl.create({
        message: 'Editar Contacte',
        inputs: [{ name: 'editAlcada', value: this.alcadaa[index]["Alcada"], placeholder: 'Alçada' }], 
        buttons: [{ text: 'Cancel', role: 'cancel' },
                  { text: 'Update', handler: data => {
                      this.alcadaa[index]["alcada"] = data.editAlcada; 
                      }
                  }
                ]
    });
  await alert.present();
  }*/

  
  ionViewWillEnter()
  {
    this.seguimentService.getallalcada_request(this.perfil_id).subscribe((res: SeguimentGetResponse)=>{

      for(var i=0; i<res.data.length; i++)
      {
        this.alcadaa.push({
          id: res.data[i]['Id'],
          data: res.data[i]['Data'],
          valor: res.data[i]['Alcada']});
      }
    });    
  }

  async presentGraf(t) {
    const graf = await this.seguimentController.create({
      component: GrafiquesPage,
      componentProps: {tipus: t}
    });
    return await graf.present();
  }
}


export class SeguimentGetResponse {
  constructor(
      public serverStatus: number,
      public correcte: boolean,
      public data: Array<object>,
      public msg: string,
  ) {}
}

export class SeguimentSetResponse {
  constructor(
      public serverStatus: number,
      public correcte: boolean,
      public msg: string,
      public id: number
  ) {}
}