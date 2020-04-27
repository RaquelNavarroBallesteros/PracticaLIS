import { Component, OnInit, Input } from '@angular/core';
import {Platform} from '@ionic/angular';
import {Router} from '@angular/router';
import {Storage} from '@ionic/storage';


const STORAGE_KEY = 'login';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  @Input() title: string;
  @Input() backButton: string;

  public isIos: boolean;
  constructor(private platform: Platform, private router: Router, private storage: Storage) {
    this.isIos = this.platform.is('ios');
   }

  ngOnInit() {
    var namePage = (this.router.url).replace('/','');
    if (namePage != "login"){
      this.storage.get(STORAGE_KEY).then(information => {
        if (information != null){
          if (!information.logged){
            this.router.navigate['/login'];
          }
        }
      });
    }
  }

}
