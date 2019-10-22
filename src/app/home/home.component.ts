import { Component, OnInit } from '@angular/core';
import { User } from '../interfaces/user';
import { UserService } from '../services/user/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  friends: User[];

  constructor( private userService: UserService ) {
    
  }

  ngOnInit() {
    this.getFriends();    
  }

  getFriends() {
    // this.userService.getAll().subscribe((data:User[]) => (this.friends = data));
    this.friends = this.userService.getFriends();
  }

}
