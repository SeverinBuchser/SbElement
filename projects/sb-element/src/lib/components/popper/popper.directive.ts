import { AfterViewInit, Directive } from '@angular/core';
import { ThemeService } from "../../services/theme/theme.service";
import { SizeThemeColorInputDirective } from "../../components/base/style-input/size-theme-color-input.directive";

@Directive({
  selector: '[selector]'
})
export class PopperDirective extends SizeThemeColorInputDirective implements AfterViewInit {

  constructor(themeService: ThemeService) {
    super(themeService);
  }

  public align: () => void = () => {};
  public afterViewInit: () => void = () => {};

  public ngAfterViewInit(): void {
    this.align();
    this.afterViewInit();
  }

}
