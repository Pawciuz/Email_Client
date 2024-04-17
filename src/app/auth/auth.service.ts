import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, tap } from 'rxjs';

interface UsernameAvailableResponse {
  available: boolean;
}

export interface SignupCredentials {
  username: string;
  password: string;
  passwordConfirmation: string;
}

interface SignupResponse {
  username: string;
}

interface SignedInResponse {
  authenticated: boolean;
  username: string;
}

export interface SignInCredentials {
  username: string;
  password: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  url = 'https://api.angular-email.com';
  signedIn$ = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient) {}

  usernameAvailable(username: string) {
    return this.http.post<UsernameAvailableResponse>(
      `${this.url}/auth/username`,
      {
        username,
      },
    );
  }

  signup(credentials: SignupCredentials) {
    return this.http
      .post<SignupResponse>(`${this.url}/auth/signup`, credentials)
      .pipe(
        tap((val) => {
          this.signedIn$.next(true);
        }),
      );
  }

  checkAuth() {
    return this.http.get<SignedInResponse>(`${this.url}/auth/signedin`).pipe(
      tap(({ authenticated }) => {
        if (authenticated) {
          this.signedIn$.next(true);
        }
      }),
    );
  }

  signOut() {
    return this.http.post(`${this.url}/auth/signout`, {}).pipe(
      tap(() => {
        this.signedIn$.next(false);
      }),
    );
  }

  signin(credentials: SignInCredentials) {
    return this.http.post(`${this.url}/auth/signin`, credentials).pipe(
      tap(() => {
        this.signedIn$.next(true);
      }),
    );
  }
}
