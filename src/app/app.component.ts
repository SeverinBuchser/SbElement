import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'SbElement';
  public value: any = 'Switch is turned OFF';
  public valuecheckbox: boolean = false;
}
