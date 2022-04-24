import { Component, ElementRef, TemplateRef, ViewChild } from '@angular/core';

@Component({
  selector: 'picker-card-content',
  templateUrl: './picker-card-content.component.html'
})
export class PickerCardContentComponent {

  @ViewChild(TemplateRef, { static: true }) template!: TemplateRef<any>;

  get classes(): Array<string> {
    return this._elementRef.nativeElement.classList;
  }

  constructor(public _elementRef: ElementRef) {
  }
}
