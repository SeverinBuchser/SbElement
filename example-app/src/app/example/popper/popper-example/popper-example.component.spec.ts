import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopperExampleComponent } from './popper-example.component';

describe('PopperExampleComponent', () => {
  let component: PopperExampleComponent;
  let fixture: ComponentFixture<PopperExampleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PopperExampleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PopperExampleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
