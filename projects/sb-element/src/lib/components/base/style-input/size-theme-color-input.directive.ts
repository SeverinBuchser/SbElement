import { Directive, Input } from '@angular/core';
import { ThemeService } from '../../../services/theme/theme.service';
import { ClassNameInputDirective } from './class-name-input.directive';

@Directive({
  selector: '[selector]'
})
export class SizeThemeColorInputDirective extends ClassNameInputDirective {

  @Input()
  public size: string | null = 'd';

  public theme: string;

  @Input()
  public color: string | null = 'primary';

  constructor(
    private themeService: ThemeService
  ) {
    super();
    this.theme = themeService.get();
  }

  public getClasses(): Array<string> {
    let classes = super.getClasses();
    classes.push(this.size ? this.rootClass + '--' + this.size : '');
    classes.push(this.theme && this.color ?
      this.rootClass + '--' + this.theme + '-' + this.color : '');
    return classes;
  }

}
