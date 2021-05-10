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
    if (this.pill && this.round) throw new Error('Cannot use pill and round attribute simultaneously!');
    if (plain === '') this.plain = true;
  }

  ngOnInit(): void {
  }

  get buttonClasses(): Array<string> {
    let classes = new Array<string>();
    classes.push('btn--' + this.color);
    classes.push('btn--' + this.size);
    classes.push(this.pill ? 'is-pill' : '');
    classes.push(this.round ? 'is-round' : '');
    classes.push(this.plain ? 'is-plain' : '');
    return classes;
  }

}
