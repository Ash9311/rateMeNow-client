import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http"
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RateMeNowService {
  // private apiUrl = 'https://rate-me-now-server.vercel.app/api/v1'
  private apiUrl = 'http://localhost:4000/api/v1'
  constructor(private http: HttpClient) { }

  signUp(firstName: string, lastName: string, username: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/user/signup`, { firstName, lastName, username, password })
  }

  signIn(username: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/user/signin`, { username, password })
  }

  getBulkUsers(headers?: HttpHeaders, filter?: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/user/bulk?filter=${filter}`, { headers })
  }

  submitRating(userId: string, ratings: any, headers?: HttpHeaders): Observable<any> {
    return this.http.post(`${this.apiUrl}/account/submitRating`, { userId, ratings, headers });
  }

  getUserRatingDetails(userId: string, headers?: HttpHeaders): Observable<any> {
    return this.http.get(`${this.apiUrl}/account/userDetails?userId=${userId}`, { headers })
  }
}
