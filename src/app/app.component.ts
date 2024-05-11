import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Right-Brand-Asia';

  constructor(public router:Router, private userService:UserService){

  }

  ngOnInit(){

  }


}
