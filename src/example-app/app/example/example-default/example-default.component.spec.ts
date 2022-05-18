import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExampleDefaultComponent } from './example-default.component';

describe('ExampleDefaultComponent', () => {
  let component: ExampleDefaultComponent;
  let fixture: ComponentFixture<ExampleDefaultComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExampleDefaultComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExampleDefaultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
