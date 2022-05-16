import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SlidableContainerComponent } from './slidable-container.component';

describe('SlidableContainerComponent', () => {
  let component: SlidableContainerComponent;
  let fixture: ComponentFixture<SlidableContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SlidableContainerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SlidableContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
