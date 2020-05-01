import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';
import {LocalNotifications} from '@ionic-native/local-notifications/ngx';
import { stringify } from 'querystring';


@Injectable({
  providedIn: 'root'
})
export class NotificacionsService {

  constructor(private platform : Platform, private localNotification: LocalNotifications) 
  { 

  }

  crearPeriodic(medicament :string, tractament:string, hora: number, minut: number, fins: Date, perfil: string){
    var d = new Date().getTime();
    this.localNotification.schedule({
      id: d,
      title: 'Seguiment del tractament: ' +tractament,
      text: perfil + ', son les ' + hora.toString() + ':' + minut.toString() + ' recorda prendret el medicament: ' + medicament,
      silent: false,
      launch: false,
      group: 'Medicament',
      autoClear: true,
      lockscreen: true,
      foreground: true,
      trigger:{
        before: fins,
        every:{hour: hora, minute: minut}
      }
    });
  }
  crearPuntualRecepta(){

  }
  crearPuntualVisita(){

  }

}
