import { Component, OnInit } from '@angular/core';
import { Geolocation } from "@ionic-native/geolocation/ngx";

@Component({
  selector: "app-emergencies",
  templateUrl: "./emergencies.page.html",
  styleUrls: ["./emergencies.page.scss"]
})
export class EmergenciesPage implements OnInit {
  constructor(private geolocation: Geolocation) {}

  ngOnInit() {}

  getMyLocation(){
    this.geolocation.getCurrentPosition({
        enableHighAccuracy: true
      }).then(location => {
        console.log(location.coords.latitude + "  " + location.coords.longitude);
      });
  }
}
