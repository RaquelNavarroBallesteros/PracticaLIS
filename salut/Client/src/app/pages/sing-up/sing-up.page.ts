import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { SignUpService } from 'src/app/services/signUp.service';
import { Router } from "@angular/router";
import { Storage } from "@ionic/storage";
import { ToastController } from "@ionic/angular";
import { ModalController } from '@ionic/angular';
import { TerminosPage } from '../terminos/terminos.page'


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
    terminos: false
  };

  constructor(
    public signUpService: SignUpService,
    private route: Router,
    private storage: Storage,
    private toastController: ToastController,
    private modalController: ModalController
  ) {}

  ngOnInit() {}

  doSingUp() {
    let self = this;
    var err = false
    console.log("donig singUp");
    if (this.registre.psw != this.registre.confirmPsw) {
      self.presentToast("Les contrasenyes no coincideixen.");
      err = true
    }

    if (!this.registre.terminos)
    {
      self.presentToast("Has d'acceptar els termes d'ús.")
      err = true
    }

    if (!err)
    {
      this.signUpService
      .addUser(this.registre)
      .subscribe((res: SignUpResponse) => {
        if (res.doSignUp) {
          self.updateStoredLogin(res.usuariId);
        }else if(res.serverStatus == 200){
          self.presentToast("Ja existeix un usuari amb aquest correu.");
        }
        console.log("Resp: ",res);
      });
    }
    
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
      self.presentToast("Registrat correctament. Per començar crea un perfil");
      this.route.navigate(["/perfil"]);
    });
  }

  async presentTerminos() {
    console.log("Terminos!")
    const modal = await this.modalController.create({
      component: TerminosPage
    });
    return await modal.present();
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
