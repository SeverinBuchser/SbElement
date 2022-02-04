import { Component, HostBinding, Input, ViewEncapsulation } from '@angular/core';
import { SizeThemeInputDirective } from "../../core";

@Component({
  selector: 'sb-link',
  templateUrl: './link.component.html',
  styleUrls: ['./link.component.scss'],
  encapsulation: ViewEncapsulation.None,
  host: {
    '[class.active]': 'active'
  }
})
export class LinkComponent extends SizeThemeInputDirective {
  
  public rootClass: string = 'sb-link';

  @Input()
  public active: boolean = false;

  @Input()
  public href: string = '';

  @HostBinding('class')
  get classes(): Array<string> {
    let classes = super.getClasses();
    return classes;
  }
}
