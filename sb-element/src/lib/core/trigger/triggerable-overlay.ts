import { Observable } from "rxjs";
import { Triggerable } from './triggerable';

export interface TriggerableOverlay extends Triggerable {
  getOutsidePointerEvents(): Observable<MouseEvent>;
  isVisible(): boolean;
}
