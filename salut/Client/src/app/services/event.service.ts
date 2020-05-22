import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {  throwError } from 'rxjs';
import {catchError, timeout } from 'rxjs/operators';
import { ToastController } from "@ionic/angular";
import {APIUrl} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EventService {
  public _aplicationURL = APIUrl + '/Event'
        _deleteEventURL = '/deleteEvent';
        _listEventsURL = '/listEvents';
        _getOneEvent = '/getOne';

  constructor(private http: HttpClient, private toastController: ToastController) { }

  listEvents(perfilId,date){
    return this.http.post(this._aplicationURL + this._listEventsURL, {id: perfilId,date:date}).pipe(timeout(3000),catchError(error=>{
      let msg = "Impossible connectar amb el servidor.";
      this.presentToast(msg);
      return throwError(msg);
    }));
  }

  eliminarEvent(eventId){
    console.log("eliminar event --- event.service.ts");
    return this.http.post(this._aplicationURL + this._deleteEventURL, {id: eventId}).pipe(timeout(3000),catchError(error =>{
      let msg = "Impossible connectar amb el servidor.";
      this.presentToast(msg);
      return throwError(msg);
    }));
  }

  getOne(id){
    let params = new HttpParams().set('id', id);
    return this.http.get(this._aplicationURL + this._getOneEvent,{params: params}).pipe(timeout(3000),catchError(error =>{
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