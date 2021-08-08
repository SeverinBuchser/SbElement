import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopoverOutletComponent } from './popover-outlet.component';

describe('PopoverOutletComponent', () => {
  let component: PopoverOutletComponent;
  let fixture: ComponentFixture<PopoverOutletComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PopoverOutletComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PopoverOutletComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
