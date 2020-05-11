import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PerfilPageRoutingModule } from './perfil-routing.module';

import { PerfilPage } from './perfil.page';
import { ComponentsModule } from 'src/app/components/components.module';

import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule, 
    PerfilPageRoutingModule,
    ComponentsModule,
    RouterModule.forChild([
      {
        path: '',
        component: PerfilPage
      }
    ])
  ],
  declarations: [PerfilPage]
})
export class PerfilPageModule {}
