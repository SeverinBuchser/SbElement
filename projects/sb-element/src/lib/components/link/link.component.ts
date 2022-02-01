import { Component, Input, ViewEncapsulation } from '@angular/core';
import { SizeThemeInputDirective } from "../../core";

@Component({
  selector: 'sb-link',
  templateUrl: './link.component.html',
  styleUrls: ['./link.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class LinkComponent extends SizeThemeInputDirective {
  public rootClass: string = 'sb-link';

  @Input()
  public active: boolean = false;

  @Input()
  public href: string = '';

  public getClasses(): Array<string> {
    let classes = super.getClasses();
    classes.push(this.active ? 'active' : '');
    return classes;
  }
}
