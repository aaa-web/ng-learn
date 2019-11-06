import { Component, OnInit } from '@angular/core';
import { User } from '../interfaces/user';
import { UserService } from '../services/user/user.service';
import { AuthenticationService } from '../services/auth/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  friends: User[];
  user: User;
  query: string = '';

  constructor( 
    private userService: UserService,
    private authenticationService: AuthenticationService,
    private router: Router
    ) {
    
  }

  ngOnInit() {
    this.getSessionUser();
    this.getFriends();    
  }

  getFriends() {
    // this.userService.getAll().subscribe((data:User[]) => (this.friends = data));

    //como el servicio retorna un observable nos suscribimos a sus eventos
    this.userService.getUsers().valueChanges().subscribe(
      (data: User[]) => {
        this.friends = data;
      },
      (error) => {
        console.log(error)
      }
    );
  }

  getSessionUser() {
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

  logout() {
    this.authenticationService.logOut().then(
      () => { // Cuando hacemos logout redirigimos al login
        alert('Sesión cerrada con éxito');
        this.router.navigate(['login']);
      }
    ).catch(
      (error) => {
        console.log(error);        
      }
    );
  }
  



}
