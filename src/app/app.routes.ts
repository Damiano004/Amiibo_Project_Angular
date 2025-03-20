import { Routes } from '@angular/router';
import { HomeComponent } from './features/Home/Home.component';
import { NotFoundComponent } from './features/Not-Found/Not-Found.component';
import { DettagliComponent } from './features/Dettagli/Dettagli.component';

export const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: '',
    pathMatch: 'full',
    component: HomeComponent
  },
  {
    path: 'dettagli', // /dettagli
    //component: DetailsComponent
    loadComponent(){
      return import('./features/Dettagli/Dettagli.component').then(m => m.DettagliComponent);
    }
  },
  {
    path: 'dettagli/:head/:tail',
    loadComponent(){
        return import('./features/Dettagli/Dettagli.component').then(m => m.DettagliComponent);
      }
    },
    {
      path: '**',
      component: NotFoundComponent
    }
];
