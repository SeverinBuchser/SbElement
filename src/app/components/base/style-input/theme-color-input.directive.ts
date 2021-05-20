import { Directive, Input } from '@angular/core';
import { ThemeService } from 'src/app/services/theme/theme.service';
import { ClassNameInputDirective } from './class-name-input.directive';

@Directive({
  selector: '[selector]'
})
export class ThemeColorInputDirective extends ClassNameInputDirective {

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
    classes.push(this.theme && this.color ?
      this.rootClass + '--' + this.theme + '-' + this.color : '');
    return classes;
  }

}
