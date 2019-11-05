import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from "../services/auth/authentication.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  operation: string = 'login';
  email: string;
  password: string;

  constructor( private authenticationService: AuthenticationService ) { }

  ngOnInit() {
  }

  login() {
    // como el servicio retorna una promesa, la resolvemos con then ( (data) => {acciones});
    this.authenticationService.loginWithEmail(this.email, this.password).then(
      (data) => {
        console.log('Logueado correctamente');        
        console.log(data);        
      }).catch((error) => {
        console.log('Ocurrió un error');
        console.log(error);
      });
  }

  register() {
    // como el servicio retorna una promesa, la resolvemos con then ( (data) => {acciones});
    this.authenticationService.registerWithEmail(this.email, this.password).then(
      (data) => {
        console.log('Registrado correctamente');        
        console.log(data);        
      }).catch((error) => { //manejo de errores 
        console.log('Ocurrió un error');
        console.log(error);
      });
  }

}
