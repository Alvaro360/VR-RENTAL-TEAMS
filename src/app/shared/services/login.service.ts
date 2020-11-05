import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }

  signUp(): Promise<any> {
    const user = {
      'email': 'pruebaeeeee@gmail.com',
      'password': 'eeeeeeee',
      'role': ['admin'],
      'username': 'UEEE'
    };
    const url = '/api/auth/signup';
    return this.http.post<any>(url, user).toPromise();
  }
}
