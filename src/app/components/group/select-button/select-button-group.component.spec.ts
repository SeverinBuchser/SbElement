import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectButtonGroupComponent } from './select-button-group.component';

describe('SelectComponent', () => {
  let component: SelectButtonGroupComponent;
  let fixture: ComponentFixture<SelectButtonGroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectButtonGroupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectButtonGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
