import {
  Component,
  HostBinding,
  Input,
  OnInit,
  Optional,
  TemplateRef,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import * as fns from 'date-fns';

import { SbMarkedDates } from '../../calendar';
import { Color, mixinDisable, mixinFocus, SbConnectedSide, Size } from '../../core';
import { SbPopperComponent, SbPopperContentComponent } from '../../popper';

import { SbInputGroupComponent } from '../input-group.component';

const SbDateRangeInputCore = mixinDisable(mixinFocus(class {}));

@Component({
  selector: 'sb-input[type=date-range]',
  templateUrl: './date-range-input.component.html',
  styleUrls: ['./date-input.component.scss'],
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
    useExisting: SbDateRangeInputComponent,
    multi: true
  }]
})
export class SbDateRangeInputComponent extends SbDateRangeInputCore
  implements ControlValueAccessor, OnInit {
  
  @HostBinding('style.display') get display(): string {
    return this.hasParentGroup ? 'none' : 'block';
  }

  @ViewChild('contentTemplate', { read: TemplateRef, static: true })
  public contentTemplate!: TemplateRef<any>;

  @ViewChild('popperContent', { read: SbPopperContentComponent, static: true })
  public popperContent!: SbPopperContentComponent;

  @ViewChild('popper', { read: SbPopperComponent, static: true })
  public popper!: SbPopperComponent;
  
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
  public position: SbConnectedSide = 'bottom';

  @Input()
  public format: string = 'yyyy-MM-dd';

  public markedDates: SbMarkedDates = new SbMarkedDates();

  private onChange: any = () => {};
  private onTouch: any = () => {};
  
  private _startInputFocused: boolean = false;
  private _start: string = '';
  set start(formattedDate: string) {
    this.markedDates.setFormatted(formattedDate, this.format, 0);
    this._emitOnChange();
  }
  get start(): string {
    return this._start;
  }

  private _endInputFocused: boolean = false;
  private _end: string = '';
  set end(formattedDate: string) {
    this.markedDates.setFormatted(formattedDate, this.format, 1);
    this._emitOnChange();
  }
  get end(): string {
    return this._end;
  }

  constructor(@Optional() private _inputGroup: SbInputGroupComponent) {
    super();
  }

  public handlePickerSelect(date: Date): void {
    if (this.markedDates.isRange()) {
      this.markedDates.clear();
    }
    this.markedDates.mark(date);
    this._emitOnChange();
  }

  public handleFocusStartInput(): void {
    this._startInputFocused = true;
  }

  public handleBlurStartInput(): void {
    this._startInputFocused = false;
    this._start = this.markedDates.getFormatted(this.format, 0);
  }

  public handleFocusEndInput(): void {
    this._endInputFocused = true;
  }

  public handleBlurEndInput(): void {
    this._endInputFocused = false;
    this._end = this.markedDates.getFormatted(this.format, 1);
  }

  public ngOnInit(): void {
    this.markedDates.onChange.subscribe(() => {
      if (!this._startInputFocused) {
        this._start = this.markedDates.getFormatted(this.format, 0);
      }
      if (!this._endInputFocused) {
        this._end = this.markedDates.getFormatted(this.format, 1);
      }
    })

    if (this.hasParentGroup) {
      const contentEmbeddedViewRef = this._inputGroup!.attach(this.contentTemplate);
      this.popper.customConnectionElement = contentEmbeddedViewRef.rootNodes[0];
    }
  }

  private _emitOnChange(): void {
    if (this.markedDates.isRange('day')) {
      this.onChange(this._formatMarkedDates());
    }
  }

  private _formatMarkedDates(): Array<string> {
    return this.markedDates.toRangeTuple('day').map((date: Date) => {
      return fns.format(date, this.format);
    })
  }

  public writeValue(dates: Array<string>): void {
    if (dates) {
      this.markedDates.clear()
      this.markedDates.parseAndMark(this.format, ...dates);
    }
  }

  public registerOnChange(fn: any): void { this.onChange = fn }
  public registerOnTouched(fn: any): void { this.onTouch = fn }
  public onBlur(): void { this.onTouch() }

}
