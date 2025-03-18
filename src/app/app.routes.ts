import { Routes } from '@angular/router';
import { HomeComponent } from './features/Home/Home.component';
import { NotFoundComponent } from './features/Not-Found/Not-Found.component';

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
    path: '**',
    component: NotFoundComponent
  }
];
