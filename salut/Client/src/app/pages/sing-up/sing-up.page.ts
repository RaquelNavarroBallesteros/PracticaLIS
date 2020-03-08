import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sing-up',
  templateUrl: './sing-up.page.html',
  styleUrls: ['./sing-up.page.scss'],
})
export class SingUpPage implements OnInit {
  public registre = {
    nom: '',
    cognoms: '',
    correu: '',
    psw: '',
    confirmPsw:''
  };

  constructor() {
  }

  ngOnInit() {
  }

  doSingUp(){
    console.log("donig singUp");
    console.log(this.registre);
  }

}
