import { Component } from '@angular/core';
import { PopperDirective, PopperService } from "sb-element";

@Component({
  selector: 'app-popover-text',
  templateUrl: './popover-text.component.html',
  styleUrls: ['./popover-text.component.scss']
})
export class PopoverTextComponent extends PopperDirective {
  constructor(private popperService: PopperService) {
    super();
  }

  close() {
    this.popperService.unpop()
  }
}
