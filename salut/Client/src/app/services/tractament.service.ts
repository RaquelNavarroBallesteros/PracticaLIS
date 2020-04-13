import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {  throwError, Observable } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TractamentService {

  public _aplicationURL = 'http://localhost:3000/api/Tractament';
  _addURL = '/add';
  _getURL = '/get';
  _updateURL = '/update';
  _getallURL = '/getall';

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

  add_request(tractament)
  {
    return this.http.post(this._aplicationURL + this._addURL, tractament).pipe(catchError(this.handleError));
  }

  update_request(tractament)
  {
    return this.http.post(this._aplicationURL + this._updateURL, tractament).pipe(catchError(this.handleError));
  }

  get_request(t_id) : Observable<object>
  {
    return this.http.post(this._aplicationURL + this._getURL, {id: t_id}).pipe(catchError(this.handleError));
  }

  getall_request(p_id) : Observable<object>{
    return this.http.post(this._aplicationURL + this._getallURL, {id: p_id}).pipe(catchError(this.handleError));
  }
}
