import { Directive, OnDestroy } from '@angular/core';
import { Subscription } from "rxjs";
import { ThemeService } from '../style';
import { ClassNameInputDirective } from './class-name-input.directive';

@Directive({
  selector: '[selector]'
})
export class ThemeInputDirective extends ClassNameInputDirective implements OnDestroy {

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
