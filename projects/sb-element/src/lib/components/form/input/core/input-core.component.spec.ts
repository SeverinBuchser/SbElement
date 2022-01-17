import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputCoreComponent } from './input-core.component';

describe('CoreInputComponent', () => {
  let component: InputCoreComponent;
  let fixture: ComponentFixture<InputCoreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InputCoreComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InputCoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
