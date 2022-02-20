import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendarMonthsComponent } from './calendar-months.component';

describe('CalendarMonthsComponent', () => {
  let component: CalendarMonthsComponent;
  let fixture: ComponentFixture<CalendarMonthsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CalendarMonthsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CalendarMonthsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
