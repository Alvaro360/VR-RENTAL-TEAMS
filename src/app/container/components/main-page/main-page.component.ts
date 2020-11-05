import { Component, OnInit } from '@angular/core';
import {LoginService} from '@services/login.service';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit {

  constructor(private loginService: LoginService) { }

  ngOnInit(): void {
    // console.log(this.signUp());
  }

 async signUp(): Promise<void> {
    await this.loginService.signUp();
 }
}
