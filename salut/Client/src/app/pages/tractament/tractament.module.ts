import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TractamentPageRoutingModule } from './tractament-routing.module';

import { TractamentPage } from './tractament.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TractamentPageRoutingModule
  ],
  declarations: [TractamentPage]
})
export class TractamentPageModule {}
