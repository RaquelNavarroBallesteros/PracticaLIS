import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LlistaTractamentsPage } from './llista-tractaments.page';

const routes: Routes = [
  {
    path: '',
    component: LlistaTractamentsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LlistaTractamentsPageRoutingModule {}
