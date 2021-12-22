import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AlertService, ThemeService, Table, PopperService, PopoverTriggerMouseoverDirective, TimelineComponent } from 'sb-element';
import { TableModel } from "./../table.model";
import { PopoverTextComponent } from "./popover-text/popover-text.component";

@Component({
  selector: 'app-default',
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.scss']
})
export class DefaultComponent implements OnInit {
  title = 'SbElement';
  public color: 'warn' | 'success' | 'info' | 'primary' | 'secondary' | null = 'primary';
  public theme: string = 'light';

  public value: any = 'Switch is turned OFF';
  public valuecheckbox: boolean = false;

  public options = ['Option 1', 'Option 2', 'Option 3'];

  public model = {
    select: 'Option 1',
    checkboxes: {'Option 1': true, 'Option 2': false, 'Option 3': true},
    radios: 'Option 1',
    slider: 0,
    input: 'asdf',
    fileinput: '',
    date: ''
  };

  public table: TableModel = new TableModel();

  @ViewChild(PopoverTriggerMouseoverDirective)
  public tableone!: PopoverTriggerMouseoverDirective;

  @ViewChild('timeline')
  public timeline!: TimelineComponent;

  constructor(
    themeService: ThemeService,
    private alertService: AlertService,
    private popperService: PopperService
  ) {
    this.theme = themeService.get();
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
    this.popperService.pop<PopoverTextComponent>(PopoverTextComponent, this.tableone);
  }

  onSubmit(form: NgForm) {
    console.log(this.model.date)
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
}
