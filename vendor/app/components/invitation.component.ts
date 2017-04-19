import { Component, ViewChild, OnInit, Input } from '@angular/core';
import { InvitationService } from '../services/invitation.service';
import * as toastr from 'toastr';

@Component({
  selector: 'invitation-selector',
  templateUrl: '../views/invitation.component.html',
  styles: [String(require('../styles/home.component.css'))],
  providers: []
})

export class InvitationComponent implements OnInit {
  public invitations: any;
  private currentUserId: string;
  constructor(private invtServ: InvitationService) { }
  
  ngOnInit(): void { 
    this.currentUserId = document.getElementById('current_user_id').dataset.currentUserId;
    this.retrieveInvitations();    
  }

  retrieveInvitations() {
    this.invtServ.invitations(this.currentUserId).then((response) => 
      this.invitations = response
    );
  }

  update(invitation, status) {
    this.invtServ.update(invitation.id, this.currentUserId, invitation.receiver_id, status).then(() => {
      this.retrieveInvitations();
      toastr.success(`Invitation ${status}ed.`);
    });
  }
}
