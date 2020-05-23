import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GrafiquesPageRoutingModule } from './grafiques-routing.module';

import { GrafiquesPage } from './grafiques.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GrafiquesPageRoutingModule,
    ComponentsModule
  ],
  declarations: [GrafiquesPage]
})
export class GrafiquesPageModule {}
