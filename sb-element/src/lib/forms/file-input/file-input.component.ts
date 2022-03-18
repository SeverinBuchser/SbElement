import { Attribute, Component, ElementRef, Input, Optional, ViewEncapsulation } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { mixinDisable, mixinFocus, mixinColor, mixinSize, mixinClassName, Color, Size } from '../../core';

const SbFileInputCore = mixinDisable(
  mixinFocus(
    mixinSize(
      mixinColor(
        mixinClassName(
          class {
            constructor(public _elementRef: ElementRef) {}
          }, 'sb-file-input'
        ), Color.PRIMARY
      ), Size.MEDIUM
    )
  )
);

@Component({
  selector: 'sb-input[type=file]',
  templateUrl: './file-input.component.html',
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
  host: {
    '[class.pill]': 'pill',
    '[class.plain]': 'plain',
    '[class.disabled]': 'disabled'
  },
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: SbFileInputComponent,
    multi: true
  }]
})
export class SbFileInputComponent extends SbFileInputCore implements ControlValueAccessor {

  @Input()
  public placeholder: string = '';

  public plain: boolean = false;
  public pill: boolean = false;

  get message(): string {
    if (this.value) {
      return this.value.name;
    }
    return this.placeholder;
  }

  private onChange: any = () => {};
  private onTouch: any = () => {};

  private innerValue: File | undefined = undefined;

  set value(value: File | undefined) {
    if (value !== this.innerValue && !this.disabled) {
      this.innerValue = value;
      this.onChange(value);
    }
  }

  get value(): File | undefined {
    return this.innerValue;
  }

  constructor(
    elementRef: ElementRef,
    @Optional() @Attribute('pill') pill: any,
    @Optional() @Attribute('plain') plain: any
  ) {
    super(elementRef);
    if (pill == '') this.pill = true;
    if (plain == '') this.plain = true;
  }

  public hendleInput(event: Event) {
    let files = (event.target! as HTMLInputElement).files;
    if (files) {
      let file: File | null = files.item(0);
      if (file) {
        this.value = file;
      } else {
        this.value = undefined;
      }
    }
  }

  public writeValue(value: File | undefined): void {
    if (value !== this.innerValue && !this.disabled) {
      this.innerValue = value;
    }
  }

  public registerOnChange(fn: any): void { this.onChange = fn }
  public registerOnTouched(fn: any): void { this.onTouch = fn }
  public onBlur(): void { this.onTouch() }
}
