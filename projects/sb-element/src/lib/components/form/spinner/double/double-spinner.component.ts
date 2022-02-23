import { Component, ElementRef, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { SbDoubleInput } from "../../input";
import { Color, mixinClassName, mixinColor, mixinDisable, mixinFocus, mixinSize, mixinTheme, Size, SbThemeService } from '../../../../core';

const SbDoubleSpinnerCore = mixinDisable(
  mixinFocus(
    mixinSize(
      mixinColor(
        mixinTheme(
          mixinClassName(
            class {
              constructor(
                public _elementRef: ElementRef,
                public _themeService: SbThemeService) {}
            }, 'sb-input'
          )
        ), Color.PRIMARY
      ), Size.MEDIUM
    )
  )
);

@Component({
  selector: 'sb-input[type=double-number]',
  templateUrl: './double-spinner.component.html',
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
    useExisting: SbDoubleSpinnerComponent,
    multi: true
  }]
})
export class SbDoubleSpinnerComponent extends SbDoubleSpinnerCore implements ControlValueAccessor {
  public rootClass = 'sb-input';

  @Input()
  public firstPlaceholder: string = '';

  @Input()
  public secondPlaceholder: string = '';

  @Input()
  public firstMin: number = Number.MIN_SAFE_INTEGER;
  @Input()
  public secondMin: number = Number.MIN_SAFE_INTEGER;
  @Input()
  public firstMax: number = Number.MAX_SAFE_INTEGER;
  @Input()
  public secondMax: number = Number.MAX_SAFE_INTEGER;

  @Input()
  public delimiter: string = ':';

  @Input()
  public type: string = 'text';

  @Input()
  public spellcheck: boolean = false;

  @Input()
  public prefixIcon: string = '';
  @Input()
  public suffixIcon: string = '';

  private onChange: any = () => {};
  private onTouch: any = () => {};

  private innerFirstValue: number | undefined = undefined;
  private innerSecondValue: number | undefined = undefined;

  set firstValue(firstValue: number | undefined) {
    let value = new SbDoubleInput(firstValue, this.innerSecondValue);
    this.writeValue(value);
    this.onChange(value);
  }
  get firstValue(): number | undefined {
    return this.innerFirstValue
  }

  set secondValue(secondValue: number | undefined) {
    let value = new SbDoubleInput(this.innerFirstValue, secondValue);
    this.writeValue(value);
    this.onChange(value);
  }
  get secondValue(): number | undefined {
    return this.innerSecondValue
  }

  constructor(
    elementRef: ElementRef,
    themeService: SbThemeService
  ) {
    super(elementRef, themeService);
  }

  public writeValue(value: SbDoubleInput<number>): void {
    if (value && !this.disabled) {
      if (value.first) {
        this.innerFirstValue = value.first;
      }
      if (value.second) {
        this.innerSecondValue = value.second;
      }
    }
  }

  public registerOnChange(fn: any): void { this.onChange = fn }
  public registerOnTouched(fn: any): void { this.onTouch = fn }
  protected onBlur(): void { this.onTouch() }

}
