import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class InvitationService {
  private headers = new Headers({ 'Content-Type': 'application/json' });
  private url = 'api/v1/invitations';
  private data: any;

  constructor(private http: Http) {
    this.data = {};
  }

  invitations(current_user_id): Promise<any> {
    return this.http.get(`${this.url}?current_user_id=${current_user_id}`)
      .toPromise()
      .then(response => response.json());
  };

  invitation(invitation_id): Promise<any> {
    let url = `${this.url}/${invitation_id}`;
    return this.http.get(url).toPromise().then(response => response.json());
  }

  update(invitation_id, current_user_id, user_id, status): Promise<any> {
    let url = `${this.url}/${invitation_id}`;
    return this.http.put(url, { 
      status: status, 
      current_user_id: current_user_id
    }).toPromise().then(response => response.json());
  }

  create(current_user_id, user_id): Promise<any> {
    let url = `${this.url}`;
    return this.http.post(url, { 
      user_id: user_id, 
      current_user_id: current_user_id
    }).toPromise().then(response => response.json());   
  }
}
