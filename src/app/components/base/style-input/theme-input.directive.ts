import { Directive, Input } from '@angular/core';
import { ThemeService } from 'src/app/services/theme/theme.service';
import { ClassNameInputDirective } from './class-name-input.directive';

@Directive({
  selector: '[selector]'
})
export class ThemeInputDirective  extends ClassNameInputDirective {

  @Input()
  public theme: string | null = 'light';

  constructor(
    private themeService: ThemeService
  ) {
    super();
    this.theme = themeService.theme;
  }

  public getClasses(): Array<string> {
    let classes = super.getClasses();
    classes.push(this.theme ? this.rootClass + '--' + this.theme : '');
    return classes;
  }

}
