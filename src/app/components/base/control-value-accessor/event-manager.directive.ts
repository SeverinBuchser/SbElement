import { Directive, EventEmitter, Output } from '@angular/core';
import { StateManagerDirective } from './state-manager.directive';

@Directive({
  selector: '[appEventManager]'
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
  protected emitBlur(): void {
    this.blur.emit();
  }

  protected emitFocus(): void {
    this.focus.emit();
  }

  protected emitChange(value: ValueType | undefined): void {
    this.setPristineState(false);
    this.onChangeCallback(value);
    this.change.emit(value);
  }

}
