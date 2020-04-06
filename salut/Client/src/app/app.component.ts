import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import {Router} from '@angular/router';
import { CompileShallowModuleMetadata } from '@angular/compiler';
import {Storage} from '@ionic/storage';
import { LoginService } from 'src/app/services/login.service';


const STORAGE_KEY = 'login';

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
    private loginService: LoginService
  ) {
    this.initializeApp();
    this.doLogin();
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
            this.route.navigate(['/inici']);
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
}

export class LoginResponse {
  constructor(
      public serverStatus: number,
      public doLogin: boolean,
      public idUsuari: number,
      public msg: string,
  ) {}
}