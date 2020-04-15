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
    id: 12,
    perfil_id: 1,
    nom: 'T2',
    data_i: '2019-12-09',
    data_f: '2021-12-09',
    medicaments: [
      {medicament_id: 1, periode:3},
      {medicament_id: 2, periode:4},
    ],
  }

  constructor(public tractamentService: TractamentService, public alertCtrl: AlertController) {}

  public nomMedicament = {nom:'', descripcio: ''};
  medicaments = [];

  afegirMedicament()
  {
      let medicament = this.nomMedicament;
      this.medicaments.push(medicament);
      this.nomMedicament = {nom:'', descripcio: ''};
   
  }

  deleteTask(index)
  {
    this.medicaments.splice(index, 1);
  }

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


  ngOnInit() {}

  ionViewWillEnter()
  {
    console.log("ION WILL ENTER");
    this.get();
    //this.add();
  }

  get()
  {
    console.log("GET");
    if (this.tractament.id != 0)
    {
      this.tractamentService.get_request(this.tractament.id).subscribe((res: TractamentGetResponse)=>{
      console.log(res.data)
      this.tractament.id = res.data['Id'];
      this.tractament.perfil_id = res.data['PerfilId'];
      this.tractament.data_i = res.data['DataInici'].substring(0, 10);
      this.tractament.data_f = res.data['DataFi'].substring(0, 10);
      //this.tractament.medicaments
      });
    }
  }

  add()
  {
    console.log("Tractament add");
    this.tractamentService.add_request(this.tractament).subscribe((res: TractamentSetResponse)=>{
      console.log(res.correct)
    })
  }

  update()
  {
  }
}

export class TractamentGetResponse {
  constructor(
      public serverStatus: number,
      public correct: boolean,
      public data: object,
      public msg: string,
  ) {}
}

export class TractamentSetResponse {
  constructor(
      public serverStatus: number,
      public correct: boolean,
      public msg: string,
  ) {}
}