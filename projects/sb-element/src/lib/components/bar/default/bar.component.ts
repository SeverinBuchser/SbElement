import { Component, ElementRef, HostBinding, Input, ViewEncapsulation } from '@angular/core';
import { mixinClassName, mixinColor, mixinSize, mixinTheme, Size, ThemeService } from '../../../core/';

const SbBarCore = mixinSize(
  mixinColor(
    mixinTheme(
      mixinClassName(
        class {
          constructor(
            public _elementRef: ElementRef,
            public _themeService: ThemeService) {}
        }, 'sb-bar'
      )
    )
  ), Size.DEFAULT
);


@Component({
  selector: 'sb-bar',
  templateUrl: './bar.component.html',
  styleUrls: ['./bar.component.scss'],
  encapsulation: ViewEncapsulation.None,
  inputs: [
    'size',
    'color'
  ]
})
export class SbBarComponent extends SbBarCore {
  
  @Input() @HostBinding('class')
  public side: 'left' | 'right' | 'top' | 'bottom' = 'left';

  constructor(
    elementRef: ElementRef,
    themeService: ThemeService
  ) {
    super(elementRef, themeService);
  }
}
