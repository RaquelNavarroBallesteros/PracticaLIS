import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import {Router} from '@angular/router';
import { CompileShallowModuleMetadata } from '@angular/compiler';
import {Storage} from '@ionic/storage';
import { LoginService } from 'src/app/services/login.service';
import { PerfilService } from 'src/app/services/perfil.service';



const STORAGE_KEY = 'login';
const STORAGE_KEY_P = 'perfil';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private route: Router,
    private storage: Storage,
    private loginService: LoginService,
    private perfilService: PerfilService
  ) {
    this.initializeApp();
    //this.doLogin();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
  doLogin(){
    this.storage.get(STORAGE_KEY).then(information => {
      if(information){
        let usuari = {
          correu: information.correu,
          contrassenya: information.contrassenya
        };
        this.loginService.doLogin(usuari).subscribe((res: LoginResponse) => {
          if (res.doLogin){
            let idUsuari = res.idUsuari;
            this.storage.remove(STORAGE_KEY).then(res => {
              let loginStorage = {
                correu: usuari.correu,
                contrassenya: usuari.contrassenya,
                idUsuari: idUsuari,
                logged: true
              };
              this.storage.set(STORAGE_KEY, loginStorage);
              this.updateStoredPerfil(idUsuari);
            });
          }else{
            console.log("Navigate To login");
            this.route.navigate(['/login']);
          }
        });
      }else{
        console.log("Navigate To login");
        this.route.navigate(['/login']);
      }
    });
  }
  updateStoredPerfil(idUsuari: number){
    this.perfilService.getall(idUsuari).subscribe((res: PerfilGetAllResponse) => {
      if (res.correcte){
        var perfilId = 0;
        if (res.data.length > 0){
          perfilId = res.data[0]['Id'];
          var nom = res.data[0]['Nom'];
          this.storage.remove(STORAGE_KEY_P).then(res => {
            let perfilStorage = {id: perfilId, nom: nom};
            this.storage.set(STORAGE_KEY_P, perfilStorage);  
            this.route.navigate(['/inici']);
          });
        }else{
          this.route.navigate(['/perfil']);
        }
      }
    });
  }
}

export class LoginResponse {
  constructor(
      public serverStatus: number,
      public doLogin: boolean,
      public idUsuari: number,
      public msg: string,
  ) {}
}
export class PerfilGetAllResponse {
  constructor(
      public serverStatus: number,
      public correcte: boolean,
      public data: Array<object>,
      public msg: string,
  ) {}
}