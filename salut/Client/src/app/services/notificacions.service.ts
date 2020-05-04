import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';
import {LocalNotifications} from '@ionic-native/local-notifications/ngx';


@Injectable({
  providedIn: 'root'
})
export class NotificacionsService {

  constructor(private platform : Platform, private localNotification: LocalNotifications) 
  { 
  }

  crearPeriodic(medicament :string, tractament:string, hora: number, minut: number, fins: Date, perfil: string){
    var d = new Date().getTime();
    this.platform.ready().then(()=>{
      this.localNotification.schedule({
        id: d,
        title: 'Seguiment del tractament: ' +tractament,
        text: perfil + ', son les ' + hora.toString() + ':' + minut.toString() + ' recorda prendret el medicament: ' + medicament,
        silent: false,
        //launch: false,
        group: 'Medicament',
        autoClear: true,
        //lockscreen: true
        foreground: true,
        sound: 'file://assets/audio/solemn.mp3',
        trigger:{
          before: fins,
          every:{hour: hora, minute: minut}
        }
      });
    })
  }
  crearPuntualRecepta(data: Date){
    this.localNotification.schedule({
      id: new Date().getTime(),
      title: 'Actualització recepta',
      text: 'Recorda actualitzar la recepta si és necessàri.',
      silent: false,
      launch: false,
      group: 'Recepta',
      autoClear: true,
      //foreground: true,
      //sound: 'assets/audio/echoed-ding.mp3',
      trigger:{
        at:data
      }
    });
  }
  crearPuntualVisita(dataNotificacio: Date, descripcio: string, dataVisita: Date){
    var hora = dataVisita.getUTCHours()+2,
        minut = dataVisita.getUTCMinutes();
    this.localNotification.schedule({
      id: new Date().getTime(),
      title: 'Recordatori de la visita',
      text: 'Tens una visita médica programada a les: ' + hora + ':' + minut + 'Descripció: ' + descripcio,
      //silent: false,
      launch: false,
      group: 'Visita',
      autoClear: true,
      lockscreen: true,
      //foreground: true,
      //sound: 'assets/audio/echoed-ding.mp3',
      trigger:{
        at:dataNotificacio
      }
    });
  }

  eliminarNotificacioRecepta() {
    this.localNotification.getAll().then(res =>{
      res.forEach(item =>{
        if (item.group == 'Recepta')
        {
          this.localNotification.cancel(item.id);
        }
      })
    });
  }
}
