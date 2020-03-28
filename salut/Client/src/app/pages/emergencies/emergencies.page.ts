import { Component, OnInit } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { EmergenciesService } from 'src/app/services/emergencies.service';
import {PerfilService} from 'src/app/services/perfil.service';

@Component({
  selector: 'app-emergencies',
  templateUrl: './emergencies.page.html',
  styleUrls: ['./emergencies.page.scss']
})
export class EmergenciesPage implements OnInit {
  urlImg = 'assets/img/112.png';
  constructor(private geolocation: Geolocation,
              private emergenciesService: EmergenciesService,
              private perfilService: PerfilService) {}

  ngOnInit() {}

  sendAvis() {

    var request = null;
    var coordenades = null;
    var idUsuari = null;
    var self = this;
    idUsuari = 1;

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
            //TODO: Define toster
            console.log("EROOR ENVIAMNET CORREU")
          }else{
            //TODO: Define toster
            console.log("CORREU ENVIAT")
          }
        });

    });
  }
  sendEmergencia(){
    var request = null;
    var coordenades = null;
    var idPerfil = null;
    var perfilInfo = null;
    var self = this;

    idPerfil = 1;

    this.geolocation.getCurrentPosition({
        enableHighAccuracy: true
      }).then(location => {

        coordenades = {
          "latitud": location.coords.latitude,
          "longitut": location.coords.longitude
        }

        self.perfilService.getPerfilById(idPerfil).subscribe((res: PerfilInformationResponse) =>{
          if(res.serverStatus === 200 && res.getPerfil){
            request = {
              "coordenades": coordenades,
              "perfil": res.infoPerfil
            }
            console.log("send Emergencia");
            console.log(request);

            self.emergenciesService.sendEmergencia(request).subscribe((res: EmergencieResponse) => {
              console.log('respuesta')
              console.log(res);
              if (res.serverStatus === 200 && res.correuEnviat){
                //TODO: Define toster
                console.log("CORREU ENVIAT")
                
              }else{
                //TODO: Define toster
                console.log("EROOR ENVIAMNET CORREU")
              }
            });
          }else{
            console.log("EROOR obtenció perfil")
          }
        });



    });
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
    public getPerfil: boolean,
    public msg: string,
    public infoPerfil: Perfil
  ){}
}