import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotificationExampleComponent } from './notification-example.component';

describe('NotificationExampleComponent', () => {
  let component: NotificationExampleComponent;
  let fixture: ComponentFixture<NotificationExampleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NotificationExampleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NotificationExampleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
