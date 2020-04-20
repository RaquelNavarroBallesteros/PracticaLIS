import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {  throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import {APIUrl} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SignUpService {
  public _aplicationURL = APIUrl + '/SingUp'
        _addUserURL = '/addUser';

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

  addUser(req){
    return this.http.post(this._aplicationURL + this._addUserURL, req).pipe(catchError(this.handleError));
  }

}