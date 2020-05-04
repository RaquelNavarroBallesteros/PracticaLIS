import { Component, OnInit } from '@angular/core';
import { TractamentService } from 'src/app/services/tractament.service';
import { AlertController } from '@ionic/angular';
import { async } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import {Storage} from '@ionic/storage';

const STORAGE_KEY_P = 'perfil';
@Component({
  selector: 'app-tractament',
  templateUrl: './tractament.page.html',
  styleUrls: ['./tractament.page.scss'],
})
export class TractamentPage implements OnInit {

  public tractament = {
    id: null,
    perfil_id: 0,
    nom: '',
    data_i: '',
    data_f: '',
    medicaments: []
  }

  constructor(private route: ActivatedRoute, public tractamentService: TractamentService, public alertCtrl: AlertController,
              private storage: Storage) 
  {
    this.route.params.subscribe(params => {
      console.log(params);
      this.tractament.id = params['id']; 
    });
  }

  public auxMedicament = {id: 0, idM: null, periode:null};
  public medicaments_query = {};
  public medicaments_keys = [];

  afegirMedicament()
  {
    let medicament = this.auxMedicament;
    if (medicament.idM == null || medicament.periode == null)
    {
      alert("Indica el medicament i la hora de la presa.");
    }
    else
    {
      medicament.periode = new Date(medicament.periode).toLocaleTimeString('es-ES');
      console.log(medicament);
      this.tractament.medicaments.push(medicament);
      this.auxMedicament = {id: 0, idM: null, periode:null};
    }
  }

  deleteM(index)
  {
    this.tractament.medicaments.splice(index, 1);
  }

  /*
  async updateTask(index) {
    const alert = await this.alertCtrl.create({
        message: 'Editar Medicament',
        inputs: [{ name: 'editNom', value: this.medicaments[index]["nom"], placeholder: 'Medicament' }, { name: 'editDescripcio', value: this.medicaments[index]["descripcio"], placeholder: 'Descripció' }],
        buttons: [{ text: 'Cancel', role: 'cancel' },
                  { text: 'Update', handler: data => {
                      this.medicaments[index]["nom"] = data.editNom; 
                      this.medicaments[index]["descripcio"] = data.editDescripcio; }
                  }
                 ]
    });
  await alert.present();
  
  }
*/

  ngOnInit() {
    this.storage.get(STORAGE_KEY_P).then(information => {
      if (information != null){
        this.tractament.perfil_id = information.id;
      }
      console.log("ION WILL ENTER");
      this.get();
    });
  }

  ionViewWillEnter()
  {
  }

  get()
  {
    console.log("GET");
    if (this.tractament.id != 0)
    {
      this.tractamentService.get_request(this.tractament.id).subscribe((res: TractamentGetResponse)=>{
        //console.log(res.data)
        this.tractament.id = res.data['Id'];

        this.tractament.nom = res.data['Nom'];
        this.tractament.perfil_id = res.data['PerfilId'];
        this.tractament.data_i = res.data['DataInici'].substring(0, 10);
        this.tractament.data_f = res.data['DataFinal'].substring(0, 10);

        for(var i=0; i<res.data['Medicaments'].length; i++)
        {
          this.tractament.medicaments.push({
            id: res.data['Medicaments'][i].Id,
            idM: res.data['Medicaments'][i].MedicamentId,
            periode: res.data['Medicaments'][i].Periode.substring(0, 5)});
        }
        this.get_medicaments();
        //console.log(this.tractament);
      });
    }
  }

  get_medicaments()
  {
    console.log("GET MEDICAMENTS")
    this.tractamentService.m_getall_request().subscribe((res: any)=>{
      console.log(res.data);

      for(var i=0; i<res.data.length; i++)
      {
        this.medicaments_query[res.data[i].Id] = res.data[i].Nom;
      }

      this.medicaments_keys = Object.keys(this.medicaments_query);

      console.log(this.medicaments_query);
      console.log(this.medicaments_keys);
    });
  }

  add()
  {
    console.log("Tractament add");
    this.tractamentService.add_request(this.tractament).subscribe((res: TractamentSetResponse)=>{
      if (res.correcte)
      {
        alert("Les dades s'han guardar correctament.");
        this.tractament.id = res.id;
      }
      
    else
      alert("Error: " + res.msg);
    });
  }

  update()
  {
    console.log("Tractament update");
    this.tractamentService.update_request(this.tractament).subscribe((res: TractamentSetResponse)=>{
      if (res.correcte)
        alert("Les dades s'han guardar correctament.");
      else
        alert("Error: " + res.msg);
    });
  }

  enviar()
  {
    if(this.tractament.id == 0)
    {
      this.add();
    }
    else
    {
      this.update();
    }
  }
}

export class TractamentGetResponse {
  constructor(
      public serverStatus: number,
      public correcte: boolean,
      public data: object,
      public msg: string,
  ) {}
}

export class TractamentSetResponse {
  constructor(
      public serverStatus: number,
      public correcte: boolean,
      public msg: string,
      public id: number
  ) {}
}