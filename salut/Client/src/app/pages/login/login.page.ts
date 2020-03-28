import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import { takeUntil } from 'rxjs/operators';
import { HttpResponse } from '@angular/common/http';


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
  constructor(public loginService: LoginService) { 
  }

  ngOnInit() {
  }

  doLogin(){
    this.loginService.doLogin(this.usuari).subscribe((res: LoginResponse) => {
      if (!res.doLogin){
        this.showMsgInvalidLogin = true;
      }else{
        this.showMsgInvalidLogin = false;
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
}

export class LoginResponse {
  constructor(
      public serverStatus: number,
      public doLogin: boolean,
      public msg: string,
  ) {}
}
