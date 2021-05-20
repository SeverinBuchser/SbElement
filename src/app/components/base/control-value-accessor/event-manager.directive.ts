import { Directive, EventEmitter, Output } from '@angular/core';
import { StateManagerDirective } from './state-manager.directive';

@Directive({
  selector: '[selector]'
})
export class EventManagerDirective<ValueType> extends StateManagerDirective {

  protected onTouchedCallBack: () => void = () => {};
  protected onChangeCallback: (value: ValueType | undefined) => void = () => {};

  @Output()
  public change: EventEmitter<ValueType | undefined> = new EventEmitter<ValueType | undefined>();

  @Output()
  public blur: EventEmitter<void> = new EventEmitter<void>();

  @Output()
  public focus: EventEmitter<void> = new EventEmitter<void>();

  // events
  public emitBlur(): void {
    this.setFocusedState(false);
    this.setTouchedState(true);
    this.onTouchedCallBack();
    this.blur.emit();
  }

  public emitFocus(): void {
    this.setFocusedState(true);
    this.focus.emit();
  }

  protected emitChange(value: ValueType | undefined): void {
    this.setPristineState(false);
    this.onChangeCallback(value);
    this.change.emit(value);
  }

  // register events
  public registerOnChange(fn: any): void { this.onChangeCallback = fn }
  public registerOnTouched(fn: any): void { this.onTouchedCallBack = fn }

}
