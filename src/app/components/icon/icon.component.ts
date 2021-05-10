import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'sb-el-icon',
  templateUrl: './icon.component.html',
  styleUrls: ['./icon.component.scss']
})
export class IconComponent implements OnInit {

  @Input()
  public color: 'warn' | 'success' | 'info' | 'primary' | 'secondary' = 'primary';

  @Input()
  public size: 's' | 'd' | 'm' | 'l' = 'd';

  constructor() { }

  ngOnInit(): void {
  }

  get iconClasses(): Array<string> {
    let classes = new Array<string>();
    classes.push('icon--' + this.color);
    classes.push('icon--' + this.size);
    return classes;
  }
}
