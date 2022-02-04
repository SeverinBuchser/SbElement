import { Directive, Input, OnDestroy } from '@angular/core';
import { Subscription } from "rxjs";
import { ThemeService } from '../../services/theme/theme.service';
import { ClassNameInputDirective } from './class-name-input.directive';

@Directive({
  selector: '[selector]'
})
export class SizeThemeInputDirective extends ClassNameInputDirective implements OnDestroy {

  @Input()
  public size: string | null = 'd';

  public theme!: string;

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

    if (this.rootClass) {
      classes.push(this.rootClass + '--' + this.theme);
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
