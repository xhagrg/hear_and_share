import { Component, ViewChild, OnInit, Input } from '@angular/core';
import { UserService } from '../services/user.service';
import { InvitationService } from '../services/invitation.service';

@Component({
  selector: 'user-list-selector',
  templateUrl: '../views/user-list.component.html',
  styles: [String(require('../styles/home.component.css'))],
  providers: []
})

export class UserListComponent implements OnInit {
  public users;
  public selectedUser;
  private current_user_id;
  constructor(private userServ: UserService, private invtServ: InvitationService) { }
  
  ngOnInit(): void {
    let instance = this;
    this.retrieveUsers();
  }

  retrieveUsers() {
    let instance = this;
    this.current_user_id = document.getElementById('current_user_id').dataset.currentUserId;
    this.userServ.users(this.current_user_id).then((response) => {
      instance.users = response;
    });    
  }

  addFriend(user) {
    this.invtServ.create(this.current_user_id, user.id).then(() => this.retrieveUsers());
  }

  updateSelected(user) {
    this.selectedUser = user;
  }
}
