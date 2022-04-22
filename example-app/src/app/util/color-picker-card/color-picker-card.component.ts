import { Component, Input, OnInit } from '@angular/core';
import { Color } from 'sb-element';

@Component({
  selector: 'color-picker-card',
  templateUrl: './color-picker-card.component.html',
  styleUrls: ['./color-picker-card.component.scss']
})
export class ColorPickerCardComponent implements OnInit {

  @Input()
  public title: string = '';

  public color: Color = Color.PRIMARY;

  constructor() { }

  ngOnInit(): void {
  }

  public pick(color: string): void {
    console.log(color)
    this.color = color as Color;
  }

}
