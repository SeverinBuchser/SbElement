import { Component, ElementRef, Input, ViewEncapsulation } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Color, mixinClassName, mixinColor, mixinDisable, mixinFocus, mixinSize, mixinTheme, Size, SbThemeService } from '../../../core';

const SbSliderCore = mixinDisable(
  mixinFocus(
    mixinSize(
      mixinColor(
        mixinTheme(
          mixinClassName(
            class {
              constructor(
                public _elementRef: ElementRef,
                public _themeService: SbThemeService) {}
            }, 'sb-slider'
          )
        ), Color.PRIMARY
      ), Size.DEFAULT
    )
  )
);

@Component({
  selector: 'sb-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss'],
  encapsulation: ViewEncapsulation.None,
  inputs: [
    'size',
    'color',
    'disabled'
  ],
  outputs: [
    'focus',
    'blur'
  ],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: SbSliderComponent,
    multi: true
  }]
})
export class SbSliderComponent extends SbSliderCore implements ControlValueAccessor {

  private static _globalSliderId: number = 0;
  private _sliderId: number = SbSliderComponent._globalSliderId ++;
  get steplistId(): string {
    return `sb-slider-steplist-${this._sliderId}`;
  }

  @Input()
  public min: number = 0;

  @Input()
  public max: number = 10;

  @Input()
  public step: number = 1;

  @Input()
  set snap(snap: Array<number> | boolean) {
    if (Array.isArray(snap)) this.snapPoints = snap;
    else if (snap) {
      this.snapPoints = new Array<number>();
      let snapStep = Math.round((this.max-this.min)/5/this.step)*this.step;
      let sum = this.min;
      while(sum < this.max - snapStep) {
        this.snapPoints.push(sum)
        sum += snapStep;
      }
    }
  }
  public snapPoints: Array<number> = new Array<number>();

  private onChange: any = () => {};
  private onTouch: any = () => {};

  private innerValue: number | undefined = undefined;

  set value(value: number | undefined) {
    this.writeValue(value);
    this.onChange(value);
  }

  get value(): number | undefined {
    return this.innerValue;
  }

  constructor(
    elementRef: ElementRef,
    themeService: SbThemeService
  ) {
    super(elementRef, themeService);
  }


  public writeValue(value: number | undefined): void {
    if (value !== this.innerValue && !this.disabled) {
      this.innerValue = value;
    }
  }

  public registerOnChange(fn: any): void { this.onChange = fn }
  public registerOnTouched(fn: any): void { this.onTouch = fn }
  public onBlur(): void { this.onTouch() }

}
