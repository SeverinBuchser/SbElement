import { Attribute, Component, Input, OnInit, Optional } from '@angular/core';

@Component({
  selector: 'sb-el-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent implements OnInit {

  @Input()
  public color: 'warn' | 'success' | 'info' | 'primary' | 'secondary' = 'primary';

  @Input()
  public size: 's' | 'd' | 'm' | 'l' = 'd';

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

  private plain: boolean = false;
  private pill: boolean = false;
  private round: boolean = false;

  constructor(
    @Optional() @Attribute('pill') pill: any,
    @Optional() @Attribute('round') round: any,
    @Optional() @Attribute('plain') plain: any
  ) {
    if (pill === '') this.pill = true;
    if (round === '') this.round = true;
    if (plain === '') this.plain = true;
  }

  ngOnInit(): void {
  }

  get buttonClasses(): Array<string> {
    let classes = new Array<string>();
    classes.push('sb-btn');
    classes.push('btn--' + this.color);
    classes.push('btn--' + this.size);
    classes.push(this.pill ? 'is-pill' : '');
    classes.push(this.round ? 'is-round' : '');
    classes.push(this.plain ? 'is-plain' : '');
    return classes;
  }

}
