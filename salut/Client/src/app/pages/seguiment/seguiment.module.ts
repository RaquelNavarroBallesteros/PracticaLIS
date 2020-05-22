import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SeguimentPageRoutingModule } from './seguiment-routing.module';

import { SeguimentPage } from './seguiment.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SeguimentPageRoutingModule,
    ComponentsModule
  ],
  declarations: [SeguimentPage]
})
export class SeguimentPageModule {}
