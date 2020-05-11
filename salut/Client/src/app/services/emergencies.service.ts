import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {APIUrl} from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class EmergenciesService {
  public _aplicationURL = APIUrl + '/Emergencies'
        _sendAvis = '/avis'
        _sendEmergencia = '/emergencia';

  constructor(private http: HttpClient) { }

  sendAvis(req){
    console.log("send Avis service")
    console.log(this._aplicationURL + this._sendAvis);
    return this.http.post(this._aplicationURL + this._sendAvis, req);
  }
  sendEmergencia(req){
    return this.http.post(this._aplicationURL + this._sendEmergencia, req);
  }
}
