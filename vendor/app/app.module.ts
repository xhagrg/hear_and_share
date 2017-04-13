import '../src/rjx-extensions.ts';
import { NgModule } from '@angular/core';
import { APP_BASE_HREF } from '@angular/common';

import { BrowserModule } from '@angular/platform-browser';

import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { YoutubePlayerModule } from 'ng2-youtube-player';

import { AppComponent } from './components/app.component';
import { HomeComponent } from './components/home.component';

// import { NavigatorComponent } from './components/navigator.component';
// import { MarkerComponent } from './components/marker.component';

// import { EventService } from './services/event.service';
// import { MapService } from './services/map.service';
// import { GeocodingService } from './services/geocoding.service';

import { LoadersCssModule } from 'angular2-loaders-css';
import { TooltipModule } from "ng2-tooltip";


import { routing } from '../config/app.routing';

@NgModule({
  imports: [
    FormsModule,
    BrowserModule,
    HttpModule,
    YoutubePlayerModule,
    LoadersCssModule,
    TooltipModule,
    routing
  ],
  declarations: [
    AppComponent,
    HomeComponent,
    // NavigatorComponent,
    // MarkerComponent
  ],
  providers: [
    // MapService,
    // GeocodingService,
    // EventService,
    { provide: APP_BASE_HREF, useValue: '' }
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }
