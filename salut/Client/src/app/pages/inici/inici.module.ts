import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { IniciPageRoutingModule } from './inici-routing.module';

import { IniciPage } from './inici.page';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    IniciPageRoutingModule,
    ComponentsModule
  ],
  declarations: [IniciPage]
})
export class IniciPageModule {}
