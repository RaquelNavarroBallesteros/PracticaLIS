import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import {Router} from '@angular/router';
import {Storage} from '@ionic/storage';


const STORAGE_KEY = 'login';
const STORAGE_KEY_P = 'perfil';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  public usuari = {
    correu: '',
    contrassenya: ''
  };
  public showMsgInvalidLogin = false;
  constructor(public loginService: LoginService,
              private route: Router, private storage: Storage)
              { }

  ngOnInit() {
  }

  doLogin(){
    this.loginService.doLogin(this.usuari).subscribe((res: LoginResponse) => {
      if (!res.doLogin){
        this.showMsgInvalidLogin = true;
      }else{
        this.showMsgInvalidLogin = false;
        this.updateStoredLogin(res.idUsuari);
      }
    });
  }
  changeInputs(){
    this.showMsgInvalidLogin = false;
  }
  ionViewWillEnter(){
    this.usuari.correu = "";
    this.usuari.contrassenya = "";
    this.showMsgInvalidLogin = false;
  }

  updateStoredLogin(idUsuari: number){
    this.storage.remove(STORAGE_KEY).then(res => {
      let loginStorage = {
        correu: this.usuari.correu,
        contrassenya: this.usuari.contrassenya,
        idUsuari: idUsuari
      };
      this.storage.set(STORAGE_KEY, loginStorage);
      this.route.navigate(['/perfil']);
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
