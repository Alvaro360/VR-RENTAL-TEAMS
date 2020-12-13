import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {LoginService} from '@modules/login/services/login.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class TopBarComponent implements OnInit {
  constructor(private loginService: LoginService,
              private router: Router) { }

  ngOnInit(): void {
  }

  logout(): void {
    this.loginService.logout();
    this.router.navigate(['main/pickem']);
  }

  isLogged(): boolean {
    return this.loginService.isLoggedIn();
  }
}
