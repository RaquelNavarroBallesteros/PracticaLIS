import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { EventService } from 'src/app/services/event.service';

@Component({
  selector: 'app-event',
  templateUrl: './event.page.html',
  styleUrls: ['./event.page.scss'],
})
export class EventPage implements OnInit {

  public events = [];
  public eventsToShow = []
  constructor( public eventService: EventService) {}

  ngOnInit() {
    this.listEvents(false);
  }

  listEvents(historic: boolean){
    this.eventService.listEvents(2).subscribe((res: ListEventResponse)=>{
      this.events = res.data;
      this.events.forEach((event, index) => {
        event.DataVisita = new Date(event.DataVisita)
    
        if (index === 0){
          this.eventsToShow.push([event])
        }else{
          var position = this.eventsToShow.length -1
          var period = this.eventsToShow[position]
          if (event.DataVisita.getMonth() === period[period.length -1].DataVisita.getMonth() && 
              event.DataVisita.getYear() == period[period.length -1].DataVisita.getYear()){
            this.eventsToShow[position].push(event);
          }else{
            this.eventsToShow.push([event]);
          }
        }
      });
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
export class Event{
  constructor(
    public Id: number,
    public PerfilId: number,
    public DataVisita: Date,
    public Ubicacio: string,
    public Descripcio: string
  ){}
}
export class ListEventResponse {
  constructor(
      public serverStatus: number,
      public correct: boolean,
      public data: Array<Event>,
      public msg: string,
  ) {}
}
