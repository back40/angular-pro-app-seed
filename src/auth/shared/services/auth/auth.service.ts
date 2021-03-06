import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';

import { Store } from 'store';

import 'rxjs/add/operator/do';

export interface User {
  email: string,
  uid: string,
  authenticated: boolean
}

@Injectable()
export class AuthService {

  auth$ = this.af.authState
    .do(next => {
      if (!next) {
        this.store.set('user', null)
      }
    })
  constructor(
    private store: Store,
    private af: AngularFireAuth
  ) { }

  createUser(email: string, password: string) {
    return this.af.auth.createUserWithEmailAndPassword(email, password);
  }

  loginUser(email: string, password: string) {
    return this.af.auth.signInWithEmailAndPassword(email, password);
  }
}
