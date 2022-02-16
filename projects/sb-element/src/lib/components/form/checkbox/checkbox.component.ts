import { Component, ElementRef, Input, ViewEncapsulation } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Color, mixinClassName, mixinColor, mixinDisable, mixinTheme, ThemeService } from '../../../core';

const SbCheckboxCore = mixinDisable(mixinColor(
  mixinTheme(
    mixinClassName(
      class {
        constructor(
          public _elementRef: ElementRef,
          public _themeService: ThemeService) {}
      }, 'sb-checkbox'
    )
  ), Color.PRIMARY
));

@Component({
  selector: 'sb-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.scss'],
  encapsulation: ViewEncapsulation.None,
  inputs: [
    'color'
  ],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: SbCheckboxComponent,
    multi: true
  }]
})
export class SbCheckboxComponent extends SbCheckboxCore implements ControlValueAccessor {

  @Input()
  public name: string = '';

  @Input()
  public label: string = '';

  private checked: boolean = false;

  set value(value: boolean) {
    this.checked = value;
    this.emitChange(this.checked);
  }
  get value(): boolean {
    return this.checked;
  }

  private onChange: (checked: boolean) => void = () => {};
  private onTouch: () => void = () => {};

  constructor(
    elementRef: ElementRef,
    themeService: ThemeService
  ) {
    super(elementRef, themeService);
  }

  public writeValue(value: boolean): void { this.checked = value }

  public registerOnChange(fn: (checked: boolean) => void): void { this.onChange = fn }
  public registerOnTouched(fn: any): void { this.onTouch = fn }

  public emitChange(checked: boolean): void { this.onChange(checked) }
  public emitTouch(): void { this.onTouch() }

}
