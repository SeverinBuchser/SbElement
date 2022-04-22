import { Component, ElementRef, TemplateRef, ViewChild } from '@angular/core';

@Component({
  selector: 'color-picker-card-content',
  templateUrl: './color-picker-card-content.component.html',
  styleUrls: ['./color-picker-card-content.component.scss']
})
export class ColorPickerCardContentComponent {

  @ViewChild(TemplateRef, { static: true }) template!: TemplateRef<any>;

  get classes(): Array<string> {
    return this._elementRef.nativeElement.classList;
  }

  constructor(public _elementRef: ElementRef) {
  }
}
