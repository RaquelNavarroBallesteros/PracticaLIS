import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {  throwError } from 'rxjs';
import {catchError, timeout } from 'rxjs/operators';
import {APIUrl} from '../../environments/environment';
import { ToastController } from "@ionic/angular";

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  public _aplicationURL = APIUrl + '/Login'
        _doLoginURL = '/doLogin';

  constructor(private http: HttpClient, private toastController: ToastController) { }
  
  doLogin(req){
    console.log("Do login service")
    console.log(this._aplicationURL + this._doLoginURL);
    return this.http.post(this._aplicationURL + this._doLoginURL, req).pipe(timeout(3000),catchError(error => {
      let msg = "Impossible connectar amb el servidor.";
      this.presentToast(msg);
      return throwError(msg);
    }));
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
