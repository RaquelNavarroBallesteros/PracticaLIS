import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InformacioPage } from './informacio.page';

const routes: Routes = [
  {
    path: '',
    component: InformacioPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InformacioPageRoutingModule {}
