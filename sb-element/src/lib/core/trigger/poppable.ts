import { ElementRef } from "@angular/core";
import { Triggerable } from './triggerable';

export interface Poppable extends Triggerable {
  getPopperRef(): ElementRef;
  isPopped(): boolean;
}
