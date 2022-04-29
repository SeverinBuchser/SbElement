import { Component, ContentChildren, EventEmitter, Input, Output, QueryList, ViewEncapsulation } from '@angular/core';
import { Color } from 'sb-element';
import { Shape } from '../form-picker/form-picker.component';
import { Look } from '../look-picker/look-picker.component';
import { PickerCardContentComponent } from './picker-card-content/picker-card-content.component';

@Component({
  selector: 'picker-card',
  templateUrl: './picker-card.component.html',
  encapsulation: ViewEncapsulation.None
})
export class PickerCardComponent {

  @Output()
  public change: EventEmitter<void> = new EventEmitter();

  @Input()
  public title: string = '';

  @Input()
  public colorsNotAllowed: Array<Color> = new Array();
  @Input()
  public shapesNotAllowed: Array<Shape> = new Array();
  @Input()
  public looksNotAllowed: Array<Look> = new Array();

  public color: Color = Color.PRIMARY;
  public shape: Shape = 'default';
  public look: Look = 'default';

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
