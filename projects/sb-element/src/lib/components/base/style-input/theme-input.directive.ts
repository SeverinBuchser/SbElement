import { Directive } from '@angular/core';
import { ThemeService } from '../../../services/theme/theme.service';
import { ClassNameInputDirective } from './class-name-input.directive';

@Directive({
  selector: '[selector]'
})
export class ThemeInputDirective  extends ClassNameInputDirective {

  public theme: string;

  constructor(
    private themeService: ThemeService
  ) {
    super();
    this.theme = themeService.get();
  }

  public getClasses(): Array<string> {
    let classes = super.getClasses();
    classes.push(this.theme ? this.rootClass + '--' + this.theme : '');
    return classes;
  }

}
