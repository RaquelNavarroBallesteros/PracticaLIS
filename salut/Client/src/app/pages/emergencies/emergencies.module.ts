import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EmergenciesPageRoutingModule } from './emergencies-routing.module';

import { EmergenciesPage } from './emergencies.page';
import { ComponentsModule } from "src/app/components/components.module";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EmergenciesPageRoutingModule,
    ComponentsModule
  ],
  declarations: [EmergenciesPage]
})
export class EmergenciesPageModule {}
