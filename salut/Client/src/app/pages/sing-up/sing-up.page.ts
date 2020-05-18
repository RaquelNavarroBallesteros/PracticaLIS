import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { SignUpService } from 'src/app/services/signUp.service';
import { Router } from "@angular/router";
import { Storage } from "@ionic/storage";
import { ToastController } from "@ionic/angular";
import {ValidationService} from "src/app/services/validation.service.js"


const STORAGE_KEY = "login";
@Component({
  selector: "app-sing-up",
  templateUrl: "./sing-up.page.html",
  styleUrls: ["./sing-up.page.scss"],
})
export class SingUpPage implements OnInit {
  public registre = {
    nom: "",
    cognoms: "",
    correu: "",
    psw: "",
    confirmPsw: "",
  };

  constructor(
    public signUpService: SignUpService,
    private route: Router,
    private storage: Storage,
    private toastController: ToastController,
    private validateService: ValidationService
  ) {}

  ngOnInit() {}

  doSingUp() {
    let self = this;
    console.log("donig singUp");
    if (this.registre.psw != this.registre.confirmPsw) {
      self.presentToast("Les contrasenyes no coincideixen.");
    }
    this.signUpService.addUser(this.registre).subscribe((res: SignUpResponse) => {
        if (res.doSignUp) {
          self.updateStoredLogin(res.usuariId);
        }else if(res.serverStatus == 200){
          self.presentToast("Ja existeix un usuari amb aquest correu.");
        }
        console.log("Resp: ",res);
      });
  }
  updateStoredLogin(idUsuari: number) {
    let self = this;
    this.storage.remove(STORAGE_KEY).then((res) => {
      let loginStorage = {
        correu: this.registre.correu,
        contrassenya: this.registre.psw,
        idUsuari: idUsuari,
        logged: true,
      };
      this.storage.set(STORAGE_KEY, loginStorage);
      let request = {
        correu: this.registre.correu
      };
      this.validateService.sendValidationEmail(request).subscribe((res: EmailValidationResponse)=>{
        self.presentToast("Registrat correctament. Verifica el correu");
        this.route.navigate(["/validacio", "mail"]);
      });
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
export class SignUpResponse {
  constructor(
      public serverStatus: number,
      public doSignUp: boolean,
      public usuariId:number,
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
