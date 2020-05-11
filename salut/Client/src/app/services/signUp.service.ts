import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { throwError, of } from "rxjs";
import { retry, catchError, timeout } from "rxjs/operators";
import { APIUrl } from "../../environments/environment";
import { ToastController } from "@ionic/angular";
@Injectable({
  providedIn: "root",
})
export class SignUpService {
  private self = this;
  public _aplicationURL = APIUrl + "/SingUp";
  _addUserURL = "/addUser";

  constructor(
    private http: HttpClient,
    private toastController: ToastController
  ) {}
  
  addUser(req) {
    return this.http
      .post(this._aplicationURL + this._addUserURL, req)
      .pipe(timeout(3000), catchError(error => {
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
