import { Component, Input, OnInit } from '@angular/core';

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
  public isPlain: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  get buttonClasses(): Array<string> {
    let classes = new Array<string>();
    classes.push('btn--' + this.color);
    classes.push('btn--' + this.size);
    classes.push(this.isPlain ? 'is-plain' : '');
    return classes;
  }

}
