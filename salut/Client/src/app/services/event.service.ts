import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {  throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EventService {
  public _aplicationURL = 'http://localhost:3000/api/event'
        _addEventURL = '/addNewEvent';

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

  addEvent(req){
    console.log(req)
    console.log("nou event")
    console.log(this._aplicationURL + this._addEventURL);
    return this.http.post(this._aplicationURL + this._addEventURL, req).pipe(catchError(this.handleError));
  }

}