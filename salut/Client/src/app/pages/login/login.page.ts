import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import {Router} from '@angular/router';
import {Storage} from '@ionic/storage';
import { PerfilService } from 'src/app/services/perfil.service';
import {ValidationService} from "src/app/services/validation.service.js"
import { ToastController } from "@ionic/angular";


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
              private route: Router, private storage: Storage, private validationService: ValidationService,
              private toastController: ToastController)
              { }

  ngOnInit() {
  }

  doLogin(){
    this.loginService.doLogin(this.usuari).subscribe((res: LoginResponse) => {
      if (!res.doLogin){
        this.showMsgInvalidLogin = true;
      }else{
        this.showMsgInvalidLogin = false;
        this.updateStoredLogin(res.idUsuari, res.activat);
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

  updateStoredLogin(idUsuari: number, activat: boolean){
    this.storage.remove(STORAGE_KEY).then(res => {
      let loginStorage = {
        correu: this.usuari.correu,
        contrassenya: this.usuari.contrassenya,
        idUsuari: idUsuari,
        logged: true
      };
      this.storage.set(STORAGE_KEY, loginStorage);
      this.updateStoredPerfil(idUsuari, activat);
    });
  }

  updateStoredPerfil(idUsuari: number, activat: boolean){
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
            if (activat){  
              this.route.navigate(['/inici']);
            }else{
              let request = {
                correu: this.usuari.correu
              };
              this.validationService.sendValidationEmail(request).subscribe((res: EmailValidationResponse)=>{
                this.presentToast("Correu no validat, verifica-ho");
                this.route.navigate(['/validacio/mail']);
              });
            }
          });
        }else{
          if (activat){
            this.route.navigate(['/perfil']);
          }else{
            let request = {
              correu: this.usuari.correu
            };
            this.validationService.sendValidationEmail(request).subscribe((res: EmailValidationResponse)=>{
              this.presentToast("Correu no validat, verifica-ho");
              this.route.navigate(['/validacio/mail']);
            });
          }
        }
      }
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

export class LoginResponse {
  constructor(
      public serverStatus: number,
      public doLogin: boolean,
      public idUsuari: number,
      public perfil: boolean,
      public activat: boolean,
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
export class EmailValidationResponse {
  constructor(
      public serverStatus: number,
      public validacioCorreu: boolean,
      public msg: string,
  ) {}
}