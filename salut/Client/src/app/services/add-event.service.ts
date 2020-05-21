import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {  throwError } from 'rxjs';
import { catchError, timeout } from 'rxjs/operators';
import { ToastController } from "@ionic/angular";
import {APIUrl} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AddEventService {
  public _aplicationURL = APIUrl + '/Event'
        _addEventURL = '/addNewEvent';
        _updateEventURL = '/updateEvent';
        
  constructor(private http: HttpClient, private toastController: ToastController) { }

  addEvent(req, id){
    console.log(req)
    console.log("nou event")
    console.log(this._aplicationURL + this._addEventURL);
    return this.http.post(this._aplicationURL + this._addEventURL, {id: id, infoEvent: req}).pipe(timeout(3000),catchError(error =>{
      let msg = "Impossible connectar amb el servidor.";
      this.presentToast(msg);
      return throwError(msg);
    }));
  }
  
  updateEvent(req, id){
    console.log(req)
    console.log("nou event")
    console.log(this._aplicationURL + this._updateEventURL);
    return this.http.post(this._aplicationURL + this._updateEventURL, {id: id, infoEvent: req}).pipe(timeout(3000),catchError(error =>{
      let msg = "Impossible connectar amb el servidor.";
      this.presentToast(msg);
      return throwError(msg);
    }));
  }
  getOne(){
    console.log(req)
    console.log("nou event")
    console.log(this._aplicationURL + this._updateEventURL);
    return this.http.post(this._aplicationURL + this._updateEventURL, {id: id, infoEvent: req}).pipe(timeout(3000),catchError(error =>{
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