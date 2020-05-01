import { Component, OnInit, ViewChild } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { async } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { SeguimentService } from 'src/app/services/seguiment.service';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-seguiment',
  templateUrl: './seguiment.page.html',
  styleUrls: ['./seguiment.page.scss'],
})
export class SeguimentPage implements OnInit {

  @ViewChild('barChart') barChart;

  bars: any;
  colorArray: any;

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
  
  perfil_id = 16;
  public mostrarGrafica = false;
  
  constructor(public seguimentService: SeguimentService, public alertCtrl: AlertController) { }

  ionViewDidEnter() {
    this.seguimentService.getallalcada_request(this.perfil_id).subscribe((res: SeguimentGetResponse)=>{
      console.log(res.data)
      var dades = [];
      var dates = [];
      for(var i=0; i<res.data.length; i++)
      {
          dades.push(res.data[i]['Alcada']);
          dates.push(res.data[i]['Data'].substring(0,10));
      }
      this.createBarChart(dades, dates, "Evolució de l'alçada");
    });
    
  }

  createBarChart(dades, dates, titol) {
    this.bars = new Chart(this.barChart.nativeElement, {
      type: 'bar',
      data: {
        labels: dates,
        datasets: [{
          label: titol,
          data: dades,
          backgroundColor: 'rgb(38, 194, 129)', // array should have same number of elements as number of dataset
          borderColor: 'rgb(38, 194, 129)',// array should have same number of elements as number of dataset
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        }
      }
    });
  }
  
  

  ngOnInit() {
  }

  pess = [];
  alcadaa = [];

  afegirPes()
  {
    var d = new Date(Date.now());
    var pes_db = {id: this.nouPes.id, 
    data: d, 
    valor: this.nouPes.valor, 
    perfil_id: this.perfil_id};

    let pes = this.nouPes;

    if(pes.valor == null)
      alert("Introdueix el teu pes actual.")
    else
    {
      console.log(pes_db.data);
      this.seguimentService.addpes_request(pes_db).subscribe((res: SeguimentSetResponse)=>{
        if (res.correcte)
        {
          pes.id = res.id;
          this.pess.push(pes);
          this.nouPes = {id: 0, data: null, valor: null};
          alert("El nou pes s'ha guardat correctament.");
        }
        else
          alert("Error: " + res.msg);
      });
    }
  }

  afegirAlcada()
  {
    var d = new Date(Date.now());
    var alcada_db = {id: this.novaAlcada.id, 
    data: d, 
    valor: this.novaAlcada.valor, 
    perfil_id: this.perfil_id};

    let alcada = this.novaAlcada;
    
    if(alcada.valor == null)
      alert("Insereix la teva alçada actual.");
    else
    {
      this.seguimentService.addalcada_request(alcada_db).subscribe((res: SeguimentSetResponse)=>{
        if (res.correcte)
        {
          alcada.id = res.id;
          this.alcadaa.push(alcada);
          this.novaAlcada = {id: 0, data: null, valor: null};
          alert("La nova alçada s'ha guardat correctament.");
        }
        else
          alert("Error: " + res.msg);
      });
    }
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

  ionViewWillEnter()
  {
    this.seguimentService.getallpes_request(this.perfil_id).subscribe((res: SeguimentGetResponse)=>{

      for(var i=0; i<res.data.length; i++)
      {
        this.pess.push({
          id: res.data[i]['Id'],
          data: res.data[i]['Data'],
          valor: res.data[i]['Pes']});
      }
    });

    this.seguimentService.getallalcada_request(this.perfil_id).subscribe((res: SeguimentGetResponse)=>{

      for(var i=0; i<res.data.length; i++)
      {
        this.alcadaa.push({
          id: res.data[i]['Id'],
          data: res.data[i]['Data'],
          valor: res.data[i]['Alcada']});
      }
    });
  }
}

export class SeguimentGetResponse {
  constructor(
      public serverStatus: number,
      public correcte: boolean,
      public data: Array<object>,
      public msg: string,
  ) {}
}

export class SeguimentSetResponse {
  constructor(
      public serverStatus: number,
      public correcte: boolean,
      public msg: string,
      public id: number
  ) {}
}