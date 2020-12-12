import { Component, OnInit } from '@angular/core';
import {LoginService} from '@modules/login/services/login.service';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.scss']
})
export class TopBarComponent implements OnInit {
  constructor(private loginService: LoginService) { }

  ngOnInit(): void {
  }

  logout(): void {
    this.loginService.logout();
  }

  isLogged(): boolean {
    return this.loginService.isLoggedIn();
  }
}
