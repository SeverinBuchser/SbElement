import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BaseColorSizeInputComponent } from './base-color-size-input.component';

describe('BaseColorSizeInputComponent', () => {
  let component: BaseColorSizeInputComponent;
  let fixture: ComponentFixture<BaseColorSizeInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BaseColorSizeInputComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BaseColorSizeInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
