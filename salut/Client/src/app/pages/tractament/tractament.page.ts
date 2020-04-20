import { Component, OnInit } from '@angular/core';
import { TractamentService } from 'src/app/services/tractament.service';
import { AlertController } from '@ionic/angular';
import { async } from '@angular/core/testing';

@Component({
  selector: 'app-tractament',
  templateUrl: './tractament.page.html',
  styleUrls: ['./tractament.page.scss'],
})
export class TractamentPage implements OnInit {

  public tractament = {
    id: 1,
    perfil_id: 1,
    nom: '',
    data_i: '',
    data_f: '',
    medicaments: []
  }

  constructor(public tractamentService: TractamentService, public alertCtrl: AlertController) {}

  public auxMedicament = {id: 0, idM: null, periode:null};
  public medicaments_query = {};
  public medicaments_keys = [];

  afegirMedicament()
  {
    let medicament = this.auxMedicament;
    if (medicament.idM == null || medicament.periode == null)
    {
      alert("Indica el medicament i la periodicitat.");
    }
    else
    {
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

  ngOnInit() {}

  ionViewWillEnter()
  {
    console.log("ION WILL ENTER");
    this.get();
    this.get_medicaments();
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
            periode: res.data['Medicaments'][i].Periode});
        }

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
      alert("Les dades s'han guardar correctament.");
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
  ) {}
}