import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TractamentPage } from './tractament.page';

const routes: Routes = [
  {
    path: '',
    component: TractamentPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TractamentPageRoutingModule {}
