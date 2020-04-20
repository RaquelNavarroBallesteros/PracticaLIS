import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ContactesPageRoutingModule } from './contactes-routing.module';

import { ContactesPage } from './contactes.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ContactesPageRoutingModule
  ],
  declarations: [ContactesPage]
})
export class ContactesPageModule {}
