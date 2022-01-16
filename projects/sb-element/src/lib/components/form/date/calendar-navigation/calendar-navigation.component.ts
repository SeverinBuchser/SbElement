import { Component } from '@angular/core';
import { NG_VALUE_ACCESSOR } from "@angular/forms";
import * as fns from "date-fns";
import { ControlValueAccessorSizeThemeColorInputDirective } from "../../../../core/control-value-accessor-style-input";

@Component({
  selector: 'sb-el-calendar-navigation',
  templateUrl: './calendar-navigation.component.html',
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: CalendarNavigationComponent,
    multi: true
  }]
})
export class CalendarNavigationComponent extends ControlValueAccessorSizeThemeColorInputDirective<Date> {

  public rootClass: string = 'sb-el-calendar-navigation';

  public previousValue?: Date;
  public nextValue?: Date;
  private animationDirection: string = '';
  private animate: boolean = false;

  get formatPrevious(): string {
    if (this.previousValue) return fns.format(this.previousValue, 'MMM. yyyy');
    else return '';
  }

  get format(): string {
    if (this.value) return fns.format(this.value, 'MMM. yyyy');
    else return '';
  }

  get formatNext(): string {
    if (this.nextValue) return fns.format(this.nextValue, 'MMM. yyyy');
    else return '';
  }

  public previousYear(): void {
    if (this.value) {
      this.nextValue = this.value;
      this.animationDirection = 'right';
      this.animate = true;
      this.writeValueInnerChange(fns.subYears(this.value, 1));
    }
  }

  public nextYear(): void {
    if (this.value) {
      this.previousValue = this.value;
      this.animationDirection = 'left';
      this.animate = true;
      this.writeValueInnerChange(fns.addYears(this.value, 1));
     }
  }

  public previousMonth(): void {
    if (this.value) {
      this.nextValue = this.value;
      this.animationDirection = 'right';
      this.animate = true;
      this.writeValueInnerChange(fns.subMonths(this.value, 1));
     }
  }

  public nextMonth(): void {
    if (this.value) {
      this.previousValue = this.value;
      this.animationDirection = 'left';
      this.animate = true;
      this.writeValueInnerChange(fns.addMonths(this.value, 1));
     }
  }

  public getClasses(): Array<string> {
    let classes = super.getClasses();
    if (this.animate && this.value) {
      classes.push('animate-' + this.animationDirection);
      setTimeout(() => this.animate = false, 200);
    }

    return classes;
  }

}
