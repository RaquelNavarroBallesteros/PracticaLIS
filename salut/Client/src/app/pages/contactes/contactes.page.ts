import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { async } from '@angular/core/testing';

@Component({
  selector: 'app-contactes',
  templateUrl: './contactes.page.html',
  styleUrls: ['./contactes.page.scss'],
})

export class ContactesPage implements OnInit {

  public contacte = {
    id: 1,
    nom: '',
  }

  constructor(public alertCtrl: AlertController) { }

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


