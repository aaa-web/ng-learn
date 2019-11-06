import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user/user.service';
import { User } from '../interfaces/user';
import { AuthenticationService } from '../services/auth/authentication.service';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import { AngularFireStorage } from '@angular/fire/storage';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  user: User;
  imageChangedEvent: any = '';
  croppedImage: any = '';
  picture: any;

  constructor(
    private userService: UserService,
    private authenticationService: AuthenticationService, 
    private firebaseStorage: AngularFireStorage
  ) { }
    
  ngOnInit() {
    this.getSesionUser();
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
    if (this.croppedImage) {
      const currentPictureId = Date.now();
      const pictures = this.firebaseStorage.ref('pictures/' + currentPictureId + '.jpg').putString(this.croppedImage, 'data_url');
      //resolvemos la promesa en pictures
      pictures.then(
        (result) => {
          this.picture = this.firebaseStorage.ref('pictures/' + currentPictureId + '.jpg').getDownloadURL();
          this.picture.subscribe(
            (image) => {
              this.userService.setAvatar(image, this.user.uid).then(
                () => {
                  console.log('avatar subido correctamente');
                }
              ).catch(
                (error) => {
                  console.log('error al subir el avatar');
                  console.log(error);                  
                }
              );
            }
          );
        }
      ).catch(
        (error) => {
          console.log(error);
          
        }
      );
    } else {
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

  fileChangeEvent(event: any): void {
    this.imageChangedEvent = event;
  }

  imageCropped(event: ImageCroppedEvent) {
      this.croppedImage = event.base64;
  }

  imageLoaded() {
      // show cropper
  }

  cropperReady() {
      // cropper ready
  }

  loadImageFailed() {
      // show message
  }

}
