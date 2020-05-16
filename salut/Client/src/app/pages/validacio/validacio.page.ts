import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { ActivatedRoute } from "@angular/router";
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
  constructor(private route: ActivatedRoute, private router: Router) {
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
}
