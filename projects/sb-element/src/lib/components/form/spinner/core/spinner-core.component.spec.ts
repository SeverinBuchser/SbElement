import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpinnerCoreComponent } from './spinner-core.component';

describe('SpinnerCoreComponent', () => {
  let component: SpinnerCoreComponent;
  let fixture: ComponentFixture<SpinnerCoreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpinnerCoreComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SpinnerCoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
