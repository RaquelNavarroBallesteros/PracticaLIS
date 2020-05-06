import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GrafiquesPageRoutingModule } from './grafiques-routing.module';

import { GrafiquesPage } from './grafiques.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GrafiquesPageRoutingModule
  ],
  declarations: [GrafiquesPage]
})
export class GrafiquesPageModule {}
