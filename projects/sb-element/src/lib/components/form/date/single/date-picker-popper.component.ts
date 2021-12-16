import { Component, EventEmitter, Output } from '@angular/core';
import * as fns from "date-fns";
import { PopperService } from "../../../../services/popper/popper.service";
import { ThemeService } from "../../../../services/theme/theme.service";
import { PopperDirective } from "../../../popper/popper.directive";


@Component({
  selector: 'sb-el-date-picker-popper',
  templateUrl: './date-picker-popper.component.html'
})
export class DatePickerPopperComponent extends PopperDirective {

  public rootClass = 'sb-el-date-picker-popper';

  @Output()
  public select: EventEmitter<string> = new EventEmitter<string>();
  public handleSelect(date: Date): void {
    if (fns.isSameMonth(date, this.showingMonthStart)) {
      this.select.emit(fns.format(date, 'yyyy-MM-dd'));
      this.popperService.unpop();
    }
  }

  public selectedDate?: Date;
  public showingMonthStart: Date = fns.startOfMonth(new Date());

  set date(date: string | undefined | Date) {
    if (date && typeof date === 'string') {
      this.selectedDate = fns.parseISO(date);
      if (!fns.isEqual(this.showingMonthStart, fns.startOfMonth(fns.parseISO(date)))) {
        this.showingMonthStart = fns.startOfMonth(fns.parseISO(date));
      }
    }
  };

  constructor(
    private popperService: PopperService,
    themeService: ThemeService
  ) {
    super(themeService);
  }

  public previousYear(): void {
    this.showingMonthStart = fns.subYears(this.showingMonthStart, 1);
  }
  public nextYear(): void {
    this.showingMonthStart = fns.addYears(this.showingMonthStart, 1);
  }

  public previousMonth(): void {
    this.showingMonthStart = fns.subMonths(this.showingMonthStart, 1);
  }
  public nextMonth(): void {
    this.showingMonthStart = fns.addMonths(this.showingMonthStart, 1);
  }

}
