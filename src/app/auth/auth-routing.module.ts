import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { VerificationComponent } from './verification/verification.component';

const routes: Routes = [
  // {path: 'accounts', children: [

  // ]}
  {path: 'profile', component: UserProfileComponent},
  {
    path: 'verify', 
    component: VerificationComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
