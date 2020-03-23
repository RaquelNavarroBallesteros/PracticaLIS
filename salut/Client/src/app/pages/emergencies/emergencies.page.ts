import { Component, OnInit } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { EmergenciesService } from 'src/app/services/emergencies.service';

@Component({
  selector: 'app-emergencies',
  templateUrl: './emergencies.page.html',
  styleUrls: ['./emergencies.page.scss']
})
export class EmergenciesPage implements OnInit {
  urlImg = 'assets/img/112.png';
  constructor(private geolocation: Geolocation,
              private emergenciesService: EmergenciesService) {}

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

  }
}

export class EmergencieResponse {
  constructor(
      public serverStatus: number,
      public correuEnviat : boolean,
      public msg: string,
  ) {}
}