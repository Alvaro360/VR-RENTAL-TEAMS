import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {VRSession} from '@modules/login/models/vr-session.model';

class LoginUser {
  password: string;
  username: string;
  rememberMe: boolean;

  constructor(username: string, password: string) {
    this.username = username;
    this.password = password;
  }
}

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  authorization: string;
  SESSION_OBJECT_KEY = 'auth';
  AUTHORIZATION_KEY = 'authorization';

  constructor(private http: HttpClient) { }

  async signUp(user: any): Promise<any> {
    const url = '/api/auth/signup';
    return this.http.post<any>(url, user).toPromise();
  }

  async login(username: string, password: string): Promise<void> {
    const user = new LoginUser(username, password);
    const url = '/api/auth/signin';
    const auth: VRSession = await this.http.post<VRSession>(url, user).toPromise();
    this.setLoggedUser(auth);
    this.setAuthorization(auth.accessToken);
  }

  logout(): void {
    localStorage.removeItem(this.AUTHORIZATION_KEY);
    localStorage.removeItem(this.SESSION_OBJECT_KEY);
  }

  setLoggedUser(auth: VRSession) {
    localStorage.setItem(this.SESSION_OBJECT_KEY, JSON.stringify(auth));
  }

  getLoggedUser(): VRSession {
    return JSON.parse(localStorage.getItem((this.SESSION_OBJECT_KEY)));
  }

  public getAuthorization(): string {
    if (!this.authorization) {
      this.authorization = localStorage.getItem(this.AUTHORIZATION_KEY);
    }

    return this.authorization;
  }

  public setAuthorization(auth: string): void {
    this.authorization = auth;
    if (!auth) {
      localStorage.removeItem(this.AUTHORIZATION_KEY);
    } else {
      localStorage.setItem(this.AUTHORIZATION_KEY, auth);
    }
  }

  isLoggedIn(): boolean {
    return !!(localStorage.getItem(this.AUTHORIZATION_KEY) && this.getLoggedUser());
  }
}
