import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {  throwError, Observable } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import {APIUrl} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SeguimentService {

  public _aplicationURL = APIUrl + '/Seguiment';
  _pes_getallURL = '/getallpes';
  _pes_addURL = '/addpes';  
  _alcada_getallURL = '/getallalcada';
  _alcada_addURL = '/addalcada';

  constructor(private http: HttpClient) { }

  handleError(error: HttpErrorResponse)
  {
    console.log(error);
    let errorMessage = 'Unknown error!';
    if (error.error instanceof ErrorEvent) {
      // Client-side errors
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side errors
      //errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
      errorMessage = `Error Code: ${error.error.serverStatus}\nMessage: ${error.error.msg}`;
    }
    window.alert(errorMessage);
    return throwError(errorMessage);
  }
  addpes_request(p)
  {
    return this.http.post(this._aplicationURL + this._pes_addURL, p).pipe(catchError(this.handleError));
  }
  getallpes_request(p_id)
  {
    return this.http.post(this._aplicationURL + this._pes_getallURL, {id: p_id}).pipe(catchError(this.handleError));
  }
  addalcada_request(a)
  {
    return this.http.post(this._aplicationURL + this._alcada_addURL, a).pipe(catchError(this.handleError));
  }
  getallalcada_request(p_id)
  {
    return this.http.post(this._aplicationURL + this._alcada_getallURL, {id: p_id}).pipe(catchError(this.handleError));
  }
}