import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { AddEventService } from 'src/app/services/add-event.service';
import { ActivatedRoute } from '@angular/router';
import {Router} from '@angular/router';

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
  public eventId;
  constructor( private route: ActivatedRoute, public addEventService: AddEventService, private router: Router) {
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      console.log(params);
      this.eventId = params['id'];
     
    });
  }

  select(){

    if(this.eventId>=0){
      this.updateEvent();
    }else
    {
      this.createNewEvent();
    }this.router.navigate(['/event']);
  }

  createNewEvent(){
    console.log("doing nou event");
    console.log(this.event);
    this.addEventService.addEvent(this.event).subscribe((res: ServerResponse)=>{
      console.log("Resp:");
      console.log(res);
    });
  }

  updateEvent(){
    console.log("updating event");
    console.log("este es el id" + this.eventId);
    this.addEventService.updateEvent(this.event,this.eventId).subscribe((res: ServerResponse)=>{
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
