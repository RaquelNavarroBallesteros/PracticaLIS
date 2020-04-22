import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { async } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-seguiment',
  templateUrl: './seguiment.page.html',
  styleUrls: ['./seguiment.page.scss'],
})
export class SeguimentPage implements OnInit {

  public nouPes = {
    id: 0,
    data: null,
    valor: null,
  }

  public novaAlcada = {
    id: 0,
    data: null,
    valor: null,
  }
  
  
  constructor(public alertCtrl: AlertController) { }

  ngOnInit() {
  }

  pess = [];
  alcadaa = [];

  enviar()
  {

  } 

  afegirPes()
  {
      let nouPes = this.nouPes;
      this.pess.push(nouPes);
      this.nouPes = {id: 0, data: null, valor: null};
  }
  
  /*deletePes(index)
  {
    this.pess.splice(index, 1);
  }*/

  /*async updatePes(index) {
    const alert = await this.alertCtrl.create({
        message: 'Editar Contacte',
        inputs: [{ name: 'editAlcada', value: this.pess[index]["pes"], placeholder: 'Pes' }], 
        buttons: [{ text: 'Cancel', role: 'cancel' },
                  { text: 'Update', handler: data => {
                      this.pess[index]["pes"] = data.editPes; 
                      }
                  }
                 ]
    });
  await alert.present();
}
*/
afegirAlcada()
{
    let novaAlcada = this.novaAlcada;
    this.alcadaa.push(novaAlcada);
    this.novaAlcada = {id: 0, data: null, valor: null};
}

/*deleteAlcada(index)
{
  this.pess.splice(index, 1);
}*/

/*async updateAlcada(index) {
  const alert = await this.alertCtrl.create({
      message: 'Editar Contacte',
      inputs: [{ name: 'editAlcada', value: this.alcadaa[index]["Alcada"], placeholder: 'Alçada' }], 
      buttons: [{ text: 'Cancel', role: 'cancel' },
                { text: 'Update', handler: data => {
                    this.alcadaa[index]["alcada"] = data.editAlcada; 
                    }
                }
               ]
  });
await alert.present();
}*/

}
