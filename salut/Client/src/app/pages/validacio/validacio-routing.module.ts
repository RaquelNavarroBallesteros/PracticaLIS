import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ValidacioPage } from './validacio.page';

const routes: Routes = [
  {
    path: '',
    component: ValidacioPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ValidacioPageRoutingModule {}
