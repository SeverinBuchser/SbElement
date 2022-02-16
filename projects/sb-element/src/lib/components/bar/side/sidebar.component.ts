import { Component, ElementRef, Input, ViewEncapsulation } from '@angular/core';
import { mixinClassName, mixinSize, mixinTheme, Size, ThemeService, Triggerable } from '../../../core/';

const SbSidebarCore = mixinSize(
  mixinTheme(
    mixinClassName(
      class {
        constructor(
          public _elementRef: ElementRef,
          public _themeService: ThemeService) {}
      }, 'sb-sidebar'
    )
  ), Size.DEFAULT
);

@Component({
  selector: 'sb-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  encapsulation: ViewEncapsulation.None,
  inputs: [
    'size'
  ]
})
export class SbSidebarComponent extends SbSidebarCore implements Triggerable {

  @Input()
  public side: 'left' | 'right' | 'top' | 'bottom' = 'left';

  @Input()
  public visible: boolean = false;

  constructor(
    elementRef: ElementRef,
    themeService: ThemeService
  ) {
    super(elementRef, themeService);
  }

  public trigger(): void {
    this.visible = !this.visible;
  }

  public getSidebarOverlayClasses(): Array<string> {
    let classes: Array<string> = new Array<string>();
    classes.push(this.className + '__overlay');
    if (this.visible) {
      classes.push('visible');
    }
    return classes;
  }
}
