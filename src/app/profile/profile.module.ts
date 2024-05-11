import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileRoutingModule } from './profile-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { MyProfileComponent } from './my-profile/my-profile.component';
import { UpdateProfileComponent } from './update-profile/update-profile.component';



@NgModule({
  declarations: [MyProfileComponent, UpdateProfileComponent],
  imports: [
    CommonModule,
    ProfileRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class ProfileModule { }
