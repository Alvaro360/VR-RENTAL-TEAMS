import { Component, OnInit } from '@angular/core';
import {MenuItem} from 'primeng/api';
import {TranslateService} from '@ngx-translate/core';
import {DispatcherService} from '@modules/core/services/dispatcher.service';

@Component({
  selector: 'app-nav-side-bar',
  templateUrl: './nav-side-bar.component.html',
  styleUrls: ['./nav-side-bar.component.scss']
})
export class NavSideBarComponent implements OnInit {
  observerKey = 'nav-sidebar';
  collapsed = false;
  items: MenuItem[];

  constructor(private dispatcher: DispatcherService,
              private translateService: TranslateService) { }

  ngOnInit(): void {
    this.setItems();
    this.dispatcher.register('toggle-nav-sidebar', () => this.onToggleNavSidebar(), this.observerKey);
  }
  async setItems(): Promise<void> {
    /*const donorsText = await this.translateService.get('RVB_DONORS').toPromise();
    const donorsManagementText = this.translateService.instant('RVB_DONORS_MANAGEMENT');
    const donorsImportText = this.translateService.instant('RVB_DONORS_IMPORT');*/
    this.items = [
      {
        label: 'File',
        icon: 'pi pi-pw pi-file',
        items: [{
          label: 'New',
          icon: 'pi pi-fw pi-plus',
          items: [
            {label: 'User', icon: 'pi pi-fw pi-user-plus'},
            {label: 'Filter', icon: 'pi pi-fw pi-filter'}
          ]
        },
          {label: 'Open', icon: 'pi pi-fw pi-external-link'},
          {separator: true},
          {label: 'Quit', icon: 'pi pi-fw pi-times'}
        ]
      },
      {
        label: 'Edit',
        icon: 'pi pi-fw pi-pencil',
        items: [
          {label: 'Delete', icon: 'pi pi-fw pi-trash'},
          {label: 'Refresh', icon: 'pi pi-fw pi-refresh'}
        ]
      },
      {
        label: 'Help',
        icon: 'pi pi-fw pi-question',
        items: [
          {
            label: 'Contents',
            icon: 'pi pi-pi pi-bars'
          },
          {
            label: 'Search',
            icon: 'pi pi-pi pi-search',
            items: [
              {
                label: 'Text',
                items: [
                  {
                    label: 'Workspace'
                  }
                ]
              },
              {
                label: 'User',
                icon: 'pi pi-fw pi-file',
              }
            ]}
        ]
      },
      {
        label: 'Actions',
        icon: 'pi pi-fw pi-cog',
        items: [
          {
            label: 'Edit',
            icon: 'pi pi-fw pi-pencil',
            items: [
              {label: 'Save', icon: 'pi pi-fw pi-save'},
              {label: 'Update', icon: 'pi pi-fw pi-save'},
            ]
          },
          {
            label: 'Other',
            icon: 'pi pi-fw pi-tags',
            items: [
              {label: 'Delete', icon: 'pi pi-fw pi-minus'}
            ]
          }
        ]
      }
    ];
  }
  checkActiveState(givenLink): boolean {
    return window.location.pathname.includes(givenLink);
  }

  onToggleNavSidebar(): void {
    this.collapsed = !this.collapsed;
  }

}
