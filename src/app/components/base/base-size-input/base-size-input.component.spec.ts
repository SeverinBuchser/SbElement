import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BaseSizeInputComponent } from './base-size-input.component';

describe('BaseSizeInputComponent', () => {
  let component: BaseSizeInputComponent;
  let fixture: ComponentFixture<BaseSizeInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BaseSizeInputComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BaseSizeInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
