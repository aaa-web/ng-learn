import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from "../services/auth/authentication.service";
import { UserService } from '../services/user/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  operation: string = 'login';
  email: string;
  password: string;
  nick: string;

  constructor( 
    private authenticationService: AuthenticationService,
    private userService: UserService, 
    private router: Router
    ) { }

  ngOnInit() {
  }

  login() {
    // como el servicio retorna una promesa, la resolvemos con then ( (data) => {acciones});
    this.authenticationService.loginWithEmail(this.email, this.password).then(
      (data) => {
        console.log('Logueado correctamente');        
        console.log(data); 
        this.router.navigate(['home']);      
      }).catch((error) => {
        console.log('Ocurrió un error');
        console.log(error);
      });
  }

  register() {
    // como el servicio retorna una promesa, la resolvemos con then ( (data) => {acciones});
    this.authenticationService.registerWithEmail(this.email, this.password).then(
      (data) => {
        const user = {
          uid: data.user.uid,
          email: this.email,
          nick: this.nick
        };
        //el servicio createUser retorna una promesa que resolveremos acá mismo
        this.userService.createUser(user).then(
          (data2) => {
            console.log('Registrado correctamente');        
            console.log(data2);
          }).catch((error) => {
            console.log('Ocurrió un error');
            console.log(error);
          });
      }).catch((error) => { //manejo de errores 
        console.log('Ocurrió un error');
        console.log(error);
      });
  }

}
