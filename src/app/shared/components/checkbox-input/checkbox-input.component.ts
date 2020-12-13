import {Component, Input, OnInit, Output, EventEmitter, HostListener} from '@angular/core';
import {keyboardKeys} from '@modules/core/constants/keyboard-keys.constants';
import {FormGroup} from '@angular/forms';

@Component({
  selector: 'app-checkbox-input',
  templateUrl: './checkbox-input.component.html',
  styleUrls: ['./checkbox-input.component.scss']
})
export class CheckboxInputComponent {
  @Input() text: string;
  @Input() class: string;
  @Input() id: string;
  @Input() name: string;
  @Input() model: any;
  @Output() modelChange = new EventEmitter<any>();
  @Input() disabled: boolean;
  @Input() parentForm: FormGroup;
  private _checked;

  constructor() {
  }

  get checked() {
    return this._checked;
  }

  @Input()
  set checked(val) {
    if (val || val === '') {
      this.model = true;
    } else {
      this.model = false;
    }

    this.onChangeModel(this.model);
  }

  onChangeModel(model) {
    this.modelChange.emit(model);
  }

  @HostListener('keydown', ['$event'])
  keyEvent(event: KeyboardEvent) {
    if (event.key === keyboardKeys.ENTER) {
      this.model = !this.model;
      this.onChangeModel(this.model);
    }
  }
}
