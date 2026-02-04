import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
<<<<<<< HEAD
import { switchMap, tap } from 'rxjs/operators';
import { throwError } from 'rxjs';
=======
import { tap } from 'rxjs/operators';
>>>>>>> da613fa8b1cd79a0137dd58c041f27da24aedfdb

@Injectable({
  providedIn: 'root',
})
export class Auth {
  private api = environment.apiUrl + '/users';

<<<<<<< HEAD
  constructor(private http: HttpClient) { }
=======
  constructor(private http: HttpClient) {}
>>>>>>> da613fa8b1cd79a0137dd58c041f27da24aedfdb

  //login
  login(email: string, password: string) {
    // JSON server filter query
    return this.http.get<any[]>(`${this.api}?email=${email}&password=${password}`).pipe(
      // if user found -> save automatically
      tap((res) => {
        if (res.length) {
<<<<<<< HEAD
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
        return this.http.post(this.api, user);
=======
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
>>>>>>> da613fa8b1cd79a0137dd58c041f27da24aedfdb
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
