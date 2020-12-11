import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {LoginService} from '@modules/login/services/login.service';
import {Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Language} from '@models/language.model';
import {I18nService} from '@modules/core/services/i18n.service';
import {COUNTRIES} from '@constants/contries.constants';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class RegisterComponent implements OnInit {
  selectedLanguage: Language;
  languages: Language[];
  registerForm1: FormGroup;
  registerForm2: FormGroup;
  registerForm3: FormGroup;
  email: string;
  password: string;
  f1Visible: boolean;
  f2Visible: boolean;
  f3Visible: boolean;
  loading = false;
  submitted  = false;
  fieldTextType: boolean;
  countries = COUNTRIES;
  selectedResidenceCountry: any;

  constructor(private loginService: LoginService,
              private router: Router,
              private formBuilder: FormBuilder,
              private i18nService: I18nService,
              private translateService: TranslateService) {
    this.languages = [
      {name: 'Español', code: 'es'},
      {name: 'English', code: 'us'}
    ];
  }

  ngOnInit(): void {
    this.selectedLanguage = this.languages.find(lan => lan.code === this.translateService.currentLang);
    if (!this.selectedLanguage) {
      this.selectedLanguage =  {name: 'English', code: 'us'};
    }

    if (this.loginService.isLoggedIn()) {
      this.router.navigate(['home']);
    }

    this.registerForm1 = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(7)]],
      passwordConfirmed: ['', [Validators.required, Validators.minLength(7)]]
    });

    this.registerForm2 = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      birthday: ['', Validators.required],
      countryResidence: ['', Validators.required],
    });

    this.f1Visible = true;
    this.f2Visible = false;
    this.f3Visible = false;
  }

  get f1() {
    return this.registerForm1.controls;
  }

  get f2() {
    return this.registerForm2.controls;
  }

  get f3() {
    return this.registerForm3.controls;
  }

  onSubmitF1(): void {
    this.submitted = true;

    if (this.registerForm1.invalid) {
      return;
    }

    this.email = this.f1.email.value;
    this.password = this.f1.password.value;

    this.submitted = false;
    this.f1Visible = false;
    this.f2Visible = true;
  }

  onSubmitF2(): void {
    this.f2Visible = false;
    this.f3Visible = true;
  }

  onSubmitF3(): void {
    this.f3Visible = false;
  }

  onCancelRegister(): void {
    this.router.navigate(['login']);
  }

  changeLanguage(): void {
    this.i18nService.updateLang(this.selectedLanguage.code);
  }

  toggleFieldTextType() {
    this.fieldTextType = !this.fieldTextType;
  }
}
