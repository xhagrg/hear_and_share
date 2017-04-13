import { Component, ViewChild, OnInit, Input } from '@angular/core';
import { YoutubePlayer } from 'ng2-youtube-player';
import { Http } from '@angular/http';

@Component({
  selector: 'app',
  templateUrl: '../views/app.component.html',
  styles: [String(require('../styles/app.component.css'))],
  providers: []
})

export class AppComponent implements OnInit {
  player: YoutubePlayer;
  private id: string;

  constructor() { }
  ngOnInit(): void { }
 }