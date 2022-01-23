import { Component, Input } from '@angular/core';
import { SizeThemeInputDirective } from "../../../core";

@Component({
  selector: 'sb-el-nav-link',
  templateUrl: './nav-link.component.html'
})
export class NavLinkComponent extends SizeThemeInputDirective {
  public rootClass: string = 'sb-el-nav-link';

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
