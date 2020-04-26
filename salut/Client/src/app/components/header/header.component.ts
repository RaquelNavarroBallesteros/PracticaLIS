import { Component, OnInit, Input } from '@angular/core';
import {Platform} from '@ionic/angular';
import {Router} from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  @Input() title: string;
  @Input() backButton: string;

  public isIos: boolean;
  constructor(private platform: Platform, private router: Router) {
    this.isIos = this.platform.is('ios');
   }

  ngOnInit() {
    var namePage = (this.router.url).replace('/','');
    console.log(namePage);
  }

}
