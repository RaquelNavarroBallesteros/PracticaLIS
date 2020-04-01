import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ReceptaPageRoutingModule } from './recepta-routing.module';

import { ReceptaPage } from './recepta.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReceptaPageRoutingModule,ComponentsModule
  ],
  declarations: [ReceptaPage]
})
export class ReceptaPageModule {}
