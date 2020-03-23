import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {  throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SignUpService {
  public _aplicationURL = 'http://localhost:3000/SignUp'
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
    console.log(req)
    console.log("hola")
    console.log(this._aplicationURL + this._addUserURL);
    return this.http.post(this._aplicationURL + this._addUserURL, req).pipe(catchError(this.handleError));
  }

}