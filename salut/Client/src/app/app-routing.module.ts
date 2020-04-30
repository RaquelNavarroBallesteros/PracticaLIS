import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'inici', pathMatch: 'full' },
  {
    path: 'sing-up',
    loadChildren: () => import('./pages/sing-up/sing-up.module').then( m => m.SingUpPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'perfil',
    loadChildren: () => import('./pages/perfil/perfil.module').then( m => m.PerfilPageModule)
  },
  {
    path: 'emergencies',
    loadChildren: () => import('./pages/emergencies/emergencies.module').then( m => m.EmergenciesPageModule)
  },
  {
    path: 'inici',
    loadChildren: () => import('./pages/inici/inici.module').then( m => m.IniciPageModule)
  },
  {
    path: 'recepta',
    loadChildren: () => import('./pages/recepta/recepta.module').then( m => m.ReceptaPageModule)
  },
  {
    path: 'tractament/:id',
    loadChildren: () => import('./pages/tractament/tractament.module').then( m => m.TractamentPageModule)
  },
  {
    path: 'recepta',
    loadChildren: () => import('./pages/recepta/recepta.module').then( m => m.ReceptaPageModule)
  },
  {
    path: 'informacio',
    loadChildren: () => import('./pages/informacio/informacio.module').then( m => m.InformacioPageModule)
  },
  {
    path: 'contactes',
    loadChildren: () => import('./pages/contactes/contactes.module').then( m => m.ContactesPageModule)
  },
  {
    path: 'llista-tractaments',
    loadChildren: () => import('./pages/llista-tractaments/llista-tractaments.module').then( m => m.LlistaTractamentsPageModule)
  },
  {
    path: 'seguiment',
    loadChildren: () => import('./pages/seguiment/seguiment.module').then( m => m.SeguimentPageModule)
  },  {
    path: 'grafiques',
    loadChildren: () => import('./pages/grafiques/grafiques.module').then( m => m.GrafiquesPageModule)
  }


];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
