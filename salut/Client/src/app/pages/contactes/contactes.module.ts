import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ContactesPageRoutingModule } from './contactes-routing.module';

import { ContactesPage } from './contactes.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ContactesPageRoutingModule,
    //BrowserModule,
    FormsModule,
    //HttpModule,
    ComponentsModule
  ],
  declarations: [ContactesPage]
})
export class ContactesPageModule {}
