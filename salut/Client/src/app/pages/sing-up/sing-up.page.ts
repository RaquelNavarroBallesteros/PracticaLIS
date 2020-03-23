import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { SignUpService } from 'src/app/services/signUp.service';

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

  constructor( public signUpService: SignUpService) {
  }

  ngOnInit() {
  }

  doSingUp(){
    console.log("donig singUp");
    this.signUpService.addUser(this.registre).subscribe((res: HttpResponse<any>)=>{
      console.log("Resp:");
      console.log(res);
    });
  }

}
