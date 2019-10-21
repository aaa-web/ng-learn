import { Component, OnInit } from '@angular/core';
import { User } from '../interfaces/user';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  friends: User[];

  constructor() {
    this.friends = [
      {
        nick: 'andrec',
        subnick: 'elfriend',
        email: 'andres.castro@pragma.com.co',
        friend: true,
        uid: '001'
      },
      {
        nick: 'moralej',
        subnick: 'jenkinsman',
        email: 'andres.morales@pragma.com.co',
        friend: true,
        uid: '001'
      },
      {
        nick: 'jonnatan',
        subnick: 'angulero',
        email: 'jonnatan.rios@pragma.com.co',
        friend: true,
        uid: '001'
      }
    ];
   }

  ngOnInit() {
  }

}
