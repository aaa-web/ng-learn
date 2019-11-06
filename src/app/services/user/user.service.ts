import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { User } from 'src/app/interfaces/user';
import { AngularFireDatabase } from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private urlFriends = 'https://my-json-server.typicode.com/aaa-web/friends-db';

  constructor(
    private httpClient: HttpClient,
    private angularFireDatabase: AngularFireDatabase
    ) { }
  
  getUsers() {
    // return an observable object
    return this.angularFireDatabase.list('/users')
  }

  getUserById(uid: string) {
    return this.angularFireDatabase.object('/users/' + uid);
  }
  
  createUser(user) {
    return this.angularFireDatabase.object('/users/' + user.uid).set(user);
  }

  editUser(user) {
    return this.angularFireDatabase.object('/users/' + user.uid).set(user);
  }

  getAll() {
    const requestUrl = `${this.urlFriends}/friends`;
    return this.httpClient.get(requestUrl);
  }

  
}
