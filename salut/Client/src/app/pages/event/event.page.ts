import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { EventService } from 'src/app/services/event.service';
import { RouterLink } from '@angular/router';
import { NgZone } from '@angular/core';
import {Router} from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import {Storage} from '@ionic/storage';

const STORAGE_KEY_P = 'perfil';
@Component({
  selector: 'app-event',
  templateUrl: './event.page.html',
  styleUrls: ['./event.page.scss'],
})
export class EventPage implements OnInit {

  public events = [];
  public eventsToShow = [];
  public idPerfil = -1;
  constructor(private route: ActivatedRoute, public eventService: EventService, private router:Router,
              private storage: Storage) {}

  ngOnInit() {
    this.listEvents(false);
  }

  listEvents(historic: boolean){
    let date: Date = new Date();
    this.storage.get(STORAGE_KEY_P).then(information => {
      if (information != null){
        this.idPerfil = information.id;
      }
      this.eventService.listEvents(this.idPerfil, date).subscribe((res: ListEventResponse)=>{
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
      this.eventsToShow.forEach((element, indexArray)=>{
        element.forEach((event, index) =>{
          if (event.Id == eventId ){
            element.splice(index, 1);
            if(this.eventsToShow[indexArray].length == 0){
              this.eventsToShow.splice(indexArray, 1);
            }
          }
        })
      });
   });
    
  }

  updateEvent(idTractament) 
   {
     // TODO:  Nav to detail
      this.router.navigate(['/add-event', idTractament])
      .then(function(){
        this.listEvents(true); 
      });
      console.log("events1", this.eventsToShow)

      //console.log("events2", this.eventsToShow)
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
