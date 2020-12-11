import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';

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
              private toastr: ToastrService) {
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
    this.toastr.success('Hello world!', 'Toastr fun!');
    this.dialogVisible = true;
  }

  closeDialog(): void {
    this.dialogVisible = false;
  }
}
