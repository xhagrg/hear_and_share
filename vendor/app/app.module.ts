import '../src/rjx-extensions.ts';
import { NgModule } from '@angular/core';
import { APP_BASE_HREF } from '@angular/common';

import { BrowserModule } from '@angular/platform-browser';

import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { YoutubePlayerModule } from 'ng2-youtube-player';

import { AppComponent } from './components/app.component';
import { HomeComponent } from './components/home.component';
import { InvitationComponent } from '../app/components/invitation.component';
import { PlaylistDetailComponent } from '../app/components/playlist-detail.component';
import { PlaylistListComponent } from '../app/components/playlist-list.component';
import { UserListComponent } from '../app/components/user-list.component';
import { UserDetailComponent } from '../app/components/user-detail.component';
import { FriendListComponent } from '../app/components/friend-list.component';

// import { NavigatorComponent } from './components/navigator.component';
// import { MarkerComponent } from './components/marker.component';

// import { EventService } from './services/event.service';
import { PlaylistService } from './services/playlist.service';
import { UserService } from './services/user.service';
import { InvitationService } from './services/invitation.service';
import { SongEventService } from './services/song-event.service';

// import { GeocodingService } from './services/geocoding.service';

import { LoadersCssModule } from 'angular2-loaders-css';
import { TooltipModule } from "ng2-tooltip";
import { ModalModule } from "ngx-modal";

import { routing } from '../config/app.routing';

@NgModule({
  imports: [
    FormsModule,
    BrowserModule,
    HttpModule,
    YoutubePlayerModule,
    LoadersCssModule,
    TooltipModule,
    ModalModule,
    routing
  ],
  declarations: [
    AppComponent,
    HomeComponent,
    InvitationComponent,
    PlaylistDetailComponent,
    PlaylistListComponent,
    UserListComponent,
    FriendListComponent,
    UserDetailComponent
  ],
  providers: [
    InvitationService,
    PlaylistService,
    UserService,
    SongEventService,
    { provide: APP_BASE_HREF, useValue: '' }
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }
