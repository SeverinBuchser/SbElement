import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SBComponent } from './sb.component';

describe('SBComponent', () => {
  let component: SBComponent;
  let fixture: ComponentFixture<SBComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SBComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SBComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
