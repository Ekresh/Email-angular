import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  isUsernameUniqe(username: string) {
    return this.http.post<{ available: boolean }>(`${environment.API_URL}/auth/username`, {username})
  }
}
