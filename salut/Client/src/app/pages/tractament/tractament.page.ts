import { Component, OnInit } from '@angular/core';
import { TractamentService } from 'src/app/services/tractament.service';
import { AlertController } from '@ionic/angular';
import { async } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import {Storage} from '@ionic/storage';
import { NotificacionsService } from 'src/app/services/notificacions.service';
import {Router} from '@angular/router';
import { ToastController } from "@ionic/angular";

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
  private nomPerfil = null;  

  constructor(private route: ActivatedRoute, public tractamentService: TractamentService, public alertCtrl: AlertController,
              private storage: Storage, private notificationService: NotificacionsService, private router:Router,
              private toastController: ToastController) 
  {
    this.route.params.subscribe(params => {
      console.log(params);
      this.tractament.id = params['id']; 
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

  public auxMedicament = {id: 0, idM: null, periode:null};
  public medicaments_query = {};
  public medicaments_keys = [];

  afegirMedicament()
  {
    let medicament = this.auxMedicament;
    if (medicament.idM == null || medicament.periode == null)
    {
      this.presentToast("Indica el medicament i la hora de la presa.");
    }
    else
    {
      medicament.periode = new Date(medicament.periode).toLocaleTimeString('es-ES');
      console.log(medicament);
      medicament.periode = medicament.periode.substring(0,5);
      this.tractament.medicaments.push(medicament);
      this.auxMedicament = {id: 0, idM: null, periode:null};
    }
  }

  deleteM(index)
  {
    this.tractament.medicaments.splice(index, 1);
  }

  ngOnInit() {
    this.storage.get(STORAGE_KEY_P).then(information => {
      if (information != null){
        this.tractament.perfil_id = information.id;
        this.nomPerfil = information.nom;
      }
      console.log("ION WILL ENTER");
      this.get();
    });
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
        //console.log(this.tractament);
      });
    
    }
    this.get_medicaments();
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
    var self = this;
    this.tractamentService.add_request(this.tractament).subscribe((res: TractamentSetResponse)=>{
      if (res.correcte)
      {
        this.presentToast("Les dades s'han guardar correctament.");
        this.tractament.id = res.id;
        this.tractament.medicaments.forEach((medicament) =>{
          var horesMin = medicament.periode.split(':');
          this.notificationService.crearPeriodic(this.medicaments_query[medicament.idM],this.tractament.nom,parseInt(horesMin[0]),parseInt(horesMin[1]),
          new Date(this.tractament.data_f), this.nomPerfil, new Date(this.tractament.data_i), this.tractament.id);
        })
        self.router.navigate(['/llista-tractaments']);
      }
      
    else
    this.presentToast("Error: " + res.msg);
    });
  }

  update()
  {
    console.log("Tractament update");
    var self = this;
    this.tractamentService.update_request(this.tractament).subscribe((res: TractamentSetResponse)=>{
      if (res.correcte){
        this.presentToast("Les dades s'han guardar correctament.");
        this.notificationService.eliminarNotificacioTractament(this.tractament.id);
        this.tractament.medicaments.forEach((medicament) =>{
          var horesMin = medicament.periode.split(':');
          this.notificationService.crearPeriodic(this.medicaments_query[medicament.idM],this.tractament.nom,parseInt(horesMin[0]),parseInt(horesMin[1]),
          new Date(this.tractament.data_f), this.nomPerfil, new Date(this.tractament.data_i), this.tractament.id);
        });
        self.router.navigate(['/llista-tractaments']);
      }else
      this.presentToast("Error: " + res.msg);
    });
  }

  enviar()
  {
    if(this.tractament.nom == "")
    {
      this.presentToast("Has d'indicar el nom del tractament.")
    }
    else{
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