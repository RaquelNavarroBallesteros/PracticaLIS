import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModifyEventPageRoutingModule } from './modify-event-routing.module';

import { ModifyEventPage } from './modify-event.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModifyEventPageRoutingModule
  ],
  declarations: [ModifyEventPage]
})
export class ModifyEventPageModule {}
