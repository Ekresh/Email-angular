import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

interface IsUsernameUniqeResponse {
  available: boolean;
} 

interface SignupCredentials {
  username: string;
  password: string;
  passwordConfirmation: string;
}

interface SignupResponse {
  username: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isSignedIn$ = new BehaviorSubject(false);

  constructor(private http: HttpClient) { }

  isUsernameUniqe(username: string) {
    return this.http.post<IsUsernameUniqeResponse>(`${environment.API_URL}/auth/username`, {username});
  }

  signup(credentials: SignupCredentials) {
    return this.http.post<SignupResponse>(`${environment.API_URL}/auth/signup`, credentials, {
      withCredentials: true
    })
    .pipe(
      tap(() => this.isSignedIn$.next(true))
    );
  }
}
