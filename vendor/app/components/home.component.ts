import { Component, ViewChild, OnInit, Input } from '@angular/core';
import { InvitationService } from '../services/invitation.service';

@Component({
  selector: 'home-selector',
  templateUrl: '../views/home.component.html',
  styles: [String(require('../styles/home.component.css'))],
  providers: []
})

export class HomeComponent implements OnInit {
  public selectedComponent: string;
  public componentList;
  public invitationCount;
  public currentUserId;

  constructor(private invtServ: InvitationService) {
    this.selectedComponent = 'Playlists';  
    this.componentList = ['Invitations', 'Users', 'Friends', 'Playlists'];
  }

  ngOnInit(): void {
    this.currentUserId = document.getElementById('current_user_id').dataset.currentUserId;
    this.retrieveInvitations();
    setInterval(() => {
      this.retrieveInvitations();
    }, 5000);
  }

  public retrieveInvitations() {
    this.invtServ.invitations(this.currentUserId).then((response) => 
      this.invitationCount = response.length
    );
  }

  public updateComponent(component) {
    this.selectedComponent = component;
  }

}