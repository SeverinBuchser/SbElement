import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BaseThemeInputComponent } from './base-theme-input.component';

describe('BaseThemeInputComponent', () => {
  let component: BaseThemeInputComponent;
  let fixture: ComponentFixture<BaseThemeInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BaseThemeInputComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BaseThemeInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
