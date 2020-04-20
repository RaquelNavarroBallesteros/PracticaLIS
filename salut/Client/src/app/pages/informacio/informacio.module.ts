import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InformacioPageRoutingModule } from './informacio-routing.module';

import { InformacioPage } from './informacio.page';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InformacioPageRoutingModule,
    ComponentsModule
  ],
  declarations: [InformacioPage]
})
export class InformacioPageModule {}
