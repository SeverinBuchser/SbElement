import { Overlay } from "@angular/cdk/overlay";
import { TestBed } from "@angular/core/testing";
import { NoopAnimationsModule } from "@angular/platform-browser/animations";
import { SbSidebarContainerComponent } from "./sidebar-container";
import { SbSidebarModule } from "./sidebar.module";

describe('SbSidebarContainerComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SbSidebarModule, NoopAnimationsModule],
      providers: [
        { provide: Overlay, useClass: Overlay }
      ]
    }).compileComponents();
  });

  it('should create the component', () => {
    const fixture = TestBed.createComponent(SbSidebarContainerComponent);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });

  it('should have no inital side class', () => {
    TestBed.createComponent(SbSidebarContainerComponent).detectChanges();

    const overlayContainerElement = document.querySelector('.sb-sidebar-container');
    expect(overlayContainerElement?.classList)
      .not.toContain('left');
    expect(overlayContainerElement?.classList)
      .not.toContain('right');
    expect(overlayContainerElement?.classList)
      .not.toContain('top');
    expect(overlayContainerElement?.classList)
      .not.toContain('bottom');
  });

  it('should update side class', () => {
    const fixture = TestBed.createComponent(SbSidebarContainerComponent)
    const component = fixture.componentInstance;
    fixture.detectChanges();

    const overlayContainerElement = document.querySelector('.sb-sidebar-container');
    expect(overlayContainerElement?.classList)
      .withContext('Expected container to not contain "left" class')
      .not.toContain('left');

    component.updateSide('left');

    expect(overlayContainerElement?.classList)
      .withContext('Expected container to contain "left" class after update')
      .toContain('left');

    component.updateSide('right');

    expect(overlayContainerElement?.classList)
      .withContext('Expected container to contain "right" class after update')
      .toContain('right');

    expect(overlayContainerElement?.classList)
      .withContext('Expected container not to contain "left" class anymore')
      .not.toContain('left');
  })

  it('should update side class when entering', () => {
    const fixture = TestBed.createComponent(SbSidebarContainerComponent)
    const component = fixture.componentInstance;
    fixture.detectChanges();

    component.enter('left');
    
    const overlayContainerElement = document.querySelector('.sb-sidebar-container');
    expect(overlayContainerElement?.classList)
      .withContext('Expected container to contain "left" class after update')
      .toContain('left');
  })
});