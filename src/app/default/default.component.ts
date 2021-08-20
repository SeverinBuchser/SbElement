import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AlertService, ThemeService, Table, PopoverService, PopoverInletDirective, PopoverDirection } from 'sb-element';
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
    fileinput: ''
  };

  public table: TableModel = new TableModel();

  @ViewChild(PopoverInletDirective)
  public tableone!: PopoverInletDirective;

  constructor(themeService: ThemeService, private alertService: AlertService,
    private popoverService: PopoverService) {
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

    this.popoverService.allowMouseover = true;
  }

  onSubmit(form: NgForm) {
    // this.alert(form.value.input);
    Table.fromCSV(form.value.fileinput).then((table: TableModel) => this.table = table)
    .catch((err: Error) => this.alertService.warn(err.message))
  }

  pop() {
    this.popoverService.pop<PopoverTextComponent>(PopoverTextComponent, this.tableone, PopoverDirection.TOP_LEFT);
  }

  unpop(event: MouseEvent) {
    this.popoverService.unpop();
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
