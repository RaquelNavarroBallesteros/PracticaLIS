import { Component, OnInit } from '@angular/core';
import {FotoService} from 'src/app/services/foto.service'
import { File } from "@ionic-native/file/ngx";
@Component({
  selector: "app-recepta",
  templateUrl: "./recepta.page.html",
  styleUrls: ["./recepta.page.scss"]
})
export class ReceptaPage implements OnInit {
  public fotoReceptaPath;
  public fotoRecepta: boolean
  constructor(public fotoService: FotoService) {}
  
  async ngOnInit() {
    this.fotoService.llegirFoto("recepta").then((path)=>{
      this.fotoReceptaPath = path;
      if (this.fotoReceptaPath !== null){
        this.fotoRecepta = true
      }else{
        this.fotoRecepta = false
      }
    });
  }

  async ferFoto() {
    this.fotoService.ferFoto("recepta");
    this.fotoService.llegirFoto("recepta").then((path)=>{
      this.fotoReceptaPath = path;
      if (this.fotoReceptaPath !== null){
        this.fotoRecepta = true
      }else{
        this.fotoRecepta = false
      }
    });
  }
}
