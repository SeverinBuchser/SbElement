import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoreInputWrapperComponent } from './core-input-wrapper.component';

describe('CoreInputWrapperComponent', () => {
  let component: CoreInputWrapperComponent;
  let fixture: ComponentFixture<CoreInputWrapperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CoreInputWrapperComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CoreInputWrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
