import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopperComponent } from './popper.component';

describe('PopperTestComponent', () => {
  let component: PopperComponent;
  let fixture: ComponentFixture<PopperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PopperComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PopperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});