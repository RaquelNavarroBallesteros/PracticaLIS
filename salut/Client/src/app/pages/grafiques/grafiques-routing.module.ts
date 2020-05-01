import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GrafiquesPage } from './grafiques.page';

const routes: Routes = [
  {
    path: '',
    component: GrafiquesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GrafiquesPageRoutingModule {}
