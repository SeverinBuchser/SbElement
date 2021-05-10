import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'sb-el-pill',
  templateUrl: './pill.component.html',
  styleUrls: ['./pill.component.scss']
})
export class PillComponent implements OnInit {

  @Input()
  public color: 'warn' | 'success' | 'info' | 'primary' | 'secondary' = 'primary';

  @Input()
  public size: 's' | 'd' | 'm' | 'l' = 'd';

  @Input()
  public isPlain: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  get pillClasses(): Array<string> {
    let classes = new Array<string>();
    classes.push('pill--' + this.color);
    classes.push('pill--' + this.size);
    classes.push(this.isPlain ? 'is-plain' : '');
    return classes;
  }

}
