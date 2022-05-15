import { Component, EventEmitter, Input, Output, ViewEncapsulation } from '@angular/core';
import { SbConnectedSide, SbFlexibleAlignment } from '../../core';

@Component({
  selector: 'sb-tooltip',
  templateUrl: './tooltip.component.html',
  encapsulation: ViewEncapsulation.None
})
export class SbTooltipComponent {

  @Output()
  public showStart: EventEmitter<void> = new EventEmitter<void>();
  @Output()
  public showEnd: EventEmitter<void> = new EventEmitter<void>();
  @Output()
  public hideStart: EventEmitter<void> = new EventEmitter<void>();
  @Output()
  public hideEnd: EventEmitter<void> = new EventEmitter<void>();

  @Input()
  public text: string = '';

  @Input()
  public delay: number = 0;

  @Input()
  public position: SbConnectedSide = 'top';

  @Input()
  public alignment: SbFlexibleAlignment = 'center';

}
