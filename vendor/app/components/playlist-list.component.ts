import { Component, ViewChild, OnInit, Input } from '@angular/core';
import { ModalModule } from "ngx-modal";

import { PlaylistService } from '../services/playlist.service';

import * as toastr from 'toastr';

@Component({
  selector: 'playlist-list-selector',
  templateUrl: '../views/playlist-list.component.html',
  styles: [String(require('../styles/home.component.css'))],
  providers: []
})

export class PlaylistListComponent implements OnInit {
  public playlists: any;
  public editingPlaylist: any;
  public current_user_id: string;
  public name: string;
  public type: string = 'PrivatePlaylist';

  constructor(private playServ: PlaylistService) { 

  }

  ngOnInit(): void {
    this.retrievePlaylists();
  }

  public retrievePlaylists() {
    let instance = this;
    this.current_user_id = document.getElementById('current_user_id').dataset.currentUserId;
    this.playServ.playlists(this.current_user_id, this.current_user_id).then((response) => {
      instance.playlists = response;
    });
  }

  addPlaylist() {
    this.playServ.create(this.name, this.current_user_id, this.type).then((response) => {
      if(response['error'].length > 0) {
        toastr.error(response['error'].join());
      }
      else {
        toastr.success("Playlist successfully added.");
        this.retrievePlaylists();
      }
    })
  }

  public updateType(_type) {
    this.type = _type;
  }

  public checkValidity(event) {
    console.log('reached here');
    if (!event.target.validity.valid) {
      event.target.setCustomValidity("This field cannot be left blank");
    }
  }

  public delete(playlist) {
    confirm('Are you sure you want to delete the playlist?');
    this.playServ.delete(playlist.id).then(() => this.retrievePlaylists());
  }

  public update() {
    this.playServ.update(this.editingPlaylist, '', this.name, this.type).then((response) => {
      if(response['error'].length > 0) {
        toastr.error(response['error'].join());
      }
      else {
        toastr.success("Playlist successfully updated.");
        this.retrievePlaylists();
      }
    });
  }

  public updateEditing(playlist) {
    this.editingPlaylist = playlist;
    this.name = playlist.name;
    this.type = playlist.type;
  }
}
