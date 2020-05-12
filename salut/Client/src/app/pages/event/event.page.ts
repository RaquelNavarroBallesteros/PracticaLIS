import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { EventService } from 'src/app/services/event.service';
import { RouterLink } from '@angular/router';
import { NgZone } from '@angular/core';
import {Router} from '@angular/router';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-event',
  templateUrl: './event.page.html',
  styleUrls: ['./event.page.scss'],
})
export class EventPage implements OnInit {

  public events = [];
  public eventsToShow = []
  constructor(private route: ActivatedRoute, public eventService: EventService, private router:Router) {}

  ngOnInit() {
    this.listEvents(false);
  }

  listEvents(historic: boolean){
    let date: Date = new Date();
    console.log("esta es la fecha", date);
    this.eventService.listEvents(2,date).subscribe((res: ListEventResponse)=>{
      //recordar cambiar el 2
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
    console.log("output de", this.eventsToShow);
  }
  eliminarEvent(eventId){
    console.log("eliminar event -- event page ts");
    var self = this;
    console.log(eventId);
    this.eventService.eliminarEvent(eventId).subscribe((res: HttpResponse<any>)=>{
      console.log("Response of elimiar event --- event page .ts:");
      console.log(res);
      this.router.navigateByUrl('/event');
      //this.refresh();
   });
    
  }

  updateEvent(index) 
   {
     // TODO:  Nav to detail
     console.log("Goto tractament update");
      var id = this.events[index].id;
      this.router.navigate(['/event', id]);
   }
 /*refresh() {
    this.zone.run(() => {
      this.listEvents(true);
      console.log('force update the screen');
    });*/
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
