import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ColorPickerCardContentComponent } from './color-picker-card-content.component';

describe('ColorPickerCardContentComponent', () => {
  let component: ColorPickerCardContentComponent;
  let fixture: ComponentFixture<ColorPickerCardContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ColorPickerCardContentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ColorPickerCardContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
