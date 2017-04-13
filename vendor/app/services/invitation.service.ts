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

  events(year = null, month = null): Promise<any> {
    let url = this.url;
    if (year && month) {
      url = `${url}?year=${year}&month=${month}`;
    }
    let return_data = this.data[url];
    if(!return_data) {
      this.data[url] = this.http.get(url)
                         .toPromise()
                         .then(response => response.json());
    }
    return this.data[url];
  };
}
