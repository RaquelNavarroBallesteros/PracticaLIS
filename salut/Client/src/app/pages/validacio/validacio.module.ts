import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ValidacioPageRoutingModule } from './validacio-routing.module';

import { ValidacioPage } from './validacio.page';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ValidacioPageRoutingModule,ComponentsModule
  ],
  declarations: [ValidacioPage]
})
export class ValidacioPageModule {}
