import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimelineExampleComponent } from './timeline-example.component';

describe('TimelineExampleComponent', () => {
  let component: TimelineExampleComponent;
  let fixture: ComponentFixture<TimelineExampleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TimelineExampleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TimelineExampleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
