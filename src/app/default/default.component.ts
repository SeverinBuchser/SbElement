import { Component, ElementRef, ViewChild, ViewEncapsulation } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from "@angular/router";
import { SbAlertService, SbThemeService, Size, SbTimelineComponent, MarkedDates, mixinClassName, mixinTheme, mixinColor, Color } from 'sb-element';

@Component({
  selector: 'app-default',
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class DefaultComponent extends
mixinColor(
  mixinTheme(
    mixinClassName(
      class {
        constructor(
          public _elementRef: ElementRef,
          public _themeService: SbThemeService) {}
      }, 'default'
    )
  ), Color.PRIMARY
) {
  title = 'SbElement';

  public value: any = 'Switch is turned OFF';
  public valuecheckbox: boolean = false;

  public options = ['Option 1', 'Option 2', 'Option 3', 'Option 4', 'Option 5'];

  public model = {
    select: 'Option 1',
    checkboxes: [{name: 'Option 1', checked: false}, {name: 'Option 2', checked: false}, {name: 'Option 3', checked: false}],
    radios: 'Option 1',
    slider: 0,
    input: 'severin.buchser@gmx.ch',
    fileinput: '',
    date: new Date(),
    dateRange: new MarkedDates(new Date(), new Date()),
    spinner: null,
    time: 0,
    double: ''
  };

  public crumbs = ['Home', 'Example'];

  public table!: {data: Array<Array<any>>, head: Array<any>};

  public toggle: boolean = false;

  @ViewChild('timeline')
  public timeline!: SbTimelineComponent;

  constructor(
    themeService: SbThemeService,
    elementRef: ElementRef,
    private alertService: SbAlertService,
  ) {
    super(elementRef, themeService)
    this.table = {
      data: [[
        "Severin", "Buchser"
      ], [
        "Rafael", "Buchser"
      ],[
        null, "Buchser"
      ]],
      head: ["Vorname", "Nachname"]
    }
  }

  onSubmit(form: NgForm) {
    console.log(this.model);
    this.alertService.inform("Hello", Size.DEFAULT);
  }

  ngOnInit() {
  }

  alert(message: string): void {
    this.alertService.inform(message, Size.LARGE);
    this.alertService.success(message, Size.SMALL);
  }

  toggleTheme() {
    if (this._themeService.get() == 'dark') {
      this._themeService.commit('light');
    } else {
      this._themeService.commit('dark');
    }
  }

  log(value: any) {
    console.log(value)
  }

  handleNavigate(crumb: string) {
    console.log(crumb)
  }
}
