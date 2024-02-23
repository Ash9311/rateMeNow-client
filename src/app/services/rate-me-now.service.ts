import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http"
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class RateMeNowService {
  private apiUrl = 'http://localhost:4000/api/v1'
  constructor(private http: HttpClient) { }

  signUp(firstName: string, lastName: string, username: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/user/signup`, { firstName, lastName, username, password })
  }

  signIn(username: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/user/signin`, { username, password })
  }
}
