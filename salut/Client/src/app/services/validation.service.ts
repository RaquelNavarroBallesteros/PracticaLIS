import { Injectable } from '@angular/core';
import {APIUrl} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {catchError, timeout } from 'rxjs/operators';
import {  throwError } from 'rxjs';
import { ToastController } from "@ionic/angular";

@Injectable({
  providedIn: 'root'
})
export class ValidationService {
  public _aplicationURL = APIUrl + '/Validation'
        _validateEmailUrl = '/validateEmail';
        _validateResetPasswordUrl = '/validateResetPassword';
        _sendEmailResetPasswordUrl = '/sendEmailResetPassword';
        _sendValidationEmailUrl = '/sendValidationEmail';

  constructor(private http: HttpClient, private toastController: ToastController) { }
  validateEmail(req){
    return this.http.post(this._aplicationURL + this._validateEmailUrl, req).pipe(timeout(5000),catchError(error => {
      let msg = "Impossible connectar amb el servidor.";
      this.presentToast(msg);
      return throwError(msg);
    }));
  }
  validateResetPassword(req)
  {
    return this.http.post(this._aplicationURL + this._validateResetPasswordUrl, req).pipe(timeout(5000),catchError(error => {
      let msg = "Impossible connectar amb el servidor.";
      this.presentToast(msg);
      return throwError(msg);
    }));
  }
  sendEmailResetPassword(req)
  {
    return this.http.post(this._aplicationURL + this._sendEmailResetPasswordUrl, req).pipe(timeout(5000),catchError(error => {
      let msg = "Impossible connectar amb el servidor.";
      this.presentToast(msg);
      return throwError(msg);
    }));
  }
  sendValidationEmail(req)
  {
    return this.http.post(this._aplicationURL + this._sendValidationEmailUrl, req).pipe(timeout(5000),catchError(error => {
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
