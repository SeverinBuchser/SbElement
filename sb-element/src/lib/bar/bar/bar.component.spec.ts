import { TestBed } from "@angular/core/testing";
import { Color } from "../../core";
import { SbBarComponent } from "./bar.component";

describe('SbBarComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        SbBarComponent
      ],
    }).compileComponents();
  });

  it('should create the component', () => {
    const fixture = TestBed.createComponent(SbBarComponent);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });

  it('should have as side "left"', () => {
    const fixture = TestBed.createComponent(SbBarComponent);
    const component = fixture.componentInstance;
    expect(component.side).toEqual('left');
  });

  it('should not have a color', () => {
    const fixture = TestBed.createComponent(SbBarComponent);
    const component = fixture.componentInstance;
    expect(component.color).toBeUndefined();
  });

  it('should have as classes "sb-bar" and "left"', () => {
    const fixture = TestBed.createComponent(SbBarComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    expect(compiled.classList.contains('sb-bar')).toBe(true)
    expect(compiled.classList.contains('left')).toBe(true)
  });

  it('should change side from "left" to "right"', () => {
    const fixture = TestBed.createComponent(SbBarComponent);
    fixture.detectChanges();
    const component = fixture.componentInstance;
    const compiled = fixture.nativeElement;
    expect(compiled.classList.contains('left')).toBe(true)
		component.side = 'right';
    fixture.detectChanges();
    expect(compiled.classList.contains('right')).toBe(true)
  });

  it('should have color "primary"', () => {
    const fixture = TestBed.createComponent(SbBarComponent);
    const component = fixture.componentInstance;
    const compiled = fixture.nativeElement;
		component.color = Color.PRIMARY;
    fixture.detectChanges();
    expect(compiled.classList.contains('sb--primary')).toBe(true)
  });
});
