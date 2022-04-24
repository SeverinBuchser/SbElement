import { Component, ContentChildren, Input, QueryList } from '@angular/core';
import { Color } from 'sb-element';
import { Shape } from '../form-picker/form-picker.component';
import { Look } from '../look-picker/look-picker.component';
import { PickerCardContentComponent } from './picker-card-content/picker-card-content.component';

@Component({
  selector: 'picker-card',
  templateUrl: './picker-card.component.html',
  styleUrls: ['./picker-card.component.scss']
})
export class PickerCardComponent {

  @Input()
  public title: string = '';

  @Input()
  public colorsNotAllowed: Array<Color> = new Array();
  @Input()
  public shapesNotAllowed: Array<Shape> = new Array();
  @Input()
  public looksNotAllowed: Array<Look> = new Array();

  public currentColor: Color = Color.PRIMARY;
  public currentShape: Shape = 'default';
  public currentLook: Look = 'default';

  @Input()
  public pickColor: boolean = true;
  @Input()
  public pickShape: boolean = true;
  @Input()
  public pickLook: boolean = true;

  @ContentChildren(PickerCardContentComponent)
  public contents!: QueryList<PickerCardContentComponent>;

  constructor() { }

}
