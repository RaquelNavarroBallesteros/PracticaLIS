import { Component, OnInit } from '@angular/core';
import { PerfilService } from 'src/app/services/perfil.service';
import { NavController } from '@ionic/angular';
import { AlertController, Platform, ToastController } from '@ionic/angular';
import {Storage} from '@ionic/storage';
import {Router} from '@angular/router';


const STORAGE_KEY_P = 'perfil';
const STORAGE_KEY_U = 'login';
@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {
  public perfil = {
    id: 0,
    usuari_id: null,
    nom: '',
    cognoms: '',
    data_n: null,
    genere: '',
    alcada: null,
    pes: null,
    g_sanguini: null,
    d_organs: '',
    allergies: [],
  }
  public nomAllergia = {nom:'', descripcio: ''};
  allergies = [];
  public backButton = "true";
  private goToInici = false;

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

  constructor(public perfilService: PerfilService, public alertCtrl: AlertController, private storage: Storage, private platform: Platform, private route: Router,
              private toastController: ToastController) 
  { }

  addControl(){
    //this.allergiesCount++;
    //this.allergies.addControl('al·lergia' + this.allergiesCount, new FormControl('', Validators.required));
  }

  removeControl(control){
    //this.allergies.removeControl(control.key);
  }

  ngOnInit() {
    //console.log("Enviar formulari dades mèdiques.")
    this.platform.ready().then(() =>{
      this.storage.get(STORAGE_KEY_P).then(information => {
        if (information != null){
            this.perfil.id=information.id
            this.perfilService.obtenir(this.perfil.id).subscribe((res: PerfilSetResponse)=>{
            console.log(res.data)
            this.perfil.nom = res.data['Nom'];
            this.perfil.cognoms = res.data['Cognoms'];
            this.perfil.data_n = res.data['DataNaixement'].substring(0, 10);
            this.perfil.pes = res.data['Pes'];
            this.perfil.alcada = res.data['Alcada']
            this.perfil.genere = res.data['Genere']
            this.perfil.d_organs = String(res.data['Donant'])
            this.perfil.g_sanguini = res.data['GrupS']
              for(var i=0; i<res.data['Allergies'].length; i++)
              {
                this.allergies.push({nom: res.data['Allergies'][i]["Nom"], 
                descripcio:res.data['Allergies'][i]["Descripcio"]});
              }
      
              console.log(this.allergies);
              console.log(this.perfil);
            });
            this.backButton = "true";
            this.goToInici = false;
        }else{
          this.storage.get(STORAGE_KEY_U).then(information => {
            this.perfil.usuari_id = information.idUsuari;
          });
          this.backButton = "false";
          this.goToInici = true;
        }
      });
    });
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
          this.perfil.id = res.id;

          this.storage.remove(STORAGE_KEY_P).then(res => {
            let perfilStorage = {id: this.perfil.id};
            this.storage.set(STORAGE_KEY_P, perfilStorage);
            this.presentToast("Les dades s'han guardat correctament.");
            // TODO: Show msg
            console.log("Data was saved")
            if (this.goToInici){
              this.route.navigate(['/inici']);
            }
          });
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
          alert("Les dades s'han guardat correctament.")
          // TODO: Show msg
        }
        else
        {
          // TODO: Show msg
          alert("Error:" + res.msg)
        }
      });
    }
    
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
      public id: number
  ) {}
}




