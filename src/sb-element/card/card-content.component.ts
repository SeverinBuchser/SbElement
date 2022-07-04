import {
  Component,
  ElementRef, ViewEncapsulation
} from '@angular/core';
import { mixinClassName } from '../core';
import { SbCardContentDirective } from './card-content.directive';

const SbCardContentCore = mixinClassName(SbCardContentDirective, 'sb-card-content');

@Component({
  selector: 'sb-card-content',
  templateUrl: './card-content.component.html',
  styleUrls: ['./card-content.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [
    { provide: SbCardContentDirective, useExisting: SbCardContentComponent }
  ]
})
export class SbCardContentComponent extends SbCardContentCore {

  constructor(elementRef: ElementRef) {
    super(elementRef);
  }
  
}
