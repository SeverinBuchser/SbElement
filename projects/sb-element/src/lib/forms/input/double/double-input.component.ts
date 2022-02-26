import { Component, ElementRef, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Color, mixinClassName, mixinColor, mixinDisable, mixinFocus, mixinSize, mixinTheme, Size, SbThemeService } from '../../../core';

const SbDoubleInputCore = mixinDisable(
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

export class SbDoubleInput<T> {
  public first?: T;
  public second?: T;

  constructor();
  constructor(first: T | undefined, second: T | undefined);
  constructor(first?: T, second?: T) {
    if (first) {
      this.first = first;
    }
    if (second) {
      this.second = second;
    }
  }

  public static equals<T>(inputOne: SbDoubleInput<T>, inputTwo: SbDoubleInput<T>): boolean {
    return inputOne.first == inputTwo.first && inputOne.second == inputTwo.second;
  }
}

@Component({
  selector: 'sb-input[type=double]',
  templateUrl: './double-input.component.html',
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
    useExisting: SbDoubleInputComponent,
    multi: true
  }]
})
export class SbDoubleInputComponent extends SbDoubleInputCore implements ControlValueAccessor {

  @Input()
  public firstPlaceholder: string = '';

  @Input()
  public secondPlaceholder: string = '';

  @Input()
  public delimiter: string = ':';

  public _type: string = 'text';
  @Input()
  set type(type: string) {
    if (type != 'double') {
      this._type = type;
    }
  }
  get type(): string {
    return this._type;
  }

  @Input()
  public spellcheck: boolean = false;

  @Input()
  public prefixIcon: string = '';
  @Input()
  public suffixIcon: string = '';

  private onChange: any = () => {};
  private onTouch: any = () => {};

  private innerFirstValue: string | undefined = undefined;
  private innerSecondValue: string | undefined = undefined;

  set firstValue(firstValue: string) {
    let value = new SbDoubleInput(firstValue, this.innerSecondValue);
    this.writeValue(value);
    this.onChange(value);
  }
  get firstValue(): string {
    if (this.innerFirstValue) {
      return this.innerFirstValue;
    } else return '';
  }

  set secondValue(secondValue: string) {
    let value = new SbDoubleInput(this.innerFirstValue, secondValue);
    this.writeValue(value);
    this.onChange(value);
  }

  get secondValue(): string {
    if (this.innerSecondValue) {
      return this.innerSecondValue;
    } else return '';
  }

  constructor(
    elementRef: ElementRef,
    themeService: SbThemeService
  ) {
    super(elementRef, themeService);
  }

  public writeValue(value: SbDoubleInput<string>): void {
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
