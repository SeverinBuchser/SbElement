import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndicatorExampleComponent } from './indicator-example.component';

describe('IndicatorExampleComponent', () => {
  let component: IndicatorExampleComponent;
  let fixture: ComponentFixture<IndicatorExampleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IndicatorExampleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IndicatorExampleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
