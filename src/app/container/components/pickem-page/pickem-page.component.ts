import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {LoginService} from '@modules/login/services/login.service';

@Component({
  selector: 'app-pickem-page',
  templateUrl: './pickem-page.component.html',
  styleUrls: ['./pickem-page.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PickemPageComponent implements OnInit {
  countries: any[];
  selectedCountry: any;
  dialogVisible = false;

  constructor(private router: Router,
              private toastr: ToastrService,
              private loginService: LoginService) {
    this.dialogVisible = false;
    this.countries = [
      {name: 'Guillermo Castilla', code: 'AU'},
      {name: 'Antonio Cano', code: 'BR'},
      {name: 'Rubén Yanguas', code: 'CN'},
      {name: 'Álvaro Buedo', code: 'CN'},
    ];
  }

  ngOnInit(): void {
  }

  sendPickEm(): void {
    this.dialogVisible = true;

    if (this.isLogged()) {
      this.toastr.success('Hello world!', 'Toastr fun!');
    }
  }

  closeDialog(): void {
    this.dialogVisible = false;
  }

  isLogged(): boolean {
    return this.loginService.isLoggedIn();
  }
}
