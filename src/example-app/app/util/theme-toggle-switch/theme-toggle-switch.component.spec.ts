import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThemeToggleSwitchComponent } from './theme-toggle-switch.component';

describe('ThemeToggleSwitchComponent', () => {
  let component: ThemeToggleSwitchComponent;
  let fixture: ComponentFixture<ThemeToggleSwitchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ThemeToggleSwitchComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ThemeToggleSwitchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
