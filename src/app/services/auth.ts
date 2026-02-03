import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class Auth {
  private api = environment.apiUrl + '/users';

  constructor(private http: HttpClient) {}

  //login
  login(email: string, password: string) {
    // JSON server filter query
    return this.http.get<any[]>(`${this.api}?email=${email}&password=${password}`).pipe(
      // if user found -> save automatically
      tap((res) => {
        if (res.length) {
          this.saveUser(res[0]);
           this.saveToken('fake-jwt-token-' + Date.now());
        }
      }),
    );
  }



  register(user: any) {
    // Check if user is exists or not
    return this.http.get<any[]>(`${this.api}?email=${user.email}`).pipe(
      tap((res) => {
        if (res.length) {
          throw new Error('User already exists');
        }
      }), 
      // If not exists, create new user
      tap(() => {
        return this.http.post(this.api, user).subscribe();
      })
    );
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
