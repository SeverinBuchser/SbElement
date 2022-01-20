import { Directive, Input, OnDestroy } from '@angular/core';
import { Subscription } from "rxjs";
import { ThemeService } from '../../services/theme/theme.service';
import { ControlValueAccessorClassNameInputDirective } from './control-value-accessor-class-name-input.directive';

@Directive({
  selector: '[selector]'
})
export class ControlValueAccessorSizeThemeColorInputDirective<ValueType> extends ControlValueAccessorClassNameInputDirective<ValueType> implements OnDestroy {

  @Input()
  public size: string | null = 'd';

  public theme!: string;

  @Input()
  public color: string | null = 'primary';

  private subscription: Subscription;

  constructor(
    protected themeService: ThemeService
  ) {
    super();
    this.subscription = themeService.subscribe(this);
  }

  public getClasses(): Array<string> {
    let classes = super.getClasses();
    classes.push(this.size ? this.rootClass + '--' + this.size : '');
    classes.push(this.color ?
      this.rootClass + '--' + this.theme + '-' + this.color : '');
    return classes;
  }

  public next = (theme: string): void => {
    this.theme = theme;
  };

  public ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
