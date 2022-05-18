import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { SbPopperComponent } from 'sb-element';

@Component({
  selector: 'app-popper-example',
  templateUrl: './popper-example.component.html',
  encapsulation: ViewEncapsulation.None
})
export class PopperExampleComponent implements OnInit {

  public sth: number = 0;

  @ViewChild('popperOne')
  public popper!: SbPopperComponent;

  constructor() { }

  ngOnInit(): void {
  }

}
