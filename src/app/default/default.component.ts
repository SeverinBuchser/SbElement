import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AlertService, ThemeService, TimelineComponent, ThemeInputDirective } from 'sb-element';

@Component({
  selector: 'app-default',
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.scss']
})
export class DefaultComponent extends ThemeInputDirective {
  public rootClass = 'default';
  title = 'SbElement';
  public color: 'warn' | 'success' | 'info' | 'primary' | 'secondary' | null = 'primary';

  public value: any = 'Switch is turned OFF';
  public valuecheckbox: boolean = false;

  public options = ['Option 1', 'Option 2', 'Option 3'];

  public model = {
    select: 'Option 1',
    checkboxes: {'Option 1': true, 'Option 2': false, 'Option 3': true},
    radios: 'Option 1',
    slider: 0,
    input: 'severin.buchser@gmx.ch',
    fileinput: '',
    date: '',
    spinner: null,
    time: 0,
    double: ''
  };

  public table!: {data: Array<Array<any>>, head: Array<any>};

  @ViewChild('timeline')
  public timeline!: TimelineComponent;

  constructor(
    themeService: ThemeService,
    private alertService: AlertService
  ) {
    super(themeService)
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
  }

  ngOnInit() {
  }

  alert(message: string): void {
    this.alertService.inform(message, "l");
    this.alertService.success(message, 's');
    this.alertService.warn(message, 'm');
    this.alertService.primary(message, 'd');
    this.alertService.secondary(message, 'l');
  }

  toggleTheme(value: any) {
    if (this.themeService.get() == 'dark') {
      this.themeService.commit('light');
    } else {
      this.themeService.commit('dark');
    }
  }
}
