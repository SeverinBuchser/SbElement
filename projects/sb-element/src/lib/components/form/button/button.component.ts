import { Attribute, Component, Input, OnInit, Optional } from '@angular/core';
import { ThemeService } from '../../../services/theme/theme.service';
import { SizeThemeColorInputDirective } from '../../base/style-input/size-theme-color-input.directive';

@Component({
  selector: 'sb-el-button',
  templateUrl: './button.component.html'
})
export class ButtonComponent extends SizeThemeColorInputDirective implements OnInit {

  @Input()
  set isPlain(isPlain: any) {
    this.plain = isPlain;
  }

  @Input()
  set isPill(isPill: any) {
    if (!this.round) this.pill = isPill;
    else if (isPill && this.round) throw new Error('Cannot use pill and round attribute simultaneously!');
  }

  @Input()
  set isRound(isRound: any) {
    if (!this.pill) this.round = isRound;
    else if (isRound && this.pill) throw new Error('Cannot use pill and round attribute simultaneously!');
  }

  @Input()
  set disabled(isDisabled: boolean) {
    this._disabled = isDisabled;
  }
  get disabled(): boolean {
    return this._disabled;
  }

  @Input()
  public type: string = 'button';

  private plain: boolean = false;
  private pill: boolean = false;
  private round: boolean = false;
  private _disabled: boolean = false;

  constructor(
    @Optional() @Attribute('pill') pill: any,
    @Optional() @Attribute('round') round: any,
    @Optional() @Attribute('plain') plain: any,
    themeService: ThemeService
  ) {
    super(themeService);
    this.rootClass = 'sb-el-btn';
    if (pill === '') this.pill = true;
    if (round === '') this.round = true;
    if (plain === '') this.plain = true;
  }

  public setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  ngOnInit(): void {
  }

  public getClasses(): Array<string> {
    let classes = super.getClasses();
    classes.push(this.pill ? 'is-pill' : '');
    classes.push(this.round ? 'is-round' : '');
    classes.push(this.plain ? 'is-plain' : '');
    return classes;
  }

}
