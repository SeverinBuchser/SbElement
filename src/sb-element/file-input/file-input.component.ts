import { Component, ElementRef, Input, ViewEncapsulation } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import {
  Color,
  hasElementRefClass,
  mixinAccent,
  mixinClassName,
  mixinColor,
  mixinDisable,
  mixinFocus,
  mixinPill,
  mixinPlain,
  mixinSize,
  Size
} from '../core';

const SbFileInputCore = mixinAccent(
  mixinPill(
    mixinPlain(
      mixinDisable(
        mixinFocus(
          mixinSize(
            mixinColor(
              mixinClassName(hasElementRefClass, 'sb-file-input'),
              Color.PRIMARY
            ),
            Size.MEDIUM
          )
        )
      )
    )
  )
);

@Component({
  selector: 'sb-input[type=file]',
  templateUrl: './file-input.component.html',
  styleUrls: ['./file-input.component.scss'],
  encapsulation: ViewEncapsulation.None,
  inputs: [
    'isAccent: accent',
    'isPill: pill',
    'isPlain: plain',
    'size',
    'color',
    'disabled'
  ],
  outputs: [
    'blur',
    'focus'
  ],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: SbFileInputComponent,
    multi: true
  }]
})
export class SbFileInputComponent extends SbFileInputCore
  implements ControlValueAccessor {

  @Input()
  public placeholder: string = '';

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

  constructor(elementRef: ElementRef) {
    super(elementRef);
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
