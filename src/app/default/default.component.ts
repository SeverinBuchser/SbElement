import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AlertService, ThemeService, Table, PopperService, TimelineComponent, ThemeInputDirective } from 'sb-element';
import { TableModel } from "./../table.model";
import { PopoverTextComponent } from "./popover-text/popover-text.component";

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

  public table: TableModel = new TableModel();

  @ViewChild('timeline')
  public timeline!: TimelineComponent;

  constructor(
    themeService: ThemeService,
    private alertService: AlertService,
    private popperService: PopperService
  ) {
    super(themeService)
    this.table = Table.fromJSON({
      "Name" : [
        "Severin",
        "Rafael"
      ],
      "Nachname": [
        "Buchser",
        "Buchser",
        "Buchser"
      ]
    })
  }

  pop() {
    //this.popperService.pop<PopoverTextComponent>(PopoverTextComponent, this.tableone);
  }

  onSubmit(form: NgForm) {
    console.log(this.model)
    // this.alert(form.value.input);
    Table.fromCSV(form.value.fileinput).then((table: TableModel) => this.table = table)
    .catch((err: Error) => this.alertService.warn(err.message))
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
