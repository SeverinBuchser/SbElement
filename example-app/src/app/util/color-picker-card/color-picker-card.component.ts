import { Component, ContentChildren, Input, QueryList } from '@angular/core';
import { Color } from 'sb-element';
import { ColorPickerCardContentComponent } from './color-picker-card-content/color-picker-card-content.component';

@Component({
  selector: 'color-picker-card',
  templateUrl: './color-picker-card.component.html',
  styleUrls: ['./color-picker-card.component.scss']
})
export class ColorPickerCardComponent {

  @Input()
  public title: string = '';

  public color: Color = Color.PRIMARY;

  @ContentChildren(ColorPickerCardContentComponent)
  public contents!: QueryList<ColorPickerCardContentComponent>;

  constructor() { }

  public pick(color: string): void {
    console.log(color)
    this.color = color as Color;
  }

}
