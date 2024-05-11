import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { IMAGE_URL, USER_PROFILE_URL } from 'src/app/share/constants/urls';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.css']
})
export class MyProfileComponent implements OnInit {

  user: any;
  image_url = IMAGE_URL
  profilePicture: any;
  existing_certificates: any[] = [];
  existing_logos: any[] = [];
  constructor(private _userService: UserService) { }

  ngOnInit(): void {
    this.getUserProfile()
  }

  getUserProfile(){
    this._userService.getUser().subscribe(
      (response) => {
        this.user = response.user;
        this.profilePicture = IMAGE_URL + '/user/' + this.user.upload_profile
        this.existing_certificates = this.user.upload_certificate
        this.existing_logos = this.user.logo
      },
      (error) => {
        console.error('Error fetching user data:', error);
      }
    );
  }

}
