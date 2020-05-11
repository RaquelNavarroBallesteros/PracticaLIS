import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Router } from '@angular/router';
import { NotificacionsService } from 'src/app/services/notificacions.service';

const STORAGE_KEY_U = 'login';
const STORAGE_KEY_P = 'perfil';
@Component({
  selector: 'app-inici',
  templateUrl: './inici.page.html',
  styleUrls: ['./inici.page.scss'],
})
export class IniciPage implements OnInit {

  constructor(private storage: Storage, private route: Router, private notificacionsService : NotificacionsService) { }

  ngOnInit() {

  }
  logOut() {
    this.storage.remove(STORAGE_KEY_U).then(res=>{
      this.storage.remove(STORAGE_KEY_P).then(res=>{
        this.route.navigate(['/login']);
      });
    });
  }
  crearNotificacio(){
    var date = new Date('2020-05-05T13:00:00');
    var currentDate = new Date(new Date().getTime());
    //this.notificacionsService.crearPeriodic('Ibuprofeno', 'migranyes', currentDate.getUTCHours() + 2, currentDate.getUTCMinutes() + 2, date, "Guillem" );
    var dateRecepta = new Date('2020-05-03T14:15:00');
    this.notificacionsService.crearPuntualRecepta(dateRecepta);
  }
}
