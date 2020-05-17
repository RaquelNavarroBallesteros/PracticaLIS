import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { ActivatedRoute } from "@angular/router";
import {ValidationService} from "src/app/services/validation.service.js"
import {Storage} from '@ionic/storage';
import { ToastController } from "@ionic/angular";

const STORAGE_KEY_P = 'perfil';
const STORAGE_KEY = 'login';
@Component({
  selector: "app-validacio",
  templateUrl: "./validacio.page.html",
  styleUrls: ["./validacio.page.scss"],
})
export class ValidacioPage implements OnInit {
  public pageType = null;
  public validacio = {
    codi: "",
    correu: "",
    pass: "",
    repass: "",
  };
  public textButton = "Enviar";
  public codiEnviat = false;
  public title=""
  constructor(private route: ActivatedRoute, private router: Router, private validationService : ValidationService, private storage: Storage,
              private toastController: ToastController) {
    this.route.params.subscribe((params) => {
      console.log(params);
      this.pageType = params["pageType"];
      switch(this.pageType){
        case 'pass':
          this.title = 'Restaurar contrasenya';
          break;
        case 'mail':
          this.title = 'Confirmar correu';
          break;
      }
    });
  }

  ngOnInit() {}
  vaildarMail() {
    var validationInfo = {
      correu: this.validacio.correu,
      codi: this.validacio.codi
    };
    this.validationService.validateEmail(validationInfo).subscribe((res: PerfilGetAllResponse) =>{
      if (res.doValidation){
        this.storage.get(STORAGE_KEY_P).then((information) => {
          this.presentToast("Correu validat corectament.");
          if (information){
            this.storage.set
            this.router.navigate(['/inici']);
          }else{
            this.router.navigate(['/perfil']);
          }
        })
      }else{
        this.presentToast("Codi incorrecte, verifica el codi i torna-ho a enviar");
      }
    });
  }

  reenviarCodiMail() {
    console.log("show me the code");
  }
  
  validarPass() {
    if (!this.codiEnviat) {
      console.log("Enviar correu i rebre codi");
      this.textButton = "Confirmar";
      this.codiEnviat =true;
      
    } else {
      console.log("Enviar Nova contrasenya");
    }
  }
  changeInputs() {
    this.textButton = "Enviar";
    this.validacio.pass="";
    this.validacio.repass = "";
    this.codiEnviat  = false;
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
export class PerfilGetAllResponse {
  constructor(
    public serverStatus: number,
    public doValidation: boolean,
    public msg: string,
  ) {}
}