import { Overlay } from "@angular/cdk/overlay";
import { TestBed } from "@angular/core/testing";
import { NoopAnimationsModule } from "@angular/platform-browser/animations";
import { SbSidebarComponent } from "./sidebar";
import { SbSidebarModule } from "./sidebar.module";

describe('SbSidebarComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SbSidebarModule, NoopAnimationsModule],
      providers: [
        { provide: Overlay, useClass: Overlay }
      ]
    }).compileComponents();
  });

  it('should create the component', () => {
    const fixture = TestBed.createComponent(SbSidebarComponent);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });

  it('should create sidebar overlay', () => {
    TestBed.createComponent(SbSidebarComponent);
    const overlayElement = document.querySelector('.cdk-overlay-container');
    expect(overlayElement)
      .withContext('Expected overlay element to be created')
      .toBeTruthy();
  });

  it('should have inital side of "left"', () => {
    const fixture = TestBed.createComponent(SbSidebarComponent);
    const component = fixture.componentInstance;

    expect(component.side)
      .withContext('Expected the inital side to be "left"')
      .toBe('left');
  });

  it('should switch side when side is updated', () => {
    const fixture = TestBed.createComponent(SbSidebarComponent);
    const component = fixture.componentInstance;
    fixture.autoDetectChanges();
    component.trigger();

    const overlayContainerElement = document.querySelector('.sb-sidebar-container');
    expect(overlayContainerElement?.classList)
      .withContext('Expected the overlay container to have an inital position of "left')
      .toContain('left');

    component.side = 'right';
    component.ngOnChanges({side: {firstChange: false}});

    expect(overlayContainerElement?.classList)
      .withContext('Expected the overlay container to switch side to "right"')
      .toContain('right');

    component.trigger();
    component.side = 'left';
    component.ngOnChanges({side: {firstChange: false}});

    expect(overlayContainerElement?.classList)
      .withContext('Expected the container to also switch side when hidden')
      .toContain('left');
  })

  it('should be able to attach to four sides', () => {
    const fixture = TestBed.createComponent(SbSidebarComponent);
    const component = fixture.componentInstance;
    fixture.autoDetectChanges();
    const overlayContainerElement = document.querySelector('.sb-sidebar-container');

    component.side = 'right';
    component.ngOnChanges({side: {firstChange: false}});

    expect(overlayContainerElement?.classList)
      .withContext('Expected the container to be on right side')
      .toContain('right');

    component.side = 'left';
    component.ngOnChanges({side: {firstChange: false}});

    expect(overlayContainerElement?.classList)
      .withContext('Expected the container to be on left side')
      .toContain('left');

    component.side = 'top';
    component.ngOnChanges({side: {firstChange: false}});

    expect(overlayContainerElement?.classList)
      .withContext('Expected the container to be on top side')
      .toContain('top');

    component.side = 'bottom';
    component.ngOnChanges({side: {firstChange: false}});

    expect(overlayContainerElement?.classList)
      .withContext('Expected the container to be on bottom side')
      .toContain('bottom');
  })

  it('should not have an attached overlay template portal after init', () => {
    const fixture = TestBed.createComponent(SbSidebarComponent);
    const component = fixture.componentInstance;

    expect(component.overlayPortal)
      .withContext('Expected overlayPortal to exist')
      .toBeTruthy();

    expect(component.overlayPortal.isAttached)
      .withContext('Expected overlayPortal not to be attached')
      .toBe(false);
  });

  it('should show overlay after trigger', () => {
    const fixture = TestBed.createComponent(SbSidebarComponent);
    const component = fixture.componentInstance;
    fixture.detectChanges();

    component.trigger();
    const overlayContainerElement = document.querySelector('.sb-sidebar-container');

    expect(component.visible)
      .withContext('Expected sidebar to be visible')
      .toBe(true);

    expect(overlayContainerElement)
      .withContext('Expected overlay container to exist')
      .toBeTruthy();

    expect(overlayContainerElement!.classList)
      .withContext('Expected overlay container to have the "left" class')
      .toContain('left');
  });

  it('should hide overlay again', () => {
    const fixture = TestBed.createComponent(SbSidebarComponent);
    const component = fixture.componentInstance;
    fixture.detectChanges();

    component.trigger();
    component.visible = false;

    expect(component.visible)
      .withContext('Expected sidebar not to be visible')
      .toBe(false);
  })
});