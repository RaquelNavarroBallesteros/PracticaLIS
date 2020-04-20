import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { PerfilService } from 'src/app/services/perfil.service';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { async } from '@angular/core/testing';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {
  public perfil = {
    id: 1,
    usuari_id: 1,
    nom: '',
    cognoms: '',
    data_n: null,
    genere: 'D',
    alcada: null,
    pes: null,
    g_sanguini: null,
    d_organs: 0,
    allergies: [],
  }
  public nomAllergia = {nom:'', descripcio: ''};
  allergies = [];

  afegirAllergia()
  {
      let allergia = this.nomAllergia;
      this.allergies.push(allergia);
      this.nomAllergia = {nom:'', descripcio: ''};
   
  }

  deleteTask(index)
  {
    this.allergies.splice(index, 1);
  }

  async updateTask(index) {
    const alert = await this.alertCtrl.create({
        message: 'Editar Al·lèrgia',
        inputs: [{ name: 'editNom', value: this.allergies[index]["nom"], placeholder: 'Al·lèrgia' }, { name: 'editDescripcio', value: this.allergies[index]["descripcio"], placeholder: 'Descripció' }],
        buttons: [{ text: 'Cancel', role: 'cancel' },
                  { text: 'Update', handler: data => {
                      this.allergies[index]["nom"] = data.editNom; 
                      this.allergies[index]["descripcio"] = data.editDescripcio; }
                  }
                 ]
    });
  await alert.present();
}

  constructor(public perfilService: PerfilService, public alertCtrl: AlertController) 
  { }


  ionViewWillEnter(){
    if (this.perfil.id != 0)
    {
      this.perfilService.obtenir(1).subscribe((res: PerfilSetResponse)=>{
      console.log(res.data)
      this.perfil.nom = res.data['Nom'];
      this.perfil.cognoms = res.data['Cognoms'];
      this.perfil.data_n = res.data['DataNaixement'].substring(0, 10);
      this.perfil.pes = res.data['Pes'];
      this.perfil.alcada = res.data['Alcada']
      this.perfil.genere = res.data['Genere']

        for(var i=0; i<res.data['Allergies'].length; i++)
        {
          this.allergies.push({nom: res.data['Allergies'][i]["Nom"], 
          descripcio:res.data['Allergies'][i]["Descripcio"]});
        }

        console.log(this.allergies);
      });
  }
  }

  addControl(){
    //this.allergiesCount++;
    //this.allergies.addControl('al·lergia' + this.allergiesCount, new FormControl('', Validators.required));
  }

  removeControl(control){
    //this.allergies.removeControl(control.key);
  }

  ngOnInit() {
    //console.log("Enviar formulari dades mèdiques.")
  }

  enviar()
  {
    this.perfil.allergies = this.allergies;
    if (this.perfil.id == 0)
    {
      console.log("Perfil add")
      this.perfilService.add(this.perfil).subscribe((res: PerfilGetResponse)=>{
        if (res.correct)
        {
          alert("Les dades s'han guardat correctament.")
          // TODO: Show msg
          console.log("Data was saved")
        }
        else
        {
          // TODO: Show msg
          alert("Error:" + res.msg)
        }
      });
    }
    else
    {
      console.log("Perfil update")
      this.perfilService.update(this.perfil).subscribe((res: PerfilGetResponse)=>{
        if (res.correct)
        {
          this.perfil.allergies[0]
          // TODO: Show msg
          console.log("Data was saved")
        }
        else
        {
          // TODO: Show msg
          console.log("Error:" + res.msg)
        }
      });
    }
    
  }

}

export class PerfilSetResponse {
  constructor(
      public serverStatus: number,
      public correct: boolean,
      public data: object,
      public msg: string,
  ) {}
}

export class PerfilGetResponse {
  constructor(
      public serverStatus: number,
      public correct: boolean,
      public msg: string,
  ) {}
}




