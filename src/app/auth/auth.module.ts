import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { BrowserModule } from '@angular/platform-browser';
import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ResetPassComponent } from './reset-pass/reset-pass.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { NgxCaptchaModule } from 'ngx-captcha';
import { CaptchaComponent } from './captcha/captcha.component';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { ToastrModule } from 'ngx-toastr';
import { PhoneCountryComponent } from './phone-country/phone-country.component';
import {MatSelectModule} from '@angular/material/select';
import { HttpClientModule } from '@angular/common/http';
import { SafeUrlPipe } from './safe-url.pipe';
import { WelcomeComponent } from './welcome/welcome.component';

@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    ResetPassComponent,
    UserProfileComponent,
    CaptchaComponent,
    PhoneCountryComponent,
    SafeUrlPipe,
    WelcomeComponent,
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    NgxCaptchaModule,

    ReactiveFormsModule,
    FormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    BrowserModule,
    ToastrModule.forRoot(),
    MatSelectModule,
    HttpClientModule,
    NgxDropzoneModule
  ]
})
export class AuthModule { }
