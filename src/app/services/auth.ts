import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { switchMap, tap } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Auth {
  private api = environment.apiUrl + '/users';

  constructor(private http: HttpClient) { }

  //login
  login(email: string, password: string) {
    // JSON server filter query
    return this.http.get<any[]>(`${this.api}?email=${email}&password=${password}`).pipe(
      // if user found -> save automatically
      tap((res) => {
        if (res.length) {
          const user = res[0];
          const token = this.generateToken(user);

          this.saveUser(user);
          this.saveToken(token);
          

          
        }
      })
      ,
    );
  }

  private generateToken(user: any): string {
    return btoa(`${user.email}:${user.id}:${Date.now()}`);
  }



  register(user: any) {
    return this.http.get<any[]>(`${this.api}?email=${user.email}`).pipe(
      switchMap((res) => {
        if (res.length) {
          return throwError(() => new Error('User already exists'));
        }

        // default role
        user.role = 'USER';

        return this.http.post(this.api, user);
      })
    );
  }

  //get user
   getUser() {
    return JSON.parse(localStorage.getItem('user') || 'null');
  }

  getUserId() {
    return this.getUser()?.id;
  }

  getRole() {
    return this.getUser()?.role;
  }

  isAdmin() {
    return this.getRole() === 'ADMIN';
  }



  //save user
  saveUser(user: any) {
    localStorage.setItem('user', JSON.stringify(user));
  }

  saveToken(token: string) {
    localStorage.setItem('token', token);
  }

  getToken() {
    return localStorage.getItem('token');
  }

  isLoggedIn() {
    return !!localStorage.getItem('token');
  }

  logout() {
    localStorage.clear();
  }
}
