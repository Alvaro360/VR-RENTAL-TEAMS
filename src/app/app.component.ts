import { Component } from '@angular/core';
import {I18nService} from '@modules/core/services/i18n.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'VR-Rental-Teams';

  constructor(i18nService: I18nService) {
    i18nService.setLang();
  }
}
