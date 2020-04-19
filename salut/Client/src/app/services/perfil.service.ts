import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {  throwError, Observable } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import {APIUrl} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PerfilService {
  public _aplicationURL = APIUrl + '/Perfil'
        _addURL = '/add';
        _getURL = '/get'

  constructor(private http: HttpClient) { }

  handleError(error: HttpErrorResponse){
    let errorMessage = 'Unknown error!';
    if (error.error instanceof ErrorEvent) {
      // Client-side errors
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side errors
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    window.alert(errorMessage);
    return throwError(errorMessage);
  }

  enviar(perfil){
    //console.log(perfil)
    //console.log(this._aplicationURL + this._addURL);
    return this.http.post(this._aplicationURL + this._addURL, perfil).pipe(catchError(this.handleError));
  }

  obtenir(p_id) : Observable<object>{
    return this.http.post(this._aplicationURL + this._getURL, {id: p_id}).pipe(catchError(this.handleError));
  }

}
