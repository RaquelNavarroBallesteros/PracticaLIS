import { Component, OnInit } from '@angular/core';
import { NavController, NumericValueAccessor } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { async } from '@angular/core/testing';
import { CallNumber } from '@ionic-native/call-number/ngx';
import { ContactesService } from 'src/app/services/contactes.service';
import {Storage} from '@ionic/storage';
import { FormsModule } from '@angular/forms';
import { TractamentGetResponse } from '../tractament/tractament.page';
// import { HttpModule } from '@angular/http';


const STORAGE_KEY_P = 'perfil';
@Component({
  selector: 'app-contactes',
  templateUrl: './contactes.page.html',
  styleUrls: ['./contactes.page.scss'],
})
export class ContactesPage implements OnInit {

  public perfilId = 0;

  constructor(public contactesService: ContactesService, public alertCtrl: AlertController, private callNumber: CallNumber,
              private storage: Storage) { }

  public nouContacte = {id: 0, nom:'', numero:''};
  contactes = [];

  ngOnInit() {
    this.storage.get(STORAGE_KEY_P).then(information => {
      if (information != null){
        this.perfilId = information.id;
        this.contactesService.getall_request(this.perfilId).subscribe((res: ContactesGetResponse)=>{

          for(var i=0; i<res.data.length; i++)
          {
            this.contactes.push({
              id: res.data[i]['Id'],
              nom: res.data[i]['Nom'],
              numero: res.data[i]['Numero']});
          }
    
          console.log(this.contactes);
        });
      }
    });
  }
  afegirContacte()
  {
    let contacte = this.nouContacte;
    if (contacte.nom == "" || contacte.numero == "")
    {
      alert("Indica el nom i el número.");
    }
    else
    {
      var contacte_db = {id: this.nouContacte.id, 
        nom: this.nouContacte.nom,
        numero: this.nouContacte.numero,
        perfil_id: this.perfilId
      };

      this.contactesService.add_request(contacte_db).subscribe((res: ContactesSetResponse)=>{
        if (res.correcte)
        {
          contacte.id = res.id;
          this.contactes.push(contacte);
          this.nouContacte = {id: 0, nom:'', numero:''};
          alert("El nou contacte s'ha guardat correctament.");
        }
        else
          alert("Error: " + res.msg);
      });  
    } 
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
    this.contactesService.del_request(this.contactes[index].id).subscribe((res: ContactesDelResponse)=>{
      if (res.correcte)
      {
        this.contactes.splice(index, 1);
        alert("El contacte s'ha eliminat correctament.");
      }
    else
      alert("Error: " + res.msg);
    });   
  }

  ionViewWillEnter()
  {
  }

}

export class ContactesGetResponse {
  constructor(
      public serverStatus: number,
      public correcte: boolean,
      public data: Array<object>,
      public msg: string,
  ) {}
}

export class ContactesSetResponse {
  constructor(
      public serverStatus: number,
      public correcte: boolean,
      public msg: string,
      public id: number
  ) {}
}

export class ContactesDelResponse {
  constructor(
      public serverStatus: number,
      public correcte: boolean,
      public msg: string,
  ) {}
}
