import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { environment } from '../../environments/environment';

export interface AuthResponse {
  token: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = environment.apiUrl + '/auth';
  private loggedIn = new BehaviorSubject<boolean>(false);
  isLoggedIn$ = this.loggedIn.asObservable();

  constructor(private http: HttpClient) { }

  register(username: string, password: string): Observable<string> {
    return this.http.post(`${this.apiUrl}/register`, { username, password }, { responseType: 'text' });
  }

  login(username: string, password: string): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/login`, { username, password });
  }

  setSession(token: string): void {
    localStorage.setItem('token', token);
    this.loggedIn.next(true);
  }

  logout(): void {
    localStorage.removeItem('token');
    this.loggedIn.next(false);
  }

  isAuthenticated(): boolean {
    // Tarayıcı ortamında çalışıyorsa localStorage mevcuttur
    if (typeof window !== 'undefined' && window.localStorage) {
      return !!localStorage.getItem('token');
    }
    // Sunucu ortamında (SSR) false döndürmek güvenli bir seçenek olabilir
    return false;
  }
  
}
