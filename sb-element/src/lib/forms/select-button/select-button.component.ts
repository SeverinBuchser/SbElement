import { Component, ElementRef, Input, ViewEncapsulation } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { mixinDisable, mixinFocus, mixinSize, mixinColor, mixinClassName, Color, Size, mixinAccent, mixinPill, mixinPlain } from '../../core';

const SbSelectButtonCore = mixinAccent(
  mixinPill(
    mixinPlain(
      mixinDisable(
        mixinFocus(
          mixinSize(
            mixinColor(
              mixinClassName(
                class {
                  constructor(public _elementRef: ElementRef) {}
                }, 'sb-select-button'
              ), Color.PRIMARY
            ), Size.MEDIUM
          )
        )
      )
    )
  )
);

@Component({
  selector: 'sb-select-button',
  templateUrl: './select-button.component.html',
  encapsulation: ViewEncapsulation.None,
  host: {
    '[class.open]': 'open'
  },
  inputs: [
    'isAccent: accent',
    'isPill: pill',
    'isPlain: plain',
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
    useExisting: SbSelectButtonComponent,
    multi: true
  }]
})
export class SbSelectButtonComponent extends SbSelectButtonCore implements ControlValueAccessor {

  public open: boolean = false;

  @Input()
  public options: Array<string> = new Array<string>();

  private onChange: any = () => {};
  private onTouch: any = () => {};

  private innerValue: string | undefined = undefined;

  set value(value: string) {
    if (value !== this.innerValue && !this.disabled) {
      this.innerValue = value;
      this.onChange(value);
    }
  }

  get value(): string {
    if (this.innerValue) {
      return this.innerValue;
    } else return '';
  }

  constructor(elementRef: ElementRef) {
    super(elementRef);
  }

  public toggle(): void {
    this.open = !this.open;
  }

  public select(newOption: string) {
    this.toggle();
    this.value = newOption;
  }

  public writeValue(value: string): void {
    if (value !== this.innerValue && !this.disabled) {
      this.innerValue = value;
    }
  }

  public registerOnChange(fn: any): void { this.onChange = fn }
  public registerOnTouched(fn: any): void { this.onTouch = fn }
  public onBlur(): void { this.onTouch() }
}
