import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { async } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { SeguimentService } from 'src/app/services/seguiment.service';
import {Storage} from '@ionic/storage';

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
  
  constructor(public seguimentService: SeguimentService, public alertCtrl: AlertController,
              private storage: Storage) { }

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

  afegirPes()
  {
    var d = new Date(Date.now());
    var pes_db = {id: this.nouPes.id, 
    data: d, 
    valor: this.nouPes.valor, 
    perfil_id: this.perfil_id};

    let pes = this.nouPes;

    if(pes.valor == null)
      alert("Introdueix el teu pes actual.")
    else
    {
      console.log(pes_db.data);
      this.seguimentService.addpes_request(pes_db).subscribe((res: SeguimentSetResponse)=>{
        if (res.correcte)
        {
          pes.id = res.id;
          this.pess.push(pes);
          this.nouPes = {id: 0, data: null, valor: null};
          alert("El nou pes s'ha guardat correctament.");
        }
        else
          alert("Error: " + res.msg);
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
      alert("Insereix la teva alçada actual.");
    else
    {
      this.seguimentService.addalcada_request(alcada_db).subscribe((res: SeguimentSetResponse)=>{
        if (res.correcte)
        {
          alcada.id = res.id;
          this.alcadaa.push(alcada);
          this.novaAlcada = {id: 0, data: null, valor: null};
          alert("La nova alçada s'ha guardat correctament.");
        }
        else
          alert("Error: " + res.msg);
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