import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DatePickerPopperComponent } from './date-picker-popper.component';

describe('DatePickerPopperComponent', () => {
  let component: DatePickerPopperComponent;
  let fixture: ComponentFixture<DatePickerPopperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DatePickerPopperComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DatePickerPopperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
