import { TestBed } from "@angular/core/testing";
import { SbContentPaginationDirective } from "../../paginator";
import { SbBarModule } from "..";
import { SbNavBarComponent } from "./nav-bar.component";
import { NavBarHarnessTest } from "./testing/nav-bar-harness.component";

describe('SbNavBarComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        SbContentPaginationDirective,
        NavBarHarnessTest
      ],
      imports: [
        SbBarModule
      ]
    }).compileComponents();
  });

  it('should create the component', () => {
    const fixture = TestBed.createComponent(SbNavBarComponent);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });

  it(`should have an empty querylist as contents and paginations`, () => {
    const fixture = TestBed.createComponent(SbNavBarComponent);
    const component = fixture.componentInstance;
    expect(component.contents.length).toBe(0);
    expect(component.paginations.length).toBe(0);
  });

  it(`should have an empty querylist as contents and paginations`, () => {
    const fixture = TestBed.createComponent(SbNavBarComponent);
    fixture.detectChanges();
    const component = fixture.componentInstance;
    expect(component.contents.length).toBe(0);
    expect(component.paginations.length).toBe(0);
  });

  it(`should have two contents after content init`, () => {
    const fixture = TestBed.createComponent(NavBarHarnessTest);
    fixture.detectChanges();
    const component = fixture.componentInstance.component;
    expect(component.contents.length).toBe(2);
    expect(component.paginations.length).toBe(1);
  })
});
