import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup; // Declare the form group
  submitted = false;
  showPassword: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  get fc() {
    return this.loginForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    if (this.loginForm.invalid) {
      return;
    }

    this.userService.login({
      email: this.fc.email.value,
      password: this.fc.password.value
    }).subscribe({
      next: (user) => {
        this.userService.setUserToLocalStorage(user);
        this.userService.userSubject.next(user);
        this.toastr.success('Login Successful', 'Welcome');
        this.router.navigate(['/']);
      },
      error: (errorResponse) => {
        this.toastr.error(errorResponse.error.message, 'Login Failed');
      }
    });
  }

  ngOnInit() {
    if (this.userService.getUserFromLocalStorage()) {
      this.router.navigate(['/']);
    }

    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]]
    });

    // this.loginForm.addControl('confirmPassword', new FormControl('', Validators.required));
  }

  toggleShowPassword() {
    this.showPassword = !this.showPassword;
  }

  // passwordsMatch(): boolean {
  //   const password = this.loginForm.controls.password.value;
  //   const confirmPassword = this.loginForm.controls.confirmPassword.value;
  //   return password === confirmPassword;
  // }

  // get confirmPassword() {
  //   return this.loginForm.controls.confirmPassword;
  // }
}
