import { Routes } from '@angular/router';

import { HomeComponent } from './components/home/home.component';
import { CalculateProfitComponent } from './components/calculate-profit/calculate-profit.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'calculate-profit',
    component: CalculateProfitComponent
  },
  {
    path: '**',
    redirectTo: ''
  }
];