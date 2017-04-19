import { Component, ViewChild, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ModalModule } from "ngx-modal";

import { UserService } from '../services/user.service';

@Component({
  selector: 'user-detail-selector',
  templateUrl: '../views/user-detail.component.html',
  styles: [String(require('../styles/home.component.css'))],
  providers: []
})

export class UserDetailComponent implements OnInit {
  public id: string;
  public user: any;

  constructor(private route: ActivatedRoute, private userServ: UserService) { }
  ngOnInit(): void { 
    let instance = this;
    this.route.params.subscribe(params => {
      this.id = params['id'];
      this.userServ.user(this.id, '').then((response) => {
        instance.user = response;
      });
    });
  }
 }
 