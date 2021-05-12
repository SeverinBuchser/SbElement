import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BaseThemeSizeInputComponent } from './base-theme-size-input.component';

describe('BaseThemeSizeInputComponent', () => {
  let component: BaseThemeSizeInputComponent;
  let fixture: ComponentFixture<BaseThemeSizeInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BaseThemeSizeInputComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BaseThemeSizeInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
