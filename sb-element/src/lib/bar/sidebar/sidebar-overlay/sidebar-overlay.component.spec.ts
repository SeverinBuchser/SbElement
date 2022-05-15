import { TestBed } from "@angular/core/testing";
import { SbBarModule } from "../../.";
import { SbSidebarOverlayComponent } from "./sidebar-overlay.component";


describe('SbSidebarOverlayComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SbBarModule]
    }).compileComponents();
  });

  it('should create the component', () => {
    const fixture = TestBed.createComponent(SbSidebarOverlayComponent);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });

  it('should have an inital side of "left"', () => {
    const fixture = TestBed.createComponent(SbSidebarOverlayComponent);
    const component = fixture.componentInstance;

    expect(component.side)
      .withContext('Expected side should be "left" on inital')
      .toBe('left');
  })

  it('should have a portalOutlet with no portal attached', () => {
    const fixture = TestBed.createComponent(SbSidebarOverlayComponent);
    fixture.detectChanges();
    const component = fixture.componentInstance;

    expect(component.portalOutelt)
      .withContext('Expected portalOutlet to exist')
      .toBeTruthy();

    expect(component.portalOutelt.hasAttached())
      .withContext('Expected portalOutlet to be empty')
      .toBe(false);
  })

  it('should have an underlay element with class "sb-sidebar-overlay__underlay"', () => {
    const fixture = TestBed.createComponent(SbSidebarOverlayComponent);
    fixture.detectChanges();
    const element = fixture.elementRef.nativeElement;
    expect(element.querySelector('.sb-sidebar-overlay__underlay'))
      .withContext('Expected the component to render an underlay container')
      .toBeTruthy()
  });

  it('should handle hiding of the component', () => {
    const fixture = TestBed.createComponent(SbSidebarOverlayComponent);
    fixture.detectChanges();
    const component = fixture.componentInstance;
    const element = fixture.elementRef.nativeElement;

    expect(component.visible)
      .withContext('Expected the visible property to be false on init')
      .toBe(false);

    component.trigger();

    expect(component.visible)
      .withContext('Expected the visible property to be set')
      .toBe(true)

    element.querySelector('.sb-sidebar-overlay__underlay')
      .dispatchEvent(new MouseEvent('click'));

    expect(component.visible)
      .withContext('Expected the visible property to be unset')
      .toBe(false)

    element.querySelector('.sb-sidebar-overlay__underlay')
      .dispatchEvent(new MouseEvent('click'));

    expect(component.visible)
      .withContext('Expected the visible property to still be unset')
      .toBe(false)
  })
});
