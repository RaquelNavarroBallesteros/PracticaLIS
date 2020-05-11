import { Component, OnInit, ViewChild } from '@angular/core';
import { Geolocation, Geoposition } from '@ionic-native/geolocation/ngx';
import { LoadingController} from '@ionic/angular'
import { LaunchNavigator, LaunchNavigatorOptions } from '@ionic-native/launch-navigator/ngx'

declare var google;

@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.page.html',
  styleUrls: ['./mapa.page.scss'],
})
export class MapaPage implements OnInit {

  map: any;
  @ViewChild('mapElement') mapElement;
  infoWindow = null

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
    this.infoWindow = new google.maps.InfoWindow();
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

    console.log(lat_lang)

    //console.log(lat_lang)
    const mapEle: HTMLElement = document.getElementById("map");
    this.map = new google.maps.Map(mapEle, {
      center: {lat: -34.397, lng: 150.644},
      zoom: 14
    });

    this.infoWindow.setPosition(lat_lang);
    this.infoWindow.setContent('Ets aqui.');
    this.infoWindow.open(this.map);
    this.map.setCenter(lat_lang);
    //this.createMarkerCurr(lat_lang)

    /*
    google.maps.event.addListenerOnce(map, 'idle', () => {
      loading.dismiss();

      const marker = new google.maps.Marker({
        position: lat_lang,
        map: this.map,
        title: "Ets aqui."
      });
    });
    */
    
    var request = {
      query: 'Hospitals',
      fields: ['name', 'geometry'],
    };

    var service = new google.maps.places.PlacesService(this.map);

    var self = this
    service.findPlaceFromQuery(request, function(results, status) {
      if (status === google.maps.places.PlacesServiceStatus.OK) {
        console.log(results)
        for (var i = 0; i < results.length; i++) {
          self.createMarker(results[i]);
        }

         self.map.setCenter(results[0].geometry.location);
      }
    });
    
  }

  createMarkerCurr(pos)
  {
    var marker = new google.maps.Marker({
      map: this.map,
      position: pos,
      title: "Ets aqui."
    });
  }

  createMarker(place) {
    var marker = new google.maps.Marker({
      map: this.map,
      position: place.geometry.location
    });

    google.maps.event.addListener(marker, 'click', function() {
      this.infoWindow.setContent(place.name);
      this.infoWindow.open(this.map, this);
    });
  }
}