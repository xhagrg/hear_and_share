import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class SongEventService { 
  public invokeEvent:Subject<any> = new Subject();

  public constructor() {}
}

