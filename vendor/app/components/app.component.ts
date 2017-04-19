import { Component, ViewChild, OnInit, Input } from '@angular/core';
import { YoutubePlayer } from 'ng2-youtube-player';
import { Http } from '@angular/http';
import { PlaylistService } from '../services/playlist.service';
import { UserService } from '../services/user.service';
import { SongEventService } from '../services/song-event.service';

@Component({
  selector: 'app',
  templateUrl: '../views/app.component.html',
  styles: [String(require('../styles/app.component.css'))],
  providers: []
})

export class AppComponent implements OnInit {
  private id: string;
  private width: number;
  private height: number;
  private songs = [];
  private currentId = 0;
  private current_user_id: string;
  
  public current_playlist_id: string;
  public player: YT.Player;
  public component: string;

  constructor(private playserv: PlaylistService, private userServ: UserService, private songEvent: SongEventService) {
  }

  ngOnInit(): void { 
    this.current_user_id = document.getElementById('current_user_id').dataset.currentUserId;
    this.width = document.getElementById("player-control").offsetWidth - 30;
    this.height = window.outerHeight / 2;
    this.songEvent.invokeEvent.subscribe((songDetails) => {
      if(songDetails['songs']) {
        this.songs = songDetails['songs'];
        this.currentId = songDetails['currentId'];
        this.current_playlist_id = songDetails['playlist_id'];
        this.play();
      }
      else if(songDetails['reload_list'] && songDetails['playlist_id'] == this.current_playlist_id) {
        this.retrieveSongs(false);
      }
    })
  }

  public retrieveSongs(playSong = true) {
    let instance = this;
    this.playserv.playlists(this.current_user_id, this.current_user_id).then((response) => {
      let resp = response[0];
      instance.songs = resp.songs;
      instance.current_playlist_id = resp.id;
      instance.currentId = 0;
      if(playSong)
        instance.play();
    });
  }

  public savePlayer(player) {
    this.player = player;
    // this.player.videoId = 'qDuKsiwS5xw';
    this.retrieveSongs();
	}

  public play() {
    let song = this.songs[this.currentId];
    this.player.loadVideoById(song.url.split('v=')[1]);
    this.updateSongPlayCount(song);
  }

  public updateSongPlayCount(song) {
    this.playserv.updateSongPlayCount(song.id).then((response) => {
      console.log(response);
    });
  }

  public isPlaying(song) {
    return this.currentId == this.songs.indexOf(song);
  }

  public playSong(song) {
    let index = this.songs.indexOf(song);
    this.currentId = index;
    this.play();
  }

  public onStateChange(event) {
    if(event.data == 0) {
      this.playNext();
    }
  }

  public logOut() {
    this.userServ.logOut().then(() => {
      window.location.href = `${window.location.protocol}//${window.location.hostname}:${window.location.port}`;
      window.location.reload();
    });
  }

  public playNext() {
    this.currentId ++;
    if(this.currentId >= this.songs.length) 
      this.currentId = 0;
    this.play();
  }

  public playPrevious() {
    this.currentId --;
    if(this.currentId <= 0) 
      this.currentId = 0;
    this.play();
  }
 }