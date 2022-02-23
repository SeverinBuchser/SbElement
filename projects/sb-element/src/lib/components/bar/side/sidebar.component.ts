import { Component, ElementRef, Input, ViewEncapsulation } from '@angular/core';
import { mixinClassName, mixinTheme, Size, SbThemeService, Triggerable } from '../../../core/';

const SbSidebarCore = mixinTheme(
  mixinClassName(
    class {
      constructor(
        public _elementRef: ElementRef,
        public _themeService: SbThemeService) {}
    }, 'sb-sidebar'
  )
);

@Component({
  selector: 'sb-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class SbSidebarComponent extends SbSidebarCore implements Triggerable {

  @Input()
  public size: string = Size.MEDIUM;

  @Input()
  public side: 'left' | 'right' | 'top' | 'bottom' = 'left';

  @Input()
  public visible: boolean = false;

  constructor(
    elementRef: ElementRef,
    themeService: SbThemeService
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
