import {Component, OnInit} from '@angular/core';
import {LoginService} from '@modules/login/services/login.service';
import {Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {I18nService} from '@modules/core/services/i18n.service';
import {Language} from '@models/language.model';
import {TranslateService} from '@ngx-translate/core';
import {ToastService} from '@services/toast.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  username: string;
  password: string;
  loading = false;
  submitted = false;
  loginForm: FormGroup;
  error = '';
  capsLock = false;
  fieldTextType: boolean;
  lastKeyPressed: string;
  selectedLanguage: Language;
  languages: Language[];

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
      this.router.navigate(['main']);
    }

    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      rememberMe: [''],
    });
  }

  get f() {
    return this.loginForm.controls;
  }

  async onSubmit(): Promise<void> {
    this.submitted = true;
    if (this.loginForm.invalid) {
      return;
    }
    this.loading = true;

    this.username = this.f.username.value;
    this.password = this.f.password.value;

    try {
      await this.loginService.login(this.username, this.password);
      this.router.navigate(['main']);
      this.toast.success('VR_SESSION_STARTED_SUCCESSFULLY');
    } catch (e) {
      this.loading = false;
    }
  }

  toggleFieldTextType() {
    this.fieldTextType = !this.fieldTextType;
  }

  openRegister(): void {
    this.router.navigate(['register']);
  }

  changeLanguage(): void {
    this.i18nService.updateLang(this.selectedLanguage.code);
  }
}
