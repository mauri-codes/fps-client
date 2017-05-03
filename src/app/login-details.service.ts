import { Observable }   from 'rxjs/Observable';
import { Injectable }   from '@angular/core';
import { Subject }      from 'rxjs/Subject';

@Injectable()
export class LoginDetailsService {
  // Observable string sources
  private loginSource = new Subject<any>();

  // Observable string streams
  loginEmitted$ = this.loginSource.asObservable();

  // Service message commands
  emitChange(username: any) {
    this.loginSource.next(username);
  }
}
