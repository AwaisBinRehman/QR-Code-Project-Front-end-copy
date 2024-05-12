import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import {
  USER_LOGIN_URL,
  USER_REGISTER_URL,
  USER_VERIFY_URL,
  USER_PROFILE_URL,
  USER_UPDATE_URL,
} from '../share/constants/urls';
import { IUserLogin } from '../share/interfaces/IUserLogin';
import { User } from '../share/models/User';

const USER_KEY = 'User';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  userSubject = new BehaviorSubject<User>(this.getUserFromLocalStorage());

  public userObservable: Observable<User>;

  constructor(private http: HttpClient, private toastrService: ToastrService) {
    this.userObservable = this.userSubject.asObservable();
  }

  public get currentUser(): User {
    return this.userSubject.value;
  }

  login(userLogin: IUserLogin): Observable<User> {
    return this.http.post<User>(USER_LOGIN_URL, userLogin).pipe(
      tap((user) => {
        this.setUserToLocalStorage(user);
        this.userSubject.next(user);
        this.toastrService.success(`Welcome ${user.name}`, 'Login Successful');
      })
    );
  }
  

  register(userRegiser: any): Observable<User> {
    return this.http.post<User>(USER_REGISTER_URL, userRegiser).pipe(
      tap({
        next: (user) => {
          this.toastrService.success(
            `Welcome`,
            'Register Successful, \n Login to proceed'
          );
        },
        error: (errorResponse) => {
          this.toastrService.error(
            errorResponse.error.message,
            'Register Failed'
          );
        },
      })
    );
  }

  updateProfile(user: any) {
    return this.http.put<any>(`${USER_UPDATE_URL}`, user);
  }

  getUser(): Observable<any> {
    return this.http.get<any>(`${USER_PROFILE_URL}`);
  }

  logout() {
    this.userSubject.next(new User());
    localStorage.removeItem(USER_KEY);
    window.location.reload();
  }

  setUserToLocalStorage(user: User) {
    localStorage.setItem(USER_KEY, JSON.stringify(user));
  }

  getUserFromLocalStorage(): any {
    const userJson = localStorage.getItem(USER_KEY);
    if (userJson) return JSON.parse(userJson);

    return null;
  }
}
