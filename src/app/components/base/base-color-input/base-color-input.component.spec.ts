import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BaseColorInputComponent } from './base-color-input.component';

describe('BaseColorInputComponent', () => {
  let component: BaseColorInputComponent;
  let fixture: ComponentFixture<BaseColorInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BaseColorInputComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BaseColorInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
