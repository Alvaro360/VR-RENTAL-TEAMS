import {Directive, Inject, Optional} from '@angular/core';
import {ControlContainer, NgForm} from '@angular/forms';

/**
 * https://github.com/angular/angular/issues/9600#issuecomment-317774127
 * In Angular Forms, a component with an input is not part of the parent form. To solve that, we have this
 * directive that injects the parent form to the component we put this directive in.
 */

@Directive({
  selector: '[vrProvideParentForm]',
  providers: [
    {
      provide: ControlContainer,
      useFactory: (form: NgForm) => form,
      deps: [[new Optional(), new Inject(NgForm)]]
    }
  ]
})
export class ProvideParentFormDirective {
}
