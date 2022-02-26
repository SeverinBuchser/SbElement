import { Component, ElementRef, Input, ViewEncapsulation } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Color, mixinClassName, mixinColor, mixinDisable, mixinFocus, mixinSize, mixinTheme, Size, SbThemeService } from '../../../core';

const SbInputCoreCore = mixinDisable(
  mixinFocus(
    mixinSize(
      mixinColor(
        mixinTheme(
          mixinClassName(
            class {
              constructor(
                public _elementRef: ElementRef,
                public _themeService: SbThemeService) {}
            }, 'sb-input-core'
          )
        ), Color.PRIMARY
      ), Size.MEDIUM
    )
  )
);

@Component({
  selector: 'sb-input-core',
  templateUrl: './input-core.component.html',
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
    useExisting: SbInputCoreComponent,
    multi: true
  }]
})
export class SbInputCoreComponent extends SbInputCoreCore implements ControlValueAccessor {

  @Input()
  public placeholder: string = '';

  @Input()
  public type: string = 'text';

  @Input()
  public spellcheck: boolean = false;

  private onChange: any = () => {};
  private onTouch: any = () => {};

  private innerValue: string | undefined = undefined;

  set value(value: string) {
    this.writeValue(value);
    this.onChange(value);
  }

  get value(): string {
    if (this.innerValue) {
      return this.innerValue;
    } else return '';
  }

  public getPlaceholderClasses(): Array<string> {
    let classes = new Array<string>();
    classes.push(this.className + '__placeholder')
    classes.push(this.value || this.focused ? 'top' : '')
    return classes;
  }

  constructor(
    elementRef: ElementRef,
    themeService: SbThemeService
  ) {
    super(elementRef, themeService);
  }


  public writeValue(value: string): void {
    if (value == '' || value !== this.innerValue && !this.disabled) {
      this.innerValue = value;
    }
  }

  public registerOnChange(fn: any): void { this.onChange = fn }
  public registerOnTouched(fn: any): void { this.onTouch = fn }
  public onBlur(): void { this.onTouch() }

}
