import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ReceptaPage } from './recepta.page';

const routes: Routes = [
  {
    path: '',
    component: ReceptaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReceptaPageRoutingModule {}
