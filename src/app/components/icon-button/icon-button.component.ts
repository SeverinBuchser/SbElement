import { Attribute, Component, Input, OnInit, Optional } from '@angular/core';

@Component({
  selector: 'sb-el-icon-button',
  templateUrl: './icon-button.component.html',
  styleUrls: ['./icon-button.component.scss']
})
export class IconButtonComponent implements OnInit {

  @Input()
  public theme: 'light' | 'night' = 'light';

  @Input()
  public color: 'warn' | 'success' | 'info' | 'primary' | 'secondary' = 'primary';

  @Input()
  public size: 's' | 'd' | 'm' | 'l' = 'd';

  public plain: boolean = false;
  public pill: boolean = false;
  public round: boolean = false;

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

}
