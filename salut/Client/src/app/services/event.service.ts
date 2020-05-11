import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {  throwError, Observable } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import {APIUrl} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EventService {
  public _aplicationURL = APIUrl + '/Event'
        _deleteEventURL = '/deleteEvent';
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

  listEvents(perfilId): Observable<object>{
    return this.http.post(this._aplicationURL + this._listEventsURL, {id: perfilId}).pipe(catchError(this.handleError));
  }

  eliminarEvent(eventId){
    console.log("eliminar event --- event.service.ts");
    return this.http.post(this._aplicationURL + this._deleteEventURL, {id: eventId}).pipe(catchError(this.handleError));
  }
}