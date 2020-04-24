import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {  throwError, Observable } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import {APIUrl} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ContactesService {

  public _aplicationURL = APIUrl + '/Contacte';
  _getallURL = '/getall';
  _addURL = '/add';
  _delURL = '/del';

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
  add_request(c) : Observable<object>
  {
    return this.http.post(this._aplicationURL + this._addURL, c).pipe(catchError(this.handleError));
  }

  del_request(c_id) : Observable<object>
  {
    return this.http.post(this._aplicationURL + this._delURL, {id: c_id}).pipe(catchError(this.handleError));
  }

  getall_request(p_id) : Observable<object>
  {
    return this.http.post(this._aplicationURL + this._getallURL, {id: p_id}).pipe(catchError(this.handleError));
  }
}