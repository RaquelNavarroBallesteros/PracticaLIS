import { Component, OnInit, Input } from '@angular/core';
import {Platform} from '@ionic/angular';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  @Input() title: string;
  @Input() backButton: string;

  public isIos: boolean;
  constructor(private platform: Platform) {
    this.isIos = this.platform.is('ios');
   }

  ngOnInit() {
  }

}
