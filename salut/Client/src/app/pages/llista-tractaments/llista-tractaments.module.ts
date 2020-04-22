import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LlistaTractamentsPageRoutingModule } from './llista-tractaments-routing.module';

import { LlistaTractamentsPage } from './llista-tractaments.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LlistaTractamentsPageRoutingModule
  ],
  declarations: [LlistaTractamentsPage]
})
export class LlistaTractamentsPageModule {}
