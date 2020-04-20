import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {  throwError, Observable } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EventService {
  public _aplicationURL = 'http://localhost:3000/api/Event'
       // _addEventURL = '/addNewEvent';
        _listEventsURL = '/listEvents';
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

/*
  listEvents(req){
    console.log(req)
    console.log("list events")
    console.log(this._aplicationURL + this._listEventsURL);
    return this.http.post(this._aplicationURL + this._listEventsURL, req).pipe(catchError(this.handleError));
  }
  */
  listEvents(perfilId): Observable<object>{
    return this.http.post(this._aplicationURL + this._listEventsURL, {id: perfilId}).pipe(catchError(this.handleError));
  }
}