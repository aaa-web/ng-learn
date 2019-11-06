import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user/user.service';
import { User } from '../interfaces/user';
import { AuthenticationService } from '../services/auth/authentication.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  user: User;
  constructor(
    private userService: UserService,
    private authenticationService: AuthenticationService
    ) { 
      this.getSesionUser();
    }

  ngOnInit() {
  }
  
  getSesionUser() {
    this.authenticationService.getSesionStatus().subscribe(
      (status) => {
        this.userService.getUserById(status.uid).valueChanges().subscribe(
          (data: User) => {
            this.user = data;
            console.log(data);            
          }, 
          (error) => {
            console.log(error);    
          }
        );
      },
      (error) => {
        console.log(error);        
      }
    );
  }

  saveSettings() {
    this.userService.editUser(this.user).then(
      () => {
        console.log('Cambios guardados con éxito');        
      }
    ).catch(
      (error) => {
        console.log(error);        
      }
    );
  }

}
