import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  user: any;
  editing: boolean = false;
  updatedUser: any;

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.userService.getUser().subscribe((data: any) => {
      this.user = data.user;
      this.updatedUser = { ...this.user }; // Create a copy of the user object for editing
    });
  }

    editProfile() {
      this.editing = true;
    }

  saveProfile() {
    this.userService.updateProfile(this.updatedUser).subscribe(
      (data: any) => {
        this.user = data.user;
        this.editing = false;
      },
      (error) => {
        console.log(error);
      }
    );
  }
  

  onFileSelected(event: any) {
    const file = event.target.files[0];
    this.updatedUser.upload_profile = file;
  }

  onFileSelectedCertificate(event: any) {
    const file = event.target.files[0];
    this.updatedUser.upload_certificate = file;
  }
}
