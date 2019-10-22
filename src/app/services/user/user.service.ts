import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { User } from 'src/app/interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private urlFriends = 'https://my-json-server.typicode.com/aaa-web/friends-db';

  constructor(private httpClient: HttpClient) { }
  
  getAll() {
    const requestUrl = `${this.urlFriends}/friends`;
    return this.httpClient.get(requestUrl);
  }

  getFriends() {
    return [
      {
        nick: 'andrec',
        subnick: 'elfriend',
        email: 'andres.castro@pragma.com.co',
        friend: false,
        uid: '001'
      },
      {
        nick: 'moralej',
        subnick: 'jenkinsman',
        email: 'andres.morales@pragma.com.co',
        friend: true,
        uid: '002'
      },
      {
        nick: 'jonnatan',
        subnick: 'angulero',
        email: 'jonnatan.rios@pragma.com.co',
        friend: true,
        uid: '003'
      }
    ]
  }
}
