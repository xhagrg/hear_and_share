import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class PlaylistService {
  private headers = new Headers({ 'Content-Type': 'application/json' });
  private url = 'api/v1/playlists';
  private data: any;

  constructor(private http: Http) {
    this.url = `${window.location.protocol}//${window.location.hostname}:${window.location.port}/${this.url}`;
  }

  playlists(current_user_id, user_id): Promise<any> {
    return this.http.get(`${this.url}?current_user_id=${current_user_id}&user_id=${user_id}`)
      .toPromise()
      .then(response => response.json());
  };

  playlist(playlist_id): Promise<any> {
    let url = `${this.url}/${playlist_id}`;
    return this.http.get(url).toPromise().then(response => response.json());
  }

  update(playlist, url, name = '', type = ''): Promise<any> {
    let temp_url = `${this.url}/${playlist.id}`;
    let options = { current_user_id: playlist.user_id }
    if(name == '' && url != '') {
      options['url'] = url;
    }
    else if(name != '') {
      options['playlist'] = { name: name, type: type };
    }
    return this.http.put(
      temp_url, 
      options
    ).toPromise().then(response => response.json(), error => console.log(error));
  }

  create(name, current_user_id, _type): Promise<any> {
    let temp_url = `${this.url}`;
    return this.http.post(temp_url, { 
      current_user_id: current_user_id,
      playlist: {
        type: _type,
        name: name
      }
    }).toPromise().then(response => response.json());
  }

  delete(playlist_id): Promise<any> {
    let temp_url = `${this.url}/${playlist_id}`;    
    return this.http.delete(temp_url).toPromise().then(response => response.json());    
  }

  deleteSong(playlist_id, song_id, current_user_id): Promise<any> {
    let temp_url = `${this.url}/${playlist_id}/remove_song`;    
    return this.http.post(temp_url, { 
      song_id: song_id, 
      current_user_id: current_user_id 
    }).toPromise().then(response => response.json());    
  }

  updateSongPlayCount(song_id) {
    let temp_url = `${this.url}/song_count`;    
    return this.http.post(temp_url, {
      song_id: song_id
    }).toPromise().then(response => response.json());
  }
}
