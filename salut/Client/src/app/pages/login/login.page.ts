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
  }
  constructor(public loginService: LoginService) { }

  ngOnInit() {
  }

  doLogin(){
    console.log("doing login");
    console.log(this.usuari);
    this.loginService.doLogin(this.usuari).subscribe((res: HttpResponse<any>) => {
      console.log('respuesta')
      console.log(res);
    });
  }

}
