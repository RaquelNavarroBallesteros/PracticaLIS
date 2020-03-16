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
  constructor(public loginService: LoginService) { }

  ngOnInit() {
  }

  doLogin(){
    console.log("doing login");
    console.log(this.usuari);
    this.loginService.doLogin(this.usuari).subscribe((res: LoginResponse) => {
      console.log('respuesta')
      console.log(res);
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
}

export class LoginResponse {
  constructor(
      public serverStatus: number,
      public doLogin: boolean,
      public msg: string,
  ) {}
}
