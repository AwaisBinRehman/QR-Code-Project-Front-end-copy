import { AuthGuard } from './auth/guards/auth.guard';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { ResetPassComponent } from './auth/reset-pass/reset-pass.component';
import { ClientHomeComponent } from './client-home/client-home/client-home.component';
import { WelcomeComponent } from './auth/welcome/welcome.component';
import { SearchedProductComponent } from './client-home/searched-product/searched-product.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {path: 'login', component: LoginComponent },
  {path: 'register', component: RegisterComponent},
  {path: 'welcome' , component: WelcomeComponent},
  {path: 'forgot-password', component: ResetPassComponent},
  {path: 'home', component: ClientHomeComponent},
  { path: 'my-profile', loadChildren: () => import('./profile/profile.module').then(m => m.ProfileModule),canActivate:[AuthGuard] },
  {path: 'searched/:id', component: SearchedProductComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
