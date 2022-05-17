import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SbSlidableOverlayContainerComponent } from './slidable-overlay-container';

describe('SbSlidableOverlayContainerComponent', () => {
  let component: SbSlidableOverlayContainerComponent;
  let fixture: ComponentFixture<SbSlidableOverlayContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SbSlidableOverlayContainerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SbSlidableOverlayContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
