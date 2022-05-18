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
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from "@angular/forms";
import { SbMarkedDates } from "../../calendar";
import { Color, mixinDisable, mixinFocus, SbConnectedSide, Size } from "../../core";
import { SbPopperComponent, SbPopperContentComponent } from '../../popper';
import { SbInputGroupComponent } from '../input-group';

const SbDateInputCore = mixinDisable(mixinFocus(class {}));

@Component({
  selector: 'sb-input[type=date]',
  templateUrl: './date-input.html',
  styleUrls: ['./date-input.scss'],
  encapsulation: ViewEncapsulation.None,
  inputs: [
    'disabled'
  ],
  outputs: [
    'focus',
    'blur'
  ],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: SbDateInputComponent,
    multi: true
  }]
})
export class SbDateInputComponent extends SbDateInputCore
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

  private onChange: any = () => {};
  private onTouch: any = () => {};

  public markedDates: SbMarkedDates = new SbMarkedDates(1);

  private _inputFocused: boolean = false;
  private _date: string = '';
  set date(formattedDate: string) {
    this.markedDates.setFormatted(formattedDate, this.format, 0);
    this._emitOnChange();
  }
  get date(): string {
    return this._date;
  }

  constructor(@Optional() private _inputGroup: SbInputGroupComponent) {
    super();
  }

  public handlePickerSelect(date: Date): void {
    this.markedDates.clear();
    this.markedDates.mark(date);
    this._emitOnChange();
  }

  public handleFocusInput(): void {
    this._inputFocused = true;
  }

  public handleBlurInput(): void {
    this._inputFocused = false;
    this._date = this.markedDates.getFormatted(this.format, 0);
  }

  public ngOnInit(): void {
    this.markedDates.onChange.subscribe(() => {
      if (!this._inputFocused) {
        this._date = this.markedDates.getFormatted(this.format, 0);
      }
    })

    if (this.hasParentGroup) {
      const contentEmbeddedViewRef = this._inputGroup!.attach(this.contentTemplate);
      this.popper.customConnectionElement = contentEmbeddedViewRef.rootNodes[0];
    }

  }

  public writeValue(date: string): void {
    if (date) {
      this.markedDates.clear();
      this.markedDates.parseAndMark(this.format, date);
    }
  }

  private _emitOnChange(): void {
    const date = this.markedDates.getFormatted(this.format, 0);
    if (date) {
      this.onChange(date);
    }
  }

  public registerOnChange(fn: any): void { this.onChange = fn }
  public registerOnTouched(fn: any): void { this.onTouch = fn }
  protected onBlur(): void { this.onTouch() }

}
