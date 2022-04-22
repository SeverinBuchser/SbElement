import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { NgForm } from "@angular/forms";
import { Color, MarkedDates, Size } from "sb-element";

@Component({
  selector: 'app-form-example',
  templateUrl: './form-example.component.html',
  styleUrls: ['./form-example.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class FormExampleComponent implements OnInit {

  @Input()
  public color: string = Color.PRIMARY;

  @Input()
  public size: string = Size.MEDIUM;


  public options = ['Option 1', 'Option 2', 'Option 3', 'Option 4', 'Option 5'];
  public model = {
    select: 'Option 1',
    checkboxes: [
      {name: 'Option 1', checked: false},
      {name: 'Option 2', checked: false},
      {name: 'Option 3', checked: false}
    ],
    radios: 'Option 1',
    slider: 0,
    input: 'severin.buchser@gmx.ch',
    fileinput: '',
    date: new Date(),
    dateRange: new MarkedDates(new Date(), new Date()),
    spinner: undefined,
    time: 0,
    double: ''
  };

  constructor() { }

  ngOnInit(): void {
  }

  onSubmit(form: NgForm) {
    console.log(this.model);
  }

}
