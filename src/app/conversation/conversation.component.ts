import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../services/user/user.service';
import { User } from '../interfaces/user';
import { ConversationService } from '../services/conversation/conversation.service';
import { AuthenticationService } from '../services/auth/authentication.service';

@Component({
  selector: 'app-conversation',
  templateUrl: './conversation.component.html',
  styleUrls: ['./conversation.component.css']
})
export class ConversationComponent implements OnInit {

  friendId: any;
  friend: User;
  user: User;
  conversation_id: string;
  textMessage: string;
  constructor(
    private activatedRoute: ActivatedRoute,
    private userService: UserService, 
    private conversationService: ConversationService, 
    private authenticationService: AuthenticationService
  ) {

    this.friendId = this.activatedRoute.snapshot.params['uid'];
    console.log(this.friendId);
    this.authenticationService.getSesionStatus().subscribe((session) => {
      this.userService.getUserById(session.uid).valueChanges().subscribe((user: User) => {
        this.user = user;
        this.userService.getUserById(this.friendId).valueChanges().subscribe((data: User) => {
          this.friend = data;
          const ids = [this.user.uid, this.friend.uid].sort();
          this.conversation_id = ids.join('|');
        }, (error) => {
          console.log(error);
        });
      });
    });
  }

  ngOnInit() {
  }
  sendMessage() {
    const message = {
      uid: this.conversation_id,
      timestamp: Date.now(),
      text: this.textMessage,
      sender: this.user.uid,
      receiver: this.friend.uid
    };
    this.conversationService.createConversation(message).then(() => {
      this.textMessage = '';
    });
  }

}
