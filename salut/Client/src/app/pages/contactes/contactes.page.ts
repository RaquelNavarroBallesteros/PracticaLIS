import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { async } from '@angular/core/testing';
import { CallNumber } from '@ionic-native/call-number/ngx';
import { FormsModule } from '@angular/forms';
// import { HttpModule } from '@angular/http';

@Component({
  selector: 'app-contactes',
  templateUrl: './contactes.page.html',
  styleUrls: ['./contactes.page.scss'],
})

export class ContactesPage implements OnInit {

  public contacte = {
    id: 1,
    nom: '',
    numero: '',
  }

  constructor(public alertCtrl: AlertController, private callNumber: CallNumber) { }

  public nomContacte = {nom:'', numero:''};
  contactes = [];

  afegirContacte()
  {
      let contacte = this.nomContacte;
      this.contactes.push(contacte);
      this.nomContacte = {nom:'', numero:''};
   
  }

  enviar()
  {

  }

  trucada(index)
  {
    var num = this.contactes[index].numero;
    this.callNumber.callNumber(num, true)
    .then(res => console.log('Launched dialer!', res))
    .catch(err => console.log('Error launching dialer', err));
  }
  
  deleteContacte(index)
  {
    this.contactes.splice(index, 1);
  }

  async updateContacte(index) {
    const alert = await this.alertCtrl.create({
        message: 'Editar Contacte',
        inputs: [{ name: 'editNom', value: this.contactes[index]["nom"], placeholder: 'Nom' }, { name: 'editNumero', value: this.contactes[index]["numero"], placeholder: 'Número de Telèfon' }],
        buttons: [{ text: 'Cancel', role: 'cancel' },
                  { text: 'Update', handler: data => {
                      this.contactes[index]["nom"] = data.editNom; 
                      this.contactes[index]["descripcio"] = data.editDescripcio; }
                  }
                 ]
    });
  await alert.present();
}




  ngOnInit() {
  }

}


