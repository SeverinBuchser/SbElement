import {
  Component,
  ElementRef,
  HostBinding,
  Input,
  Optional,
  TemplateRef,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import * as fns from 'date-fns';

import { Color, hasElementRefClass, mixinClassName, mixinDisable, mixinFocus, Size } from '../../core';

import { SbInputGroupComponent } from '../input-group.component';

const SbTimeInputCore = mixinDisable(
  mixinFocus(
    mixinClassName(hasElementRefClass, 'sb-time-input')
  )
);

@Component({
  selector: 'sb-input[type=time]',
  templateUrl: './time-input.component.html',
  encapsulation: ViewEncapsulation.None,
  inputs: [
    'disabled'
  ],
  outputs: [
    'blur',
    'focus'
  ],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: SbTimeInputComponent,
    multi: true
  }]
})
export class SbTimeInputComponent extends SbTimeInputCore
  implements ControlValueAccessor {

  @HostBinding('style.display') get display(): string {
    return this.hasParentGroup ? 'none' : 'block';
  }

  @ViewChild('contentTemplate', { read: TemplateRef, static: true })
  public contentTemplate!: TemplateRef<any>;

  get hasParentGroup(): boolean {
    return this._inputGroup ? true : false;
  }

  @Input()
  public color: string = Color.PRIMARY;

  @Input()
  public size: string = Size.MEDIUM;

  @Input('pill')
  public isPill: boolean | string = false;

  @Input()
  public format: string = 'HH:mm:ss';
  private _formatsHours: boolean = true;
  get formatsHours(): boolean {
    return this._formatsHours;
  }
  private _formatsMinutes: boolean = true;
  get formatsMinutes(): boolean {
    return this._formatsMinutes;
  }
  private _formatsSeconds: boolean = true;
  get formatsSeconds(): boolean {
    return this._formatsSeconds;
  }

  private onChange: any = () => {};
  private onTouch: any = () => {};

  public _date: Date = new Date();

  set hours(hours: number) {
    this._date = fns.setHours(this._date, hours);
    this._emitChange();
  }
  get hours(): number {
    return this._date.getHours();
  }

  set minutes(minutes: number) {
    this._date = fns.setMinutes(this._date, minutes)
    this._emitChange();
  }
  get minutes(): number {
    return this._date.getMinutes();
  }

  set seconds(seconds: number) {
    this._date = fns.setSeconds(this._date, seconds);
    this._emitChange();
  }
  get seconds(): number {
    return this._date.getSeconds();
  }

  constructor(
    elementRef: ElementRef,
    @Optional() private _inputGroup?: SbInputGroupComponent
  ) {
    super(elementRef);
  }

  public ngOnInit() {
    const date = new Date(0, 0, 0, 0, 0, 0, 0);
    const formatted = fns.format(new Date(1,1,1,1,1,1,1), this.format);
    const changedDate = fns.parse(formatted, this.format, date);

    if (date.getFullYear() !== changedDate.getFullYear()) {
      throw new Error("SbTimeInputComponent: The format cannot format years.")
    }

    if (date.getMonth() !== changedDate.getMonth()) {
      throw new Error("SbTimeInputComponent: The format cannot format months.")
    }

    if (date.getDate() !== changedDate.getDate()) {
      throw new Error("SbTimeInputComponent: The format cannot format dates.")
    }

    this._formatsHours = date.getHours() != changedDate.getHours();
    this._formatsMinutes = date.getMinutes() != changedDate.getMinutes();
    this._formatsSeconds = date.getSeconds() != changedDate.getSeconds();

    if (this.hasParentGroup) {
      this._inputGroup!.attach(this.contentTemplate)
    }
  }

  private _emitChange() {
    this.onChange(this.formatted);
  }

  get formatted(): string {
    try {
      return fns.format(this._date, this.format)
    } catch (err) {
      this._date = new Date();
      return this.formatted;
    }
  }

  public writeValue(time: string): void {
    this._date = fns.parse(time, this.format, this._date);
  }

  public registerOnChange(fn: any): void { this.onChange = fn }
  public registerOnTouched(fn: any): void { this.onTouch = fn }
  public onBlur(): void { this.onTouch() }
}
