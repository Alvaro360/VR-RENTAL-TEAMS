import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-password-input',
  templateUrl: './password-input.component.html',
  styleUrls: ['./password-input.component.scss']
})
export class PasswordInputComponent {
  fieldTextType: boolean;
  // TODO Mover componente al módulo shared
  constructor() { }

  toggleFieldTextType() {
    this.fieldTextType = !this.fieldTextType;
  }
}
