import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { AddEventService } from 'src/app/services/add-event.service';

@Component({
  selector: 'app-add-event',
  templateUrl: './add-event.page.html',
  styleUrls: ['./add-event.page.scss'],
})
export class AddEventPage implements OnInit {

  public event = {
    nom: '',
    data: '',
    ubicacio: '',
    tipus: '',
    tractament:''
  };
  constructor( public addEvent: AddEventService) {
  }

  ngOnInit() {
  }

  createNewEvent(){
    console.log("doing nou event");
    this.addEvent.addEvent(this.event).subscribe((res: HttpResponse<any>)=>{
      console.log("Resp:");
      console.log(res);
    });
  }

}
