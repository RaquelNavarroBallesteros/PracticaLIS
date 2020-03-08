import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  public usuari = {
    email: '',
    psw: ''
  }
  constructor() { }

  ngOnInit() {
  }

  doLogin(){
    console.log("doing login");
    console.log(this.usuari);
  }

}
