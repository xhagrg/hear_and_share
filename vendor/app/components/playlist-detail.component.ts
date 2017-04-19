import { Component, ViewChild, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ModalModule } from "ngx-modal";

import { PlaylistService } from '../services/playlist.service';
import { SongEventService } from '../services/song-event.service';

import * as toastr from 'toastr';

@Component({
  selector: 'playlist-detail-selector',
  templateUrl: '../views/playlist-detail.component.html',
  styles: [String(require('../styles/home.component.css'))],
  providers: []
})

export class PlaylistDetailComponent implements OnInit {
  public id: string;
  public playlist: any;
  public songs: any;
  public current_user_id: string;
  public url: string;
  
  constructor(private playServ: PlaylistService, private route: ActivatedRoute, private songEvent: SongEventService) { 
  }

  ngOnInit(): void {
    let instance = this;
    this.current_user_id = document.getElementById('current_user_id').dataset.currentUserId;
    this.route.params.subscribe(params => { 
      instance.id = params['id'];
      this.retrieveSongs();
    });
  }

  public playSong(song) {
    let songDetail = {};
    songDetail['currentId'] = this.songs.indexOf(song);
    songDetail['songs'] = this.songs;
    songDetail['playlist_id'] = this.playlist.id;
    this.songEvent.invokeEvent.next(songDetail);
  }

  public retrieveSongs() {
    this.playServ.playlist(this.id).then((response) => {
      this.playlist = response;
      this.songs = response.songs;
    });
  }

  public delete(song) {
    alert("Are you sure you want to remove the song from the playlist?");
    this.playServ.deleteSong(this.id, song.id, this.current_user_id).then((response) => {
      this.playlist = response;
      this.songs = response.songs;
      toastr.success('Song removed from the playlist.');
    });    
  }

  public addSong() {
    this.playServ.update(this.playlist, this.url).then((response) => {
      if(response['error'].length > 0) {
        toastr.error(response['error'].join());
      }
      else {
        toastr.success("Song successfully added.");
        this.songEvent.invokeEvent.next({ reload_list: true, playlist_id: this.playlist.id });
        this.retrieveSongs();
      }
    })
  }
}
