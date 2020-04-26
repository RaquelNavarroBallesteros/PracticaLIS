import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Router } from '@angular/router';
const STORAGE_KEY = 'login';
@Component({
  selector: 'app-inici',
  templateUrl: './inici.page.html',
  styleUrls: ['./inici.page.scss'],
})
export class IniciPage implements OnInit {

  constructor(private storage: Storage, private route: Router) { }

  ngOnInit() {

  }
  logOut() {
    this.storage.remove(STORAGE_KEY).then(res=>{
      this.route.navigate(['/login']);
    });
  }
}
