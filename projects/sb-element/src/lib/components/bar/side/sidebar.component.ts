import { Component, Input } from '@angular/core';
import { SizeThemeInputDirective, Triggerable } from '../../../core/';

@Component({
  selector: 'sb-el-sidebar',
  templateUrl: './sidebar.component.html'
})
export class SidebarComponent extends SizeThemeInputDirective implements Triggerable {
  public rootClass = 'sb-el-sidebar';

  @Input()
  public side: 'left' | 'right' | 'top' | 'bottom' = 'left';

  @Input()
  public visible: boolean = false;

  public trigger(): void {
    this.visible = !this.visible;
  }

  public getClasses(): Array<string> {
    let classes = super.getClasses();
    classes.push(this.side);
    return classes;
  }

  public getSidebarOverlayClasses(): Array<string> {
    let classes: Array<string> = new Array<string>();
    classes.push(this.rootClass + '__overlay');
    if (this.visible) {
      classes.push('visible');
    }
    return classes;
  }

  public getSidebarClasses(): Array<string> {
    let classes: Array<string> = new Array<string>();
    classes.push(this.rootClass + '__sidebar');
    if (this.visible) {
      classes.push('visible');
    }
    return classes;
  }
}
