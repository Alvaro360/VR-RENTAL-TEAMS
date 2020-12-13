import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {LoginService} from '@modules/login/services/login.service';
import {Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Language} from '@models/language.model';
import {I18nService} from '@modules/core/services/i18n.service';
import {COUNTRIES} from '@constants/contries.constants';
import {TranslateService} from '@ngx-translate/core';
import {genders} from '@modules/core/constants/gender.constants';
import {ToastService} from '@services/toast.service';

class UserRegister {
  birthdate: number;
  countryOfResidence: string;
  email: string;
  firstName: string;
  gender: string;
  lastName: string;
  nationality: string;
  password: string;
  role: string[];
  username: string;
}

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
  passwordConfirmed: string;
  f1Visible: boolean;
  f2Visible: boolean;
  f3Visible: boolean;
  confirmVisible: boolean;
  loading = false;
  submitted  = false;
  fieldTextType: boolean;
  countries = COUNTRIES;
  selectedResidenceCountry: any;
  firstName: string;
  lastName: string;
  birthday: Date;
  countryResidence: any;
  username: string;
  nationality: any;
  selectedNationality: any;
  pronoun: any;
  genders = genders;
  selectedGender: any;
  aceptTerms: boolean;

  constructor(private loginService: LoginService,
              private router: Router,
              private formBuilder: FormBuilder,
              private i18nService: I18nService,
              private translateService: TranslateService,
              private toast: ToastService) {
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
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(7)]],
      passwordConfirmed: ['', [Validators.required,
        Validators.minLength(7)]]
    }, {
      validator: this.mustMatch('password', 'passwordConfirmed')
    });

    this.registerForm2 = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      birthday: [null, Validators.required],
      countryResidence: ['', Validators.required],
    });

    this.registerForm3 = this.formBuilder.group({
      username: ['', Validators.required],
      nationality: ['', Validators.required],
      pronoun: ['', Validators.required],
      agree: [null, Validators.requiredTrue]
    });

    this.f1Visible = true;
    this.f2Visible = false;
    this.f3Visible = false;
    this.confirmVisible = false;
  }

  mustMatch(controlName: string, matchingControlName: string): any {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];

      if (matchingControl.errors && !matchingControl.errors.mustMatch) {
        // return if another validator has already found an error on the matchingControl
        return;
      }

      // set error on matchingControl if validation fails
      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ mustMatch: true });
      } else {
        matchingControl.setErrors(null);
      }
    }
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

    this.password = this.f1.password.value;
    this.passwordConfirmed = this.f1.passwordConfirmed.value;
    if (this.password !== this.passwordConfirmed) {
      return;
    }
    this.submitted = false;

    this.email = this.f1.email.value;
    this.f1Visible = false;
    this.f2Visible = true;
  }

  onSubmitF2(): void {
    this.submitted = true;
    if (this.registerForm2.invalid) {
      return;
    }

    this.firstName = this.f2.firstName.value;
    this.lastName = this.f2.lastName.value;
    this.birthday = this.f2.birthday.value;
    this.countryResidence = this.f2.countryResidence.value;

    this.submitted = false;
    this.f2Visible = false;
    this.f3Visible = true;
  }

  async onSubmitF3(): Promise<void> {
    this.submitted = true;
    if (this.registerForm3.invalid) {
      return;
    }

    this.username = this.f3.username.value;
    this.nationality = this.f3.nationality.value;
    this.pronoun = this.f3.pronoun.value;

    this.submitted = false;
    this.f3Visible = false;

    const user = new UserRegister();
    user.birthdate = this.parseDateToMs(this.birthday);
    user.countryOfResidence = this.countryResidence.code;
    user.email = this.email;
    user.firstName = this.firstName;
    user.gender = this.selectedGender.value;
    user.lastName = this.lastName;
    user.nationality = this.nationality.code;
    user.password  = this.password;
    user.role = ['user'];
    user.username = this.username

    await this.loginService.signUp(user);

    this.confirmVisible = true;
  }

  parseDateToMs(date: Date): number {
    if (!date) {
      return;
    }

    return date.getTime();
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

  async login(): Promise<void> {
    await this.loginService.login(this.username, this.password);
    this.router.navigate(['main']);
    this.toast.success('VR_SESSION_STARTED_SUCCESSFULLY');
  }

  back(): void {
    if (this.f2Visible) {
      this.f1Visible = true;
      this.f2Visible = false;
    } else {
      this.f2Visible = true;
      this.f3Visible = false;
    }
  }
}
