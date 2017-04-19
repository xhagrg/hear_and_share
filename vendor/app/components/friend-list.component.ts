import { Component, ViewChild, OnInit, Input } from '@angular/core';
import { UserService } from '../services/user.service';
@Component({
  selector: 'friend-list-selector',
  templateUrl: '../views/user-list.component.html',
  styles: [String(require('../styles/home.component.css'))],
  providers: []
})

export class FriendListComponent implements OnInit {
  public users;
  public selectedUser;
  private current_user_id;
  constructor(private userServ: UserService) { }
  
  ngOnInit(): void {
    let instance = this;
    this.current_user_id = document.getElementById('current_user_id').dataset.currentUserId;
    this.userServ.user(this.current_user_id, this.current_user_id).then((response) => {
      console.log(response);
      instance.users = response['friends'];
    });
  }

  updateSelected(user) {
    this.selectedUser = user;
  }
}
