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
  
  public array = [];

  constructor( public eventService: EventService) {}

  ngOnInit() {
  }

  listEvents(){
    this.eventService.listEvents(2).subscribe((res: ListEventResponse)=>{
      console.log("event.page.ts -- listEvents start")
      console.log(res.data)
      console.log("show events", this.event);
      console.log(res.data)
      this.array = new Array<EventItems>();
      
      for(var i in res.data){
        var eventItems = new EventItems();
        eventItems.data = res.data[i]['DataVisita'];
        eventItems.ubicacio = res.data[i]['Ubicacio'];
        eventItems.descripcio = res.data[i]['Descripcio'];
        eventItems.tractament = res.data[i]['Tractament'];
        this.array[i] = eventItems;
      }
      console.log(this.array);
    });
  }
}

export class EventItems {
    data: string;
    ubicacio: string;
    descripcio: string;
    tractament: number;
}

export class ListEventResponse {
  constructor(
      public serverStatus: number,
      public correct: boolean,
      public data: object,
      public msg: string,
  ) {}
}