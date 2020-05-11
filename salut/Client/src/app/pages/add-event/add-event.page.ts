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
  constructor( public addEventService: AddEventService) {
  }

  ngOnInit() {
  }

  createNewEvent(){
    console.log("doing nou event");
    console.log(this.event);
    this.addEventService.addEvent(this.event).subscribe((res: ServerResponse)=>{
      console.log("Resp:");
      console.log(res);
    });
  }
}
export class ServerResponse{
  constructor(
    public serverStatus: number,
    public doAddEvent: boolean,
    public msg: string,
  ) { }
}
