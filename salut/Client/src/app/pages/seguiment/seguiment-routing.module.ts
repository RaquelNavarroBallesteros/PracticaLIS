import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SeguimentPage } from './seguiment.page';

const routes: Routes = [
  {
    path: '',
    component: SeguimentPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SeguimentPageRoutingModule {}
