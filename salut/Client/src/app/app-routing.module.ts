import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
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
    path: 'event',
    loadChildren: () => import('./pages/event/event.module').then( m => m.EventPageModule)
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
  },
  {
    path: 'mapa',
    loadChildren: () => import('./pages/mapa/mapa.module').then( m => m.MapaPageModule)
  },
  {
    path: 'grafiques',
    loadChildren: () => import('./pages/grafiques/grafiques.module').then( m => m.GrafiquesPageModule)
  }

      
  {
    path: 'add-event',
    loadChildren: () => import('./pages/add-event/add-event.module').then( m => m.AddEventPageModule)
  }

  
  


];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
