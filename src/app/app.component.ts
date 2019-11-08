import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from './services/auth/authentication.service';
import { UserService } from './services/user/user.service';
import { RequestService } from './services/request/request.service';
import { User } from './interfaces/user';
import { DialogService } from 'ng2-bootstrap-modal';
import { RequestComponent } from './modals/request/request.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'platzinger';
  user: User;
  requests: any[];
  mailsShown: any[];

  constructor(
    public router: Router,
    private authenticationService: AuthenticationService, 
    private userService: UserService,
    private requestService: RequestService, 
    private dialogService: DialogService
  ) {
    this.requests = [];
    this.mailsShown = [];

    this.authenticationService.getSesionStatus().subscribe(
      (status) => {
        this.userService.getUserById(status.uid).valueChanges().subscribe(
          (data: User) => {
            this.user = data;
            this.requestService.getRequestsForEmail(this.user.email).valueChanges().subscribe(
              (requests: any) => {
                this.requests = requests; 
                this.requests = this.requests.filter(
                  (rq) => {
                    return rq.status !== 'accepted' && rq.status !== 'rejected';
                  });
                  this.requests.forEach(
                    (rq) => {
                      if (this.mailsShown.indexOf(rq.sender) === -1) {
                        this.mailsShown.push(rq.sender);
                        this.dialogService.addDialog(RequestComponent, {scope: this, currentRequest: rq});
                      }                    
                    });
              }, 
              (error) => {
                console.log(error);                
              });
          });
      });

  }
}
