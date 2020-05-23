import { Component, OnInit } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { EmergenciesService } from 'src/app/services/emergencies.service';
import {PerfilService} from 'src/app/services/perfil.service';
import {Storage} from '@ionic/storage';
import { ToastController } from "@ionic/angular";

const STORAGE_KEY = 'login';
const STORAGE_KEY_P = 'perfil';

@Component({
  selector: 'app-emergencies',
  templateUrl: './emergencies.page.html',
  styleUrls: ['./emergencies.page.scss']
})
export class EmergenciesPage implements OnInit {
  urlImg = 'assets/img/112.png';
  constructor(private geolocation: Geolocation,
              private emergenciesService: EmergenciesService,
              private perfilService: PerfilService,
              private storage: Storage,
              private toastController: ToastController) {}

  ngOnInit() {}

  sendAvis() {

    var request = null;
    var coordenades = null;
    var idUsuari = null;
    var self = this;
    console.log('console log prova IP');
    this.storage.get(STORAGE_KEY).then(information => {
      idUsuari = information.idUsuari;
      this.geolocation.getCurrentPosition({
          enableHighAccuracy: true
        }).then(location => {

          coordenades = {
            "latitud": location.coords.latitude,
            "longitut": location.coords.longitude
          }
          request = {
            "UsuariId": idUsuari,
            "coordenades": coordenades
          }
          console.log("send Avis");
          console.log(request);
          self.emergenciesService.sendAvis(request).subscribe((res: EmergencieResponse) => {
            console.log('respuesta')
            console.log(res);
            if (!res.correuEnviat){
              this.presentToast("No s'ha pogut notificar al servei d'emergencies")
              console.log("EROOR ENVIAMNET CORREU")
            }else{
              this.presentToast("S'ha efectuat la notificació al servei d'emergéncies")
              //TODO: Define toster
              console.log("CORREU ENVIAT")
            }
          });

      });
    });
  }
  sendEmergencia(){
    var request = null;
    var coordenades = null;
    var idUsuari = null;
    var perfilInfo = null;
    var self = this;

    this.storage.get(STORAGE_KEY).then(information => {
      idUsuari = information.idUsuari;

      this.geolocation.getCurrentPosition({enableHighAccuracy: true}).then(location => {
        coordenades = {
          "latitud": location.coords.latitude,
          "longitut": location.coords.longitude
        }

        self.perfilService.obtenir(idUsuari).subscribe((res: PerfilInformationResponse) =>{
          if(res.serverStatus === 200 && res.correcte){
            request = {
              "coordenades": coordenades,
              "perfil": res.data
            }
            console.log("send Emergencia");
            console.log(request);

            self.emergenciesService.sendEmergencia(request).subscribe((res: EmergencieResponse) => {
              console.log('respuesta')
              console.log(res);
              if (res.serverStatus === 200 && res.correuEnviat){
                this.presentToast("S'ha efectuat la notificació al servei d'emergéncies")
                console.log("CORREU ENVIAT")
                
              }else{
                this.presentToast("No s'ha pogut notificar al servei d'emergencies")
                console.log("EROOR ENVIAMNET CORREU")
              }
            });
          }else{
            console.log("EROOR obtenció perfil")
          }
        });
      });
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
}

export class EmergencieResponse {
  constructor(
      public serverStatus: number,
      public correuEnviat : boolean,
      public msg: string,
  ) {}
}

export class Perfil{
  constructor(
    public Id: number,
    public UsuariId: number,
    public Nom: string,
    public Cognoms: string,
    public DataNaixement: Date,
    public Pes: number,
    public Alcada: number,
    public Genere: string
  ){}
}

export class PerfilInformationResponse{
  constructor(
    public serverStatus: number,
    public correcte: boolean,
    public msg: string,
    public data: Perfil
  ){}
}