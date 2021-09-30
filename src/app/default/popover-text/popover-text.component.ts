import { Component } from '@angular/core';
import { PopperDirective, PopperService, ThemeService } from "sb-element";

@Component({
  selector: 'app-popover-text',
  templateUrl: './popover-text.component.html',
  styleUrls: ['./popover-text.component.scss']
})
export class PopoverTextComponent extends PopperDirective {
  constructor(
    themeService: ThemeService,
    private popperService: PopperService
  ) {
    super(themeService);
  }

  close() {
    this.popperService.unpop()
  }
}
