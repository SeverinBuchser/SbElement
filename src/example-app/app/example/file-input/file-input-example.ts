import { Component, ElementRef, ViewEncapsulation } from '@angular/core';
import { hasElementRefClass, mixinClassName } from 'sb-element';

@Component({
  selector: 'app-file-input-example',
  templateUrl: './file-input-example.html',
  styleUrls: ['./file-input-example.scss'],
  encapsulation: ViewEncapsulation.None,
  host: {
    '[class]': '"sb--padding-s"'
  }
})
export class FileInputExampleComponent extends mixinClassName(
  hasElementRefClass, 'app-file-input-example') {

  constructor(elementRef: ElementRef) {
    super(elementRef);
  }
}
