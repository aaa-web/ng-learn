import { Component, OnInit } from '@angular/core';
import { DialogComponent, DialogService } from 'ng2-bootstrap-modal';
import { UserService } from 'src/app/services/user/user.service';
import { RequestService } from 'src/app/services/request/request.service';

export interface PromptModel {
  scope: any;
  currentRequest: any;
}

@Component({
  selector: 'app-request',
  templateUrl: './request.component.html',
  styleUrls: ['./request.component.css']
})
export class RequestComponent extends DialogComponent<PromptModel, any> implements PromptModel {

  scope: any;
  currentRequest: any;
  shouldAdd: string;

  constructor(
    public dialogService: DialogService,
    private userService: UserService, 
    private requestService: RequestService
  ) {
    super(dialogService);

    this.shouldAdd = 'yes'; 
  }

  accept() {
    let requestStatus;

    if (this.shouldAdd == 'yes') {
      requestStatus = 'accepted';

    } else if(this.shouldAdd == 'no') {
      requestStatus = 'rejected';
    } else if (this.shouldAdd == 'later') {
      requestStatus = 'decide_later';
    }

    if(requestStatus) {
      this.requestService.setRequestStatus(this.currentRequest, requestStatus).then(
        (data) => {
          console.log(data); 
          if (requestStatus == 'yes') {
            this.userService.addFriend(this.scope.user.uid, this.currentRequest.sender).then(
              (data) => {
                console.log('Solicitud aceptada exitosamente');                
              });
          }         
        }).catch((error) => {
          console.log(error);
        });
    }
  }
  
}
