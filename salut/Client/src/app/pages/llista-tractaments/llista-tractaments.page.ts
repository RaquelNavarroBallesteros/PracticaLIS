import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { async } from '@angular/core/testing';

@Component({
  selector: 'app-llista-tractaments',
  templateUrl: './llista-tractaments.page.html',
  styleUrls: ['./llista-tractaments.page.scss'],
})
export class LlistaTractamentsPage implements OnInit {

  

  constructor(public alertCtrl: AlertController) { }

  ngOnInit() {
  }

  //public nomTractament = {nom:'', data: ''};
  //llistaTractaments = [];
  llistaTractaments = [{id:0, nom:"exemple1", data_i:"1/1/1", data_f:"2/2/2"}]; // No borrar


  deleteTractament(index)
  {
    this.llistaTractaments.splice(index, 1);
  }

   updateTractament(index) {}

}
