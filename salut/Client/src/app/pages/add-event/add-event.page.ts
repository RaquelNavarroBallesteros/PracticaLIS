import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { AddEventService } from 'src/app/services/add-event.service';
import { ActivatedRoute } from '@angular/router';
import {Router} from '@angular/router';
import {Storage} from '@ionic/storage';
import {ToastController} from '@ionic/angular';

const STORAGE_KEY_P = 'perfil';
@Component({
  selector: 'app-add-event',
  templateUrl: './add-event.page.html',
  styleUrls: ['./add-event.page.scss'],
})
export class AddEventPage implements OnInit {

  public event = {
    id: -1,
    nom: '',
    data: '',
    ubicacio: '',
    tipus: '',
  };
  public eventId;
  public perfilId;

  constructor( private route: ActivatedRoute, public addEventService: AddEventService, private router: Router, 
    private storage: Storage, private toastController: ToastController) {
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      console.log(params);
      this.eventId = parseInt(params['id']);
      this.storage.get(STORAGE_KEY_P).then(information => {
        if (information != null){
          this.perfilId = information.id;
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
    public msg: string,
  ) { }
}
