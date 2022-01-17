import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoreInputComponent } from './core-input.component';

describe('CoreInputComponent', () => {
  let component: CoreInputComponent;
  let fixture: ComponentFixture<CoreInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CoreInputComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CoreInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
