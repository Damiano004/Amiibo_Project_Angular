import { Routes } from '@angular/router';
import { NotFoundComponent } from './features/Not-Found/Not-Found.component';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent(){
      return import('./features/Home/Home.component').then(m => m.HomeComponent);
    }
  },
  {
    path: '',
    pathMatch: 'full',
    loadComponent(){
      return import('./features/Home/Home.component').then(m => m.HomeComponent);
    }
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
