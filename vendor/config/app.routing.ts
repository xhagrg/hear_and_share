import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from '../app/components/home.component';
// import { CollectionDetailComponent } from '../app/components/collection-detail.component';
// import { CollectionsComponent } from '../app/components/collections.component';
// import { ChartComponent } from '../app/components/chart.component';


const appRoutes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: HomeComponent
  }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);

