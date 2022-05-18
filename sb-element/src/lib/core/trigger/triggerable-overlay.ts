import { Observable, Subject } from "rxjs";
import { Triggerable } from './triggerable';

export interface TriggerableOverlay extends Triggerable {
  getOutsidePointerEvents(): Observable<MouseEvent>;
  isVisible(): boolean;
  onReady: Subject<void>;
}
