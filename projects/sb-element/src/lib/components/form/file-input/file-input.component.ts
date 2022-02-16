import { Attribute, Component, ElementRef, Input, Optional, ViewEncapsulation } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { ThemeService, mixinDisable, mixinFocus, mixinColor, mixinSize, mixinTheme, mixinClassName, Color, Size } from '../../../core';

const SbFileInputCore = mixinDisable(
  mixinFocus(
    mixinSize(
      mixinColor(
        mixinTheme(
          mixinClassName(
            class {
              constructor(
                public _elementRef: ElementRef,
                public _themeService: ThemeService) {}
            }, 'sb-file-input'
          )
        ), Color.PRIMARY
      ), Size.DEFAULT
    )
  )
);

@Component({
  selector: 'sb-input[type=file]',
  templateUrl: './file-input.component.html',
  styleUrls: ['./file-input.component.scss'],
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
  },
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: FileInputComponent,
    multi: true
  }]
})
export class FileInputComponent extends SbFileInputCore implements ControlValueAccessor {

  @Input()
  public placeholder: string = '';

  // the limit is in mega bytes
  @Input()
  public limit: number = -1;

  public plain: boolean = false;
  public pill: boolean = false;

  private static defaultMessage: string = 'Choose a file';
  public message: string = FileInputComponent.defaultMessage;

  private onChange: any = () => {};
  private onTouch: any = () => {};

  private innerValue: File | undefined = undefined;

  set value(value: File | undefined) {
    this.writeValue(value);
    this.onChange(value);
  }

  get value(): File | undefined {
    return this.innerValue;
  }

  constructor(
    elementRef: ElementRef,
    themeService: ThemeService,
    @Optional() @Attribute('pill') pill: any,
    @Optional() @Attribute('plain') plain: any
  ) {
    super(elementRef, themeService);
    if (pill == '') this.pill = true;
    if (plain == '') this.plain = true;
  }

  public input(files: FileList | null) {
    if (files) {
      let file: File | null = files.item(0);
      if (file && this.checkFileSize(file)) {
        this.message = file.name;
        this.value = file;
      } else {
        this.message = FileInputComponent.defaultMessage;
        this.value = undefined;
      }
    }
  }

  private checkFileSize(file: File): boolean {
    if (this.limit >= 0) {
      if (file.size <= this.limit * 1000000) return true;
      else {
        return false
      }
    } else return true;
  }

  public writeValue(value: File | undefined): void {
    if (value && value !== this.innerValue && !this.disabled) {
      this.innerValue = value;
    }
  }

  public registerOnChange(fn: any): void { this.onChange = fn }
  public registerOnTouched(fn: any): void { this.onTouch = fn }
  public onBlur(): void { this.onTouch() }
}
