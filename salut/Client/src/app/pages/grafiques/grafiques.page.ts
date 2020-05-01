import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { NavParams } from '@ionic/angular';
import { ModalController } from '@ionic/angular';
import { Chart } from 'chart.js';
import { SeguimentService } from 'src/app/services/seguiment.service';

@Component({
  selector: 'app-grafiques',
  templateUrl: './grafiques.page.html',
  styleUrls: ['./grafiques.page.scss'],
})
export class GrafiquesPage implements OnInit {

  @ViewChild('barChart') barChart;

  bars: any;
  colorArray: any;


  @Input() tipus: string;

  perfil_id = 16;
  public mostrarGrafica = false;

  constructor(public modalController: ModalController, public seguimentService: SeguimentService) { }
  
  ionViewDidEnter() {
    var dades = [];
    var dates = [];
    if (this.tipus == 'a')
    {
      this.seguimentService.getallalcada_request(this.perfil_id).subscribe((res: SeguimentGetResponse)=>{
        console.log(res.data)
        for(var i=0; i<res.data.length; i++)
        {
            dades.push(res.data[i]['Alcada']);
            dates.push(res.data[i]['Data'].substring(0,10));
        }
        this.createBarChart(dades, dates, "Evolució de l'alçada");
      });
    }else if(this.tipus == 'p')
    {
      this.seguimentService.getallpes_request(this.perfil_id).subscribe((res: SeguimentGetResponse)=>{
        console.log(res.data)
        for(var i=0; i<res.data.length; i++)
        {
            dades.push(res.data[i]['Pes']);
            dates.push(res.data[i]['Data'].substring(0,10));
        }
        this.createBarChart(dades, dates, "Evolució del pes");
      });
    }else if(this.tipus == 'imc')
    {
      this.seguimentService.getallpes_request(this.perfil_id).subscribe((resP: SeguimentGetResponse)=>{
      this.seguimentService.getallalcada_request(this.perfil_id).subscribe((resA: SeguimentGetResponse)=>{
        var datesOrdenades = [];
        for (var i=0; i < resA.data.length; i++)
        {
          datesOrdenades.push(resA.data[i]['Data'].substring(0,10));
        }
        for(var i=0; i < resP.data.length; i++)
        {
            datesOrdenades.push(resP.data[i]['Data'].substring(0,10));
        }
          this.createBarChart(dades, dates, "Evolució de l'IMC");
          datesOrdenades.sort();
          console.log(datesOrdenades);
        });
      });
    }
    
    
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

  dismiss()
  {
    this.modalController.dismiss({"dismissed":true})
  }
  ngOnInit() {
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