import { Component, OnInit, ViewChild } from '@angular/core';
import { Geolocation, Geoposition } from '@ionic-native/geolocation/ngx';
import { LoadingController} from '@ionic/angular'
declare var google;

@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.page.html',
  styleUrls: ['./mapa.page.scss'],
})
export class MapaPage implements OnInit {

  map: any;
  @ViewChild('mapElement') mapElement;

  constructor(private geolocation: Geolocation,
    private loadCtrl: LoadingController) 
  {

  }

  // ngAfterContentInit(){
  //   //this.getPosition();
    
  //   this.map = new google.maps.Map(
  //     this.mapElement.nativeElement,
  //     {center: {lat: -34.397, lng: 150.644},
  //     zoom: 8
  //   })
    
  // }

  ngOnInit(){
    this.loadMap();
  }

  async loadMap()
  {
    const loading = await this.loadCtrl.create();

    const rta = await this.geolocation.getCurrentPosition();
    const lat_lang = {
      lat: rta.coords.latitude,
      lng: rta.coords.longitude
    };

    //console.log(lat_lang)
    const mapEle: HTMLElement = document.getElementById("map");
    const map = new google.maps.Map(mapEle, {
      center: lat_lang,
      zoom: 12
    });

    google.maps.event.addListenerOnce(map, 'idle', () => {
      loading.dismiss();

      const marker = new google.maps.Marker({
        position: lat_lang,
        map: map,
        title: "Ets aqui."
      });
    });
  }

  /*
  loadMap(position: Geoposition){
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;
    console.log(latitude, longitude);
    
    // create a new map by passing HTMLElement
    let mapEle: HTMLElement = document.getElementById('map');
  
    // create LatLng object
    let myLatLng = {lat: latitude, lng: longitude};
  
    // create map
    this.map = new google.maps.Map(mapEle, {
      center: myLatLng,
      zoom: 12
    });
  
    google.maps.event.addListenerOnce(this.map, 'idle', () => {
      let marker = new google.maps.Marker({
        position: myLatLng,
        map: this.map,
        title: 'Hello World!'
      });
      mapEle.classList.add('show-map');
    });
  }

  getPosition():any{
    this.geolocation.getCurrentPosition().then(response => {
      this.loadMap(response);
    })
    .catch(error =>{
      console.log(error);
    })
  }
  */
}
