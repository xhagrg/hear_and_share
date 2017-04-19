import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from '../app/components/home.component';
import { InvitationComponent } from '../app/components/invitation.component';
import { PlaylistDetailComponent } from '../app/components/playlist-detail.component';
import { PlaylistListComponent } from '../app/components/playlist-list.component';
import { UserListComponent } from '../app/components/user-list.component';
import { UserDetailComponent } from '../app/components/user-detail.component';

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
    path: 'invitations',
    component: InvitationComponent
  },
  {
    path: 'users',
    component: UserListComponent
  },
  {
    path: 'playlists',
    component: PlaylistListComponent
  },
  { 
    path: 'playlists/:id', 
    component: PlaylistDetailComponent 
  },
  { 
    path: 'users/:id', 
    component: UserDetailComponent 
  },
  {
    path: 'home',
    component: HomeComponent
  }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);

