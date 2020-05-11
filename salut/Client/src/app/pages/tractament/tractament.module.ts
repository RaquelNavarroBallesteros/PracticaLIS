import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { TractamentPageRoutingModule } from './tractament-routing.module';
import { TractamentPage } from './tractament.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TractamentPageRoutingModule,
    ComponentsModule
  ],
  declarations: [TractamentPage]
})
export class TractamentPageModule {}
