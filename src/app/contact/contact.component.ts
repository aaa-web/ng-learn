import { Component, OnInit, Input } from '@angular/core';
import { UserService } from '../services/user/user.service';
import { User } from '../interfaces/user';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
  @Input() uid: string; // recibe un parámetro desde un componente padre
  contact: User;

  constructor(
    private userService: UserService
  ) { }

  ngOnInit() {
    console.log(this.uid);
    this.userService.getUserById(this.uid).valueChanges().subscribe(
      (data: User) => {
        this.contact = data;
      }
    );
  }

}
