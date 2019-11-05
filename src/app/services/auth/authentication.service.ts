import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth'

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private angularFireAuth: AngularFireAuth) {

  }

  loginWithEmail(email: string, password: string) {
    // return a promise
    return this.angularFireAuth.auth.signInWithEmailAndPassword(email, password);
  }

  registerWithEmail(email: string, password: string) {
    // return a promise
    return this.angularFireAuth.auth.createUserWithEmailAndPassword(email, password);
  }

  getSesionStatus() {
    // return an observable object
    return this.angularFireAuth.authState;
  }

  logOut() {
    // return a promise
    return this.angularFireAuth.auth.signOut();
  }

}
