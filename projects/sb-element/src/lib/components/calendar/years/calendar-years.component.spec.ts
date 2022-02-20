import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendarYearsComponent } from './calendar-years.component';

describe('CalendarYearsComponent', () => {
  let component: CalendarYearsComponent;
  let fixture: ComponentFixture<CalendarYearsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CalendarYearsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CalendarYearsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
