import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import {Router} from '@angular/router';
import {Storage} from '@ionic/storage';
import { PerfilService } from 'src/app/services/perfil.service';


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
  constructor(public loginService: LoginService, public perfilService: PerfilService,
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
        idUsuari: idUsuari,
        logged: true
      };
      this.storage.set(STORAGE_KEY, loginStorage);
      this.updateStoredPerfil(idUsuari);
    });
  }

  updateStoredPerfil(idUsuari: number){
    this.perfilService.getall(idUsuari).subscribe((res: PerfilGetAllResponse) => {
      if (res.correcte){
        var perfilId = 0;
        var nom = '';
        if (res.data.length > 0){
          perfilId = res.data[0]['Id'];
          nom = res.data[0]['Nom'];
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
      public perfil: boolean,
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