import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { AddEventService } from 'src/app/services/add-event.service';
import {EventService} from 'src/app/services/event.service';
import { ActivatedRoute } from '@angular/router';
import {Router} from '@angular/router';
import {Storage} from '@ionic/storage';
import {ToastController} from '@ionic/angular';
import { NotificacionsService } from 'src/app/services/notificacions.service';

const STORAGE_KEY_P = 'perfil';
@Component({
  selector: 'app-add-event',
  templateUrl: './add-event.page.html',
  styleUrls: ['./add-event.page.scss'],
})
export class AddEventPage implements OnInit {

  public event = {
    id: -1,
    data: null,
    ubicacio: '',
    tipus: '',
  };
  public eventId;
  public perfilId;
  public title;

  constructor( private route: ActivatedRoute, public addEventService: AddEventService, private router: Router, 
    private storage: Storage, private toastController: ToastController, private eventService: EventService,
    private notificationService: NotificacionsService) {
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.eventId = parseInt(params['id']);
      this.storage.get(STORAGE_KEY_P).then(information => {
        if (information != null){
          this.perfilId = information.id;
        }
        if (this.eventId != -1){
          this.title = "Edició d'event";
          this.eventService.getOne(this.eventId).subscribe((res:GetOneResponse) =>{
            if (res.correcte){
              this.event.id=res.data.Id;
              this.event.data = res.data.DataVisita;
              this.event.tipus = res.data.Descripcio;
              this.event.ubicacio = res.data.Ubicacio;
            }else{
              this.router.navigate(['/event']);
              this.presentToast("No s'ha pogut recuperar la informació")
            }
          })
        }else{
          this.title = "Nou event";
        }
      });
    });
  }

  select(){

    if(this.eventId === -1){
      this.createNewEvent();
    }else
    {
      this.updateEvent();
    }
  }

  createNewEvent(){
    console.log("doing nou event");
    console.log(this.event);
    this.addEventService.addEvent(this.event, this.perfilId).subscribe((res: ServerResponse)=>{
      if (res.doAddEvent) {
        var dataNotificacio = new Date(this.event.data);
        dataNotificacio.setHours(dataNotificacio.getHours() -1);
        this.notificationService.crearPuntualVisita(dataNotificacio, this.event.tipus, new Date(this.event.data));
        dataNotificacio.setHours(dataNotificacio.getHours() + 2);
        this.notificationService.crearPuntualRecepta(dataNotificacio);
        this.presentToast('Event guardat correctament');
        this.router.navigate(['/event']);
      }else{
        this.presentToast("No s'ha pogut guardar l'event");
      }
    });
  }

  updateEvent(){
    this.event.id = this.eventId;
    this.addEventService.updateEvent(this.event,this.eventId).subscribe((res: ServerResponse)=>{
      if (res.doAddEvent) {
        this.presentToast('Event actualitzat correctament');
        this.router.navigate(['/event']);
      }else{
        this.presentToast("No s'ha pogut actualitzar l'event");
      }
    });
  }
  async presentToast(text: string){
    const toast = await this.toastController.create({
      message: text,
      position: 'bottom',
      duration: 3000
    });
    toast.present();
  }
}
export class ServerResponse{
  constructor(
    public serverStatus: number,
    public doAddEvent: boolean,
    public msg: string
  ) { }
}
export class GetOneResponse{
  constructor(
    public serverStatus: number,
    public correcte: boolean,
    public data: Event,
    public msg: string
  ){}
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
