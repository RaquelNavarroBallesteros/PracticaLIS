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
        _updateURL = '/update';
        _getURL = '/get';
        _getallURL = '/getall';

  constructor(private http: HttpClient) { }

  handleError(error: HttpErrorResponse){
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

  add(perfil){
    //console.log(perfil)
    //console.log(this._aplicationURL + this._addURL);
    return this.http.post(this._aplicationURL + this._addURL, perfil).pipe(catchError(this.handleError));
  }

  update(perfil){
    //console.log(perfil)
    //console.log(this._aplicationURL + this._addURL);
    return this.http.post(this._aplicationURL + this._updateURL, perfil).pipe(catchError(this.handleError));
  }

  obtenir(p_id) : Observable<object>{
    return this.http.post(this._aplicationURL + this._getURL, {id: p_id}).pipe(catchError(this.handleError));
  }

  getall(u_id)
  {
    return this.http.post(this._aplicationURL + this._getURL, {id: u_id}).pipe(catchError(this.handleError));
  }

}
