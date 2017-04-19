import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class UserService {
  private headers = new Headers({ 'Content-Type': 'application/json' });
  private url = 'api/v1/users';
  private data: any;

  constructor(private http: Http) {
    this.data = {};
  }

  users(current_user_id): Promise<any> {
    return this.http.get(`${this.url}?current_user_id=${current_user_id}`)
      .toPromise()
      .then(response => response.json());
  };

  user(user_id, current_user_id): Promise<any> {
    let url = `${this.url}/${user_id}?current_user_id=${current_user_id}`;
    return this.http.get(url).toPromise().then(response => response.json());
  }

  logOut(): Promise<any> {
    let temp_url = `${window.location.protocol}//${window.location.host}:${window.location.port}/users/sign_out`;
    return this.http.delete(temp_url).toPromise().then(response => response.json());    
  }
}
