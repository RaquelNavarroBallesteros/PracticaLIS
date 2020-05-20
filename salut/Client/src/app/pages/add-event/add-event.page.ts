import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { AddEventService } from 'src/app/services/add-event.service';
import { ActivatedRoute } from '@angular/router';
import {Router} from '@angular/router';
import {Storage} from '@ionic/storage';

const STORAGE_KEY_P = 'perfil';
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
  public perfilId;

  constructor( private route: ActivatedRoute, public addEventService: AddEventService, private router: Router, 
    private storage: Storage) {
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
    this.storage.get(STORAGE_KEY_P).then(information => {
      if (information != null){
        this.perfilId = information.id;
      }
      console.log("doing nou event");
      console.log(this.event);
      this.addEventService.addEvent(this.event, this.perfilId).subscribe((res: ServerResponse)=>{
        console.log("Resp:");
        console.log(res);
      });
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
