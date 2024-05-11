import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { User } from '../models/User';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {
  user: any;

  constructor(public router: Router, private userService: UserService) { }

  ngOnInit(): void {
  }

  ngDoCheck() {

  }

  get isLoggedIN(): boolean {
    const data = this.userService.getUserFromLocalStorage();
    if (!!data) {

      this.user = data.user
      console.log(this.user);
    }


    return !!this.user && !!data?.token;
  }

}
