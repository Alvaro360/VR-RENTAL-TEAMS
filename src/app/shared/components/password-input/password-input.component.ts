import {Component, EventEmitter, HostListener, Input, Output} from '@angular/core';
import {keyboardKeys} from '@modules/core/constants/keyboard-keys.constants';

@Component({
  selector: 'app-password-input',
  templateUrl: './password-input.component.html',
  styleUrls: ['./password-input.component.scss']
})
export class PasswordInputComponent {
  @Input() text: string;
  @Input() placeholder: string;
  @Input() class: string;
  @Input() id: string;
  @Input() name: string;
  @Input() type = 'text';
  @Input() disabled: boolean;
  @Input() required: boolean;
  @Input() tooltipPosition: string;
  @Input() tooltipText: string;
  @Input() tooltipIcon: string;
  @Input() rule: string;
  @Input() min: number;
  @Input() max: number;
  @Input() model: any;
  @Input() hideLabel = false;
  @Output() modelChange = new EventEmitter<any>();
  @Output() keyEnterPress = new EventEmitter<any>();
  capsLock = false;
  fieldTextType: boolean;
  lastKeyPressed: string;

  constructor() {
  }

  onChangeModel(model: any): void {
    // Back webservices do not accept empty model.
    if (model === '') {
      model = undefined;
    }

    this.modelChange.emit(this.model);
  }

  onClickArrow(addFlag: boolean): void {
    if (this.model || this.model === 0) {
      if (addFlag) {
        this.model += 1;
        this.onChangeModel(this.model);
      } else {
        this.model -= 1;
        this.onChangeModel(this.model);
      }
    } else {
      this.model = this.min || 0;
    }
  }

  checkMinMaxModel(number: number): number {
    if (!number && number !== 0) {
      return number;
    }

    if ((this.min || this.min === 0) && number < this.min) {
      return this.min;
    }

    if ((this.max || this.max === 0) && number > this.max) {
      return this.max;
    }

    return number;
  }

  @HostListener('keydown', ['$event'])
  async keyEvent(event: KeyboardEvent) {
    this.lastKeyPressed = event.key;

    if (this.type === 'password') {
      this.capsLock = event.getModifierState(keyboardKeys.CAPS_LOCK);
    }

    if (event.key === keyboardKeys.ENTER) {
      this.keyEnterPress.emit();
    }
  }

  @HostListener('mousewheel', ['$event'])
  onMousewheel(event: any) {
    if (event.wheelDelta > 0 && this.type === 'number' && (this.max || this.max == 0) && this.model == this.max
      || event.wheelDelta < 0 && this.type === 'number' && (this.min || this.min == 0) && this.model == this.min) {
      event.preventDefault();
      return;
    }
  }

  toggleFieldTextType() {
    this.fieldTextType = !this.fieldTextType;
  }
}
