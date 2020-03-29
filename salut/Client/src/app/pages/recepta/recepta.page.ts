import { Component, OnInit } from '@angular/core';
import {FotoService} from 'src/app/services/foto.service'
import { File } from "@ionic-native/file/ngx";
@Component({
  selector: "app-recepta",
  templateUrl: "./recepta.page.html",
  styleUrls: ["./recepta.page.scss"]
})
export class ReceptaPage implements OnInit {
  constructor(public fotoService: FotoService) {}
  


  ngOnInit() {}

  ferFoto() {
    this.fotoService.ferFoto();
  }
}
