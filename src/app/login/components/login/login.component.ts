import { Component, OnInit } from '@angular/core';
import {LoginService} from '@modules/login/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  username: string;
  password: string;
  constructor(private loginService: LoginService) { }

  ngOnInit(): void {
  }

  async onSubmit(): Promise<void> {
    await this.loginService.login(this.username, this.password);
  }
}
