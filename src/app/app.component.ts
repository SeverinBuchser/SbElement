import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Table } from './models/table/table';
import { AlertService } from './services/alert/alert.service';
import { ThemeService } from './services/theme/theme.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'SbElement';
  public color: 'warn' | 'success' | 'info' | 'primary' | 'secondary' | null = 'primary';
  public theme: string = 'light';

  public value: any = 'Switch is turned OFF';
  public valuecheckbox: boolean = false;

  public options = ['Option 1', 'Option 2', 'Option 3'];

  public model = {
    toggle: false,
    radio: false,
    checkbox: false,
    select: 'Option 1',
    checkboxes: {'Option 1': true, 'Option 2': false, 'Option 3': true},
    radios: 'Option 1',
    slider: 0,
    input: ''
  };

  public table: Table = new Table();

  constructor(themeService: ThemeService, private alertService: AlertService) {
    themeService.commit('night')
    this.theme = themeService.get();
    setTimeout(() => {
      this.alertService.alert("This is an alert!");
    }, 500);
    setTimeout(() => {
      this.alertService.alert("This is an alertttt!");
    }, 500)
  }

  onSubmit(form: NgForm) {
    console.log(form.value)
  }
}
