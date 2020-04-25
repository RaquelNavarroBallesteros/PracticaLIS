import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { async } from '@angular/core/testing';
import { TractamentService } from 'src/app/services/tractament.service';
import {Router} from '@angular/router';
import {Storage} from '@ionic/storage';

const STORAGE_KEY = 'login';

@Component({
  selector: 'app-llista-tractaments',
  templateUrl: './llista-tractaments.page.html',
  styleUrls: ['./llista-tractaments.page.scss'],
})
export class LlistaTractamentsPage implements OnInit {

  perfil_id = 16;
  llistaTractaments = [];

  constructor(private storage: Storage, private router: Router, public tractamentService: TractamentService, public alertCtrl: AlertController) 
  { 
    /*
    this.storage.get(STORAGE_KEY).then(information => {
      this.perfil_id = information.idPerfil;
    });
    */
  }

  ngOnInit() {
  }

  ionViewWillEnter()
  {
    this.tractamentService.getall_request(this.perfil_id).subscribe((res: TractamentGetAllResponse)=>{
      for(var i=0; i<res.data.length; i++)
      {
        this.llistaTractaments.push({
          id: res.data[i]["Id"],
          nom: res.data[i]["Nom"],
          data_i: res.data[i]["DataInici"],
          data_f: res.data[i]["DataFinal"]
        });
      }

      console.log(this.llistaTractaments);
    });
  }

  deleteTractament(index)
  {
    //this.llistaTractaments.splice(index, 1);
  }

   updateTractament(index) 
   {
     // TODO:  Nav to detail
     console.log("Goto tractament update");
      var id = this.llistaTractaments[index].id;
      this.router.navigate(['/tractament', id]);
   }

   creaTractament()
   {
    console.log("Goto tractament add");
      var id = 0;
      this.router.navigate(['/tractament', id]);
   }

}

export class TractamentGetAllResponse {
  constructor(
      public serverStatus: number,
      public correcte: boolean,
      public msg: string,
      public data: Array<object>
  ) {}
}
