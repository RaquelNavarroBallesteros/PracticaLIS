import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ContactesPage } from './contactes.page';

const routes: Routes = [
  {
    path: '',
    component: ContactesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ContactesPageRoutingModule {}
