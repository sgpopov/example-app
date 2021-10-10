import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { LoginData } from './login-data';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl = environment.apiUrl;
  private sessionStorageKey = 'authToken';

  private loggedIn = new BehaviorSubject<boolean>(this.tokenAvailable());

  constructor(private router: Router, private http: HttpClient) {}

  get isLoggedIn() {
    return this.loggedIn.asObservable();
  }

  private tokenAvailable(): boolean {
    return !!sessionStorage.getItem(this.sessionStorageKey);
  }

  public login(data: LoginData): Observable<void> {
    return this.http
      .post(`${this.baseUrl}/authenticate`, {
        username: data.username,
        password: data.password,
      })
      .pipe(
        map(() => {
          sessionStorage.setItem(this.sessionStorageKey, 'true');

          this.loggedIn.next(true);
        }),
      );
  }

  public logout() {
    sessionStorage.removeItem(this.sessionStorageKey);

    this.loggedIn.next(false);
    this.router.navigate(['/login']);
  }
}
