import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoubleSpinnerComponent } from './double-spinner.component';

describe('DoubleSpinnerComponent', () => {
  let component: DoubleSpinnerComponent;
  let fixture: ComponentFixture<DoubleSpinnerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DoubleSpinnerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DoubleSpinnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
