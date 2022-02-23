import { Attribute, Component, ElementRef, Input, Optional, ViewEncapsulation } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { SbThemeService, mixinDisable, mixinFocus, mixinSize, mixinColor, mixinTheme, mixinClassName, Color, Size } from '../../../core';

const SbSelectButtonCore = mixinDisable(
  mixinFocus(
    mixinSize(
      mixinColor(
        mixinTheme(
          mixinClassName(
            class {
              constructor(
                public _elementRef: ElementRef,
                public _themeService: SbThemeService) {}
            }, 'sb-select-button'
          )
        ), Color.PRIMARY
      ), Size.MEDIUM
    )
  )
);

@Component({
  selector: 'sb-select-button',
  templateUrl: './select-button.component.html',
  styleUrls: ['./select-button.component.scss'],
  encapsulation: ViewEncapsulation.None,
  host: {
    '[class.pill]': 'pill',
    '[class.plain]': 'plain',
    '[class.open]': 'open'
  },
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
    useExisting: SbSelectButtonComponent,
    multi: true
  }]
})
export class SbSelectButtonComponent extends SbSelectButtonCore implements ControlValueAccessor {

  @Input()
  set isPill(isPill: boolean) {
    this.pill = isPill;
  }

  @Input()
  set isPlain(isPlain: boolean) {
    this.plain = isPlain;
  }

  public plain: boolean = false;
  public pill: boolean = false;
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

  constructor(
    elementRef: ElementRef,
    themeService: SbThemeService,
    @Optional() @Attribute('pill') pill: any,
    @Optional() @Attribute('plain') plain: any
  ) {
    super(elementRef, themeService);
    if (pill == '') this.pill = true;
    if (plain == '') this.plain = true;
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
