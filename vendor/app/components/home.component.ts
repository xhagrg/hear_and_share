import { Component, ViewChild, OnInit, Input } from '@angular/core';

@Component({
  selector: 'home-selector',
  templateUrl: '../views/home.component.html',
  styles: [String(require('../styles/home.component.css'))],
  providers: []
})

export class HomeComponent implements OnInit {
  constructor() { }
  ngOnInit(): void { }
 }