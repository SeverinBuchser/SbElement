import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopperTestComponent } from './popper-test.component';

describe('PopperTestComponent', () => {
  let component: PopperTestComponent;
  let fixture: ComponentFixture<PopperTestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PopperTestComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PopperTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
