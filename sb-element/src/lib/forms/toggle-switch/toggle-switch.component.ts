import { Component, ElementRef, ViewEncapsulation } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Color, mixinAccent, mixinClassName, mixinColor, mixinDisable, mixinFocus, mixinSize, mixinTabindex, Size } from '../../core';

const SbToggleSwitchCore = mixinAccent(
  mixinFocus(
    mixinDisable(
      mixinTabindex(
        mixinSize(
          mixinColor(
            mixinClassName(
              class {
                constructor(public _elementRef: ElementRef) {}
              }, 'sb-toggle-switch'
            ), Color.PRIMARY
          ), Size.MEDIUM
        ), 0
      )
    )
  )
);

@Component({
  selector: 'sb-toggle[type=switch]',
  templateUrl: './toggle-switch.component.html',
  encapsulation: ViewEncapsulation.None,
  host: {
    '[class.on]': 'value',
    '[class.off]': '!value',
    '[class.disabled]': 'disabled',
    '(click)': 'toggle()',
    '(focus)': 'setFocusedState(true)',
    '(blur)': 'setFocusedState(false)'
  },
  inputs: [
    'isAccent: accent',
    'size',
    'color',
    'disabled'
  ],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: SbToggleSwitchComponent,
    multi: true
  }]
})
export class SbToggleSwitchComponent extends SbToggleSwitchCore implements ControlValueAccessor {

  public toggle(): void {
    this.value = !this.value;
  }

  private onChange: any = () => {};
  private onTouch: any = () => {};

  private innerValue: boolean = false;

  set value(value: boolean) {
    if (value !== this.innerValue && !this.disabled) {
      this.innerValue = value;
      this.onChange(value);
    }
  }

  get value(): boolean {
    return this.innerValue;
  }

  constructor(
    elementRef: ElementRef
  ) {
    super(elementRef);
  }


  public writeValue(value: boolean): void {
    if (value !== this.innerValue && !this.disabled) {
      this.innerValue = value;
    }
  }

  public registerOnChange(fn: any): void { this.onChange = fn }
  public registerOnTouched(fn: any): void { this.onTouch = fn }
  public onBlur(): void { this.onTouch() }

}
