import { fakeAsync, TestBed, tick } from "@angular/core/testing";
import { SbOverlayService } from "../core";
import { SbBarModule } from "../.";
import { SbSidebarComponent } from "./sidebar";
import { SidebarHarnessTest } from "./testing/sidebar-harness.component";
import { EventEmitter, Injectable, NgZone, Type } from "@angular/core";

let overlayServiceStub: Partial<SbOverlayService>;

@Injectable()
export class MockNgZone extends NgZone {
  override readonly onStable = new EventEmitter(false);

  constructor() {
    super({enableLongStackTrace: false});
  }

  override run(fn: Function): any {
    return fn();
  }

  override runOutsideAngular(fn: Function): any {
    return fn();
  }

  simulateZoneExit(): void {
    this.onStable.emit(null);
  }
}

describe('SbSidebarComponent', () => {
  beforeEach(async () => {
    overlayServiceStub = {
      create: (componentType: Type<any>) => TestBed.createComponent(componentType).componentRef
    }
    await TestBed.configureTestingModule({
      declarations: [SidebarHarnessTest],
      imports: [SbBarModule],
      providers: [
        { provide: SbOverlayService, useValue: overlayServiceStub },
        { provide: NgZone, useClass: MockNgZone }
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
    const overlayElement = document.querySelector('.sb-sidebar-overlay');
    expect(overlayElement)
      .withContext('Expected sidebar overlay element to be created')
      .toBeTruthy();
  });

  it('should have inital side of "left"', () => {
    const fixture = TestBed.createComponent(SbSidebarComponent);
    fixture.ngZone!.onStable.emit();
    const component = fixture.componentInstance;

    expect(component.side)
      .withContext('Expected the inital side to be "left"')
      .toBe('left');

  });

  it('should have an attached overlay template portal', () => {
    const fixture = TestBed.createComponent(SbSidebarComponent);
    fixture.ngZone!.onStable.emit();
    const component = fixture.componentInstance;

    expect(component.overlayPortal)
      .withContext('Expected overlayPortal to exist')
      .toBeTruthy();

    expect(component.overlayPortal.isAttached)
      .withContext('Expected overlayPortal to be attached')
      .toBe(true);
  });

  it('should show overlay after trigger', fakeAsync(() => {
    const fixture = TestBed.createComponent(SbSidebarComponent);
    fixture.ngZone!.onStable.emit();
    const component = fixture.componentInstance;
    fixture.detectChanges();

    component.trigger();
    tick(10)

    const overlayElement = document.querySelector('.sb-sidebar-overlay');
    expect(overlayElement!.classList)
      .withContext('Expected overlay element not to have "sb--hidden" class anymore')
      .not.toContain('sb--hidden');

    expect(overlayElement!.classList)
      .withContext('Expected overlay element to have "sb--visible" class')
      .toContain('sb--visible');
  }));
});
