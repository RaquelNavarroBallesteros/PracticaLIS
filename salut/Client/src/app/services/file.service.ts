import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class FileService {
  public _aplicationURL = 'http://localhost:3000/api/Emergencies'
    _recomenacionsFiles = '/recomenacionsPDF'
    _getNameFiles = '/getNameFiles'
  constructor(private http: HttpClient) { }

  getNameFiles(directory){
    let params = new HttpParams().set('dir', directory);
    return this.http.get(this._aplicationURL + this._getNameFiles, {params: params})
  }
  getRecomenacionsPDFFile(fileName){
    let params = new HttpParams().set('name', fileName);
    return this.http.get(this._aplicationURL + this._recomenacionsFiles, {params: params})
  }
}
