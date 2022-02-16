import { Directive, Input, OnDestroy } from '@angular/core';
import { Subscription } from "rxjs";
import { ThemeService } from '../style';
import { ClassNameInputDirective } from './class-name-input.directive';

@Directive({
  selector: '[selector]'
})
export class SizeThemeColorInputDirective extends ClassNameInputDirective implements OnDestroy {

  @Input()
  public size: string | null = 'd';

  public theme!: string;

  @Input()
  public color: string | null = null;

  private subscription: Subscription;

  constructor(
    protected themeService: ThemeService
  ) {
    super();
    this.subscription = themeService.subscribe(this);
  }

  public getClasses(): Array<string> {
    let classes = super.getClasses();

    if (this.size && this.rootClass) {
      classes.push(this.rootClass + '--' + this.size);
    }

    if (this.color && this.rootClass) {
      classes.push(this.rootClass + '--' + this.theme + '-' + this.color);
    }
    return classes;
  }

  public next = (theme: string): void => {
    this.theme = theme;
  };

  public ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
