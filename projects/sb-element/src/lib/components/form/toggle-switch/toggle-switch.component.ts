import { Component, ElementRef, ViewEncapsulation } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Color, mixinClassName, mixinColor, mixinDisable, mixinFocus, mixinSize, mixinTabindex, mixinTheme, Size, ThemeService } from '../../../core';

const SbToggleSwitchCore = mixinFocus(
  mixinDisable(
    mixinTabindex(
      mixinSize(
        mixinColor(
          mixinTheme(
            mixinClassName(
              class {
                constructor(
                  public _elementRef: ElementRef,
                  public _themeService: ThemeService) {}
              }, 'sb-toggle-switch'
            )
          ), Color.PRIMARY
        ), Size.DEFAULT
      ), 0
    )
  )
);

@Component({
  selector: 'sb-toggle[type=switch]',
  templateUrl: './toggle-switch.component.html',
  styleUrls: ['./toggle-switch.component.scss'],
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
    'size',
    'color',
    'disabled'
  ],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: ToggleSwitchComponent,
    multi: true
  }]
})
export class ToggleSwitchComponent extends SbToggleSwitchCore implements ControlValueAccessor {

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
    elementRef: ElementRef,
    themeService: ThemeService
  ) {
    super(elementRef, themeService);
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
