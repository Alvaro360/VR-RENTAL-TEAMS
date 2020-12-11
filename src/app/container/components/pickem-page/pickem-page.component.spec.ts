import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PickemPageComponent } from './pickem-page.component';

describe('PickemPageComponent', () => {
  let component: PickemPageComponent;
  let fixture: ComponentFixture<PickemPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PickemPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PickemPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
