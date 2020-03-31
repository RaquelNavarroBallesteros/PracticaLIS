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
    nom: '',
    data: '',
    ubicacio: '',
    tipus: '',
    tractament:''
  };

  constructor( public eventService: EventService) {
  }

  ngOnInit() {
  }

  createNewEvent(){
    console.log("doing nou event");
    this.eventService.addEvent(this.event).subscribe((res: HttpResponse<any>)=>{
      console.log("Resp:");
      console.log(res);
    });
  }
}