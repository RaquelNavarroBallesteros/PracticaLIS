import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SeguimentPageRoutingModule } from './seguiment-routing.module';

import { SeguimentPage } from './seguiment.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SeguimentPageRoutingModule
  ],
  declarations: [SeguimentPage]
})
export class SeguimentPageModule {}
