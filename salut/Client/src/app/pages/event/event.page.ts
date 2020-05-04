import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { EventService } from 'src/app/services/event.service';

@Component({
  selector: 'app-event',
  templateUrl: './event.page.html',
  styleUrls: ['./event.page.scss'],
})
export class EventPage implements OnInit {
  public event = {
    data: '',
    ubicacio: '',
    tipus: '',
    tractament:''
  };

  public arrayCalendar = [];
  
  public algo = 
  [
    {//array mes
      a: "MARZO",  
      b: 
        { // array dia 
          c: "3", 
          d:[ "MEDICO", "analisis"] //arra
        }
    },
  ]
  public array = [];

  public arrayMeses = [ "marzo", "abril", "mayo"]
  public arrayDias = ["1","4","23","30",]
  public  arrayEvent = ["Medico", "Pediatra"]
  constructor( public eventService: EventService) {}

  ngOnInit() {}

  listEvents(){
    this.eventService.listEvents(2).subscribe((res: ListEventResponse)=>{
      console.log("event.page.ts -- listEvents start")
      console.log("show events", this.event);
      this.array = new Array<EventItems>();
      
      for(var i in res.data){
        var eventItems = new EventItems();
        eventItems.data = res.data[i]['DataVisita'];
        eventItems.ubicacio = res.data[i]['Ubicacio'];
        eventItems.descripcio = res.data[i]['Descripcio'];
        eventItems.tractament = res.data[i]['Tractament'];
        eventItems.eventId = res.data[i]['Id'];
        this.array[i] = eventItems;
      }
      console.log(this.array);
      
      this.arrayCalendar = new Array<Calendar>();
      for(var i in this.array){
        
        var arrayAux = new Calendar();
        var aux = this.array[i].data.split('-');
        arrayAux.mes = aux[1];
        var auxDia = new Dia();
        var getDiaSplit = aux[2].split('T');
        auxDia.dia = getDiaSplit[0];
        auxDia.visita = this.array[i].descripcio;
        arrayAux.dias = auxDia;
        
        console.log(arrayAux)
        this.arrayCalendar[i] = arrayAux;
      }
      console.log(this.arrayCalendar)

      //diccionari object-array
      //ifs en html directos
      //comprobar order by

    });
  }

  eliminarEvent(eventId){
    console.log("eliminar event -- event page ts");
    console.log(eventId);
    this.eventService.eliminarEvent(eventId).subscribe((res: HttpResponse<any>)=>{
      console.log("Response of elimiar event --- event page .ts:");
      console.log(res);
    });
  }
}



export class Calendar{
  mes: string;
  dias: Dia;
}

export class Dia{
  dia:string;
  visita: string;
}

export class Visita{
  nom: string;
}

export class EventItems {
    data: string;
    ubicacio: string;
    descripcio: string;
    tractament: number;
    eventId: number;
}

export class ListEventResponse {
  constructor(
      public serverStatus: number,
      public correct: boolean,
      public data: object,
      public msg: string,
  ) {}
}

export class Algo{
  mes: string;
  dias: {
    dia: string;
    consultas: {
      nombre: string;
    }  
  }
}