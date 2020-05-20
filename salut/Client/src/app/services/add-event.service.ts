import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {  throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AddEventService {
  public _aplicationURL = 'http://localhost:3000/api/Event'
        _addEventURL = '/addNewEvent';
        _updateEventURL = '/updateEvent';
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

  addEvent(req, id){
    console.log(req)
    console.log("nou event")
    console.log(this._aplicationURL + this._addEventURL);
    return this.http.post(this._aplicationURL + this._addEventURL, {id: id, infoEvent: req}).pipe(catchError(this.handleError));
  }
  
  updateEvent(req, id){
    console.log(req)
    console.log("nou event")
    console.log(this._aplicationURL + this._updateEventURL);
    return this.http.post(this._aplicationURL + this._updateEventURL, {id: id, infoEvent: req}).pipe(catchError(this.handleError));
  }

  
  
}